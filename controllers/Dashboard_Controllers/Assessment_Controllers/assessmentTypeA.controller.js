const AssessmentTypeA = require('../../../models/Assessment_Model/AssessmentTypeA_Model');
const IntegerTypeQuestion = require('../../../models/Questions_Model/IntegerType_Question_Model');
const McqTypeQuestion = require('../../../models/Questions_Model/McqType_Question_Model');
const MatchupTypeQuestion = require('../../../models/Questions_Model/MatchupType_Question_Model');
const MultipleAnswerTypeQuestion = require('../../../models/Questions_Model/MultipleAnswerType_Question_Model');
const PassageTypeQuestion = require('../../../models/Questions_Model/PassageType_Question_Model');
const SubjectiveTypeQuestion = require('../../../models/Questions_Model/SubjectiveType_Question_Model');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  getMyAssessmentTypeA: async (req, res, next) => {
    try {
      const id = req.params.id;
      const assessment = await AssessmentTypeA.findById(id).lean().exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  updateAssessmentTypeA: async (req, res, next) => {
    try {
      const id = req.params.id;

      if (!req.body) {
        return res.status(400).send('No Body Provided');
      }

      await AssessmentTypeA.updateOne({ _id: id }, req.body).exec();

      res.status(200).send('Assessment Updated Successfully');
    } catch (err) {
      return next(err);
    }
  },
  
  putQuestionsInAssessmentTypeA: async (req, res, next) => {
    try {
      const questions = req.body;
      const assessmentId = req.params.id;
      
      await IntegerTypeQuestion.deleteMany({assessmentId});
      await SubjectiveTypeQuestion.deleteMany({assessmentId});
      await PassageTypeQuestion.deleteMany({assessmentId});
      await McqTypeQuestion.deleteMany({assessmentId});
      await MatchupTypeQuestion.deleteMany({assessmentId});
      await MultipleAnswerTypeQuestion.deleteMany({assessmentId});

      let questionsOrdering = [];
      for (let i = 0; i < questions.length; i++) {
        let {type, ...question} = questions[i];
        question = {assessmentId, ...question};

        if (type == 'integer') {
          const savedQuestion = new IntegerTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
        if (type == 'subjective') {
          const savedQuestion = new SubjectiveTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
        if (type == 'passage') {
          const savedQuestion = new PassageTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
        if (type == 'mcq') {
          const savedQuestion = new McqTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
        if (type == 'matchup') {
          const savedQuestion = new MatchupTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
        if (type == 'multipleAnswer') {
          const savedQuestion = new MultipleAnswerTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
      }

      await AssessmentTypeA.updateOne({assessmentId}, {$set: {"sequenceNumber": questionsOrdering}}).exec();
      
      res.status(201).send('Questions Added Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
