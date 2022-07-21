const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("../models/User");

// GET routes.

router.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.get("/logout", function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

// POST routes.

router.post("/register", function(req, res) {
  User.model.register(
    { username: req.body.username },
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function() {
          // Only fires if authentication was successful.
          res.redirect("/");
        });
      }
    }
  );
});

router.post("/login", function(req, res) {
  const user = User.getNew({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function() {
        // Only fires if authentication was successful.
        res.redirect("/");
      });
    }
  });
});

module.exports = router;
