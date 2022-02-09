const mongoose = require('mongoose');

const AnswerSheet = new mongoose.Schema({
  FromAssessment: { type: mongoose.Schema.Types.ObjectId },
  Candidate: {
    CandidateId: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
  },
  AnswerTypeA: {
    type: mongoose.Schema.Types.ObjectId,
  },
  AnswerTypeB: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('answer_sheet', AnswerSheet);
