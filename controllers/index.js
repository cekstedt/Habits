const express = require("express");
const router = express.Router();
const posts = require("./posts");
const info = require("./info");
const users = require("./users");

router.use("/", posts);
router.use("/", info);
router.use("/", users);

router.all("*", function(req, res) {
  res.status(404).render("404");
});

module.exports = router;
