import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    // Optional human-readable address
    address: {
      type: String,
      trim: true,
    },
    // Store the user's location as GeoJSON
    permanentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required:true,
        validate: {
          validator: function (coords) {
            return coords.length === 2 && coords.every((num) => typeof num === "number");
          },
          message: "Coordinates must be an array of two numbers: [longitude, latitude]",
        },
        default: undefined, // optional by default
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create 2dsphere index for geospatial queries
UserSchema.index({ permanentLocation: "2dsphere" });

// Optionally hash password before saving (if needed)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
