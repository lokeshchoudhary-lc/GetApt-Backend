const mongoose = require('mongoose');

const AnswerSheetTypeBSchema = new mongoose.Schema({
  StartAt: {
    type: String,
  },
  EndAt: {
    type: String,
  },
  Question: [
    {
      ProblemStatement: {
        type: String,
      },
      ScoreOfQuestion: {
        type: String,
      },
      Attachment: {
        type: String,
      },
      CandidateAnswer: {
        type: String,
      },
      GivenScore: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('assessment_type_b', AnswerSheetTypeBSchema);
