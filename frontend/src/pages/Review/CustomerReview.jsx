import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import { fetchReview, isEditable, submitReview } from "./EditReview";

const CustomerReview = ({ userName, itemId }) => {
  const [tasteRating, setTasteRating] = useState(0);
  const [lookRating, setLookRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submissionTime, setSubmissionTime] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  // Fetch user and item info when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const review = await fetchReview(itemId, userName);
        if (review && isEditable(review.submissionTime)) {
          setTasteRating(review.tasteRating);
          setLookRating(review.lookRating);
          setValueRating(review.valueRating);
          setComment(review.comment);
          setSubmissionTime(review.submissionTime);
          setReviewId(review._id);
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching user or item info", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      tasteRating,
      lookRating,
      valueRating,
      comment,
      submissionTime: new Date().toISOString(),
      userName,
      itemCode: itemId,
    };

    const success = await submitReview(reviewData);
    if (success) {
      // Reset form after submission
      setTasteRating(0);
      setLookRating(0);
      setValueRating(0);
      setComment("");
      setIsEditMode(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, mt: 18 }}>
      <Typography variant="h3" gutterBottom>
        {isEditMode ? "Edit Your Review" : "Rate Your Order"}
      </Typography>

      {/* Display User and Item Information */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        Reviewing item with ID: <strong>{itemId}</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Logged in as: <strong>{userName}</strong>
      </Typography>

      {/* Taste Rating */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Taste</Typography>
        <Rating
          name="taste-rating"
          value={tasteRating}
          onChange={(event, newValue) => setTasteRating(newValue)}
        />
      </Box>

      {/* Look Rating */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Look</Typography>
        <Rating
          name="look-rating"
          value={lookRating}
          onChange={(event, newValue) => setLookRating(newValue)}
        />
      </Box>

      {/* Value Rating */}
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Value for the Price</Typography>
        <Rating
          name="value-rating"
          value={valueRating}
          onChange={(event, newValue) => setValueRating(newValue)}
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

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isEditMode ? "Update Review" : "Submit Review"}
      </Button>
    </Box>
  );
};

export default CustomerReview;
