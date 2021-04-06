/*************************** REQUIRES ***************************/
const express = require("express");
const { loginReq, csrfProtection, asyncHandler } = require("../utils");
const { User, Game } = require("../db/models");
const { validationResult } = require("express-validator");
const { check} = require('express-validator');
const bcrypt = require('bcrypt')

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const userValidator = [
    check("firstName")
    .exists({checkFalsy: true})
    .withMessage("firstName should not be empty")
    ,
    check("lastName")
    .exists({checkFalsy: true})
    .withMessage("LastName should not be empty")
    ,
    check("email")
    .exists({checkFalsy: true})
    .withMessage("Please Provide a value for email")
    .isEmail()
    .withMessage("Email address is not valid email")
    ,
    check("password")
    .exists({checkFalsy: true})
    .withMessage("Please provide a value for password")
    .isLength({min: 6})
    .withMessage("Password must be longer than 6 characters")
    ,
    check("username")
    .exists({checkFalsy: true})
    .withMessage("Please provide a value for username")
    .isLength({max: 50})
  ]
/*************************** ROUTES ***************************/
// root / -- authorized and non authorized
// log in -- form fields
// sign up -- button
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const games = Game.findall();
    res.render("unauthorized", { games });
  })
);

router.get(
  "/authorized",
  loginReq,
  asyncHandler(async (req, res) => {
    const games = Game.findall();
    res.render("authorized", { games, user: req.session.user });
  })
);

router.get("/signup", loginReq, (req, res) => {
  res.render("signup", {
    user: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
  });
});

router.post("/signup", userValidator, asyncHandler(async (req,res) => {
    const {userName, email, password, firstName, lastName} = req.body;
    let validResults = validationResult(req).errors;
    if (validResults.length > 0) {
        const user = { password, email, userName, firstName, lastName };
        res.status = 403;
        res.render("signup", { user });
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

        res.redirect("/authorized")
    }
}));

router.post("/login", loginReq, async(req, res) => {
    const {userName, password} = req.body;
    const user = await User.findOne({where: {userName}})
    const isPassword = bcrypt.compare(password,user.hashedPassword)

    if(isPassword) {
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      res.redirect("/authorized")
    }
    else {
      res.render("unauthorized")
    }
  }
);

router.post("/logout", asyncHandler(async (req,res) => {
  delete req.session.user;
  res.redirect("/")
}));

/*************************** EXPORTS ***************************/
module.exports = router;
