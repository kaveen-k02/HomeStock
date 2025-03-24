import mongoose from "mongoose";

const ShoppingListSchema = mongoose.Schema({

    itemName : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    unit : {
        type : String,
        required : true
    },

    addedDate : {
        type : Date,
        required : true
    },

    estimatedPrice : {
        type : Number,
        required : true
    },

})

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;