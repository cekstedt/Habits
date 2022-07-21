const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", function(req, res) {
  res.render("login");
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
