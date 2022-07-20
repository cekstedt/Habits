const express = require("express");
const router = express.Router();

// GET routes.

router.get("/about", function(req, res) {
  res.render("about");
});

router.get("/contact", function(req, res) {
  res.render("contact");
});

module.exports = router;
