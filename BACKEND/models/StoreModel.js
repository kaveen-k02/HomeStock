import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["supermarket", "grocery"], required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

StoreSchema.index({ location: "2dsphere" });

const Store = mongoose.model("Store", StoreSchema);
export default Store;