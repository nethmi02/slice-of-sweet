const express = require("express");
const router = express.Router();
const Review = require("../models/review"); // Adjust path as needed

// POST endpoint to create a new review
router.post("/", async (req, res) => {
  console.log("Creating a new review");
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to fetch all reviews
router.get("/", async (req, res) => {
  console.log("Fetching all reviews");
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE endpoint to delete a review by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting review with ID: ${id}`);
  try {
    const review = await Review.findByIdAndDelete(id);
    if (review) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: error.message });
  }
});

// PATCH endpoint to toggle review visibility
router.patch("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  console.log(`Toggling visibility for review with ID: ${id}`);
  try {
    const review = await Review.findById(id);
    if (review) {
      review.hidden = !review.hidden; // Toggle visibility
      await review.save();
      res.status(200).json({ message: "Review visibility updated", review });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error toggling review visibility:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
