const AssessmentTypeB = require('../../../models/AssessmentTypeB_Model');

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
};
