const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: String,
  comment: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date_started: Date
});
const Habit = mongoose.model("Habit", habitSchema);

exports.create = function create(obj, cb) {
  const newHabit = new Habit(obj);
  newHabit.save(cb);
};

exports.get = function get(habitID, cb) {
  Habit.findById(habitID, function(err, foundHabit) {
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

exports.getAll = function getAll(cb) {
  // Returns (err, foundItems) to the callback function provided.
  Habit.find({}, cb);
};
