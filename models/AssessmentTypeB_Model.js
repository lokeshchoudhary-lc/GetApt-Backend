const mongoose = require('mongoose');

const AssessmentTypeBSchema = new mongoose.Schema({
  AssessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'assessment',
  },
  StartAt: {
    type: String,
  },
  EndAt: {
    type: String,
  },
  Question: [
    {
      ProblemStatement: String,
      Score: String,
      Attachment: String,
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AssessmentTypeBSchema);
