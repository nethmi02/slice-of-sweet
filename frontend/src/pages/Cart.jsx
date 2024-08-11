import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import cart from '../cart';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(cart.getItems());
  }, []);

  const handleRemove = (cakeId) => {
    cart.removeCake(cakeId);
    setItems(cart.getItems());
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Proceeding to checkout');
  };

  return (
    <Container sx={{ mt: '120px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" component="div">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="h6" component="div">
                  Price: LKR.{item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2">
          Total Price: LKR.{cart.getTotalPrice()}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
