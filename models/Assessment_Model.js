const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  ForRole: {
    type: String,
  },
  Type: {
    type: String,
    enum: ['', '1', '2', '3'],
    default: '',
  },
});

module.exports = mongoose.model('assessment', AssessmentSchema);
