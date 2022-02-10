const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
  feedbackBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate_profile',
  },
  rating: {
    enum: ['0', '1', '2', '3', '4', '5'],
    type: String,
    default: '0',
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model('feedback', Feedback);
