// CustomerReview.jsx
import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      tasteRating: 4,
      lookRating: 5,
      valueRating: 3,
      comment: "Great product!",
      hidden: false,
      postedTime: new Date("2022-01-01T10:00:00Z"),
      userName: "John Doe",
    },
    {
      id: 2,
      tasteRating: 3,
      lookRating: 2,
      valueRating: 4,
      comment: "Could be better.",
      hidden: false,
      postedTime: new Date("2022-01-02T14:30:00Z"),
      userName: "Jane Smith",
    },
    {
      id: 3,
      tasteRating: 5,
      lookRating: 5,
      valueRating: 5,
      comment: "Amazing!",
      hidden: false,
      postedTime: new Date("2022-01-03T09:15:00Z"),
      userName: "Mike Johnson",
    },
  ]);

  const handleHideReview = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, hidden: true } : review
      )
    );
  };

  const handleDeleteReview = (id) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
  };

  const handleSortByRating = () => {
    setReviews((prevReviews) =>
      [...prevReviews].sort(
        (a, b) =>
          b.tasteRating +
          b.lookRating +
          b.valueRating -
          (a.tasteRating + a.lookRating + a.valueRating)
      )
    );
  };

  const sortByPostedTime = () => {
    setReviews((prevReviews) =>
      [...prevReviews].sort((a, b) => b.postedTime - a.postedTime)
    );
  };

  const sortByUserName = () => {
    setReviews((prevReviews) =>
      [...prevReviews].sort((a, b) => a.userName.localeCompare(b.userName))
    );
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2, mt: 18 }}>
      <Typography variant="h3" gutterBottom>
        Manage Reviews
      </Typography>

      {/* Sort Buttons */}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleSortByRating}>
          Sort by Rating
        </Button>
        <Button variant="contained" onClick={sortByPostedTime}>
          Sort by Posted Time
        </Button>
        <Button variant="contained" onClick={sortByUserName}>
          Sort by User Name
        </Button>
      </Box>

      {/* Reviews */}
      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
            p: 2,
            backgroundColor: review.hidden ? "#f2f2f2" : "inherit",
          }}
        >
          <Typography sx={{ fontSize: "small", opacity: 0.6 }}>
            Posted Time: {review.postedTime.toString()}
          </Typography>

          <Typography sx={{ fontSize: "small", opacity: 0.6 }}>
            User Name: {review.userName}
          </Typography>

          <Typography component="legend">Taste</Typography>
          <Rating name="taste-rating" value={review.tasteRating} readOnly />

          <Typography component="legend">Look</Typography>
          <Rating name="look-rating" value={review.lookRating} readOnly />

          <Typography component="legend">Value for the Price</Typography>
          <Rating name="value-rating" value={review.valueRating} readOnly />

          <Typography sx={{ fontSize: "small", opacity: 0.6 }}>
            {review.comment}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleHideReview(review.id)}
          >
            Hide
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteReview(review.id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default AdminReviewPage;
