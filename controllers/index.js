const express = require("express");
const router = express.Router();
const users = require("./users");

router.use("/", users);

router.all("*", function(req, res) {
  res.status(404).render("404");
});

module.exports = router;
