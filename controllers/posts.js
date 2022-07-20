const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET routes.

router.get("/", function(req, res) {
  Post.getAll(function(err, foundPosts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { posts: foundPosts });
    }
  });
});

router.get("/compose", function(req, res) {
  res.render("compose");
});

router.get("/posts/:postID", function(req, res) {
  Post.get(req.params.postID, function(err, foundPost) {
    if (err) {
      console.log(err);
    } else if (foundPost) {
      res.render("post", {
        postTitle: foundPost.title,
        postContent: foundPost.content
      });
    } else {
      res.status(404).render("404");
    }
  });
});

// POST routes.

router.post("/compose", function(req, res) {
  Post.create(req.body.postTitle, req.body.postBody, err => {
    if (!err) res.redirect("/");
  });
});

module.exports = router;
