import express from "express";
import Feedback from "../models/FeedbackModel.js";
import Inventory from "../models/InventoryModel.js";

const router = express.Router();

router.get("/top-products", async (req, res) => {
  try {
    const topProducts = await Feedback.aggregate([
      {
        $lookup: {
          from: "inventories",
          localField: "productId",
          foreignField: "_id",
          as: "inventory"
        }
      },
      { $unwind: "$inventory" },
      {
        $group: {
          _id: {
            category: "$inventory.category",
            productId: "$productId",
            productName: "$productName",
            purchasePrice: "$inventory.purchasePrice",
            unit: "$inventory.unit"
          },
          avgRating: { $avg: "$rating" },
          ratingCount: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.category": 1,
          avgRating: -1,
          ratingCount: -1
        }
      },
      {
        $group: {
          _id: "$_id.category",
          topProducts: {
            $push: {
              productId: "$_id.productId",
              productName: "$_id.productName",
              avgRating: "$avgRating",
              ratingCount: "$ratingCount",
              purchasePrice: "$_id.purchasePrice",
              unit: "$_id.unit"
            }
          }
        }
      },
      {
        $project: {
          topProducts: { $slice: ["$topProducts", 3] }
        }
      }
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
