const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user-model"); // Assuming you have a User model defined

const router = express.Router();

/*

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



/*

Get user profile


*/



/*

Update user profile


*/



/*


Delete a User


*/










module.exports = router;
