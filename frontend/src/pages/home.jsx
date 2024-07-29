import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const OrderButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});

const WelcomeText = styled(Typography)({
  color: '#000',
});

const HighlightText = styled(Typography)({
  color: '#ff69b4',
});

const Slide = styled(Box)(({ bgImage }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
}));

const ReviewCard = styled(Paper)(({ bgImage }) => ({
  padding: '20px',
  margin: '20px',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const reviews = [
{
  name:"Luke J",
  text: "I ordered a custom cake for my daughter's birthday and it was amazing! The cake was delicious and the design was exactly what I wanted. I will definitely be ordering from Slice-of-Sweet again!",
  rating: 5,
  bgImage: "/r.png",
},
{
  name:"Veronica W",
  text: " Excellent experience. Service was great and the cupcakes were just as good! I've had cupcakes from a lot of different places and this one takes the cake... Would absolutely recommend and I will come back if I'm ever in the area again.",
  rating: 4,
  bgImage: "/r.png",
},

{
  name:"Amanda C",
  text: "Best cupcakes I've ever had! I ordered a dozen for my daughter's birthday party and they were a hit. The kids loved them and the parents were impressed. I will definitely be ordering from Slice-of-Sweet again!",
  rating: 4,
  bgImage: "/r.png",
},
];


const Home = () => {
  return (
    <div>
      <Box sx={{ width: '100%', textAlign: 'center', position: 'relative', top: '80px' }}>
        <video width="100%" height="auto" controls autoPlay>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Container sx={{ mt: '120px' }}>
        <Grid container spacing={3} sx={{ my: 4, alignItems: 'center' }}>
          <Grid item xs={12} sm={6}>
            <img src="/bg1.png" alt="Description" width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
            <WelcomeText variant="h3" component="h1" gutterBottom>
              Welcome to
            </WelcomeText>
            <HighlightText variant="h4" component="span">SLICE-OF-SWEET</HighlightText>
            <Typography variant="h6" component="p" gutterBottom>
              Celebrate every moment with our delicious, custom cakes. Order online and enjoy fresh, high-quality ingredients delivered right to your door. Your perfect cake is just a click away!
            </Typography>
            <OrderButton variant="contained" component={Link} to="/order">
              Order Now
            </OrderButton>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ my: 4, alignItems: 'center' }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Our Mission
              </Typography>
              <HighlightText variant="h4" component="span">FINEST CAKE EXPERIENCE</HighlightText>
              <Typography variant="h6" component="p" gutterBottom>
                To use creative flavors, quality ingredients, and friendly service to provide the finest cupcake & cakes experience worthy of returning and recommending.
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
              <OrderButton variant="contained" component={Link} to="/menu" sx={{ml: 2}}>
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
              <OrderButton variant="contained" component={Link} to="/order">
                Customize Now
              </OrderButton>
            </Slide>
          </Carousel>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
          <Typography variant='h4' component='h2' gutterBottom>
            Customer Reviews
          </Typography>
          <Grid container spacing = {3} justifyContent="center">
            {reviews.map((review, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <ReviewCard bgImage = {review.bgImage}>
                  <Typography varient ="h4">{review.name}</Typography>
                  <Rating value = {review.rating} readOnly 
                    sx={{ color: '#9b2226',}}
                  />
                  <Typography varient ="body1">{review.text}</Typography>
                </ReviewCard>
              </Grid>
            ))}
          </Grid>
          </Box>
      </Container>
    </div>
  );
};

export default Home;
