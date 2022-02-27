const Recruiter = require('../models/Recruiter_Model');

module.exports = {
  canAccess: (accessRole) => {
    return async (req, res, next) => {
      try {
        const user_id = req.payload.user_id;
        const recruiter = await Recruiter.findById(user_id);
        const role = recruiter.role;
        if (accessRole.includes(role)) {
          return next();
        } else {
          return res.status(401).send('Action not allowed for the account');
        }
      } catch (error) {
        next(error);
      }
    };
  },
};
