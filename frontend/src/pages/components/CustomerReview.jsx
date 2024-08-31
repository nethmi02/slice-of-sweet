// CustomerReview.jsx
import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";

const CustomerReview = () => {
  const [tasteRating, setTasteRating] = useState(0);
  const [lookRating, setLookRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission, such as sending data to the server or displaying it
    console.log({
      tasteRating,
      lookRating,
      valueRating,
      comment,
    });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, mt: 18 }}>
      <Typography variant="h3" gutterBottom>
        Rate Your Order
      </Typography>

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
