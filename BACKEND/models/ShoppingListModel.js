// import mongoose from "mongoose";

// const ShoppingListSchema = mongoose.Schema({

//     itemName : {
//         type : String,
//         required : true
//     },

//     category : {
//         type : String,
//         required : true
//     },

//     quantity : {
//         type : Number,
//         required : true
//     },

//     unit : {
//         type : String,
//         required : true
//     },

//     addedDate : {
//         type : Date,
//         required : true
//     },

//     // estimatedPrice : {
//     //     type : Number,
//     //     required : true
//     // },

// })

// const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);
// export default ShoppingList;



import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: ["liters", "kilograms", "pieces", "others"],
    },
});

const ShoppingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Untitled Shopping List",
    },
    items: [ItemSchema],
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);
export default ShoppingList;