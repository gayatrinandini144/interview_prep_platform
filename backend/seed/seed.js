require('dotenv').config();
const connectDB = require('../config/db');
const Question = require('../models/Question');
const questions = require('./questions');

(async () => {
  await connectDB();
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log(`Seeded ${questions.length} questions.`);
  process.exit(0);
})();
