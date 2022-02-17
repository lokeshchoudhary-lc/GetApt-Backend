const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = (payload) => {
  return new Promise((reslove, reject) => {
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

const signRefreshToken = (payload) => {
  return new Promise((reslove, reject) => {
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
      const newPayload = {};
      newPayload.user_id = payload.user_id;
      newPayload.role = payload.user_id;
      newPayload.name = payload.name;
      if (payload.company_id !== undefined) {
        newPayload.companyId = payload.company_id;
      }
      const newAccessToken = await signAccessToken(newPayload);

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

const inviteLinkGenerator = (payload) => {
  return new Promise((reslove, reject) => {
    const options = {
      expiresIn: '2d',
      issuer: 'GetApt',
    };
    const secret = process.env.GENERAL_TOKEN_SECRET;

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      reslove(token);
    });
  });
};

const verifyInviteLink = (link) => {
  return new Promise((reslove, reject) => {
    jwt.verify(link, process.env.GENERAL_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(createError.Unauthorized());
      }
      reslove(payload);
    });
  });
};

const resetLinkGenerator = (key) => {
  return new Promise((reslove, reject) => {
    const options = {
      expiresIn: '24h',
      issuer: 'GetApt',
    };
    const secret = process.env.FORGOT_PASSWORD_SECRET + key;

    jwt.sign({}, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      reslove(token);
    });
  });
};

const verifyResetLink = (link, key) => {
  return new Promise((reslove, reject) => {
    jwt.verify(
      link,
      process.env.FORGOT_PASSWORD_SECRET + key,
      (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized());
        }
        reslove(payload);
      }
    );
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  authVerification,
  inviteLinkGenerator,
  verifyInviteLink,
  resetLinkGenerator,
  verifyResetLink,
};
