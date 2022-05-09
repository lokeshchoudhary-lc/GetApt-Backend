const mongoose = require('mongoose');

const PassageTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  problemStatement: {
    type: String,
  },
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
        ],
        default: '',
      },
    },
  ],
});

module.exports = mongoose.model(
  'passage_type_question',
  PassageTypeQuestionSchema
);
