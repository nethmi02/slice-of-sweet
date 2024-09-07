import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent, TextField, Button } from '@mui/material';
import axios from 'axios';
import Cart from '../cart';

const CakeReview = () => {
    const [cake, setCake] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchCake = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/cakes/${cake._id}`);
                setCake(response.data);
            } catch (error) {
                console.error('Error fetching cake details:', error);
            }
        };

        fetchCake();
    }, [cake._id]); 

    const handleAddToCart = () => {
        Cart.addCake({ ...cake, quantity });
        alert(`${quantity} x ${cake.name} added to cart!`);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1);
    };

    

    return (
        <Container sx={{ mt: '120px' }}>
            <Card sx={{ display: 'flex', p: 4 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 300, height: 300, objectFit: 'cover', mr: 4 }}
                    image={cake.image}
                    alt={cake.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography variant="h4" component="div">{cake.name}</Typography>
                        <Typography variant="body1" component="div" sx={{ mb: 2 }}>{cake.description}</Typography>
                        <Typography variant="h5" component="div">Price: {cake.price}</Typography>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            inputProps={{ min: 1 }}
                            sx={{ mt: 2, width: 100 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            sx={{ mt: 2 }}
                        >
                            Add to Cart
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
};

export default CakeReview;
