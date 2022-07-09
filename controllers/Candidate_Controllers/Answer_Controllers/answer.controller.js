const IntegerTypeAnswer = require('../../../models/AnswerSheet_Model/IntegerType_AnswerSheet_Model');
const McqTypeAnswer = require('../../../models/AnswerSheet_Model/McqType_AnswerSheet_Model');
const MatchupTypeAnswer = require('../../../models/AnswerSheet_Model/MatchupType_AnswerSheet_Model');
const SubjectiveTypeAnswer = require('../../../models/AnswerSheet_Model/SubjectiveType_AnswerSheet_Model');
const MultipleTypeAnswer = require('../../../models/AnswerSheet_Model/MultipleAnswerType_AnswerSheet_Model');
const UploadTypeAnswer = require('../../../models/AnswerSheet_Model/UploadType_AnswerSheet_Model');

module.exports = {
  getSingleAnswer: async (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    if (type == undefined) {
      return res.status(400).send('Invalid Request');
    }
    try {
      if (type === 'integer') {
        const answer = await IntegerTypeAnswer.findById(id).lean().exec();
        res.send(answer);
      }
      if (type === 'upload') {
        const answer = await UploadTypeAnswer.findById(id).lean().exec();
        res.send(answer);
      }
      if (type === 'subjective') {
        const answer = await SubjectiveTypeAnswer.findById(id).lean().exec();
        res.send(answer);
      }
      if (type === 'matchup') {
        const answer = await MatchupTypeAnswer.findById(id).lean().exec();
        res.send(answer);
      }
      if (type === 'multipleAnswer') {
        const answer = await MultipleTypeAnswer.findById(id).lean().exec();
        res.send(answer);
      }
      if (type === 'mcq') {
        const answer = await McqTypeAnswer.findById(id).lean().exec();
        res.send(answer);
      }
    } catch (err) {
      return next(err);
    }
  },
  updateSingleAnswer: async (req, res, next) => {
    const type = req.params.type;
    const id = req.body.id;
    const candidateId = req.cookies.candidateId;
    const answerSheetId = req.cookies.answerSheetId;

    if (
      type == undefined &&
      candidateId == undefined &&
      answerSheetId == undefined &&
      req.body.questionId == undefined &&
      req.body.candidateAnswer == undefined
    ) {
      return res.status(400).send('Invalid Request , Id not found');
    }

    req.body.candidateId = candidateId;
    req.body.answerSheetId = answerSheetId;

    try {
      if (type == 'upload') {
        //TODO: Upload of answer , pdf,ppt,img etc
        const answer = await UploadTypeAnswer.findOneAndUpdate(
          { candidateId: candidateId, questionId: questionId },
          req.body,
          {
            returnDocument: 'after',
            lean: true,
            upsert: true,
          }
        ).exec();
        res.status(200).send(answer);
      }
      if (type == 'matchup') {
        const answer = await MatchupTypeAnswer.findOneAndUpdate(
          { candidateId: candidateId, questionId: questionId },
          req.body,
          {
            returnDocument: 'after',
            lean: true,
            upsert: true,
          }
        ).exec();
        res.status(200).send(answer);
      }
      if (type == 'subjective') {
        const answer = await SubjectiveTypeAnswer.findOneAndUpdate(
          { candidateId: candidateId, questionId: questionId },
          req.body,
          {
            returnDocument: 'after',
            lean: true,
            upsert: true,
          }
        ).exec();
        res.status(200).send(answer);
      }
      if (type == 'multipleAnswer') {
        const answer = await MultipleTypeAnswer.findOneAndUpdate(
          { candidateId: candidateId, questionId: questionId },
          req.body,
          {
            returnDocument: 'after',
            lean: true,
            upsert: true,
          }
        ).exec();
        res.status(200).send(answer);
      }
      if (type == 'integer') {
        const answer = await IntegerTypeAnswer.findOneAndUpdate(
          { questionId: req.body.questionId, candidateId: candidateId },
          req.body,
          {
            returnDocument: 'after',
            lean: true,
            upsert: true,
          }
        ).exec();
        res.status(200).send(answer);
      }
      if (type == 'mcq') {
        const answer = await McqTypeAnswer.findOneAndUpdate(
          { questionId: req.body.questionId, candidateId: candidateId },
          req.body,
          {
            returnDocument: 'after',
            lean: true,
            upsert: true,
          }
        ).exec();
        res.status(200).send(answer);
      }
    } catch (err) {
      return next(err);
    }
  },

  updateAnswer: async (req, res, next) => {
    const answerSheetId = req.cookies.answerSheetId;
    const candidateId = req.cookies.candidateId;
    req.body.candidateId = candidateId;
    req.body.answerSheetId = answerSheetId;
    const id = req.params.id;
    const type = req.query.type;

    try {
      if (type == 'upload') {
        const question = await UploadTypeAnswerSheet.findByIdAndUpdate(
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
        const question = await IntegerTypeAnswerSheet.findByIdAndUpdate(
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
        const question = await SubjectiveTypeAnswerSheet.findByIdAndUpdate(
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
        const question = await McqTypeAnswerSheet.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).send(question);
      }
      if (type == 'matchup') {
        const question = await MatchupTypeAnswerSheet.findByIdAndUpdate(
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
        const question = await MultipleAnswerAnswerSheet.findByIdAndUpdate(
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
};
