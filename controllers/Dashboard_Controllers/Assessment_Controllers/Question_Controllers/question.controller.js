const IntegerTypeQuestion = require('../../../../models/Questions_Model/IntegerType_Question_Model');
const McqTypeQuestion = require('../../../../models/Questions_Model/McqType_Question_Model');
const MatchupTypeQuestion = require('../../../../models/Questions_Model/MatchupType_Question_Model');
const MultipleAnswerTypeQuestion = require('../../../../models/Questions_Model/MultipleAnswerType_Question_Model');
const PassageTypeQuestion = require('../../../../models/Questions_Model/PassageType_Question_Model');
const SubjectiveTypeQuestion = require('../../../../models/Questions_Model/SubjectiveType_Question_Model');
const UploadTypeQuestion = require('../../../../models/Questions_Model/UploadType_Question_Model');
const IntegerTypeAnswerSheet = require('../../../../models/AnswerSheet_Model/IntegerType_AnswerSheet_Model');
const McqTypeAnswerSheet = require('../../../../models/AnswerSheet_Model/McqType_AnswerSheet_Model');
const MatchupTypeAnswerSheet = require('../../../../models/AnswerSheet_Model/MatchupType_AnswerSheet_Model');
const MultipleAnswerTypeAnswerSheet = require('../../../../models/AnswerSheet_Model/MultipleAnswerType_AnswerSheet_Model');
const SubjectiveTypeAnswerSheet = require('../../../../models/AnswerSheet_Model/SubjectiveType_AnswerSheet_Model');
const UploadTypeAnswerSheet = require('../../../../models/AnswerSheet_Model/UploadType_AnswerSheet_Model');

module.exports = {
  addSingleQuestion: async (req, res, next) => {
    try {
      const type = req.query.type;

      if (type == 'upload') {
        const question = new UploadTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
      if (type == 'integer') {
        const question = new IntegerTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
      if (type == 'subjective') {
        const question = new SubjectiveTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
      if (type == 'passage') {
        const question = new PassageTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
      if (type == 'mcq') {
        const question = new McqTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
      if (type == 'matchup') {
        const question = new MatchupTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
      if (type == 'multipleAnswer') {
        const question = new MultipleAnswerTypeQuestion(req.body);
        await question.save();
        res.status(200).json({
          message: 'Question Added Successfully',
          questionId: question.id,
        });
      }
    } catch (err) {
      return next(err);
    }
  },
  getSingleQuestion: async (req, res, next) => {
    try {
      const id = req.params.id;
      const type = req.query.type;

      if (type == 'upload') {
        const question = await UploadTypeQuestion.findById(id).lean().exec();
        res.status(200).send(question);
      }
      if (type == 'integer') {
        const question = await IntegerTypeQuestion.findById(id).lean().exec();
        res.status(200).send(question);
      }
      if (type == 'subjective') {
        const question = await SubjectiveTypeQuestion.findById(id)
          .lean()
          .exec();
        res.status(200).send(question);
      }
      if (type == 'passage') {
        const question = await PassageTypeQuestion.findById(id).lean().exec();
        res.status(200).send(question);
      }
      if (type == 'mcq') {
        const question = await McqTypeQuestion.findById(id).lean().exec();
        res.status(200).send(question);
      }
      if (type == 'matchup') {
        const question = await MatchupTypeQuestion.findById(id).lean().exec();
        res.status(200).send(question);
      }
      if (type == 'multipleAnswer') {
        const question = await MultipleAnswerTypeQuestion.findById(id)
          .lean()
          .exec();
        res.status(200).send(question);
      }
    } catch (err) {
      return next(err);
    }
  },
  updateSingleQuestion: async (req, res, next) => {
    try {
      const id = req.params.id;
      const type = req.query.type;
      //TODO:change findByIdAndUpdate to updateOne?|for testing now| // can be changed in production
      if (type == 'upload') {
        const question = await UploadTypeQuestion.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
      if (type == 'integer') {
        const question = await IntegerTypeQuestion.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
      if (type == 'subjective') {
        const question = await SubjectiveTypeQuestion.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
      if (type == 'passage') {
        const question = await PassageTypeQuestion.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
      if (type == 'mcq') {
        const question = await McqTypeQuestion.findByIdAndUpdate(id, req.body, {
          returnDocument: 'after',
          lean: true,
        }).exec();
        res.status(200).send(question);
      }
      if (type == 'matchup') {
        const question = await MatchupTypeQuestion.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
      if (type == 'multipleAnswer') {
        const question = await MultipleAnswerTypeQuestion.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
    } catch (err) {
      return next(err);
    }
  },
  deleteSingleQuestion: async (req, res, next) => {
    try {
      const id = req.params.id;
      const type = req.query.type;

      if (type == 'upload') {
        await UploadTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
      if (type == 'integer') {
        await IntegerTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
      if (type == 'subjective') {
        await SubjectiveTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
      if (type == 'passage') {
        await PassageTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
      if (type == 'mcq') {
        await McqTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
      if (type == 'matchup') {
        await MatchupTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
      if (type == 'multipleAnswer') {
        await MultipleAnswerTypeQuestion.findByIdAndDelete(id).exec();
        res.status(200).send('Question Deleted Successfully');
      }
    } catch (err) {
      return next(err);
    }
  },
};
