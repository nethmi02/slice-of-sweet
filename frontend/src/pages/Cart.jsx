import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardActions, TextField } from '@mui/material';
import cart from '../cart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setItems(cart.getItems());
    }, []);

    const handleRemove = (cakeId) => {
        cart.removeCake(cakeId);
        setItems(cart.getItems());
    };

    const handleQuantityChange = (cakeName, value) => {
        let quantity = parseInt(value, 10);
        if (isNaN(quantity) || quantity <= 0) {
            quantity = 1
        }

        cart.changeCakeQuantity(cakeName, quantity);
        setItems([...cart.getItems()]);
    };

    const placeOrder = async () => {
        const response = await fetch("http://localhost:3001/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ items: items, deliveryAddress: deliveryAddress, totalPrice: cart.getTotalPrice() })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Order placed successfully:", data);

            cart.clearCart();
            navigate("/confirm");
        } else {
            console.error("Failed to place order");
        }
    };

    return (
        <Container sx={{ mt: '120px' }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.name}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.description}
                                </Typography>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                                    inputProps={{ min: 1 }}
                                    fullWidth
                                />
                                <Typography variant="h6" component="div">
                                    Price: {item.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" onClick={() => handleRemove(item.name)}>
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <TextField
                label="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2">
                    Total Price: LKR.{cart.getTotalPrice()}
                </Typography>
                <Button variant="contained" color="primary" onClick={placeOrder}>
                    Place order
                </Button>
            </Box>
        </Container>
    );
};

export default Cart;
