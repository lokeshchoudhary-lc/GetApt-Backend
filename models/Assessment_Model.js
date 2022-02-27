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
  fromCompany: { type: mongoose.Schema.Types.ObjectId },
  createdBy: {
    createdById: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
  },
  assessmentTypeA_Id: { type: mongoose.Schema.Types.ObjectId },
  assessmentTypeB_Id: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model('assessment', AssessmentSchema);
