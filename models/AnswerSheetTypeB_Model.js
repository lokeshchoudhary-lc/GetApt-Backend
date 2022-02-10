const mongoose = require('mongoose');

const AnswerSheetTypeBSchema = new mongoose.Schema({
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
      candidateAnswer: {
        type: String,
      },
      givenScore: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AnswerSheetTypeBSchema);
