const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  workExperience: {
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
  disabled: { type: Boolean, default: false },
  fromCompany: { type: mongoose.Schema.Types.ObjectId },
  createdBy: {
    createdById: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
  },
  assessmentTypeA_Id: { type: mongoose.Schema.Types.ObjectId },
  assessmentTypeA_Data: {
    duration: {
      type: String,
    },
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
    maxScore: { type: String },
  },
  assessmentTypeB_Id: { type: mongoose.Schema.Types.ObjectId },
  assessmentTypeB_Data: {
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
    maxScore: { type: String },
  },
});

module.exports = mongoose.model('assessment', AssessmentSchema);
