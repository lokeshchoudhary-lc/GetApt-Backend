const mongoose = require('mongoose');

const AnswerSheet = new mongoose.Schema({
  fromAssessment: { type: mongoose.Schema.Types.ObjectId },
  candidate: {
    candidateId: { type: mongoose.Schema.Types.ObjectId },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  totalComputedScore: {
    type: Number,
  },
  submittedTypeA: {
    type: Boolean,
    default: false,
  },
  submittedTypeB: {
    type: Boolean,
    default: false,
  },
  answerSheetTypeA_Id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  answerSheetTypeB_Id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('answer_sheet', AnswerSheet);
