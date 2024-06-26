const mongoose = require('mongoose');

const IntegerTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  question: {
    type: String,
  },
  answerKey: {
    type: String,
  },
  scoreOfQuestion: {
    correctMarking: {
      type: Number,
      default: '0',
    },
    wrongMarking: {
      type: Number,
      default: '0',
    },
  },
});

module.exports = mongoose.model(
  'integer_type_question',
  IntegerTypeQuestionSchema
);
