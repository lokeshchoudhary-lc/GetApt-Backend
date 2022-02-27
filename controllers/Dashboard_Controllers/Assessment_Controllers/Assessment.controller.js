const Assessment = require('../../../models/Assessment_Model');
const AssessmentTypeA = require('../../../models/AssessmentTypeA_Model');
const AssessmentTypeB = require('../../../models/AssessmentTypeB_Model');

module.exports = {
  getCompanyAssessment: async (req, res, next) => {
    try {
      const { companyId } = req.payload;
      const assessment = await Assessment.find({
        fromCompany: companyId,
      })
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
      })
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
      const assessment = await Assessment.findById(id).lean().exec();
      res.status(200).send(assessment);
    } catch (err) {
      return next(err);
    }
  },
  shareAssessmentInCompany: async (req, res, next) => {
    //
  },
  useTemplate: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { user_id, companyId, name } = req.payload;

      req.body.fromCompany = companyId;
      req.body.createdBy = { createdById: user_id, name: name };

      const assessment = await Assessment.findById(id);
      const { assessmentTypeA_Id, assessmentTypeB_Id } = assessment;

      if (assessment.type == req.body.type) {
        if (assessmentTypeA_Id == undefined) {
          const oldAssessmentTypeB = await AssessmentTypeB.findById(
            assessmentTypeB_Id
          )
            .lean()
            .exec();
          delete oldAssessmentTypeB._id;
          const newAssessmentTypeB = new AssessmentTypeB(oldAssessmentTypeB);
          req.body.assessmentTypeB_Id = newAssessmentTypeB.id;

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
          req.body.assessmentTypeA_Id = newAssessmentTypeA.id;

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
          req.body.assessmentTypeA_Id = newAssessmentTypeA.id;

          const oldAssessmentTypeB = await AssessmentTypeB.findById(
            assessmentTypeB_Id
          )
            .lean()
            .exec();
          delete oldAssessmentTypeB._id;
          const newAssessmentTypeB = new AssessmentTypeB(oldAssessmentTypeB);
          req.body.assessmentTypeB_Id = newAssessmentTypeB.id;

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
        req.body.assessmentTypeA_Id = newAssessmentTypeA.id;

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
        req.body.assessmentTypeB_Id = newAssessmentTypeB.id;

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
      req.body.fromCompany = companyId;
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
      res
        .status(200)
        .json({ message: 'Assessment Successfully Created', data: assessment });
    } catch (err) {
      return next(err);
    }
  },

  updateAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { title, description, forRole, type } = req.body;

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
          req.body.assessmentTypeA = undefined;

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
          req.body.assessmentTypeB = undefined;

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
          req.body.assessmentTypeB = undefined;

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
          req.body.assessmentTypeA = undefined;

          await Assessment.updateOne({ _id: id }, req.body).exec();

          res.status(200).json({
            message: 'Changed Type Successfully',
            Id_Type_2: assessmentCheck.assessmentTypeB_Id,
          });
        }
      } else {
        const assessment = await Assessment.findByIdAndUpdate(
          id,
          { title: title, description: description, forRole: forRole },
          {
            returnDocument: 'after',
            lean: true,
          }
        ).exec();
        res.status(200).json({
          message: 'Assessment Details Updated Successfully',
          data: assessment,
        });
      }
    } catch (err) {
      return next(err);
    }
  },
  deleteAssessment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const assessment = await Assessment.findById(id).exec();
      const { assessmentTypeA_Id, assessmentTypeB_Id } = assessment;
      if (assessmentTypeA_Id != undefined) {
        await AssessmentTypeA.deleteOne({ _id: id }).exec();
      }
      if (assessmentTypeB_Id != undefined) {
        await AssessmentTypeB.deleteOne({ _id: id }).exec();
      }
      await Assessment.deleteOne({ _id: id }).exec();
      res.status(200).send('Assessment Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
