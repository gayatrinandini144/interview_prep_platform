const express = require('express');
const Question = require('../models/Question');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// Generate a mixed question set for a role/technology/experience combo.
// GET /api/questions/generate?role=Software Developer&technology=MERN&experience=Fresher&count=10
//
// Matching strategy: technical/coding/mcq questions are matched by TECHNOLOGY
// (the stack actually drives what gets asked) + experience. HR/behavioral
// questions are role-and-tech-agnostic, so they're pulled from the whole HR
// pool regardless of technology. This means a new role can reuse the shared
// HR set immediately, and only needs its own technical/coding/mcq questions
// seeded to get technology-specific coverage.
router.get('/generate', requireAuth, async (req, res) => {
  try {
    const { technology = 'MERN', experience = 'Fresher' } = req.query;
    const perCategory = { technical: 3, hr: 2, coding: 2, mcq: 3 };

    const techFilter = { technology, experience };
    const techCategories = ['technical', 'coding', 'mcq'];

    const [techResults, hrResults] = await Promise.all([
      Promise.all(
        techCategories.map((category) =>
          Question.aggregate([
            { $match: { ...techFilter, category } },
            { $sample: { size: perCategory[category] } }
          ])
        )
      ),
      Question.aggregate([{ $match: { category: 'hr' } }, { $sample: { size: perCategory.hr } }])
    ]);

    let questions = [...techResults.flat(), ...hrResults];

    // Fallback: if this technology has no seeded questions yet, relax to any technology
    if (techResults.flat().length === 0) {
      const fallbackTech = await Question.aggregate([
        { $match: { category: { $in: techCategories }, experience } },
        { $sample: { size: 8 } }
      ]);
      questions = [...fallbackTech, ...hrResults];
    }

    // Last resort: DB isn't seeded at all
    if (questions.length === 0) {
      questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    }

    // Never leak the correct answer for MCQs to the client
    const safe = questions.map((q) => ({
      _id: q._id,
      category: q.category,
      topic: q.topic,
      difficulty: q.difficulty,
      text: q.text,
      options: q.options
    }));

    res.json({ questions: safe });
  } catch (err) {
    res.status(500).json({ message: 'Could not generate questions.', error: err.message });
  }
});

module.exports = router;
