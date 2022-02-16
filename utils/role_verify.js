const createError = require('http-errors');

module.exports = {
  canAccess: (accessRole) => {
    return (req, res, next) => {
      try {
        const { role } = req.payload;

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
