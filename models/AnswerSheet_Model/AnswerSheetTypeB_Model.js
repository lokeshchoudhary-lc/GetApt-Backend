const mongoose = require('mongoose');

const AnswerSheetTypeBSchema = new mongoose.Schema({
  answer: [
    {
      problemStatement: {
        type: mongoose.Schema.Types.ObjectId,
      },
      scoreOfQuestion: {
        type: String,
      },
      attachment: {
        type: String,
      },
      candidateAnswer: {
        type: String,
      },
      givenScore: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('answersheet_type_b', AnswerSheetTypeBSchema);
