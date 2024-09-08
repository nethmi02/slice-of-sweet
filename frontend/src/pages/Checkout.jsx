import React, { useState } from 'react';
import Ordersummary from '../components/Ordersummary';
import Delivery from '../pages_old/order/Delivery';
import { Stack } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import cart from '../cart';
import axios from 'axios';

const Checkout = () => {
  const [items, setItems] = useState(cart.getItems());

  const handlePlaceOrder = async (deliveryAddress) => {
    const orderData = {
      items,
      deliveryAddress,
      totalPrice: cart.getTotalPrice()
    };

    try {
      const response = await axios.post('http://localhost:3001/order', orderData);
      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <Typography component='h1' variant='h5' sx={{ marginLeft: 50, fontSize: 100 }}>Checkout</Typography>
      <Grid container columnSpacing={2}>
        <Grid item md={8}>
          <Delivery onPlaceOrder={handlePlaceOrder} />
        </Grid>
        <Grid item md={4}>
          <Ordersummary items={items} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
