import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, Button } from "@mui/material";
import "./CustomerReview.css"; // Import the CSS file

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/reviews"); // Update with correct URL
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched reviews:", data); // Log the fetched data
          setReviews(data);
        } else {
          console.error("Failed to fetch reviews. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Toggle review visibility
  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/reviews/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hidden: !currentVisibility }),
        }
      );

      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === id
              ? { ...review, hidden: !currentVisibility }
              : review
          )
        );
      } else {
        console.error("Failed to update review visibility.");
      }
    } catch (error) {
      console.error("Error updating review visibility:", error);
    }
  };

  // Confirm and delete review
  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/reviews/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review._id !== id)
          );
        } else {
          console.error("Failed to delete review.");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  // Sort reviews by rating
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

  // Sort reviews by posted time
  const sortByPostedTime = () => {
    setReviews((prevReviews) =>
      [...prevReviews].sort(
        (a, b) => new Date(b.postedTime) - new Date(a.postedTime)
      )
    );
  };

  // Sort reviews by user name
  const sortByUserName = () => {
    setReviews((prevReviews) =>
      [...prevReviews].sort((a, b) => a.userName.localeCompare(b.userName))
    );
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="review-container">
      <Typography variant="h3" gutterBottom className="header">
        Manage Reviews
      </Typography>

      {/* Sort Buttons */}
      <Box className="sort-buttons">
        <Button
          variant="contained"
          onClick={handleSortByRating}
          className="sort-btn"
        >
          Sort by Rating
        </Button>
        <Button
          variant="contained"
          onClick={sortByPostedTime}
          className="sort-btn posted-time"
        >
          Sort by Date
        </Button>
        <Button
          variant="contained"
          onClick={sortByUserName}
          className="sort-btn user-name"
        >
          Sort by User Name
        </Button>
      </Box>

      {/* Reviews */}
      {reviews.map((review) => (
        <Box
          key={review._id}
          className={`review-card ${review.hidden ? "hidden" : ""}`}
        >
          <Box className="review-header">
            <Typography className="review-user-time">
              {review.userName}
            </Typography>
            <Typography className="review-user-time">
              {new Date(review.postedTime).toLocaleDateString()}{" "}
              {/* Short date format */}
              <br />
              {new Date(review.postedTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              {/* Short time format */}
            </Typography>
          </Box>

          <Typography className="review-item-name">
            Item Name: {review.itemName}
          </Typography>
          <Typography className="review-item-code">
            Item Code: {review.itemCode}
          </Typography>

          <Typography component="legend">Taste</Typography>
          <Rating
            name="taste-rating"
            value={review.tasteRating}
            readOnly
            sx={{ mb: 1 }}
          />

          <Typography component="legend">Look</Typography>
          <Rating
            name="look-rating"
            value={review.lookRating}
            readOnly
            sx={{ mb: 1 }}
          />

          <Typography component="legend">Value for the Price</Typography>
          <Rating
            name="value-rating"
            value={review.valueRating}
            readOnly
            sx={{ mb: 1 }}
          />

          <Typography className="review-comment">{review.comment}</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleToggleVisibility(review._id, review.hidden)}
              className={`btn ${review.hidden ? "unhide" : "hide"}`}
            >
              {review.hidden ? "Unhide" : "Hide"}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteReview(review._id)}
              className="btn delete"
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AdminReviewPage;
