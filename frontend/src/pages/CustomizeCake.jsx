import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box,  FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { styled } from '@mui/system';

const OrderButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});

const BackgroundBox = styled(Box)({
  backgroundImage: 'url(/customize.png)', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ContentBox = styled(Box)({
  position: 'relative',
  padding: '20px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
});

const CustomizeCake = () => {
  const [size, setSize] = useState('');
  const [flavor, setFlavor] = useState('');
  const [toppings, setToppings] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/cakes/1')
      .then(response => {

        setPrice(response.data.price || 2000);
      })
      .catch(error => console.error('Error fetching cake details:', error));
  }, []);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    calculatePrice(e.target.value, flavor, toppings, decorations);
  };

  const handleFlavorChange = (e) => {
    setFlavor(e.target.value);
    calculatePrice(size, e.target.value, toppings, decorations);
  };

  const handleToppingsChange = (e) => {
    const selectedOptions = e.target.selectedOptions ? Array.from(e.target.selectedOptions, option => option.value) : [];
    setToppings(selectedOptions);
    calculatePrice(size, flavor, selectedOptions, decorations);
  };

  const handleDecorationsChange = (e) => {
    const selectedOptions = e.target.selectedOptions ? Array.from(e.target.selectedOptions, option => option.value) : [];
    setDecorations(selectedOptions);
    calculatePrice(size, flavor, toppings, selectedOptions);
  };

  const calculatePrice = (size, flavor, toppings, decorations) => {
    let newPrice = 2000; 
    if (size) newPrice += 500;
    if (flavor) newPrice += 500;
    newPrice += toppings.length * 100;
    newPrice += decorations.length * 100;
    setPrice(newPrice);
  };

  return (
    <BackgroundBox>
      <ContentBox>
        <Container sx={{ mt: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px' }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 4, color: '#ff69b4', fontWeight: 'bold' }}>
            Customize Your Cake
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <FormControl sx={{ mb: 2, minWidth: 200, border: '2px solid', borderColor: '#ff69b4', borderRadius: '8px', p: 2 }}>
              <InputLabel>Size</InputLabel>
              <Select value={size} onChange={handleSizeChange}>
                <MenuItem value="">Select Size</MenuItem>
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, minWidth: 200, border: '2px solid', borderColor: '#ff69b4', borderRadius: '8px', p: 2 }}>
              <InputLabel>Flavor</InputLabel>
              <Select value={flavor} onChange={handleFlavorChange}>
                <MenuItem value="">Select Flavor</MenuItem>
                <MenuItem value="chocolate">Chocolate</MenuItem>
                <MenuItem value="vanilla">Vanilla</MenuItem>
                <MenuItem value="strawberry">Strawberry</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, minWidth: 200, border: '2px solid', borderColor: '#ff69b4', borderRadius: '8px', p: 2 }}>
              <InputLabel>Toppings</InputLabel>
              <Select
                multiple
                value={toppings}
                onChange={handleToppingsChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="nuts">Nuts</MenuItem>
                <MenuItem value="sprinkles">Sprinkles</MenuItem>
                <MenuItem value="fruit">Fruit</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, minWidth: 200, border: '2px solid', borderColor: '#ff69b4', borderRadius: '8px', p: 2 }}>
              <InputLabel>Decorations</InputLabel>
              <Select
                multiple
                value={decorations}
                onChange={handleDecorationsChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="fondant">Fondant</MenuItem>
                <MenuItem value="icing">Icing</MenuItem>
                <MenuItem value="edible-flowers">Edible Flowers</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>Total Price: LKR {price}</Typography>
            <OrderButton variant="contained" size="large">
              Order Now
            </OrderButton>
          </Box>
        </Container>
      </ContentBox>
    </BackgroundBox>
  );
};

export default CustomizeCake;
