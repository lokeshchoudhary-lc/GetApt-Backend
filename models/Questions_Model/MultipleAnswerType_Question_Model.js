const mongoose = require('mongoose');

const MultipleAnswerTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  question: {
    type: String,
  },
  options: [String],
  answerKey: [String],
  scoreOfQuestion: {
    correctMarking: {
      type: String,
    },
    wrongMarking: {
      type: String,
    },
  },
});

module.exports = mongoose.model(
  'multiple_answer_type_question',
  MultipleAnswerTypeQuestionSchema
);
