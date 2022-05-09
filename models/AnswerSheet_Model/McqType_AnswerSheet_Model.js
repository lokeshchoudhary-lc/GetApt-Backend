const mongoose = require('mongoose');

const McqTypeAnswerSheetSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  answer: {
    type: String,
  },
  givenScore: {
    type: String,
  },
});

module.exports = mongoose.model(
  'mcq_type_answer_sheet',
  McqTypeAnswerSheetSchema
);
