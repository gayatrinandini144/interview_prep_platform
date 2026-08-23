const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['technical', 'hr', 'coding', 'mcq'],
      required: true
    },
    topic: { type: String, required: true }, // e.g. 'React', 'Node.js', 'MongoDB', 'Behavioral', 'DSA'
    role: { type: String, default: 'Software Developer' },
    technology: { type: String, default: 'MERN' },
    experience: { type: String, default: 'Fresher' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    text: { type: String, required: true },
    // For MCQ
    options: [{ type: String }],
    correctOptionIndex: { type: Number },
    // For technical/hr/coding free-text answers - used by the rule-based evaluator
    keywords: [{ type: String }],
    idealAnswerNotes: { type: String, default: '' },
    followUps: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);
