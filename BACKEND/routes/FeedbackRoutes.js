import express from 'express';
import Feedback from "../models/FeedbackModel.js";
import Inventory from "../models/InventoryModel.js";


const router = express.Router();

// Create Feedback
router.post("/", async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const product = await Inventory.findById(productId);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const feedback = new Feedback({
     
      productId,
      productName: product.productName,
      rating,
      comment,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Feedbacks by User ID
router.get("/user/:userId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.params.userId });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Feedback by ID
router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Feedback
router.put("/:id", async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    );
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Feedback
router.delete("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });

    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;