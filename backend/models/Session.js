const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    questionText: String,
    category: String,
    topic: String,
    userAnswer: String,
    timeTakenSeconds: Number,
    score: { type: Number, min: 0, max: 100 },
    feedback: String,
    suggestions: [String],
    matchedKeywords: [String],
    missedKeywords: [String]
  },
  { _id: false }
);

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, default: 'Software Developer' },
    technology: { type: String, default: 'MERN' },
    experience: { type: String, default: 'Fresher' },
    mode: { type: String, enum: ['practice', 'mock'], default: 'practice' },
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
    answers: [AnswerSchema],
    overallScore: { type: Number, default: 0 },
    categoryScores: {
      technical: { type: Number, default: 0 },
      hr: { type: Number, default: 0 },
      coding: { type: Number, default: 0 },
      mcq: { type: Number, default: 0 }
    },
    weakTopics: [{ topic: String, avgScore: Number }],
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', SessionSchema);
