const mongoose = require('mongoose');

const IntegerType = new mongoose.Schema(
  {
    Question: {
      type: String,
    },
    Answer: {
      type: String,
    },
    ScoreOfQuestion: {
      type: String,
    },
    CandidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const Subjective = new mongoose.Schema(
  {
    Question: {
      type: String,
    },
    Answer: {
      type: String,
    },
    ScoreOfQuestion: {
      type: String,
    },
    CandidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const Matchups = new mongoose.Schema(
  {
    ColumnA: [String],
    ColumnB: [String],
    Answer: [String],
    ScoreOfQuestion: {
      type: String,
    },
    CandidateAnswer: [
      {
        type: String,
      },
    ],
  },
  { _id: false }
);

const MultipleAnswer = new mongoose.Schema(
  {
    Question: {
      type: String,
    },
    OptionA: {
      type: String,
    },
    OptionB: {
      type: String,
    },
    OptionC: {
      type: String,
    },
    OptionD: {
      type: String,
    },
    Answer: [String],
    ScoreOfQuestion: {
      type: String,
    },
    CandidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const MCQ = new mongoose.Schema(
  {
    Question: {
      type: String,
    },
    OptionA: {
      type: String,
    },
    OptionB: {
      type: String,
    },
    OptionC: {
      type: String,
    },
    OptionD: {
      type: String,
    },
    Answer: {
      type: String,
    },
    ScoreOfQuestion: {
      type: String,
    },
    CandidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const AnswerSheetTypeASchema = new mongoose.Schema({
  Duration: {
    type: String,
  },
  StartAt: {
    type: String,
  },
  EndAt: {
    type: String,
  },
  MCQ: [MCQ],
  MultipleAnswer: [MultipleAnswer],
  Matchups: [Matchups],
  Subjective: [Subjective],
  IntegerType: [IntegerType],
  Passage: [
    {
      MCQ,
      IntegerType,
      MultipleAnswer,
      Subjective,
      Matchups,
    },
  ],
});
module.exports = mongoose.model('answersheet_type_a', AnswerSheetTypeASchema);
