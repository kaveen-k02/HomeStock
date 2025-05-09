import Inventory from '../models/InventoryModel.js';
import Wastage from '../models/WastageModel.js';

// Helper function to normalize date (set time to 00:00)
const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Reset the time to 00:00
    return normalizedDate;
};

export const saveExpiredToWastage = async (req, res) => {
    try {
        const today = normalizeDate(new Date()); // Normalize today's date
        console.log("Today Date:", today);

        // Fetch expired products from Inventory
        const expiredInventory = await Inventory.find({
            'stock.expiryDate': { $lte: today }
        });

        const formattedData = expiredInventory.flatMap(item =>
            item.stock
                .filter(stockEntry => normalizeDate(stockEntry.expiryDate) <= today)
                .map(stockEntry => ({
                    productName: item.productName,
                    category: item.category,
                    wastedQuantity: stockEntry.quantity,
                    unit: item.unit,
                    expiredDate: stockEntry.expiryDate
                }))
        );

        console.log("Formatted Data:", formattedData);

        if (formattedData.length === 0) {
            return res.status(404).json({
                message: "No expired products found to save to wastage."
            });
        }

        // Prepare the bulk operations for saving expired items to Wastage collection
        const operations = formattedData.map(data => ({
            updateOne: {
                filter: {
                    productName: data.productName,
                    category: data.category,
                    expiredDate: data.expiredDate
                },
                update: { $setOnInsert: data },
                upsert: true
            }
        }));

        // Bulk write to Wastage collection
        const result = await Wastage.bulkWrite(operations);
        console.log("Bulk Write Result:", result);

        // After saving, fetch both expired products and saved wastage items
        const expiredInventoryData = expiredInventory.flatMap(item =>
            item.stock
                .filter(stockEntry => normalizeDate(stockEntry.expiryDate) <= today)
                .map(stockEntry => ({
                    id: stockEntry._id,
                    productName: item.productName,
                    category: item.category,
                    wastedQuantity: stockEntry.quantity,
                    unit: item.unit,
                    expiredDate: stockEntry.expiryDate
                }))
        );

        const savedItems = await Wastage.find({
            expiredDate: { $lte: today }
        });

        res.status(200).json({
            message: `${result.upsertedCount} expired items saved to wastage.`,
            totalChecked: formattedData.length,
            savedItems, // Newly saved items from Wastage collection
            expiredItems: expiredInventoryData // Expired items from Inventory
        });
    } catch (error) {
        console.error("Error saving expired to wastage:", error);
        res.status(500).json({ message: "Failed to save expired products to wastage" });
    }
};


export const getExpiredProducts = async (req, res) => {
    try {
        const today = normalizeDate(new Date()); // Get today's date without time

        // Fetch expired products from Inventory
        const expiredInventory = await Inventory.find({
            'stock.expiryDate': { $lte: today }
        });

        const formattedData = expiredInventory.flatMap(item =>
            item.stock
                .filter(stockEntry => normalizeDate(stockEntry.expiryDate) <= today)
                .map(stockEntry => ({
                    id: stockEntry._id,
                    productName: item.productName,
                    category: item.category,
                    wastedQuantity: stockEntry.quantity,
                    unit: item.unit,
                    expiredDate: stockEntry.expiryDate
                }))
        );

        // Fetch saved items from Wastage collection (newly saved items)
        const savedItems = await Wastage.find({
            expiredDate: { $lte: today }
        });

        const expiredCount = formattedData.length;
        const savedCount = savedItems.length;

        res.status(200).json({
            count: expiredCount + savedCount, // Total count including saved and expired items
            expiredItems: formattedData,     // Expired items from Inventory
            savedItems: savedItems           // Newly saved items from Wastage
        });
    } catch (error) {
        console.error('Error fetching expired products:', error);
        res.status(500).json({ message: 'Failed to fetch expired products' });
    }
};
