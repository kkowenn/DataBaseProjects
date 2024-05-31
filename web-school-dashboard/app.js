const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Replace <password> with your actual MongoDB Atlas user password
const mongoDBConnectionString =

// Connect to MongoDB Atlas
mongoose
  .connect(mongoDBConnectionString)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

// Define a schema and model for user data
const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  name: String,
  studentId: String,
  age: Number,
  school: String,
  gpa: Number,
  favSubject: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up EJS for templating
app.set("view engine", "ejs");

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.render("home");
});

// Define a route for the registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// Handle registration form submission
app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
      studentId: req.body.studentId,
      age: req.body.age,
      school: req.body.school,
      gpa: req.body.gpa,
      favSubject: req.body.favSubject,
    });

    await newUser.save();
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});

// Define a route for the update page
app.get("/update/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("update", { user: user });
  } catch (err) {
    res.send(err);
  }
});

// Handle update form submission
app.post("/update/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name,
      studentId: req.body.studentId,
      age: req.body.age,
      school: req.body.school,
      gpa: req.body.gpa,
      favSubject: req.body.favSubject,
    });
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});

// Define a route to display all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", { users: users });
  } catch (err) {
    res.send(err);
  }
});

// Handle delete user request
app.post("/delete-user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});

// Define a route for the dashboard
app.get("/dashboard", async (req, res) => {
  try {
    const users = await User.find();

    const totalUsers = users.length;

    const newUserSignups = users.reduce((acc, user) => {
      const signupDate = user._id.getTimestamp().toISOString().split("T")[0];
      acc[signupDate] = (acc[signupDate] || 0) + 1;
      return acc;
    }, {});

    const ageGroups = users.reduce((acc, user) => {
      const ageGroup = Math.floor(user.age / 10) * 10;
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {});

    const averageGPA = (
      users.reduce((sum, user) => sum + user.gpa, 0) / totalUsers
    ).toFixed(2);
    const averageAge = (
      users.reduce((sum, user) => sum + user.age, 0) / totalUsers
    ).toFixed(2);

    const popularSchools = users.reduce((acc, user) => {
      acc[user.school] = (acc[user.school] || 0) + 1;
      return acc;
    }, {});

    const popularSubjects = users.reduce((acc, user) => {
      acc[user.favSubject] = (acc[user.favSubject] || 0) + 1;
      return acc;
    }, {});

    res.render("dashboard", {
      totalUsers,
      newUserSignups,
      ageGroups,
      averageGPA,
      averageAge,
      popularSchools,
      popularSubjects,
    });
  } catch (err) {
    res.send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
