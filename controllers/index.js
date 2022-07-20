const express = require("express");
const router = express.Router();
const posts = require("./posts");
const info = require("./info");

router.use("/", posts);
router.use("/", info);

router.all("*", function(req, res) {
  res.status(404).render("404");
});

module.exports = router;
