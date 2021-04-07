/*************************** REQUIRES ***************************/
const express = require("express");
const { csrfProtection, asyncHandler } = require("../utils");
const { User, Game, Console } = require("../db/models");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const bcrypt = require("bcrypt");

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const userValidator = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("firstName should not be empty"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("LastName should not be empty"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a value for email")
    .isEmail()
    .withMessage("Email address is not valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters"),
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username")
    .isLength({ max: 50 }),
];

const loginReq = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/authorized");
  } else {
    next();
  }
};
/*************************** ROUTES ***************************/
router.get(
  "/",
  loginReq,
  asyncHandler(async (req, res) => {
    const games = await Game.findAll();
    res.render("unauthorized", { title: "Home Page", games });
  })
);

router.get(
  "/authorized",
  asyncHandler(async (req, res) => {
    if (req.session.user) {
      const games = await Game.findAll();
      res.render("authorized", {
        title: "Home Page",
        games,
        user: req.session.user,
      });
    } else {
      res.redirect("/");
    }
  })
);

router.get(
  "/signup",
  loginReq,
  asyncHandler(async (req, res) => {
    const consoles = await Console.findAll();

    res.render("signup", {
      consoles,
      title: "Sign Up",
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      },
    });
  })
);

router.post(
  "/signup",
  userValidator,
  asyncHandler(async (req, res) => {
    const { userName, email, password, firstName, lastName } = req.body;
    let validatorErrors = validationResult(req).errors;
    const consoles = await Console.findAll();
    if (validatorErrors.length > 0) {
      const user = { password, email, userName, firstName, lastName };
      res.status = 403;
      const errors = validatorErrors.map((error) => error.msg);

      res.render("signup", { title: "Sign Up", user, consoles, errors });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
        userName,
      });

      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      res.redirect("/authorized");
    }
  })
);

router.get(
  "/login",
  loginReq,
  asyncHandler(async (req, res) => {
    res.render("login", { title: "Log in" });
  })
);

router.post(
  "/login",
  loginReq,
  asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName } });
    const isPassword = bcrypt.compare(password, user.hashedPassword);

    if (isPassword) {
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      res.redirect("/authorized");
    } else {
      res.redirect("login", { title: "Log In" });
    }
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    delete req.session.user;
    res.redirect("/");
  })
);

/*************************** EXPORTS ***************************/
module.exports = router;
