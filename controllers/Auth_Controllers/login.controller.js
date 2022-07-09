const bcrypt = require('bcrypt');
const Recruiter = require('../../models/Recruiter_Model');
const { signAccessToken, signRefreshToken } = require('../../utils/jwt_helper');

module.exports = {
  login: async (req, res, next) => {
    try {
      // if (req.cookies.LoginState) {
      //   return next(createError.BadRequest('Already Logined !'));
      // }
      if (!req.body.email) {
        return res.status(400).send('Email Not Provided ');
      }
      if (!req.body.password) {
        return res.status(400).send('Password Not Provided ');
      }
      const recruiterCheck = await Recruiter.findOne({
        email: req.body.email,
      }).exec();

      if (!recruiterCheck) {
        return res.status(404).send('Email Not Registered ');
      }
      if (recruiterCheck.usedGoogleAuth === true) {
        return res.send('Please Use Google Login to continue');
      }
      const { _id, password: hashedPassword, name } = recruiterCheck;

      const isMatch = await bcrypt.compare(req.body.password, hashedPassword);

      if (!isMatch) {
        return res.status(401).send('Invalid Email & Password!');
      }
      const payload = {};
      if (recruiterCheck.fromCompany == undefined) {
        payload.user_id = _id;
        payload.name = name;
      } else {
        payload.user_id = _id;
        payload.name = name;
        payload.companyId = recruiterCheck.fromCompany;
      }
      const accessToken = await signAccessToken(payload);
      const refreshToken = await signRefreshToken(payload);

      res.cookie('AccessTokenCookie', accessToken, {
        sameSite: 'strict',
        // secure: true, IN Https only
        httpOnly: true,
        maxAge: 900000, //15m
      });

      res.cookie('RefreshTokenCookie', refreshToken, {
        sameSite: 'strict',
        // secure: true, IN Https only
        httpOnly: true,
        maxAge: 604800000, //7d
      });

      // res.cookie('LoginState', 1, {
      //   sameSite: 'none',
      //   secure: true,
      //   maxAge: 604800000, //7d
      // });

      res.json('Successfull login');
    } catch (err) {
      return next(err);
    }
  },
};
