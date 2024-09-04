// CustomerReview.jsx
import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";

const CustomerReview = () => {
  const [tasteRating, setTasteRating] = useState(0);
  const [lookRating, setLookRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [comment, setComment] = useState("");
  const [itemCode, setItemCode] = useState(""); // State for item code
  const [submissionTime] = useState(new Date().toISOString()); // State for submission time
  const [userName, setUserName] = useState(""); // State for user name

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      tasteRating,
      lookRating,
      valueRating,
      comment,
      itemCode,
      submissionTime,
      userName,
    };

    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log("Review submitted successfully!");
        // Clear form fields
        setTasteRating(0);
        setLookRating(0);
        setValueRating(0);
        setComment("");
        setItemCode(""); // Clear item code
        setUserName(""); // Clear user name
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, mt: 18 }}>
      <Typography variant="h3" gutterBottom>
        Rate Your Order
      </Typography>

      {/* User Name Input */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Box>

      {/* Item Code Input */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Item Code"
          variant="outlined"
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
        />
      </Box>

      {/* Taste Rating */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Taste</Typography>
        <Rating
          name="taste-rating"
          value={tasteRating}
          onChange={(event, newValue) => {
            setTasteRating(newValue);
          }}
        />
      </Box>

      {/* Look Rating */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Look</Typography>
        <Rating
          name="look-rating"
          value={lookRating}
          onChange={(event, newValue) => {
            setLookRating(newValue);
          }}
        />
      </Box>

      {/* Value to Price Rating */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Value for the Price</Typography>
        <Rating
          name="value-rating"
          value={valueRating}
          onChange={(event, newValue) => {
            setValueRating(newValue);
          }}
        />
      </Box>

      {/* Optional Text Review */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Write a review (optional)"
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
};

export default CustomerReview;
