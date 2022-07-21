const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register", function(req, res) {
  res.render("register");
});

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

module.exports = router;
