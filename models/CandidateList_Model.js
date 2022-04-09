const mongoose = require('mongoose');

const CandidateList = new mongoose.Schema({
  email: {
    type: String,
  },
  fromCompany: { type: mongoose.Schema.Types.ObjectId },
});

CandidateList.index({ email: 1, fromCompany: 1 }, { unique: true });

module.exports = mongoose.model('candidate_list', CandidateList);
