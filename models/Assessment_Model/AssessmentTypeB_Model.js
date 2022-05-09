const mongoose = require('mongoose');

const AssessmentTypeBSchema = new mongoose.Schema({
  sequenceNumber: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AssessmentTypeBSchema);
