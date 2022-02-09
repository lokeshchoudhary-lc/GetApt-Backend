const mongoose = require('mongoose');

const AssessmentTypeBSchema = new mongoose.Schema({
  AssessmentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  StartAt: {
    type: String,
  },
  EndAt: {
    type: String,
  },
  Question: [
    {
      ProblemStatement: {
        type: String,
      },
      ScoreOfQuestion: {
        type: String,
      },
      Attachment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AssessmentTypeBSchema);
