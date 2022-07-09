const mongoose = require('mongoose');

const SubjectiveTypeAnswerSheetSchema = new mongoose.Schema({
  answerSheetId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  candidateAnswer: {
    type: String,
  },
  givenScore: {
    type: String,
  },
});

module.exports = mongoose.model(
  'subjective_type_answer_sheet',
  SubjectiveTypeAnswerSheetSchema
);
