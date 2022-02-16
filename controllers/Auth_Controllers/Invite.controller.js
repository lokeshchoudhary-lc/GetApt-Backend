const bcrypt = require('bcrypt');
const Recruiter = require('../../models/Recruiter_Model');
const {
  inviteLinkGenerator,
  verifyInviteLink,
} = require('../../utils/jwt_helper');

module.exports = {
  createInvite: async (req, res, next) => {
    try {
      if (!req.body.email && !req.body.role) {
        return res.status(400).send('Email or Role not provided');
      }
      const payload = {
        email: req.body.email,
        role: req.body.role,
        companyId: req.payload.companyId,
      };
      if (req.payload.role === 'manager' && req.body.role === 'admin') {
        return res.status(401).send('Action not allowed for the account');
      }
      const link = await inviteLinkGenerator(payload);
      res.status(200).json({ link: link });
    } catch (err) {
      return next(err);
    }
  },
  useInvite: async (req, res, next) => {
    try {
      const { InviteLink } = req.query;
      if (!InviteLink) {
        return res.status(400).send('InviteLink not provided');
      }
      if (!req.body) {
        return res.status(400).send('Body Not Provided');
      }
      const linkPayload = await verifyInviteLink(InviteLink);
      const { email, role, companyId } = linkPayload;
      const recruiter = await Recruiter.find({ email: email }).exec();
      if (!recruiter) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        req.body.email = email;
        req.body.role = role;
        req.body.fromCompany = companyId;
        req.body.password = hashedPassword;

        const recruiter = new Recruiter(req.body);
        await recruiter.save();
        res
          .status(200)
          .json({ message: 'Recruiter Account Successfully Created' });
      } else {
        res.status(400).send('Action not allowed for the account');
      }
    } catch (err) {
      return next(err);
    }
  },
};
