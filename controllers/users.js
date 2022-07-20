const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("../models/User");

// GET routes.

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
      res.redirect("/secrets");
    } else {
      res.redirect("/");
    }
  });
});

// POST routes.

router.post("/register", function(req, res) {
  User.register({ username: req.body.username }, req.body.password, function(
    err,
    user
  ) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        // Only fires if authentication was successful.
        res.redirect("/secrets");
      });
    }
  });
});

router.post("/login", function(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  req.login(user, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function() {
        // Only fires if authentication was successful.
        res.redirect("/secrets");
      });
    }
  });
});

module.exports = router;
