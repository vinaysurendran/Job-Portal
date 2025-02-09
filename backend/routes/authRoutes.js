const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { name, email, password, role } = req.body;

    // Validate required fields (remove !role if using default)
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser .save();

    res.status(201).json({ message: "User  Registered Successfully" });
  } catch (error) {
    console.error("Error Registering User:", error);
    res.status(500).json({ error: "Error Registering User", details: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User Not Found" });

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    // Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});

module.exports = router;
