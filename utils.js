const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const loginReq = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

const playedStatus = (played) => {
  let status = '';

  if (played === 1 ) {
    status = 'Played'
  } else if (played === 2) {
    status = 'Currently Playing'
  } else {
    status = 'Want to play'
  }

  return status;
}

module.exports = {
  loginReq,
  csrfProtection,
  asyncHandler,
};
