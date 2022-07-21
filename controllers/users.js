const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const session = require("express-session");
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
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      }
      req.login(user, function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      });
    }
  );
});

router.post("/login", function(req, res) {
  passport.authenticate("local", function(err, user, info) {
    // invalid credentials populate info, not err.
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  })(req, res);
});

module.exports = router;
