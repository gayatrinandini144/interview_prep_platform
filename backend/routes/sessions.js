const express = require('express');
const Session = require('../models/Session');
const Question = require('../models/Question');
const requireAuth = require('../middleware/auth');
const { evaluateAnswer, computeWeakTopics } = require('../utils/evaluate');

const router = express.Router();

// Start a new interview / mock session
router.post('/', requireAuth, async (req, res) => {
  try {
    const { role, technology, experience, mode } = req.body;
    const session = await Session.create({
      user: req.userId,
      role,
      technology,
      experience,
      mode: mode === 'mock' ? 'mock' : 'practice'
    });
    res.status(201).json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Could not start session.', error: err.message });
  }
});

// Submit an answer to a question within a session -> evaluated server-side
router.post('/:sessionId/answer', requireAuth, async (req, res) => {
  try {
    const { questionId, userAnswer, timeTakenSeconds } = req.body;
    const session = await Session.findOne({ _id: req.params.sessionId, user: req.userId });
    if (!session) return res.status(404).json({ message: 'Session not found.' });

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found.' });

    const result = evaluateAnswer(question, userAnswer);

    session.answers.push({
      question: question._id,
      questionText: question.text,
      category: question.category,
      topic: question.topic,
      userAnswer,
      timeTakenSeconds,
      score: result.score,
      feedback: result.feedback,
      suggestions: result.suggestions,
      matchedKeywords: result.matchedKeywords,
      missedKeywords: result.missedKeywords
    });
    await session.save();

    res.json({
      score: result.score,
      feedback: result.feedback,
      suggestions: result.suggestions,
      matchedKeywords: result.matchedKeywords,
      missedKeywords: result.missedKeywords,
      followUps: question.followUps || []
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not evaluate answer.', error: err.message });
  }
});

// Complete a session -> compute aggregate scores + weak topics
router.post('/:sessionId/complete', requireAuth, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.sessionId, user: req.userId });
    if (!session) return res.status(404).json({ message: 'Session not found.' });

    const answers = session.answers;
    const overall = answers.length
      ? Math.round(answers.reduce((s, a) => s + a.score, 0) / answers.length)
      : 0;

    const byCategory = { technical: [], hr: [], coding: [], mcq: [] };
    answers.forEach((a) => byCategory[a.category] && byCategory[a.category].push(a.score));
    const avg = (arr) => (arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : 0);

    session.categoryScores = {
      technical: avg(byCategory.technical),
      hr: avg(byCategory.hr),
      coding: avg(byCategory.coding),
      mcq: avg(byCategory.mcq)
    };
    session.overallScore = overall;
    session.weakTopics = computeWeakTopics(answers);
    session.status = 'completed';
    session.completedAt = new Date();
    await session.save();

    res.json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Could not complete session.', error: err.message });
  }
});

// Get one session (for a results page)
router.get('/:sessionId', requireAuth, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.sessionId, user: req.userId });
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json({ session });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch session.', error: err.message });
  }
});

// Interview history - list of past sessions
router.get('/', requireAuth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch history.', error: err.message });
  }
});

// Performance dashboard aggregates
router.get('/stats/dashboard', requireAuth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.userId, status: 'completed' }).sort({
      completedAt: 1
    });

    const trend = sessions.map((s) => ({
      date: s.completedAt,
      overallScore: s.overallScore,
      mode: s.mode
    }));

    const allWeak = {};
    sessions.forEach((s) => {
      (s.weakTopics || []).forEach((wt) => {
        if (!allWeak[wt.topic]) allWeak[wt.topic] = [];
        allWeak[wt.topic].push(wt.avgScore);
      });
    });
    const weakTopics = Object.entries(allWeak)
      .map(([topic, scores]) => ({
        topic,
        avgScore: Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
      }))
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 6);

    const categoryTotals = { technical: [], hr: [], coding: [], mcq: [] };
    sessions.forEach((s) => {
      Object.entries(s.categoryScores || {}).forEach(([cat, val]) => {
        if (categoryTotals[cat] && val) categoryTotals[cat].push(val);
      });
    });
    const avg = (arr) => (arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : 0);
    const categoryAverages = Object.fromEntries(
      Object.entries(categoryTotals).map(([k, v]) => [k, avg(v)])
    );

    res.json({
      totalSessions: sessions.length,
      trend,
      weakTopics,
      categoryAverages,
      bestScore: sessions.length ? Math.max(...sessions.map((s) => s.overallScore)) : 0,
      latestScore: sessions.length ? sessions[sessions.length - 1].overallScore : 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not compute dashboard stats.', error: err.message });
  }
});

module.exports = router;
