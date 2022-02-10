const createError = require('http-errors');
const bcrypt = require('bcrypt');
const Recruiter = require('../../models/Recruiter_Model');
const Company = require('../../models/Company_Model');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const recruiterCheck = await Recruiter.findOne({ email: req.body.email })
        .lean()
        .exec();

      if (!recruiterCheck) {
        if (req.body.company) {
          if (
            req.body.company &&
            Object.keys(req.body.company).length === 0 &&
            req.body.company.constructor === Object
          ) {
            req.body.password = hashedPassword;
            const recruiter = new Recruiter(req.body);
            await recruiter.save();
            res.status(200).json({ message: 'Recruiter Successfully Created' });
          } else {
            const company = new Company(req.body.company);
            company.save();
            req.body.password = hashedPassword;
            req.body.fromCompany = company.id;
            const recruiter = new Recruiter(req.body);
            recruiter.save();
            res.status(200).json({ message: 'Recruiter Successfully Created' });
          }
        } else {
          req.body.password = hashedPassword;
          const recruiter = new Recruiter(req.body);
          await recruiter.save();
          res.status(200).json({ message: 'Recruiter Successfully Created' });
        }
      } else {
        throw createError.Conflict('Email Already Registered !');
      }
    } catch (error) {
      return next(error);
    }
  },
};
