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
          'matchup',
          'subjective',
          'integer',
          'passage',
        ],
        default: '',
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_a', AssessmentTypeASchema);
