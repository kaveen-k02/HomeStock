import express from 'express';
import Inventory from '../models/InventoryModel.js';

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new inventory item
router.post('/', async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update inventory item
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const updatedItem = await Inventory.findByIdAndUpdate(
            id,
            { ...updates, lastUpdated: new Date() },
            { new: true, runValidators: true }
        );
        
        if (!updatedItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Inventory.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/inventory/summary
router.get('/summary', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();

        let totalCount = 0;
        const categoryMap = {};

        inventoryItems.forEach(item => {
            totalCount += item.totalQuantity;

            if (categoryMap[item.category]) {
                categoryMap[item.category] += item.totalQuantity;
            } else {
                categoryMap[item.category] = item.totalQuantity;
            }
        });

        const byCategory = Object.entries(categoryMap).map(([category, value]) => ({
            category,
            value
        }));

        res.json({ totalCount, byCategory });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory summary" });
    }
});

export default router;