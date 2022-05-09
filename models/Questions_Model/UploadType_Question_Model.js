const mongoose = require('mongoose');

const UploadTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  problemStatement: {
    type: String,
  },
  scoreOfQuestion: {
    type: String,
  },

  uploadedAttachment: [String],
  urlAttachment: [String],
});

module.exports = mongoose.model(
  'upload_type_question',
  UploadTypeQuestionSchema
);
