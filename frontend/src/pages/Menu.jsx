import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Cart from "../cart";

const OrderButton = styled(Button)({
    backgroundColor: '#ff69b4',
    '&:hover': {
      backgroundColor: '#9b2226',
    },
    color: '#fff',
  });

const categories = [
    'Individual Cupcake',
    'Build Your Own Box',
    'Mini Cupcakes',
    'Birthday',
    'Wedding',
    'Cheesecakes',
];

const priceRanges = [
    {label: 'All', value: ''},
    {label: 'LKR.0 - LKR.500', value: [0,500]},
    {label: 'LKR.500 - LKR.1000', value: [500,1000]},
    {label: 'LKR.1000 - LKR.2000', value: [1000,2000]},
    {label: 'LKR:2000 - LKR.5000', value: [2000,5000]},
    {label: 'LKR.5000+', value: [5000,Infinity]},
];


const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [cakes, setCakes] = useState([]); // Pc4cb

    useEffect(() => { // P775e
        const fetchCakes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cakes');
                setCakes(response.data);

                // todo remove this
                for (let cake of response.data) {
                    Cart.addCake(cake);
                }
            } catch (error) {
                console.error('Error fetching cakes:', error);
            }
        };

        fetchCakes();
    }, []);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePriceRangeChange = (event) => {
        setSelectedPriceRange(event.target.value);
    };

    const filteredCakes = cakes.filter((cake) => { // Pb2f9
        const categoryMatch = selectedCategory ? cake.category === selectedCategory : true;
        const priceMatch = selectedPriceRange
            ?(parseFloat(cake.price.replace('LKR.','').replace('+','')) >= selectedPriceRange[0] &&
            parseFloat(cake.price.replace('LKR.','').replace('+','')) <= selectedPriceRange[1])
            : true;
        return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
        const priceA = parseFloat(a.price.replace('LKR.','').replace('+','').trim());
        const priceB = parseFloat(b.price.replace('LKR.','').replace('+','').trim());
        return priceA - priceB;
    });

    return (
        <div>
            <Container sx={{ mt: '120px' }}>
                <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                    Our Menu
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Category</InputLabel>
                        <Select value={selectedCategory} onChange={handleChange}>
                            <MenuItem value=""><em>All</em></MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Price Range</InputLabel>
                        <Select value={selectedPriceRange} onChange={handlePriceRangeChange}>
                            {priceRanges.map((range) => (
                                <MenuItem key={range.label} value={range.value}>{range.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Grid container spacing={3}>
                    {categories.map((category) => (
                        (selectedCategory === '' || selectedCategory === category) && (
                        <Grid item xs={12} key={category}>
                            <Box sx={{ mb: 4, border: '2px solid', borderColor: '#ff69b4', borderRadius: '8px', p: 2, boxShadow: '0 0 10px #ff69b4' }}>
                                <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ textTransform: 'uppercase' }}>
                                    {category}
                                </Typography>
                                {category === 'Build Your Own Box' && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body1">
                                            Customize your own box with your favorite flavors. Perfect for any occasion and made with the finest ingredients.
                                        </Typography>
                                    </Box>
                                )}
                                <Grid container spacing={3}>
                                    {filteredCakes
                                        .filter((cake) => cake.category === category)
                                        .map((cake, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Card sx={{ height: '100%' }}>
                                                    <CardMedia component="img" height="350" image={cake.image} alt={cake.name} sx={{ objectFit: 'cover' }} />
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">{cake.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary">{cake.description}</Typography>
                                                        <Typography variant="h6" component="div">{cake.price}</Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <OrderButton size="small" component={Link} to="/order">
                                                            Order Now
                                                        </OrderButton>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>
                        </Grid>
                        )
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Menu;
