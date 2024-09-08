import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import Cart from "../cart";
import CustomerReview from "../pages/Review/CustomerReview"; // Assuming this is the correct import path
import User from "../data/user";

const AddToCartButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});

const Cake = () => {
  const { id } = useParams();
  const [cake, setCake] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cakes/${id}`);
        setCake(response.data);
      } catch (error) {
        console.error('Error fetching cake:', error);
      }
    };

    fetchCake();
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value) || 1));
  };

  const handleAddToCart = () => {
    if (cake) {
      Cart.addCake(cake, quantity);
      alert('Cake added to cart!');
    }
  };

  if (!cake) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: '120px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={cake.image}
              alt={cake.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {cake.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {cake.category}
              </Typography>
              <Typography variant="body1" paragraph>
                {cake.description}
              </Typography>
              <Typography variant="h5" component="p" gutterBottom>
                {cake.price}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1 }}
                  sx={{ mr: 2, width: '100px' }}
                />
                <AddToCartButton
                  variant="contained"
                  onClick={handleAddToCart}
                  sx={{ mt: 2 }}
                >
                  Add to Cart
                </AddToCartButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {User.instance.token && User.instance.email && (
        <CustomerReview userName={User.instance.email} itemId={id} />
      )}
    </Container>
  );
};

export default Cake;