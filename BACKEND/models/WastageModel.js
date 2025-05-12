import mongoose from "mongoose";

const WastageSchema = new mongoose.Schema({
    
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    wastedQuantity: {
        type: Number,
        required: true,
        min: [1, "Wasted quantity must be at least 1"]
    },
    unit: {
        type: String,
        required: [true, "Unit is required"],
        trim: true
    },
    expiredDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Wastage = mongoose.model("Wastage", WastageSchema);
export default Wastage;
