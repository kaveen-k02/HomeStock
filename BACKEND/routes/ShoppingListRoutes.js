// import express from "express";
// import ShoppingList from "../models/ShoppingListModel.js";

// const router = express.Router();

// //Utility function to format the date
// const formatDate = (date) => {
//     return date.toISOString().split('T')[0]; 
// };

// // CREATE OPERATION
// //http://localhost:8070/ShoppingList/add
// //Adds a new shopping list item to the database
// router.route("/add").post(async (req, res) => {
//     try {
//         const { itemName, category, unit, quantity, estimatedPrice, addedDate } = req.body;
//         const formattedDate = addedDate ? new Date(addedDate) : new Date(); //Validate date format
//         if (isNaN(formattedDate.getTime())) {
//             return res.status(400).json({ error: "Invalid date format" });
//         }

//         //Create a new shopping list document
//         const newShoppingList = new ShoppingList({
//             itemName,
//             category,
//             quantity: Number(quantity),
//             unit,
//             addedDate: formatDate(formattedDate),
//             estimatedPrice: Number(estimatedPrice),
//         });

//         //Save to database
//         await newShoppingList.save();
//         res.json({ message: "Shopping list added successfully!" });
//     } catch (error) {
//         console.error("Error adding shopping list:", error);
//         res.status(500).json({ error: "Something went wrong" });
//     }
// });

// // READ OPERATION (Get all items)
// //http://localhost:8070/ShoppingList
// //Retrieves all shopping list items from the database
// router.route("/").get(async (req, res) => {
//     try {
//         const shoppingLists = await ShoppingList.find();
//         res.status(200).json(shoppingLists); //Send the fetched data as a response
//     } catch (error) {
//         console.error("Error fetching shopping lists:", error);
//         res.status(500).json({ error: "Failed to fetch shopping lists" });
//     }
// });

// // UPDATE OPERATION
// //http://localhost:8070/ShoppingList/update/id
// router.route("/update/:id").put(async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { itemName, category, quantity, unit, addedDate, estimatedPrice } = req.body;

//         const updatedData = {
//             itemName,
//             category,
//             quantity: Number(quantity),
//             unit,
//             addedDate: formatDate(new Date(addedDate || new Date())),
//             estimatedPrice: Number(estimatedPrice),
//         };

//         const updatedItem = await ShoppingList.findByIdAndUpdate(id, updatedData, { new: true }); //Find and update the shopping list item
//         if (!updatedItem) return res.status(404).json({ error: "Shopping list item not found" }); //Check if item exists

//         //Send success response
//         res.status(200).json({ message: "Shopping list updated successfully!", updatedItem });
//     } catch (error) {
//         console.error("Error updating shopping list:", error);
//         res.status(500).json({ error: "Failed to update shopping list" });
//     }
// });

// // DELETE OPERATION
// //http://localhost:8070/ShoppingList/delete/id
// router.route("/delete/:id").delete(async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedItem = await ShoppingList.findByIdAndDelete(id); //Find and delete the shopping list item
//         if (!deletedItem) return res.status(404).json({ error: "Shopping list item not found" }); //Check if the item was found and deleted

//         //Send success response
//         res.status(200).json({ message: "Shopping list item deleted successfully!", deletedItem });
//     } catch (error) {
//         console.error("Error deleting shopping list item:", error);
//         res.status(500).json({ error: "Failed to delete shopping list item" });
//     }
// });

// // GET OPERATION (Get a specific item by ID)
// //http://localhost:8070/ShoppingList/get/id
// router.route("/get/:id").get(async (req, res) => {
//     try {
//         const { id } = req.params;
//         const shoppingListItem = await ShoppingList.findById(id); //Find the shopping list item by its ID
//         if (!shoppingListItem) return res.status(404).json({ error: "Shopping list item not found" }); //Check if the item exists

//         //Send the fetched item as a response
//         res.status(200).json({ message: "Shopping list fetched successfully!", shoppingListItem });
//     } catch (error) {
//         console.error("Error fetching shopping list item:", error);
//         res.status(500).json({ error: "Failed to fetch shopping list item" });
//     }
// });

// // GET OPERATION (Get all shopping list items from the database)
// // http://localhost:8070/ShoppingList/all
// router.route("/all").get(async (req, res) => {
//     try {
//         const shoppingLists = await ShoppingList.find();
//         res.status(200).json(shoppingLists);
//     } catch (error) {
//         console.error("Error fetching shopping lists:", error);
//         res.status(500).json({ error: "Failed to fetch shopping lists" });
//     }
// });

// export default router;



import express from "express";
import ShoppingList from "../models/ShoppingListModel.js";

const router = express.Router();

// Utility function to format the date
const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

// CREATE OPERATION - Create a new shopping list
// http://localhost:8070/ShoppingList/add
router.route("/add").post(async (req, res) => {
    try {
        const { title, items } = req.body;

        // Validate items
        if (items && !Array.isArray(items)) {
            return res.status(400).json({ error: "Items must be an array" });
        }

        const newShoppingList = new ShoppingList({
            title: title || "Untitled Shopping List",
            items: items || [],
            createdDate: formatDate(new Date()),
        });

        await newShoppingList.save();
        res.status(201).json({ message: "Shopping list created successfully!", shoppingList: newShoppingList });
    } catch (error) {
        console.error("Error creating shopping list:", error);
        res.status(500).json({ error: "Failed to create shopping list" });
    }
});

// ADD ITEM TO EXISTING LIST
// http://localhost:8070/ShoppingList/addItem/:id
router.route("/addItem/:id").post(async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, category, quantity, unit } = req.body;

        const shoppingList = await ShoppingList.findById(id);
        if (!shoppingList) {
            return res.status(404).json({ error: "Shopping list not found" });
        }

        shoppingList.items.push({
            itemName,
            category,
            quantity: Number(quantity),
            unit,
        });

        await shoppingList.save();
        res.status(200).json({ message: "Item added successfully!", shoppingList });
    } catch (error) {
        console.error("Error adding item to shopping list:", error);
        res.status(500).json({ error: "Failed to add item" });
    }
});

// READ OPERATION - Get all shopping lists
// http://localhost:8070/ShoppingList/all
router.route("/all").get(async (req, res) => {
    try {
        const shoppingLists = await ShoppingList.find();
        res.status(200).json(shoppingLists);
    } catch (error) {
        console.error("Error fetching shopping lists:", error);
        res.status(500).json({ error: "Failed to fetch shopping lists" });
    }
});

// READ OPERATION - Get a specific shopping list by ID
// http://localhost:8070/ShoppingList/get/:id
router.route("/get/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const shoppingList = await ShoppingList.findById(id);
        if (!shoppingList) {
            return res.status(404).json({ error: "Shopping list not found" });
        }
        res.status(200).json(shoppingList);
    } catch (error) {
        console.error("Error fetching shopping list:", error);
        res.status(500).json({ error: "Failed to fetch shopping list" });
    }
});

// UPDATE OPERATION - Update a shopping list (title or items)
// http://localhost:8070/ShoppingList/update/:id
router.route("/update/:id").put(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, items } = req.body;

        const shoppingList = await ShoppingList.findById(id);
        if (!shoppingList) {
            return res.status(404).json({ error: "Shopping list not found" });
        }

        if (title) shoppingList.title = title;
        if (items && Array.isArray(items)) shoppingList.items = items;

        await shoppingList.save();
        res.status(200).json({ message: "Shopping list updated successfully!", shoppingList });
    } catch (error) {
        console.error("Error updating shopping list:", error);
        res.status(500).json({ error: "Failed to update shopping list" });
    }
});

// UPDATE OPERATION - Update a specific item in a shopping list
// http://localhost:8070/ShoppingList/updateItem/:listId/:itemId
router.route("/updateItem/:listId/:itemId").put(async (req, res) => {
    try {
        const { listId, itemId } = req.params;
        const { itemName, category, quantity, unit } = req.body;

        const shoppingList = await ShoppingList.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Shopping list not found" });
        }

        const item = shoppingList.items.id(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        item.itemName = itemName || item.itemName;
        item.category = category || item.category;
        item.quantity = quantity ? Number(quantity) : item.quantity;
        item.unit = unit || item.unit;

        await shoppingList.save();
        res.status(200).json({ message: "Item updated successfully!", shoppingList });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Failed to update item" });
    }
});

// DELETE OPERATION - Delete a shopping list
// http://localhost:8070/ShoppingList/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedList = await ShoppingList.findByIdAndDelete(id);
        if (!deletedList) {
            return res.status(404).json({ error: "Shopping list not found" });
        }
        res.status(200).json({ message: "Shopping list deleted successfully!" });
    } catch (error) {
        console.error("Error deleting shopping list:", error);
        res.status(500).json({ error: "Failed to delete shopping list" });
    }
});

// DELETE OPERATION - Delete a specific item from a shopping list
// http://localhost:8070/ShoppingList/deleteItem/:listId/:itemId
router.route("/deleteItem/:listId/:itemId").delete(async (req, res) => {
    try {
        const { listId, itemId } = req.params;
        const shoppingList = await ShoppingList.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Shopping list not found" });
        }

        const item = shoppingList.items.id(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        shoppingList.items.pull(itemId);
        await shoppingList.save();
        res.status(200).json({ message: "Item deleted successfully!", shoppingList });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

export default router;