const mongoose = require('mongoose');

const AnswerSheetTypeBSchema = new mongoose.Schema({
  sequenceNumber: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      questionType: {
        type: String,
        default: 'upload',
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
    },
  ],
});

module.exports = mongoose.model('answersheet_type_b', AnswerSheetTypeBSchema);
