const mongoose = require('mongoose');

const McqTypeAnswerSheetSchema = new mongoose.Schema({
  answerSheetId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  candidateAnswer: {
    type: String,
  },
});

module.exports = mongoose.model(
  'mcq_type_answer_sheet',
  McqTypeAnswerSheetSchema
);
