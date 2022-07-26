const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");

// Setting up imports for use.
const app = express();
app.set("view engine", "ejs");
mongoose.connect(process.env.MONGO_DB);

// Middleware.
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);
require("./middlewares/auth")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(morgan("dev")); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

// Global Variables.
const PORT = process.env.PORT;

// Initialize server.
app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
