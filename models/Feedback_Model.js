const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
  FeedbackBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate_profile',
  },
  Rating: {
    enum: ['0', '1', '2', '3', '4', '5'],
    type: String,
    default: '0',
  },
  Comment: {
    type: String,
  },
});

module.exports = mongoose.model('feedback', Feedback);
