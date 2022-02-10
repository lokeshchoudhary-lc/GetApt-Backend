const mongoose = require('mongoose');

const AssessmentTypeBSchema = new mongoose.Schema({
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  startAt: {
    type: String,
  },
  endAt: {
    type: String,
  },
  question: [
    {
      problemStatement: {
        type: String,
      },
      scoreOfQuestion: {
        type: String,
      },
      attachment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AssessmentTypeBSchema);
