const mongoose = require('mongoose');

const IntegerType = new mongoose.Schema(
  {
    candidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const Subjective = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    scoreOfQuestion: {
      type: String,
    },
    candidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const Matchups = new mongoose.Schema(
  {
    columnA: [String],
    columnB: [String],
    answer: [String],
    scoreOfQuestion: {
      type: String,
    },
    candidateAnswer: [
      {
        type: String,
      },
    ],
  },
  { _id: false }
);

const MultipleAnswer = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    options: [
      {
        type: String,
      },
    ],
    answer: [String],
    scoreOfQuestion: {
      type: String,
    },
    candidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const MCQ = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    options: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
    },
    scoreOfQuestion: {
      type: String,
    },
    candidateAnswer: {
      type: String,
    },
  },
  { _id: false }
);

const AnswerSheetTypeASchema = new mongoose.Schema({
  duration: {
    type: String,
  },
  startAt: {
    type: String,
  },
  endAt: {
    type: String,
  },
  mcq: [MCQ],
  multipleAnswer: [MultipleAnswer],
  matchups: [Matchups],
  subjective: [Subjective],
  integerType: [IntegerType],
  passage: [
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
