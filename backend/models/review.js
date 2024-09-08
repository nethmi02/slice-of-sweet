const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemCode: {
      type: String,
      required: true,
    },
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
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "submissionTime", updatedAt: "updatedTime" } }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
