const mongoose = require('mongoose');

const SubjectiveTypeAnswerSheetSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  givenScore: {
    type: String,
  },
});

module.exports = mongoose.model(
  'subjective_type_answer_sheet',
  SubjectiveTypeAnswerSheetSchema
);
