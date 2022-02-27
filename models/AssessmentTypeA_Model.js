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
  },
  { _id: false }
);

const Subjective = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    scoreOfQuestion: {
      type: String,
    },
  },
  { _id: false }
);

const Matchups = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    columnA: [String],
    columnB: [String],
    answer: [String],
    scoreOfQuestion: {
      correctMarking: {
        type: String,
      },
      wrongMarking: {
        type: String,
      },
    },
  },
  { _id: false }
);

const MultipleAnswer = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    options: [String],
    answer: [String],
    scoreOfQuestion: {
      correctMarking: {
        type: String,
      },
      wrongMarking: {
        type: String,
      },
    },
  },
  { _id: false }
);

const MCQ = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    options: [String],
    answer: {
      type: String,
    },
    scoreOfQuestion: {
      correctMarking: {
        type: String,
      },
      wrongMarking: {
        type: String,
      },
    },
  },
  { _id: false }
);

const Passage = new mongoose.Schema(
  {
    problemStatement: {
      type: String,
    },
    question: {
      mcq: [MCQ],
      multipleAnswer: [MultipleAnswer],
      matchups: [Matchups],
      subjective: [Subjective],
      integerType: [IntegerType],
    },
  },
  { _id: false }
);

const AssessmentTypeASchema = new mongoose.Schema({
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
  passage: [Passage],
});

module.exports = mongoose.model('assessment_type_a', AssessmentTypeASchema);
