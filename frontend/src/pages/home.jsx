import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Styled components
const OrderButton = styled(Button)({
  backgroundColor: "#ff69b4",
  "&:hover": {
    backgroundColor: "#9b2226",
  },
  color: "#fff",
});

const WelcomeText = styled(Typography)({
  color: "#000",
});

const HighlightText = styled(Typography)({
  color: "#ff69b4",
});

const Slide = styled(Box)(({ bgImage }) => ({
  position: "relative",
  width: "100%",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
}));

const ReviewCard = styled(Paper)(({ bgImage }) => ({
  padding: "20px",
  margin: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  maxWidth: "100%",
  backgroundImage: `url(${bgImage || "/default-bg.png"})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "#050806", // Adjust text color for readability
}));

const Home = () => {
  const [reviews, setReviews] = useState([]);

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
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          position: "relative",
          top: "80px",
        }}
      >
        <video width="100%" height="auto" controls autoPlay muted>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Container sx={{ mt: "120px" }}>
        <Grid container spacing={3} sx={{ my: 4, alignItems: "center" }}>
          <Grid item xs={12} sm={6}>
            <img src="/bg1.png" alt="Description" width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
            <WelcomeText variant="h3" component="h1" gutterBottom>
              Welcome to
            </WelcomeText>
            <HighlightText variant="h4" component="span">
              SLICE-OF-SWEET
            </HighlightText>
            <Typography variant="h6" component="p" gutterBottom>
              Celebrate every moment with our delicious, custom cakes. Order
              online and enjoy fresh, high-quality ingredients delivered right
              to your door. Your perfect cake is just a click away!
            </Typography>
            <OrderButton variant="contained" component={Link} to="/Menu">
              Order Now
            </OrderButton>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ my: 4, alignItems: "center" }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Our Mission
              </Typography>
              <HighlightText variant="h4" component="span">
                FINEST CAKE EXPERIENCE
              </HighlightText>
              <Typography variant="h6" component="p" gutterBottom>
                To use creative flavors, quality ingredients, and friendly
                service to provide the finest cupcake & cakes experience worthy
                of returning and recommending.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src="/bg2.png" alt="Mission" width="100%" />
          </Grid>
        </Grid>
        <Box sx={{ my: 4 }}>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <Slide bgImage="/slide1.png">
              <Typography variant="h2" component="h2" gutterBottom>
                WE USE ONLY THE BEST INGREDIENTS
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom>
                HAVE A HUGE VARIETY OF FLAVORS
              </Typography>
              <OrderButton
                variant="contained"
                component={Link}
                to="/menu"
                sx={{ ml: 2 }}
              >
                View Menu
              </OrderButton>
            </Slide>
            <Slide bgImage="/slide2.png">
              <Typography variant="h2" component="h2" gutterBottom>
                CUSTOM CAKES
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom>
                WEDDING CAKES | BIRTHDAY CAKES | THEMED CUPCAKES
              </Typography>
              <OrderButton
                variant="contained"
                component={Link}
                to="/CustomizeCake"
              >
                Customize Now
              </OrderButton>
            </Slide>
          </Carousel>
        </Box>

        {/* Customer Reviews Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 4,
            overflow: "hidden", // Hide scrollbars
            padding: 0,
            position: "relative",
            width: "100%", // Ensure it spans the full width
            height: "auto", // Adjust height based on content
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Customer Reviews
          </Typography>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {reviews.map((review, index) => (
              <div key={index}>
                <ReviewCard>
                  <Typography variant="h6" className="review-item-name">
                    Item Name: {review.itemName}
                  </Typography>
                  <Typography variant="body1" className="review-item-code">
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
                  <Typography component="legend">
                    Value for the Price
                  </Typography>
                  <Rating
                    name="value-rating"
                    value={review.valueRating}
                    readOnly
                    sx={{ mb: 1 }}
                  />
                  <Typography className="review-comment">
                    {review.comment}
                  </Typography>
                </ReviewCard>
              </div>
            ))}
          </Carousel>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
