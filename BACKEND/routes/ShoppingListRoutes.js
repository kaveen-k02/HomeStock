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