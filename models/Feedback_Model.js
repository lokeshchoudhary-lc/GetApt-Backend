const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
  feedbackBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate_profile',
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model('feedback', Feedback);
