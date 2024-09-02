const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    tasteRating: {
      type: Number,
      required: true,
    },
    lookRating: {
      type: Number,
      required: true,
    },
    valueRating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
