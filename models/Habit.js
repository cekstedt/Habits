const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date_started: { type: Date, default: Date.now }
});
const Habit = mongoose.model("Habit", habitSchema);

exports.create = function create(obj, cb) {
  const newHabit = new Habit(obj);
  newHabit.save(cb);
};

exports.get = function get(habitId, cb) {
  // TODO: Protect from other users.
  Habit.findById(habitId, function(err, foundHabit) {
    if (err) {
      if (err.name === "BSONTypeError" || err.name === "CastError") {
        cb();
      } else {
        cb(err);
      }
    } else {
      cb(null, foundHabit);
    }
  });
};

exports.deleteOne = function deleteOne(habitId) {
  // TODO: Protect from other users.
  Habit.findByIdAndRemove(habitId, function(err) {
    if (err) {
      console.log(err);
    }
  });
};

exports.getAll = function getAll(user, cb) {
  // Returns (err, foundItems) to the callback function provided.
  if (!user) {
    cb(null, []);
  }
  Habit.find({ user: user }, cb);
};
