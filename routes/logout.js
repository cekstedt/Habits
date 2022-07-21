const express = require("express");
const router = express.Router();

router.get("/logout", function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
