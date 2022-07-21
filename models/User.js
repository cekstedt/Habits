const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_DB);
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.create = function create(obj, cb) {
  const newUser = new User(obj);
  newUser.save(cb);
};

exports.get = function get(userID, cb) {
  User.findById(userID, function(err, foundUser) {
    if (err) {
      if (err.name === "BSONTypeError" || err.name === "CastError") {
        cb();
      } else {
        cb(err);
      }
    } else {
      cb(null, foundUser);
    }
  });
};

exports.getNew = function getNew(obj) {
  const newUser = new User(obj);
  return newUser;
};

exports.getAll = function getAll(cb) {
  // Returns (err, foundItems) to the callback function provided.
  User.find({}, cb);
};

exports.register = User.register;
