const Assessment = require('../../../models/Assessment_Model');
const AssessmentTypeA = require('../../../models/AssessmentTypeA_Model');
const AssessmentTypeB = require('../../../models/AssessmentTypeB_Model');
const PublishAssessment = require('../../../models/PublishAssessment_Model');
const PublishAssessmentTypeA = require('../../../models/PublishAssessmentTypeA_Model');
const PublishAssessmentTypeB = require('../../../models/PublishAssessmentTypeB_Model');
const CandidateList = require('../../../models/CandidateList_Model');
const PublishToList = require('../../../models/PublishToList_Model');
const PublishJobs = require('../../../models/PublishJobs_Model');

module.exports = {
  publishAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { user_id, companyId, name } = req.payload;
      const { inputMailArr, selectMailArr } = req.body;
      let arrInEmails = [];
      let arrSelectEmails = [];

      if (
        inputMailArr.length + selectMailArr.length >
        process.env.LIMIT_SENT_MAIL_COUNT
      ) {
        return res.status(401).send('Emails limit exceeded');
      }

      const assessment = await Assessment.findById(id).lean().exec();
      const { assessmentTypeA_Id, assessmentTypeB_Id } = assessment;

      req.body.title = assessment.title;
      req.body.description = assessment.description;
      req.body.forRole = assessment.forRole;
      req.body.type = assessment.type;

      if (!companyId) {
        req.body.fromCompany = user_id;
      } else {
        req.body.fromCompany = companyId;
      }

      req.body.publishedBy = { publishedById: user_id, name: name };

      if (assessmentTypeA_Id) {
        const assessmentTypeA = AssessmentTypeA.findById(assessmentTypeA_Id)
          .lean()
          .exec();

        delete assessmentTypeA._id;
        req.body.dateTimeTypeA = {
          startAt: assessmentTypeA.startAt,
          endAt: assessmentTypeA.endAt,
        };

        const publishAssessmentTypeA = new PublishAssessmentTypeA(
          assessmentTypeA
        );

        req.body.publishedAssessmentTypeA_Id = publishAssessmentTypeA.id;
      }
      if (assessmentTypeB_Id) {
        const assessmentTypeB = AssessmentTypeB.findById(assessmentTypeB_Id)
          .lean()
          .exec();

        delete assessmentTypeB._id;
        req.body.dateTimeTypeA = {
          startAt: assessmentTypeB.startAt,
          endAt: assessmentTypeB.endAt,
        };

        const publishAssessmentTypeB = new PublishAssessmentTypeB(
          assessmentTypeB
        );

        req.body.publishedAssessmentTypeB_Id = publishAssessmentTypeB.id;
      }

      if (req.body.emails) {
        if (
          req.body.company &&
          Object.keys(req.body.company).length === 0 &&
          req.body.company.constructor === Object
        ) {
          return res.status(400).send('Emails Not Provided');
        } else {
          if (inputMailArr) {
            inputMailArr.forEach((element) => {
              arrInEmails.push({
                email: element.email,
                fromCompany: req.body.fromCompany,
                publishedAssessment_Id: id,
              });
            });

            await Promise.all([
              CandidateList.insertMany(arrInEmails),
              PublishToList.insertMany(arrInEmails),
            ]);
          }

          if (selectMailArr) {
            selectMailArr.forEach((element) => {
              arrSelectEmails.push({
                email: element.email,
                publishedAssessment_Id: id,
              });
            });

            await PublishToList.insertMany(arrSelectEmails);
          }
        }
      } else {
        return res.status(400).send('Emails Not Provided');
      }

      new PublishAssessment(req.body);

      const publishTime = (() => {
        if (req.body.dateTimeTypeA && req.body.dateTimeTypeB) {
          if (req.body.dateTimeTypeA.startAt < req.body.dateTimeTypeB.startAt) {
            return req.body.dateTimeTypeA.startAt;
          } else {
            return req.body.dateTimeTypeB.startAt;
          }
        }
        if (!req.body.dateTimeTypeA) {
          return req.body.dateTimeTypeB.startAt;
        } else {
          return req.body.dateTimeTypeA.startAt;
        }
      })();

      new PublishJobs({ time: publishTime, assessment_Id: id });

      res.status(200).send('Assessment Successfully Published');
    } catch (err) {
      return next(err);
    }
  },
  updatePublishAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const assessment = await Assessment.findById(id).lean().exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  deletePublishAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      await AssessmentTypeA.deleteOne({ _id: id }).exec();
      res.status(200).send('Assessment Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
