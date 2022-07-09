const { verifyAssessmentLink } = require('../../utils/jwt_helper');
const Company = require('../../models/Company_Model');
const Candidate = require('../../models/Candidate_Model/Candidate_Model');
const Assessment = require('../../models/Assessment_Model/Assessment_Model');
const Feedback = require('../../models/Feedback_Model');
const AnswerSheet = require('../../models/AnswerSheet_Model/AnswerSheet_Model');
const AnswerSheetTypeA = require('../../models/AnswerSheet_Model/AnswerSheetTypeA_Model');
const AnswerSheetTypeB = require('../../models/AnswerSheet_Model/AnswerSheetTypeB_Model');
const CandidateAssessmentState = require('../../models/Candidate_Model/CandidateAssessmentState_Model');
const IntegerTypeQuestion = require('../../models/Questions_Model/IntegerType_Question_Model');
const McqTypeQuestion = require('../../models/Questions_Model/McqType_Question_Model');
const MatchupTypeQuestion = require('../../models/Questions_Model/MatchupType_Question_Model');
const MultipleAnswerTypeQuestion = require('../../models/Questions_Model/MultipleAnswerType_Question_Model');
const IntegerTypeAnswer = require('../../models/AnswerSheet_Model/IntegerType_AnswerSheet_Model');
const McqTypeAnswer = require('../../models/AnswerSheet_Model/McqType_AnswerSheet_Model');
const MatchupTypeAnswer = require('../../models/AnswerSheet_Model/MatchupType_AnswerSheet_Model');
const MultipleAnswerTypeAnswer = require('../../models/AnswerSheet_Model/MultipleAnswerType_AnswerSheet_Model');

const setCookieData = (data) => {
  res.cookie('candidateId', data.candidateId, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
  res.cookie('assessmentId', data.assessmentId, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
  res.cookie('answerSheetId', data.answerSheetId, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
  res.cookie('answerSheetTypeA_Id', data.answerSheetTypeA_Id, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
  res.cookie('answerSheetTypeB_Id', data.answerSheetTypeB_Id, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
  res.cookie('assessmentTypeA_Id', data.assessmentTypeA_Id, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
  res.cookie('assessmentTypeB_Id', data.assessmentTypeB_Id, {
    sameSite: 'strict',
    // secure: true, IN Https only
    httpOnly: true,
    maxAge: 2592000,
  });
};

module.exports = {
  getLinkInfo: async (req, res, next) => {
    try {
      const link = req.params.link;
      const { assessmentId, email } = await verifyAssessmentLink(link);

      const candidate = await Candidate.find({ email: email }).lean().exec();

      if (!candidate) {
        return res.json({
          candidateProfile: false,
        });
      } else {
        const assessment = await Assessment.findById(assessmentId)
          .lean()
          .exec();

        if (assessment.disabled === true) {
          return res.json({ assessmentDisabled: true });
        }

        const { assessmentTypeA_Id, assessmentTypeB_Id, fromCompany } =
          assessment;

        const company = await Company.findById(fromCompany).lean().exec();
        if (company) {
          assessment.companyLogo = company.logo;
        }

        const assessmentState = await CandidateAssessmentState.find({
          assessmentId: assessment._id,
          candidateId: candidate._id,
        });

        if (!assessmentState) {
          const answerSheetData = {
            fromAssessment: assessment._id,
            candidate: {
              candidateId: candidate._id,
              name: candidate.name,
              email: candidate.email,
              contact: candidate.contact,
            },
          };

          if (assessmentTypeA_Id) {
            const answerSheetTypeA = new AnswerSheetTypeA();
            answerSheetData.answerSheetTypeA_Id = answerSheetTypeA.id;
            answerSheetTypeA.save();
          }
          if (assessmentTypeB_Id) {
            const answerSheetTypeB = new AnswerSheetTypeB();
            answerSheetData.answerSheetTypeB_Id = answerSheetTypeB.id;
            answerSheetTypeB.save();
          }

          const answerSheet = new AnswerSheet(answerSheetData);
          answerSheet.save();

          const candidateAssessmentState = new CandidateAssessmentState({
            assessmentId: assessment._id,
            candidateId: candidate._id,
            answerSheetId: answerSheet.id,
            answerSheetTypeB_Id: answerSheetData.answerSheetTypeB_Id,
            answerSheetTypeA_Id: answerSheetData.answerSheetTypeA_Id,
          });
          candidateAssessmentState.save();

          setCookieData({
            answerSheetId: answerSheet.id,
            answerSheetTypeB_Id: answerSheetData.answerSheetTypeB_Id,
            answerSheetTypeA_Id: answerSheetData.answerSheetTypeA_Id,
            assessmentTypeA_Id: assessment.assessmentTypeA_Id,
            assessmentTypeB_Id: assessment.assessmentTypeB_Id,
            candidateId: candidate._id,
            assessmentId: assessment._id,
          });
        } else {
          assessmentState.assessmentTypeA_Id = assessment.assessmentTypeA_Id;
          assessmentState.assessmentTypeB_Id = assessment.assessmentTypeB_Id;
          setCookieData(assessmentState);
        }

        delete assessment.fromCompany;
        delete assessment.createdBy;
        delete assessment.isDeleted;

        return res.json({
          candidateProfile: candidate,
          assessmentInfo: assessment,
        });
      }
    } catch (err) {
      return next(err);
    }
  },
  startAssessmentOfType: async (req, res, next) => {
    try {
      const type = req.query.type;
      const assessmentTypeA_Id = req.cookies.assessmentTypeA_Id;
      const assessmentTypeB_Id = req.cookies.assessmentTypeB_Id;
      if (type == undefined) {
        return res.status(400).send('Invalid Request');
      }

      if (type === 'a') {
        const assessment = await AssessmentTypeA.findById(assessmentTypeA_Id)
          .lean()
          .exec();
        res.status(200).send(assessment);
      }
      if (type === 'b') {
        const assessment = await AssessmentTypeB.findById(assessmentTypeB_Id)
          .lean()
          .exec();
        res.status(200).send(assessment);
      }
    } catch (err) {
      return next(err);
    }
  },
  getCandidateProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      const candidate = await Candidate.findById(id).lean().exec();
      if (!candidate) {
        return res.status(404).send('Candidate not found');
      }
      res.send(candidate);
    } catch (err) {
      return next(err);
    }
  },
  createCandidateProfile: async (req, res, next) => {
    try {
      const candidate = new Candidate(req.body);
      await candidate.save();
      //TODO:upload resume feature
      res.send('Candidate Profile Created Successfully');
    } catch (err) {
      return next(err);
    }
  },
  updateCandidateProfile: async (req, res, next) => {
    try {
      //TODO:upload resume feature
      const candidateId = req.cookies.candidateId;
      if (candidateId == undefined) {
        return res.status(400).send('Invalid Request, Id not found');
      }
      const candidate = await Candidate.findByIdAndUpdate(
        candidateId,
        req.body,
        {
          returnDocument: 'after',
          lean: true,
        }
      ).exec();

      res.send(candidate);
    } catch (err) {
      return next(err);
    }
  },

  candidateFeedback: async (req, res, next) => {
    try {
      const candidateId = req.cookies.candidateId;
      if (candidateId == undefined) {
        return res.status(400).send('Invalid Request, Id not found');
      }
      req.body.feedbackBy = candidateId;

      const { comment, rating, feedbackBy } = req.body;

      const feedback = new Feedback({
        feedbackBy: feedbackBy,
        comment: comment,
        rating: rating,
      });
      await feedback.save();
      res.send('Thankyou for feedback');
    } catch (err) {
      return next(err);
    }
  },
  getAnswerSheet: async (req, res, next) => {
    try {
      const type = req.query.type;
      if (type == undefined) {
        return res.status(400).send('Invalid Request');
      }
      if (type === 'a') {
        const answerSheetTypeA_Id = req.cookies.answerSheetTypeA_Id;
        const answerSheet = await AnswerSheetTypeA.findById(answerSheetTypeA_Id)
          .lean()
          .exec();
        res.send(answerSheet);
      }
      if (type === 'b') {
        const answerSheetTypeB_Id = req.cookies.answerSheetTypeB_Id;
        const answerSheet = await AnswerSheetTypeB.findById(answerSheetTypeB_Id)
          .lean()
          .exec();
        res.send(answerSheet);
      }
    } catch (err) {
      return next(err);
    }
  },
  updateAnswerSheet: async (req, res, next) => {
    try {
      const type = req.query.type;
      if (type == undefined) {
        return res.status(400).send('Invalid Request');
      }
      if (type === 'a') {
        const answerSheetTypeA_Id = req.cookies.answerSheetTypeA_Id;
        await AnswerSheetTypeA.updateOne(
          { _id: answerSheetTypeA_Id },
          req.body
        ).exec();
        res.send('AnswerSheet Updated Successfully');
      }
      if (type === 'b') {
        const answerSheetTypeB_Id = req.cookies.answerSheetTypeB_Id;
        await AnswerSheetTypeB.updateOne(
          { _id: answerSheetTypeB_Id },
          req.body
        ).exec();
        res.send('AnswerSheet Updated Successfully');
      }
    } catch (err) {
      return next(err);
    }
  },
  submitAndMarkAnswers: async (req, res, next) => {
    const type = req.query.type;
    const answerSheetId = req.cookies.answerSheetId;
    const assessmentId = req.cookies.assessmentId;
    if (
      assessmentId == undefined &&
      answerSheetId == undefined &&
      type == undefined
    ) {
      return res.status(400).send("Invalid Request, Id's not found");
    }
    try {
      if (type === 'b') {
        await AnswerSheet.updateOne(
          { _id: answerSheetId },
          { submittedTypeB: true }
        ).exec();
      }
      if (type === 'a') {
        let totalScore = 0;

        //Getting Questions
        const integerTypeQuestions = await IntegerTypeQuestion.find({
          assessmentId: assessmentId,
        })
          .lean()
          .exec();
        const mcqTypeQuestions = await McqTypeQuestion.find({
          assessmentId: assessmentId,
        })
          .lean()
          .exec();
        const matchupTypeQuestions = await MatchupTypeQuestion.find({
          assessmentId: assessmentId,
        })
          .lean()
          .exec();
        const multipleAnswerTypeQuestions =
          await MultipleAnswerTypeQuestion.find({
            assessmentId: assessmentId,
          })
            .lean()
            .exec();

        //Getting Answers
        const integerTypeAnswers = await IntegerTypeAnswer.find({
          answerSheeId: answerSheetId,
        })
          .lean()
          .exec();
        const mcqTypeAnswers = await McqTypeAnswer.find({
          answerSheeId: answerSheetId,
        })
          .lean()
          .exec();
        const matchupTypeAnswers = await MatchupTypeAnswer.find({
          answerSheeId: answerSheetId,
        })
          .lean()
          .exec();
        const multipleAnswerTypeAnswers = await MultipleAnswerTypeAnswer.find({
          answerSheeId: answerSheetId,
        })
          .lean()
          .exec();

        //Marking Integer Type answers

        for (let i in integerTypeQuestions) {
          for (let j in integerTypeAnswers) {
            if (
              integerTypeQuestions[i]._id === integerTypeAnswers[j].questionId
            ) {
              if (
                integerTypeQuestions[i].candidateAnswer ===
                integerTypeAnswers[j].answerKey
              ) {
                totalScore =
                  totalScore +
                  integerTypeQuestions[i].scoreOfQuestion.correctMarking;
              } else {
                totalScore =
                  totalScore -
                  integerTypeQuestions[i].scoreOfQuestion.wrongMarking;
              }
            }
          }
        }

        //Marking Mcq Type answers

        for (let i in mcqTypeQuestions) {
          for (let j in mcqTypeAnswers) {
            if (mcqTypeQuestions[i]._id === mcqTypeAnswers[j].questionId) {
              if (
                mcqTypeQuestions[i].answerKey ===
                mcqTypeAnswers[j].candidateAnswer
              ) {
                totalScore =
                  totalScore +
                  mcqTypeQuestions[i].scoreOfQuestion.correctMarking;
              } else {
                totalScore =
                  totalScore - mcqTypeQuestions[i].scoreOfQuestion.wrongMarking;
              }
            }
          }
        }

        //Marking Matchup Type answers
        //works for the case when in format
        //answerKey:['1a','2b','3c','4d'] && candidateAnswer:['1a','2b','3d']

        for (let i in matchupTypeQuestions) {
          for (let j in matchupTypeAnswers) {
            if (
              matchupTypeQuestions[i]._id === matchupTypeAnswers[j].questionId
            ) {
              matchupTypeQuestions[i].answerKey.forEach((key) => {
                if (matchupTypeAnswers[j].candidateAnswer.includes(key)) {
                  totalScore =
                    totalScore +
                    matchupTypeQuestions[i].scoreOfQuestion.correctMarking;
                } else {
                  totalScore =
                    totalScore -
                    matchupTypeQuestions[i].scoreOfQuestion.wrongMarking;
                }
              });
            }
          }
        }

        //Marking Multiple Type answers

        for (let i in multipleAnswerTypeQuestions) {
          for (let j in multipleAnswerTypeAnswers) {
            if (
              multipleAnswerTypeQuestions[i]._id ===
              multipleAnswerTypeAnswers[j].questionId
            ) {
              multipleAnswerTypeQuestions[i].answerKey.forEach((key) => {
                if (
                  multipleAnswerTypeAnswers[j].candidateAnswer.includes(key)
                ) {
                  totalScore =
                    totalScore +
                    multipleAnswerTypeQuestions[i].scoreOfQuestion
                      .correctMarking;
                } else {
                  totalScore =
                    totalScore -
                    multipleAnswerTypeQuestions[i].scoreOfQuestion.wrongMarking;
                }
              });
            }
          }
        }
        await AnswerSheet.updateOne(
          { _id: answerSheetId },
          { submittedTypeA: true, totalComputedScore: totalScore }
        ).exec();
      }
      res.send('OK');
    } catch (err) {
      return next(err);
    }
  },
};
