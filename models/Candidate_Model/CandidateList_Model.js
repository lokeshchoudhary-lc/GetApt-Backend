const mongoose = require('mongoose');

const CandidateList = new mongoose.Schema({
  fromCompany: { type: mongoose.Schema.Types.ObjectId },
  email: {
    type: String,
  },
  score: {
    type: String,
  },
  score: {
    type: String,
  },
  contact: {
    type: String,
  },
});

// CandidateList.index({ email: 1, fromCompany: 1 }, { unique: true });

module.exports = mongoose.model('candidate_list', CandidateList);
