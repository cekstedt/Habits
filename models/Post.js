const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_DB);

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Post = mongoose.model("Post", postSchema);

exports.create = function create(title, content, cb) {
  const newPost = new Post({
    title: title,
    content: content
  });
  newPost.save(cb);
};

exports.get = function get(postID, cb) {
  Post.findById(postID, function(err, foundPost) {
    if (err) {
      if (err.name === "BSONTypeError" || err.name === "CastError") {
        cb();
      } else {
        cb(err);
      }
    } else {
      cb(null, foundPost);
    }
  });
};

exports.getAll = function getAll(cb) {
  // Returns (err, foundItems) to the callback function provided.
  Post.find({}, cb);
};
