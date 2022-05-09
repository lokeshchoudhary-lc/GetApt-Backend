const mongoose = require('mongoose');

const AnswerSheet = new mongoose.Schema({
  fromAssessment: { type: mongoose.Schema.Types.ObjectId },
  candidate: {
    candidateId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
  },
  totalComputedScore: {
    type: String,
  },
  totalComputedScoreTypeA: {
    type: String,
  },
  totalComputedScoreTypeB: {
    type: String,
  },
  answerTypeA: {
    type: mongoose.Schema.Types.ObjectId,
  },
  answerTypeB: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('answer_sheet', AnswerSheet);
