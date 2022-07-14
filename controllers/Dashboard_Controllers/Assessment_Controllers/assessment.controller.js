const Assessment = require('../../../models/Assessment_Model/Assessment_Model');
const Company = require('../../../models/Company_Model');
const AnswerSheet = require('../../../models/AnswerSheet_Model/AnswerSheet_Model');
const AssessmentTypeA = require('../../../models/Assessment_Model/AssessmentTypeA_Model');
const AssessmentTypeB = require('../../../models/Assessment_Model/AssessmentTypeB_Model');
const IntegerTypeQuestion = require('../../../models/Questions_Model/IntegerType_Question_Model');
const McqTypeQuestion = require('../../../models/Questions_Model/McqType_Question_Model');
const MatchupTypeQuestion = require('../../../models/Questions_Model/MatchupType_Question_Model');
const MultipleAnswerTypeQuestion = require('../../../models/Questions_Model/MultipleAnswerType_Question_Model');
const PassageTypeQuestion = require('../../../models/Questions_Model/PassageType_Question_Model');
const SubjectiveTypeQuestion = require('../../../models/Questions_Model/SubjectiveType_Question_Model');
const UploadTypeQuestion = require('../../../models/Questions_Model/UploadType_Question_Model');

module.exports = {
  getCompanyAssessment: async (req, res, next) => {
    try {
      const { companyId } = req.payload;
      const assessment = await Assessment.find({
        fromCompany: companyId,
        isDeleted: false,
      })
        .select({ isDeleted: 0 })
        .lean()
        .exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  getMyAssessment: async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const assessment = await Assessment.find({
        'createdBy.createdById': user_id,
        isDeleted: false,
      })
        .select({ isDeleted: 0 })
        .lean()
        .exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  getSingleAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const assessment = await Assessment.findById(id)
        .select({ isDeleted: 0 })
        .lean()
        .exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  candidateResponse: async (req, res, next) => {
    const id = req.params.id;
    try {
      const responses = await AnswerSheet.find({ fromAssessment: id }).select({
        candidate: 1,
      });
      res.send(responses);
    } catch (err) {
      return next(err);
    }
  },
  candidateResult: async (req, res, next) => {
    const id = req.params.id;
    try {
      const responses = await AnswerSheet.find({ fromAssessment: id }).select({
        candidate: 1,
        totalComputedScore: 1,
      });
      res.send(responses);
    } catch (err) {
      return next(err);
    }
  },
  preview: async (req, res, next) => {
    try {
      const companyId = req.payload.companyId;
      const id = req.params.id;

      const assessment = await Assessment.findById(id)
        .select({ isDeleted: 0 })
        .lean()
        .exec();
      const company = await Company.findById(companyId).lean().exec();
      if (company) {
        assessment.companyLogo = company.logo;
      }
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  // shareAssessmentInCompany: async (req, res, next) => {
  //   try {
  //     if (!companyId) {
  //       return res.status(409).send('Action Not Allowed');
  //     }
  //     const { assessmentId, sendTo } = req.body;
  //     send email
  //   } catch (err) {
  //     return next(err);
  //   }
  // },
  mergeAssessment: async (req, res, next) => {
    //not yet a feature , it is extra
    const newQuestionTemplateA = async (id, newAssessmentId) => {
      const oldMcqTypeQuestion = await McqTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldMcqTypeQuestion) {
        oldMcqTypeQuestion.forEach((element) => {
          delete element.oldMcqTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newMcqType = new McqTypeQuestion(oldMcqTypeQuestion);
        await newMcqType.save();
      }

      const oldIntegerTypeQuestion = await IntegerTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldIntegerTypeQuestion) {
        oldIntegerTypeQuestion.forEach((element) => {
          delete element.oldIntegerTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newIntegerType = new IntegerTypeQuestion(oldIntegerTypeQuestion);
        await newIntegerType.save();
      }

      const oldMatchupTypeQuestion = await MatchupTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldMatchupTypeQuestion) {
        oldMatchupTypeQuestion.forEach((element) => {
          delete element.oldMatchupTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newMatchupType = new MatchupTypeQuestion(oldMatchupTypeQuestion);
        await newMatchupType.save();
      }

      const oldMultipleAnswerTypeQuestion =
        await MultipleAnswerTypeQuestion.find({
          assessmentId: id,
        })
          .lean()
          .exec();

      if (oldMultipleAnswerTypeQuestion) {
        oldMultipleAnswerTypeQuestion.forEach((element) => {
          delete element.oldMultipleAnswerTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newMultipleAnswerType = new MultipleAnswerTypeQuestion(
          oldMultipleAnswerTypeQuestion
        );
        await newMultipleAnswerType.save();
      }

      const oldPassageTypeQuestion = await PassageTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldPassageTypeQuestion) {
        oldPassageTypeQuestion.forEach((element) => {
          delete element.oldPassageTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newPassageTypeQuestion = new PassageTypeQuestion(
          oldPassageTypeQuestion
        );
        await newPassageTypeQuestion.save();
      }

      const oldSubjectiveTypeQuestion = await SubjectiveTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldSubjectiveTypeQuestion) {
        oldSubjectiveTypeQuestion.forEach((element) => {
          delete element.oldSubjectiveTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newSubjectiveTypeQuestion = new SubjectiveTypeQuestion(
          oldSubjectiveTypeQuestion
        );
        await newSubjectiveTypeQuestion.save();
      }
    };
    const newQuestionTemplateB = async (id, newAssessmentId) => {
      const oldUploadTypeQuestion = await UploadTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      oldUploadTypeQuestion.forEach((element) => {
        delete element.oldUploadTypeQuestion._id;
        element.assessmentId = newAssessmentId;
      });

      const newUploadType = new UploadTypeQuestion(oldUploadTypeQuestion);
      await newUploadType.save();
    };
    try {
      const firstId = req.query.firstId;
      const secondId = req.query.secondId;

      if (firstId == secondId) {
        return res.status(400).send('Both Assessment id cannot be same');
      }

      if (
        req.body.title == undefined &&
        req.body.description == undefined &&
        req.body.forRole == undefined &&
        req.body.workExperience == undefined
      ) {
        return res.status(400).send('Assessment details must be provided');
      }

      if (!firstId && !secondId) {
        return res
          .status(400)
          .send('Assessment id of both types must be provided');
      }

      const { user_id, companyId, name } = req.payload;

      if (!companyId) {
        req.body.fromCompany = user_id;
      } else {
        req.body.fromCompany = companyId;
      }

      req.body.type = '3';
      req.body.createdById = { createdByIdId: user_id, name: name };

      const assessmentOne = await Assessment.findById(firstId);
      const assessmentTwo = await Assessment.findById(secondId);
      let typeA_Id = '';
      let typeB_Id = '';
      if (assessmentOne.type === '3') {
        return res
          .status(400)
          .send('Assessment of both types cannot be merged together');
      }
      if (assessmentTwo.type === '3') {
        return res
          .status(400)
          .send('Assessment of both types cannot be merged together');
      }
      if (assessmentOne.type === '1') {
        typeA_Id = firstId;
      } else {
        typeB_Id = secondId;
      }
      if (assessmentTwo.type === '1') {
        typeA_Id = firstId;
      } else {
        typeB_Id = secondId;
      }

      const oldAssessmentTypeA = await AssessmentTypeA.findById(typeA_Id)
        .lean()
        .exec();
      delete oldAssessmentTypeA._id;
      const newAssessmentTypeA = new AssessmentTypeA(oldAssessmentTypeA);

      await newQuestionTemplateA(typeA_Id, newAssessmentTypeA.id);

      req.body.assessmentTypeA_Id = newAssessmentTypeA.id;

      req.body.assessmentTypeA_Data = {
        duration: assessmentOne.assessmentTypeA_Data.duration,
        maxScore: assessmentOne.assessmentTypeA_Data.maxScore,
        numberOfQuestion: assessmentOne.assessmentTypeA_Data.numberOfQuestion,
      };

      const oldAssessmentTypeB = await AssessmentTypeB.findById(typeB_Id)
        .lean()
        .exec();
      delete oldAssessmentTypeB._id;
      const newAssessmentTypeB = new AssessmentTypeB(oldAssessmentTypeB);

      await newQuestionTemplateB(typeB_Id, newAssessmentTypeB.id);

      req.body.assessmentTypeB_Id = newAssessmentTypeB.id;

      req.body.assessmentTypeB_Data = {
        maxScore: assessmentTwo.assessmentTypeB_Data.maxScore,
        numberOfQuestion: assessmentTwo.assessmentTypeB_Data.numberOfQuestion,
      };

      const newAssessment = new Assessment(req.body);
      await newAssessmentTypeA.save();
      await newAssessmentTypeB.save();
      await newAssessment.save();

      res.status(200).json({ message: 'Assessment Successfully Created' });
    } catch (err) {
      return next(err);
    }
  },
  useTemplate: async (req, res, next) => {
    const newQuestionTemplateA = async (id, newAssessmentId) => {
      const oldMcqTypeQuestion = await McqTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldMcqTypeQuestion) {
        oldMcqTypeQuestion.forEach((element) => {
          delete element.oldMcqTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newMcqType = new McqTypeQuestion(oldMcqTypeQuestion);
        await newMcqType.save();
      }

      const oldIntegerTypeQuestion = await IntegerTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldIntegerTypeQuestion) {
        oldIntegerTypeQuestion.forEach((element) => {
          delete element.oldIntegerTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newIntegerType = new IntegerTypeQuestion(oldIntegerTypeQuestion);
        await newIntegerType.save();
      }

      const oldMatchupTypeQuestion = await MatchupTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldMatchupTypeQuestion) {
        oldMatchupTypeQuestion.forEach((element) => {
          delete element.oldMatchupTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newMatchupType = new MatchupTypeQuestion(oldMatchupTypeQuestion);
        await newMatchupType.save();
      }

      const oldMultipleAnswerTypeQuestion =
        await MultipleAnswerTypeQuestion.find({
          assessmentId: id,
        })
          .lean()
          .exec();

      if (oldMultipleAnswerTypeQuestion) {
        oldMultipleAnswerTypeQuestion.forEach((element) => {
          delete element.oldMultipleAnswerTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newMultipleAnswerType = new MultipleAnswerTypeQuestion(
          oldMultipleAnswerTypeQuestion
        );
        await newMultipleAnswerType.save();
      }

      const oldPassageTypeQuestion = await PassageTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldPassageTypeQuestion) {
        oldPassageTypeQuestion.forEach((element) => {
          delete element.oldPassageTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newPassageTypeQuestion = new PassageTypeQuestion(
          oldPassageTypeQuestion
        );
        await newPassageTypeQuestion.save();
      }

      const oldSubjectiveTypeQuestion = await SubjectiveTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      if (oldSubjectiveTypeQuestion) {
        oldSubjectiveTypeQuestion.forEach((element) => {
          delete element.oldSubjectiveTypeQuestion._id;
          element.assessmentId = newAssessmentId;
        });

        const newSubjectiveTypeQuestion = new SubjectiveTypeQuestion(
          oldSubjectiveTypeQuestion
        );
        await newSubjectiveTypeQuestion.save();
      }
    };
    const newQuestionTemplateB = async (id, newAssessmentId) => {
      const oldUploadTypeQuestion = await UploadTypeQuestion.find({
        assessmentId: id,
      })
        .lean()
        .exec();

      oldUploadTypeQuestion.forEach((element) => {
        delete element.oldUploadTypeQuestion._id;
        element.assessmentId = newAssessmentId;
      });

      const newUploadType = new UploadTypeQuestion(oldUploadTypeQuestion);
      await newUploadType.save();
    };
    try {
      const id = req.params.id;
      const { user_id, companyId, name } = req.payload;

      if (!companyId) {
        req.body.fromCompany = user_id;
      } else {
        req.body.fromCompany = companyId;
      }

      req.body.createdBy = { createdById: user_id, name: name };

      const assessment = await Assessment.findById(id);
      const {
        assessmentTypeA_Id,
        assessmentTypeB_Id,
        assessmentTypeB_Data,
        assessmentTypeA_Data,
      } = assessment;

      if (assessment.type == req.body.type) {
        if (assessmentTypeA_Id == undefined) {
          const oldAssessmentTypeB = await AssessmentTypeB.findById(
            assessmentTypeB_Id
          )
            .lean()
            .exec();
          delete oldAssessmentTypeB._id;
          const newAssessmentTypeB = new AssessmentTypeB(oldAssessmentTypeB);

          await newQuestionTemplateB(assessmentTypeB_Id, newAssessmentTypeB.id);

          req.body.assessmentTypeB_Id = newAssessmentTypeB.id;
          req.body.assessmentTypeB_Data = {
            maxScore: assessmentTypeB_Data.maxScore,
            numberOfQuestion: assessmentTypeB_Data.numberOfQuestion,
          };

          const newAssessment = new Assessment(req.body);
          await newAssessmentTypeB.save();
          await newAssessment.save();

          res.status(200).json({ message: 'Assessment Successfully Created' });
        }
        if (assessmentTypeB_Id == undefined) {
          const oldAssessmentTypeA = await AssessmentTypeA.findById(
            assessmentTypeA_Id
          )
            .lean()
            .exec();

          delete oldAssessmentTypeA._id;
          const newAssessmentTypeA = new AssessmentTypeA(oldAssessmentTypeA);

          await newQuestionTemplateA(assessmentTypeA_Id, newAssessmentTypeA.id);

          req.body.assessmentTypeA_Id = newAssessmentTypeA.id;
          req.body.assessmentTypeA_Data = {
            duration: assessmentTypeA_Data.duration,
            maxScore: assessmentTypeA_Data.maxScore,
            numberOfQuestion: assessmentTypeA_Data.numberOfQuestion,
          };

          const newAssessment = new Assessment(req.body);
          await newAssessmentTypeA.save();
          await newAssessment.save();

          res.status(200).json({ message: 'Assessment Successfully Created' });
        }
        if (
          assessmentTypeA_Id != undefined &&
          assessmentTypeB_Id != undefined
        ) {
          const oldAssessmentTypeA = await AssessmentTypeA.findById(
            assessmentTypeA_Id
          )
            .lean()
            .exec();

          delete oldAssessmentTypeA._id;
          const newAssessmentTypeA = new AssessmentTypeA(oldAssessmentTypeA);

          await newQuestionTemplateA(assessmentTypeA_Id, newAssessmentTypeA.id);

          req.body.assessmentTypeA_Id = newAssessmentTypeA.id;
          req.body.assessmentTypeA_Data = {
            duration: assessmentTypeA_Data.duration,
            maxScore: assessmentTypeA_Data.maxScore,
            numberOfQuestion: assessmentTypeA_Data.numberOfQuestion,
          };

          const oldAssessmentTypeB = await AssessmentTypeB.findById(
            assessmentTypeB_Id
          )
            .lean()
            .exec();
          delete oldAssessmentTypeB._id;

          const newAssessmentTypeB = new AssessmentTypeB(oldAssessmentTypeB);

          await newQuestionTemplateB(assessmentTypeB_Id, newAssessmentTypeB.id);

          req.body.assessmentTypeB_Id = newAssessmentTypeB.id;
          req.body.assessmentTypeB_Data = {
            maxScore: assessmentTypeB_Data.maxScore,
            numberOfQuestion: assessmentTypeB_Data.numberOfQuestion,
          };

          const newAssessment = new Assessment(req.body);
          await newAssessmentTypeA.save();
          await newAssessmentTypeB.save();
          await newAssessment.save();
          res.status(200).json({ message: 'Assessment Successfully Created' });
        }
      }
      if (assessment.type == '1' && req.body.type == '2') {
        const newAssessmentTypeB = new AssessmentTypeB();
        req.body.assessmentTypeB_Id = newAssessmentTypeB.id;
        const assessment = new Assessment(req.body);
        await newAssessmentTypeB.save();
        await assessment.save();

        res.status(200).json({ message: 'Assessment Successfully Created' });
      }
      if (assessment.type == '2' && req.body.type == '1') {
        const newAssessmentTypeA = new AssessmentTypeA();
        req.body.assessmentTypeA_Id = newAssessmentTypeA.id;
        const assessment = new Assessment(req.body);
        await newAssessmentTypeA.save();
        await assessment.save();

        res.status(200).json({ message: 'Assessment Successfully Created' });
      }
      if (assessment.type == '3' && req.body.type == '1') {
        const oldAssessmentTypeA = await AssessmentTypeA.findById(
          assessmentTypeA_Id
        )
          .lean()
          .exec();

        delete oldAssessmentTypeA._id;

        const newAssessmentTypeA = new AssessmentTypeA(oldAssessmentTypeA);

        await newQuestionTemplateA(assessmentTypeA_Id, newAssessmentTypeA.id);

        req.body.assessmentTypeA_Id = newAssessmentTypeA.id;
        req.body.assessmentTypeA_Data = {
          duration: assessmentTypeA_Data.duration,
          maxScore: assessmentTypeA_Data.maxScore,
          numberOfQuestion: assessmentTypeA_Data.numberOfQuestion,
        };

        const newAssessment = new Assessment(req.body);
        await newAssessmentTypeA.save();
        await newAssessment.save();
        res.status(200).json({ message: 'Assessment Successfully Created' });
      }
      if (assessment.type == '3' && req.body.type == '2') {
        const oldAssessmentTypeB = await AssessmentTypeB.findById(
          assessmentTypeB_Id
        )
          .lean()
          .exec();
        delete oldAssessmentTypeB._id;

        const newAssessmentTypeB = new AssessmentTypeB(oldAssessmentTypeB);
        await newQuestionTemplateB(assessmentTypeB_Id, newAssessmentTypeB.id);

        req.body.assessmentTypeB_Id = newAssessmentTypeB.id;
        req.body.assessmentTypeB_Data = {
          maxScore: assessmentTypeB_Data.maxScore,
          numberOfQuestion: assessmentTypeB_Data.numberOfQuestion,
        };

        const newAssessment = new Assessment(req.body);
        await newAssessmentTypeB.save();
        await newAssessment.save();
        res.status(200).json({ message: 'Assessment Successfully Created' });
      }
    } catch (err) {
      return next(err);
    }
  },
  createAssessment: async (req, res, next) => {
    try {
      const { user_id, companyId, name } = req.payload;

      if (!companyId) {
        req.body.fromCompany = user_id;
      } else {
        req.body.fromCompany = companyId;
      }

      req.body.createdBy = { createdById: user_id, name: name };
      if (req.body.type == '') {
        return res.status(400).send('Type of Assessment is required!');
      }

      if (req.body.type == '1') {
        const assessmentTypeA = new AssessmentTypeA();
        req.body.assessmentTypeA_Id = assessmentTypeA.id;
        await assessmentTypeA.save();
      }
      if (req.body.type == '2') {
        const assessmentTypeB = new AssessmentTypeB();
        req.body.assessmentTypeB_Id = assessmentTypeB.id;
        await assessmentTypeB.save();
      }
      if (req.body.type == '3') {
        const assessmentTypeA = new AssessmentTypeA();
        req.body.assessmentTypeA_Id = assessmentTypeA.id;
        const assessmentTypeB = new AssessmentTypeB();
        req.body.assessmentTypeB_Id = assessmentTypeB.id;

        await assessmentTypeA.save();
        await assessmentTypeB.save();
      }
      const assessment = new Assessment(req.body);
      await assessment.save();
      res.status(200).json({
        message: 'Assessment Successfully Created',
        assessmentId: assessment._id,
      });
    } catch (err) {
      return next(err);
    }
  },

  updateAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { type, ...restBodyQuery } = req.body;

      const assessmentCheck = await Assessment.findById(id).lean().exec();

      if (type && assessmentCheck.type) {
        if (type === assessmentCheck.type) {
          res.status(400).send('This Type Already Exists');
        }
        if (assessmentCheck.type === '1' && type === '2') {
          const newAssessmentTypeB = new AssessmentTypeB();
          req.body.assessmentTypeB_Id = newAssessmentTypeB.id;
          await newAssessmentTypeB.save();

          await AssessmentTypeA.deleteOne({
            _id: assessmentCheck.assessmentTypeA_Id,
          });
          req.body.assessmentTypeA_Id = undefined;

          await Assessment.updateOne({ _id: id }, req.body).exec();
          res.status(200).json({
            message: 'Changed Type Successfully',
            Id_Type_2: req.body.assessmentTypeB_Id,
          });
        }
        if (assessmentCheck.type === '2' && type === '1') {
          const newAssessmentTypeA = new AssessmentTypeA();
          req.body.assessmentTypeA_Id = newAssessmentTypeA.id;
          await newAssessmentTypeA.save();

          await AssessmentTypeB.deleteOne({
            _id: assessmentCheck.assessmentTypeB_Id,
          });
          req.body.assessmentTypeB_Id = undefined;

          await Assessment.updateOne({ _id: id }, req.body).exec();

          res.status(200).json({
            message: 'Changed Type Successfully',
            Id_Type_1: req.body.assessmentTypeA_Id,
          });
        }
        if (assessmentCheck.type === '1' && type === '3') {
          const newAssessmentTypeB = new AssessmentTypeB();
          req.body.assessmentTypeB_Id = newAssessmentTypeB.id;
          await newAssessmentTypeB.save();

          await Assessment.updateOne({ _id: id }, req.body).exec();

          res.status(200).json({
            message: 'Changed Type Successfully',
            data: {
              Id_Type_1: assessmentCheck.assessmentTypeA_Id,
              Id_Type_2: req.body.assessmentTypeB_Id,
            },
          });
        }
        if (assessmentCheck.type === '2' && type === '3') {
          const newAssessmentTypeA = new AssessmentTypeA();
          req.body.assessmentTypeA_Id = newAssessmentTypeA.id;
          await newAssessmentTypeA.save();

          await Assessment.updateOne({ _id: id }, req.body).exec();

          res.status(200).json({
            message: 'Changed Type Successfully',
            data: {
              Id_Type_1: req.body.assessmentTypeA_Id,
              Id_Type_2: assessmentCheck.assessmentTypeB_Id,
            },
          });
        }
        if (assessmentCheck.type === '3' && type === '1') {
          await AssessmentTypeB.deleteOne({
            _id: assessmentCheck.assessmentTypeB_Id,
          });
          req.body.assessmentTypeB_Id = undefined;

          await Assessment.updateOne({ _id: id }, req.body).exec();

          res.status(200).json({
            message: 'Changed Type Successfully',
            Id_Type_1: assessmentCheck.assessmentTypeA_Id,
          });
        }
        if (assessmentCheck.type === '3' && type === '2') {
          await AssessmentTypeA.deleteOne({
            _id: assessmentCheck.assessmentTypeA_Id,
          });
          req.body.assessmentTypeA_Id = undefined;

          await Assessment.updateOne({ _id: id }, req.body).exec();

          res.status(200).json({
            message: 'Changed Type Successfully',
            Id_Type_2: assessmentCheck.assessmentTypeB_Id,
          });
        }
      } else {
        await Assessment.updateOne({ _id: id }, { ...restBodyQuery }).exec();
        res.status(200).send('Assessment Details Updated Successfully');
      }
    } catch (err) {
      return next(err);
    }
  },
  disableAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      await Assessment.updateOne({ _id: id }, { disabled: true }).exec();
      res.status(200).json({
        message: 'Assessment Set to Disabled Successfully',
      });
    } catch (err) {
      return next(err);
    }
  },
  enableAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      await Assessment.updateOne({ _id: id }, { disabled: false }).exec();
      res.status(200).json({
        message: 'Assessment Set to Enabled Successfully',
      });
    } catch (err) {
      return next(err);
    }
  },
  deleteAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      await Assessment.updateOne({ _id: id }, { isDeleted: true }).exec();
      res.status(200).send('Assessment Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  },
  // deleteAssessment: async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const assessment = await Assessment.findById(id).exec();
  //     const { assessmentTypeA_Id, assessmentTypeB_Id } = assessment;

  //     if (assessmentTypeA_Id != undefined) {
  //       await IntegerTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeA_Id,
  //       }).exec();
  //       await McqTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeA_Id,
  //       }).exec();
  //       await MatchupTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeA_Id,
  //       }).exec();
  //       await SubjectiveTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeA_Id,
  //       }).exec();
  //       await MultipleAnswerTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeA_Id,
  //       }).exec();
  //       await PassageTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeA_Id,
  //       }).exec();
  //     }

  //     if (assessmentTypeB_Id != undefined) {
  //       await UploadTypeQuestion.deleteMany({
  //         assessmentId: assessmentTypeB_Id,
  //       }).exec();
  //     }
  //     await Assessment.deleteOne({ _id: id }).exec();
  //     res.status(200).send('Assessment Deleted Successfully');
  //   } catch (err) {
  //     return next(err);
  //   }
  // },
};
