const AssessmentTypeB = require('../../../models/Assessment_Model/AssessmentTypeB_Model');
const UploadTypeQuestion = require('../../../models/Questions_Model/UploadType_Question_Model');

module.exports = {
  getMyAssessmentTypeB: async (req, res, next) => {
    try {
      const id = req.params.id;
      const assessment = await AssessmentTypeB.findById(id).lean().exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },

  updateAssessmentTypeB: async (req, res, next) => {
    try {
      const id = req.params.id;

      if (!req.body) {
        return res.status(400).send('No Body Provided');
      }

      await AssessmentTypeB.updateOne({ _id: id }, req.body).exec();

      res.status(200).send('Assessment Updated Successfully');
    } catch (err) {
      return next(err);
    }
  },

  putQuestionsInAssessmentTypeB: async (req, res, next) => {
    try {
      const questions = req.body;
      const assessmentId = req.params.id;
      
      await UploadTypeQuestion.deleteMany({assessmentId});
      
      let questionsOrdering = [];
      for (let i = 0; i < questions.length; i++) {
        let {type, ...question} = questions[i];
        question = {assessmentId, ...question};

        if (type == 'upload') {
          const savedQuestion = new UploadTypeQuestion(question);
          await savedQuestion.save();
          questionsOrdering.push({"questionId": savedQuestion.id});
        }
      }

      await AssessmentTypeB.updateOne({assessmentId}, {$set: {"sequenceNumber": questionsOrdering}}).exec();
      
      res.status(201).send('Questions Added Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
