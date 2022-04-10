module.exports = {
  logout: async (req, res) => {
    res.clearCookie('AccessTokenCookie');
    res.clearCookie('RefreshTokenCookie');
    // res.clearCookie('LoginState');

    res.json('Successfull logout');
  },
};
