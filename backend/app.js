// Importing necessary modules.
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const cors = require('cors');

// Route handlers
const projectRoutes = require("./routes/projects-routes");
const userRoutes = require("./routes/users-routes");

// Initialize express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes and origins
app.use(cors());

// Using routes
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);  // This route handles user registration, login, etc.

// MongoDB URI from .env file
const uri = process.env.MONGO_URI;

// Connect to MongoDB with Mongoose
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// SESSIONS
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Basic route for initial test
app.get("/", (req, res) =>
  res.send("Hello World! The server is up and running.")
);

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
