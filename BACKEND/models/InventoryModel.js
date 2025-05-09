import mongoose from "mongoose";

// Define the stock entry sub-schema
const StockEntrySchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be negative']
    },
    expiryDate: {
        type: Date,
        required: true
    }
});

// Counter schema for auto-incrementing product IDs
const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', CounterSchema);

// Define the main Inventory schema
const InventorySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    productID: {
        type: Number,
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    unit: {
        type: String,
        required: [true, 'Unit is required'],
        trim: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now
    },
    purchasePrice: {
        type: Number,
        required: [true, 'Purchase price is required'],
        min: [0, 'Purchase price cannot be negative']
    },
    stock: {
        type: [StockEntrySchema],
        required: true,
        validate: {
            validator: function(stockArray) {
                return stockArray.length > 0;
            },
            message: 'At least one stock entry is required'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for calculating total quantity across all stock entries
InventorySchema.virtual('totalQuantity').get(function() {
    return this.stock.reduce((total, entry) => total + entry.quantity, 0);
});

// Virtual for calculating total value of this inventory item
InventorySchema.virtual('totalValue').get(function() {
    return this.totalQuantity * this.purchasePrice;
});

// Pre-save middleware to generate productID and update lastUpdated
InventorySchema.pre('save', async function(next) {
    if (!this.productID) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                'productID',
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.productID = counter.seq;
        } catch (error) {
            return next(error);
        }
    }
    this.lastUpdated = new Date();
    next();
});

const Inventory = mongoose.model('Inventory', InventorySchema);
export default Inventory;