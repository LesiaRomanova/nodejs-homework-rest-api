const passport = require("passport");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const [, token] = req.get("Authorization").split(" ");
    if (!user || err || token !== user.token) {
      return res.status(403).json({
        status: "Error",
        code: 403,
        data: "Forbidden",
        message: "Access is denied",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
