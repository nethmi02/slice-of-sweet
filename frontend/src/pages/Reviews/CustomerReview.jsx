// CustomerReview.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import { fetchReview, isEditable, submitReview } from "./EditReview"; // Import service functions

const CustomerReview = () => {
  const [tasteRating, setTasteRating] = useState(0);
  const [lookRating, setLookRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [comment, setComment] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [userName, setUserName] = useState("");
  const [submissionTime, setSubmissionTime] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  useEffect(() => {
    const checkExistingReview = async () => {
      if (itemCode && userName) {
        const review = await fetchReview(itemCode, userName);
        if (review && isEditable(review.submissionTime)) {
          setTasteRating(review.tasteRating);
          setLookRating(review.lookRating);
          setValueRating(review.valueRating);
          setComment(review.comment);
          setSubmissionTime(review.submissionTime);
          setReviewId(review.id);
          setIsEditMode(true); // Switch to edit mode if within 7 days
        }
      }
    };
    checkExistingReview();
  }, [itemCode, userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      id: reviewId, // Use this if it's an update
      tasteRating,
      lookRating,
      valueRating,
      comment,
      itemCode,
      submissionTime: new Date().toISOString(),
      userName,
    };

    const success = await submitReview(reviewData, isEditMode);
    if (success) {
      // Reset form after submission
      setTasteRating(0);
      setLookRating(0);
      setValueRating(0);
      setComment("");
      setItemCode("");
      setUserName("");
      setIsEditMode(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, mt: 18 }}>
      <Typography variant="h3" gutterBottom>
        {isEditMode ? "Edit Your Review" : "Rate Your Order"}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Item Code"
          variant="outlined"
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Taste</Typography>
        <Rating
          name="taste-rating"
          value={tasteRating}
          onChange={(event, newValue) => setTasteRating(newValue)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Look</Typography>
        <Rating
          name="look-rating"
          value={lookRating}
          onChange={(event, newValue) => setLookRating(newValue)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Value for the Price</Typography>
        <Rating
          name="value-rating"
          value={valueRating}
          onChange={(event, newValue) => setValueRating(newValue)}
        />
      </Box>

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

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isEditMode ? "Update Review" : "Submit Review"}
      </Button>
    </Box>
  );
};

export default CustomerReview;
