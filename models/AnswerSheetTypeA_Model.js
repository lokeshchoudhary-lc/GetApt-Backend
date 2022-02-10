const mongoose = require('mongoose');

const IntegerType = new mongoose.Schema(
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
    optionA: {
      type: String,
    },
    optionB: {
      type: String,
    },
    optionC: {
      type: String,
    },
    optionD: {
      type: String,
    },
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
    optionA: {
      type: String,
    },
    optionB: {
      type: String,
    },
    optionC: {
      type: String,
    },
    optionD: {
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
