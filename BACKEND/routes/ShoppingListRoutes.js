const router = require("express").Router();
const ShoppingList = require("../models/ShoppingListModels");

//Utility function to format the date
const formatDate = (date) => {
    return date.toISOString().split('T')[0]; 
};

//CREATE OPERATION
//http://localhost:8070/ShoppingList/add
//Adds a new shopping list item to the database
router.route("/add").post((req, res) => {
    try {
        const { itemName, category, unit } = req.body;
        const quantity = Number(req.body.quantity);
        const estimatedPrice = Number(req.body.estimatedPrice);

        //Format the addedDate
        let addedDate = req.body.addedDate ? new Date(req.body.addedDate) : new Date(); //Default to current date

        //Validate date format
        if (isNaN(addedDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        //Format the date to "YYYY-MM-DD"
        addedDate = formatDate(addedDate); 

        //Create a new shopping list document
        const newShoppingList = new ShoppingList({
            itemName,
            category,
            quantity,
            unit,
            addedDate,
            estimatedPrice,
        });

        //Save to database
        newShoppingList.save()
            .then(() => res.json({ message: "Shopping list added successfully!" }))
            .catch((err) => {
                console.error("Database error:", err);
                res.status(500).json({ error: "Failed to save shopping list" });
            });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


//READ OPERATION
//http://localhost:8070/ShoppingList
//Retrieves all shopping list items from the database
router.route("/").get(async (req, res) => {
    try {
        //Fetch all shopping list items from the database
        const shoppingLists = await ShoppingList.find();
        
        //Send the fetched data as a response
        res.status(200).json(shoppingLists);
    } catch (err) {
        console.error("Error fetching shopping lists:", err);
        res.status(500).json({ error: "Failed to fetch shopping lists" });
    }
});


//UPDATE OPERATION
//http://localhost:8070/ShoppingList/update/id
router.route("/update/:id").put(async (req, res) => {
    try {
        const slID = req.params.id; //Extract the ShoppingList item ID from URL parameters
        const { itemName, category, quantity, unit, addedDate, estimatedPrice } = req.body;

        const updatedData = {
            itemName,
            category,
            quantity: Number(quantity),
            unit,
            addedDate: addedDate ? new Date(addedDate) : new Date(), //Convert to Date object
            estimatedPrice: Number(estimatedPrice),
        };

        //Validate date format
        if (isNaN(updatedData.addedDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        //Format the date to "YYYY-MM-DD"
        updatedData.addedDate = formatDate(updatedData.addedDate);

        //Find and update the shopping list item
        const updatedItem = await ShoppingList.findByIdAndUpdate(slID, updatedData, { new: true });

        //Check if item exists
        if (!updatedItem) {
            return res.status(404).json({ error: "Shopping list item not found" });
        }

        //Send success response
        res.status(200).json({ message: "Shopping list updated successfully!", updatedItem });

    } catch (error) {
        console.error("Error updating shopping list:", error);
        res.status(500).json({ error: "Failed to update shopping list" });
    }
});


//DELETE OPERATION
//http://localhost:8070/ShoppingList/delete/id
router.route("/delete/:id").delete(async (req, res) => {
    try {
        const slID = req.params.id; //Extract the ShoppingList item ID from URL parameters
    
        //Find and delete the shopping list item
        const deletedItem = await ShoppingList.findByIdAndDelete(slID);
    
        //Check if the item was found and deleted
        if (!deletedItem) {
            return res.status(404).json({ error: "Shopping list item not found" });
        }
    
        //Send success response
        res.status(200).json({ message: "Shopping list item deleted successfully!", deletedItem });
    
    } catch (error) {
        console.error("Error deleting shopping list item:", error);
        res.status(500).json({ error: "Failed to delete shopping list item" });
    }
});


//GET OPERATION (To fetch a specific item by ID)
//http://localhost:8070/ShoppingList/get/id
router.route("/get/:id").get(async (req, res) => {
    try {
        const slID = req.params.id; //Extract the ShoppingList item ID from URL parameters

        //Find the shopping list item by its ID
        const shoppingListItem = await ShoppingList.findById(slID);

        //Check if the item exists
        if (!shoppingListItem) {
            return res.status(404).json({ error: "Shopping list item not found" });
        }

        //Send the fetched item as a response
        res.status(200).json({ message: "Shopping list fetched successfully!", shoppingListItem });

    } catch (error) {
        console.error("Error fetching shopping list item:", error);
        res.status(500).json({ error: "Failed to fetch shopping list item" });
    }
});

module.exports = router;