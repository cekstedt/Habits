const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

fs.readdirSync(__dirname).forEach(function(file) {
  if (file != "index.js") {
    router.use("/", require("./" + file));
  }
});

router.all("*", function(req, res) {
  res.status(404).render("404");
});

module.exports = router;
