const mongoose = require('mongoose');

const McqTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  question: {
    type: String,
  },
  options: [String],
  answerKey: {
    type: String,
  },
  scoreOfQuestion: {
    correctMarking: {
      type: String,
    },
    wrongMarking: {
      type: String,
    },
  },
});

module.exports = mongoose.model('mcq_type_question', McqTypeQuestionSchema);
