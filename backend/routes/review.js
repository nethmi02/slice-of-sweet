const express = require("express");
const router = express.Router();
const Review = require("../models/review"); // Adjust path as needed

// POST endpoint to create a new review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
