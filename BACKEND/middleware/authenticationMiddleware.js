import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"; // Adjust path as needed

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user based on the decoded token (you can also fetch the username here)
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Attach user data (like userName) to request object
    req.user = user; // this contains userName and other user details

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Authentication failed." });
  }
};
