const mongoose = require('mongoose');

const AnswerSheet = new mongoose.Schema({
  FromAssessment: { type: mongoose.Schema.Types.ObjectId },
  Candidate: {
    CandidateId: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
  },
  AnswerTypeA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answersheet_type_a',
  },
  AnswerTypeB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answersheet_type_b', // problem : more bandwidth , may not interact
  },
});

module.exports = mongoose.model('answer_sheet', AnswerSheet);
