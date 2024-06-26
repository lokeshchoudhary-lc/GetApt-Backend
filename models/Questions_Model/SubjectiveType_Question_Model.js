const mongoose = require('mongoose');

const SubjectiveTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  question: {
    type: String,
  },
  scoreOfQuestion: {
    type: Number,
  },
});

module.exports = mongoose.model(
  'subjective_type_question',
  SubjectiveTypeQuestionSchema
);
