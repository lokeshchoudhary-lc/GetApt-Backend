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
  FromComapny: { type: mongoose.Schema.Types.ObjectId },
  CreatedBy: {
    CreatedById: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
  },
});

module.exports = mongoose.model('assessment', AssessmentSchema);
