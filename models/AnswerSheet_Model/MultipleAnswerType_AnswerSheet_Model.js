const mongoose = require('mongoose');

const MultipleAnswerTypeAnswerSheetSchema = new mongoose.Schema({
  answerSheetId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  candidateAnswer: [String],
});

module.exports = mongoose.model(
  'multiple_answer_type_answer_sheet',
  MultipleAnswerTypeAnswerSheetSchema
);
