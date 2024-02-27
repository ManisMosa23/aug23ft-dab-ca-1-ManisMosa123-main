require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require('passport');


var indexRouter = require("./routes/index");
var animalsRouter = require("./routes/animals");
var speciesRouter = require("./routes/species");
var temperamentRouter = require("./routes/temperament");
const session = require('express-session');
// Passport Config
require('./config/passport')(passport);


var app = express();
const sequelize = require("./config/database"); // The sequelize instance
const models = require("./models/modelAssociations"); // The file where you defined associations

app.use(session({
  secret: '123', // Make sure this is a strong and unique secret
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Sync all models with the database
sequelize
  .sync({ force: false }) // Using 'force: true' will drop existing tables
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/animals", animalsRouter);
app.use("/species", speciesRouter);
app.use("/temperament", temperamentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
