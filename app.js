const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const controllers = require("./controllers");
const session = require("express-session");
const passport = require("passport");

// Setting up imports for use.
const app = express();
app.set("view engine", "ejs");

// Middleware.
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Global Variables.
const PORT = process.env.PORT;
app.use(controllers);

// Initialize server.
app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
