const Recruiter = require('../../models/Recruiter_Model');
const bcrypt = require('bcrypt');
const {
  resetLinkGenerator,
  verifyResetLink,
} = require('../../utils/jwt_helper');

module.exports = {
  createResetLink: async (req, res, next) => {
    try {
      const recruiter = await Recruiter.find({ email: req.body.email });
      if (!recruiter) {
        return res.status(400).send('Email not registered');
      }
      if (recruiter.usedGoogleAuth === true) {
        return res
          .status(400)
          .send('Cannot reset password , use Google login instead');
      }
      const user_id = recruiter.id;
      const link = await resetLinkGenerator(user_id);
      res.json({ identifier: user_id, link: link });
    } catch (err) {
      return next(err);
    }
  },
  useResetLink: async (req, res, next) => {
    try {
      const { identifier, link } = req.params;
      const password = req.body.password;
      if (!password) {
        return res.status(400).send('Password not provided');
      }
      verifyResetLink(link, identifier);
      const hashedPassword = bcrypt.hash(password, 10);
      await Recruiter.findByIdAndUpdate(identifier, {
        password: hashedPassword,
      });
      res.send('Password Changed Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
