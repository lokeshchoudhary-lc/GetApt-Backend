const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  forRole: {
    type: String,
  },
  type: {
    type: String,
    enum: ['', '1', '2', '3'],
    default: '',
  },
  fromComapny: { type: mongoose.Schema.Types.ObjectId },
  createdBy: {
    createdById: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
  },
});

module.exports = mongoose.model('assessment', AssessmentSchema);
