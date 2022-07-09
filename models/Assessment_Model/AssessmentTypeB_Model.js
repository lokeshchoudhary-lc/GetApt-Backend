const mongoose = require('mongoose');

const AssessmentTypeBSchema = new mongoose.Schema({
  sequenceNumber: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      questionType: {
        type: String,
        default: 'upload',
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AssessmentTypeBSchema);
