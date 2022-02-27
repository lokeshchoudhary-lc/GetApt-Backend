const mongoose = require('mongoose');

const AssessmentTypeBSchema = new mongoose.Schema({
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
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AssessmentTypeBSchema);
