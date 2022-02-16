const Company = require('../../../models/Company_Model');
const Recruiter = require('../../../models/Recruiter_Model');
module.exports = {
  getCompanyProfile: async (req, res, next) => {
    try {
      const companyId = req.payload.companyId;
      const company = await Company.findById(companyId).lean().exec();
      res.send(company);
    } catch (err) {
      return next(err);
    }
  },
  updateCompanyProfile: async (req, res, next) => {
    try {
      const company = await Company.findByIdAndUpdate(id, req.body, {
        returnDocument: 'after',
        lean: true,
      }).exec();

      res
        .status(200)
        .json({ message: 'Profile Updated Successfully', data: company });
    } catch (err) {
      return next(err);
    }
  },
  getCompanyEmployees: async (req, res, next) => {
    try {
      const companyId = req.payload.companyId;
      const company = await Recruiter.find({ fromCompany: companyId })
        .select({ name: 1, email: 1, role: 1, designation: 1 })
        .lean()
        .exec();
      res.send(company);
    } catch (err) {
      return next(err);
    }
  },
};
