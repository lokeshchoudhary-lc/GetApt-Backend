const mongoose = require('mongoose');

const AnswerSheetTypeASchema = new mongoose.Schema({
  sequenceNumber: [
    {
      answerId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      isFlagged: {
        type: Boolean,
      },
      isAnswered: {
        type: Boolean,
      },
      isAttempted: {
        type: Boolean,
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

module.exports = mongoose.model('answersheet_type_a', AnswerSheetTypeASchema);
