const mongoose = require('mongoose');

const MatchupTypeQuestionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  question: {
    type: String,
  },
  columnA: [String],
  columnB: [String],
  answerKey: [String],
  scoreOfQuestion: {
    correctMarking: {
      type: Number,
      default: '0',
    },
    wrongMarking: {
      type: Number,
      default: '0',
    },
  },
});

module.exports = mongoose.model(
  'matchup_type_question',
  MatchupTypeQuestionSchema
);
