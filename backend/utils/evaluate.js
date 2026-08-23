/**
 * Rule-based evaluation engine.
 * No external AI API required — pure Node.js scoring so the whole
 * platform runs on MERN alone.
 *
 * Scoring approach:
 *  - MCQ: exact match against correctOptionIndex -> 100 or 0
 *  - technical / coding: keyword coverage + answer depth (length) + structure signals
 *  - hr: keyword coverage + STAR-style structure signals (situation/task/action/result cues)
 */

const FILLER_WORDS = new Set(['um', 'uh', 'like', 'basically', 'actually', 'literally']);

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function scoreMCQ(question, userAnswer) {
  const selectedIndex = parseInt(userAnswer, 10);
  const correct = selectedIndex === question.correctOptionIndex;
  return {
    score: correct ? 100 : 0,
    matchedKeywords: [],
    missedKeywords: [],
    feedback: correct
      ? 'Correct! That matches the expected answer.'
      : `Not quite. The correct option was: "${question.options[question.correctOptionIndex]}".`,
    suggestions: correct
      ? ['Review why the other options were incorrect to deepen understanding.']
      : ['Revisit this topic and compare each option against the core concept being tested.']
  };
}

function scoreTextAnswer(question, userAnswer) {
  const words = normalize(userAnswer);
  const wordCount = words.filter((w) => !FILLER_WORDS.has(w)).length;
  const keywords = (question.keywords || []).map((k) => k.toLowerCase());

  const matched = [];
  const missed = [];
  keywords.forEach((kw) => {
    const kwParts = kw.split(/\s+/);
    const present = kwParts.every((p) => words.includes(p));
    if (present) matched.push(kw);
    else missed.push(kw);
  });

  const keywordCoverage = keywords.length ? matched.length / keywords.length : 0.5;

  // Depth score: rewards a reasonably explained answer, caps out so rambling doesn't inflate score
  let depthScore = 0;
  if (wordCount >= 15) depthScore = 1;
  else if (wordCount >= 8) depthScore = 0.6;
  else if (wordCount >= 3) depthScore = 0.3;
  else depthScore = 0;

  let structureScore = 0.5;
  if (question.category === 'hr') {
    const lower = (userAnswer || '').toLowerCase();
    const starCues = ['situation', 'task', 'action', 'result', 'i was', 'i had to', 'so i', 'as a result', 'because'];
    const hits = starCues.filter((c) => lower.includes(c)).length;
    structureScore = Math.min(1, 0.3 + hits * 0.15);
  } else if (question.category === 'coding' || question.category === 'technical') {
    const lower = (userAnswer || '').toLowerCase();
    const codeCues = ['function', 'time complexity', 'o(', 'because', 'first', 'then', 'example', 'return'];
    const hits = codeCues.filter((c) => lower.includes(c)).length;
    structureScore = Math.min(1, 0.3 + hits * 0.15);
  }

  const combined = keywordCoverage * 0.55 + depthScore * 0.25 + structureScore * 0.2;
  const score = Math.round(Math.min(1, Math.max(0, combined)) * 100);

  const suggestions = [];
  if (missed.length) {
    suggestions.push(`Mention key concept(s): ${missed.slice(0, 4).join(', ')}.`);
  }
  if (wordCount < 8) {
    suggestions.push('Expand your answer with a concrete example or a bit more explanation.');
  }
  if (question.category === 'hr' && structureScore < 0.6) {
    suggestions.push('Structure it using STAR: Situation, Task, Action, Result.');
  }
  if (question.category === 'coding' && !/o\(|time complexity/i.test(userAnswer || '')) {
    suggestions.push('Mention the time/space complexity of your approach.');
  }
  if (!suggestions.length) {
    suggestions.push('Solid answer — try tightening it further for a crisp, interview-ready delivery.');
  }

  let feedback;
  if (score >= 85) feedback = 'Excellent answer — clear, relevant, and well covered.';
  else if (score >= 65) feedback = 'Good answer, with room to add more depth or precision.';
  else if (score >= 40) feedback = 'Partial answer — some relevant points, but key ideas are missing.';
  else feedback = 'This answer needs significant improvement — revisit the core concept.';

  return { score, matchedKeywords: matched, missedKeywords: missed, feedback, suggestions };
}

function evaluateAnswer(question, userAnswer) {
  if (question.category === 'mcq') {
    return scoreMCQ(question, userAnswer);
  }
  return scoreTextAnswer(question, userAnswer);
}

function computeWeakTopics(answers) {
  const byTopic = {};
  answers.forEach((a) => {
    if (!byTopic[a.topic]) byTopic[a.topic] = [];
    byTopic[a.topic].push(a.score);
  });
  return Object.entries(byTopic)
    .map(([topic, scores]) => ({
      topic,
      avgScore: Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
    }))
    .filter((t) => t.avgScore < 60)
    .sort((a, b) => a.avgScore - b.avgScore);
}

module.exports = { evaluateAnswer, computeWeakTopics };
