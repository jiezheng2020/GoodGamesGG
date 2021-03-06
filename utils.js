/*************************** REQUIRES ***************************/
const csrf = require("csurf");


/*************************** MIDDLEWARE ***************************/
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
  let status = "";

  if (played === 1) {
    status = "Played";
  } else if (played === 2) {
    status = "Currently Playing";
  } else {
    status = "Want to play";
  }

  return status;
};

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = Error("Bad request.");
    err.status = 400;
    err.title = "Very bad request.";
    err.errors = errors;
    return next(err);
  }
  next();
};

/*************************** MIDDLEWARE ***************************/

module.exports = {
  csrfProtection,
  asyncHandler,
  loginReq,
  handleValidationErrors,
};
