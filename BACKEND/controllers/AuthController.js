import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";  

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate input fields
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Create new user instance
    const newUser = new User({
      userName,
      email,
      password, // Hashing will be handled by pre-save hook in the model
    });

    // Save the new user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Create JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ 
      token, 
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      message: "Login successful!" 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
