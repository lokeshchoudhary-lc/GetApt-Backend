const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = (user_id, role) => {
  return new Promise((reslove, reject) => {
    const payload = { user_id: user_id, role: role };
    const options = {
      expiresIn: '900s',
      issuer: 'GetApt',
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      reslove(token);
    });
  });
};

const signRefreshToken = (user_id, role) => {
  return new Promise((reslove, reject) => {
    const payload = { user_id: user_id, role: role };
    const options = {
      expiresIn: '7d',
      issuer: 'GetApt',
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      reslove(token);
    });
  });
};

const verifyAccessToken = (cookie_info) => {
  return new Promise((resolve, reject) => {
    if (!cookie_info) {
      return reject(createError.Unauthorized());
    }

    jwt.verify(cookie_info, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (payload) {
        resolve(payload);
      } else if (err.name === 'JsonWebTokenError') {
        return reject(createError.Unauthorized());
      } else {
        return reject(createError.Unauthorized(err.message));
      }
    });
  });
};

const verifyRefreshToken = (cookie) => {
  return new Promise((reslove, reject) => {
    if (!cookie) {
      return reject(createError.Unauthorized());
    }

    jwt.verify(cookie, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(createError.Unauthorized());
      }
      reslove(payload);
    });
  });
};

const authVerification = async (req, res, next) => {
  const refreshTokenCookie = req.cookies.RefreshTokenCookie;
  const accessTokenCookie = req.cookies.AccessTokenCookie;
  try {
    if (!accessTokenCookie) {
      //
      if (!refreshTokenCookie) {
        throw createError.Unauthorized();
      }
      //
      const payload = await verifyRefreshToken(refreshTokenCookie);
      const { user_id } = payload;
      const newAccessToken = await signAccessToken(user_id);

      res.cookie('AccessTokenCookie', newAccessToken, {
        sameSite: 'strict',
        // secure: true, IN Https only
        httpOnly: true,
        maxAge: 900000, //15m
      });
      if (payload) req.payload = payload;
      next();
    } else {
      const payload = await verifyAccessToken(accessTokenCookie);
      if (payload) req.payload = payload;
      next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  authVerification,
};
