const AssessmentTypeA = require('../../../models/AssessmentTypeA_Model');

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
};
