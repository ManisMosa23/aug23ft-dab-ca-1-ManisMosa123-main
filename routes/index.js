var express = require("express");
var router = express.Router();
const passport = require("passport");
const { populateDatabase } = require("../services/populateService");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    });
  })
);

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: null });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express", user: null });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Express", user: null });
});
router.get("/populate-database", async (req, res) => {
  try {
    await populateDatabase();
    res.status(200).json({ message: "All tables populated successfully." });
  } catch (error) {
    console.error("Error populating database:", error);
    res.status(500).json({ error: "Failed to populate database." });
  }
});
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      User.create({
        username,
        password: hash,
        fullName: `${firstname} ${lastname}`,
        role: "member",
      })
        .then((user) => res.redirect("/login"))
        .catch((err) => console.log(err));
    });
  });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
