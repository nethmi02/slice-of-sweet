import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./CustomerReview.css"; // Import the CSS file

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/reviews");
        if (response.ok) {
          const data = await response.json();
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

  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/reviews/${id}/toggle`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
      [...prevReviews].sort(
        (a, b) => new Date(b.submissionTime) - new Date(a.submissionTime)
      )
    );
  };

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Taste</TableCell>
              <TableCell>Look</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Hide/Unhide</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow
                key={review._id}
                className={review.hidden ? "hidden-row" : ""}
              >
                <TableCell>{review.userName}</TableCell>
                <TableCell>{review.itemCode}</TableCell>
                <TableCell>
                  <Rating
                    name="taste-rating"
                    value={review.tasteRating}
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <Rating
                    name="look-rating"
                    value={review.lookRating}
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <Rating
                    name="value-rating"
                    value={review.valueRating}
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  {new Date(review.submissionTime).toLocaleDateString()} <br />
                  {new Date(review.submissionTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={review.hidden ? "success" : "warning"}
                    onClick={() =>
                      handleToggleVisibility(review._id, review.hidden)
                    }
                    className={`btn ${review.hidden ? "unhide" : "hide"}`}
                  >
                    {review.hidden ? "Unhide" : "Hide"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteReview(review._id)}
                    className="btn delete"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminReviewPage;
