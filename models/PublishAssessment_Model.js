const mongoose = require('mongoose');
const PublishAssessment = new mongoose.Schema({
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
  isActive: {
    type: Boolean,
    default: false,
  },
  isOver: {
    type: Boolean,
    default: false,
  },
  dateTimeTypeA: {
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
  },
  dateTimeTypeB: {
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
  },
  fromCompany: { type: mongoose.Schema.Types.ObjectId },
  publishedBy: {
    publishedById: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
  },
  publishedAssessmentTypeA_Id: { type: mongoose.Schema.Types.ObjectId },
  publishedAssessmentTypeB_Id: { type: mongoose.Schema.Types.ObjectId },
});
module.exports = mongoose.model('publish_assessment', PublishAssessment);
