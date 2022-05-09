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
      type: String,
    },
    wrongMarking: {
      type: String,
    },
  },
});

module.exports = mongoose.model(
  'matchup_type_question',
  MatchupTypeQuestionSchema
);
