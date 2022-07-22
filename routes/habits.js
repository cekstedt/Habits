const express = require("express");
const router = express.Router();
const passport = require("passport");

const Habit = require("../models/Habit");

// Get all Habits for the logged in user.
router.get("/habits", function(req, res) {
  Habit.getAll(req.user, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { listItems: result });
    }
  });
});

// Create a new Habit for the logged in user.
router.post("/habits", function(req, res) {
  Habit.create({
    name: req.body.newHabitName,
    description: req.body.newHabitDescription,
    user: req.user
  });
  res.redirect("/habits");
});

// Delete all Habits for the logged in user.
router.delete("/habits", function(req, res) {});

// Get one specific Habit for the logged in user.
router.get("/habits/:habitId", function(req, res) {});

// Replace one specific Habit for the logged in user.
router.put("/habits/:habitId", function(req, res) {});

// Edit one specific Habit for the logged in user.
router.patch("/habits/:habitId", function(req, res) {});

// Delete one specific Habit for the logged in user.
router.delete("/habits/:habitId", function(req, res) {
  const habitId = req.body.checkbox;
  Habit.deleteOne(habitId);
  res.redirect("/habits");
});

module.exports = router;
