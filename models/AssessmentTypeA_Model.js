const mongoose = require('mongoose');

const IntegerType = {
  Question: {
    type: String,
  },
  Answer: {
    type: String,
  },
};

const Subjective = {
  Question: {
    type: String,
  },
  Answer: {
    type: String,
  },
};

const Matchups = {
  ColumnA: [String],
  ColumnB: [String],
  Answer: [String],
};

const MultipleAnswer = {
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
};

const MCQ = {
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
};

const AssessmentTypeASchema = new mongoose.Schema({
  AssessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'assessment',
  },
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
  Passage: [mongoose.Schema.Types.ObjectId],
});
module.exports = mongoose.model('assessment_type_a', AssessmentTypeASchema);
