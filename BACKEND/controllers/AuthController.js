import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Signup function
export const signup = async (req, res) => {
  const { userName, email, password, permanentLocation } = req.body;

  // Validate permanentLocation format
  if (
    !permanentLocation ||
    permanentLocation.type !== "Point" ||
    !Array.isArray(permanentLocation.coordinates)
  ) {
    return res.status(400).json({ error: "Invalid location format" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Create and save user (password will be hashed in User model)
    const newUser = new User({
      userName,
      email,
      password, // Raw password — model hashes it
      permanentLocation: {
        type: "Point",
        coordinates: permanentLocation.coordinates,
      },
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Server error during registration" });
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send userName along with token
    res.status(200).json({ token, userName: user.userName, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
