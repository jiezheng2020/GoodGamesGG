/*************************** REQUIRES ***************************/
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./db/models");
const path = require("path");
const { environment, secret } = require("./config");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const myGamesRouter = require("./routes/mygames");
const indexRouter = require("./routes/index");
// const bodyParser = require('body-parser');

/*************************** APP SETUP ***************************/
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());6

app.set("view engine", "pug");

const store = new SequelizeStore({ db: sequelize });
store.sync();

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
  })
);

/*************************** MIDDLEWARE ***************************/

/*************************** ROUTES ***************************/

// ROUTES TO ROUTERS
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/mygames", myGamesRouter);


// ERRORS

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested page couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render("page-not-found", {
      title: "Page Not Found",
      req,
      err,
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === "production";
  res.render("error", {
    title: "Server Error",
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
    req
  });
});


/*************************** EXPORTS ***************************/
module.exports = app;
