const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user-model"); // Assuming you have a User model defined

const router = express.Router();

/*

<<<<<<< HEAD
Get all users

*/
//get all users

router.get("/", async (req, res) => {
  try {
    //Find all users in the database
    const users = await User.find();
    //Return a 200 OK response with the users
    res.status(200).json({ message: "All users", users });
  } catch (err) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
});

/*

=======
>>>>>>> 6552228a949e0c6ff14da5f668d9db88a5323c69
Register a new user

*/

//Route to handle user registration
router.post("/register", async (req, res) => {
  //Destructure required fields from the request body
  const { username, email, password } = req.body;

  //Check if all required fields are provided
  if (!username || !email || !password) {
    // If any field is missing, return a 400 Bad Request response
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  try {
    //generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create a new user instance with the provided and processed data
    const newUser = new User({
      username: username,
      email: email,
      passwordHash: hashedPassword,
    });
    //Save the new user to the database
    const savedUser = await newUser.save();
    // If the save is successful, return a 201 Created response with user details
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
});

/*

Login a user

*/
//login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // If credentials are correct, include success: true in the response
    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



/*

Get user profile


*/
//Get user profile
router.get("/:id", async (req, res) => {
  try {
    //Find the user with the provided ID
    const user = await User.findById(req.params.id);
    //If no user is found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //If the user is found, return a 200 OK response with the user details
    res.status(200).json({ message: "User found", user });
  } catch (err) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
});

/*

Update user profile


*/
//Update user profile
router.put("/:id", async (req, res) => {
  //Destructure required fields from the request body
  const { username, email, password } = req.body;

  //Check if all required fields are provided
  if (!username || !email || !password) {
    // If any field is missing, return a 400 Bad Request response
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  try {
    //generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    //Find the user with the provided ID
    const user = await User.findById(req.params.id);
    //If no user is found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Update the user details with the provided and processed data
    user.username = username;
    user.email = email;
    user.passwordHash = hashedPassword;

    //Save the updated user details to the database
    const updatedUser = await user.save();
    // If the save is successful, return a 200 OK response with the updated user details
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
});

/*


Delete a User


*/
// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the user with the provided ID
    const result = await User.findByIdAndDelete(req.params.id);

    // If no user is found, return a 404 Not Found response
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the deletion is successful, return a 200 OK response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
