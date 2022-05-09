const mongoose = require('mongoose');

const AssessmentTypeASchema = new mongoose.Schema({
  instructions: { type: String },
  sequenceNumber: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      questionType: {
        type: String,
        enum: [
          '',
          'mcq',
          'multipleAnswer',
          'matchups',
          'subjective',
          'integerType',
          'passage',
        ],
        default: '',
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_a', AssessmentTypeASchema);
