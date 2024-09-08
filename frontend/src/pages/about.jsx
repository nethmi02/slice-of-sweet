import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
    return (
        <Container sx={{ mt: '120px', textAlign: 'center', padding: 4 }}>
            <Box
                sx={{
                    mt: 2,
                    mb: 4,
                    border: '2px solid',  
                    borderColor: '#ff69b4',  
                    borderRadius: '8px',  
                    p: 4,  
                    boxShadow: '0 0 10px #ff69b4',
                }}
            >
                <Typography variant="h3" gutterBottom>
                    About Us
                </Typography>
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography variant="body1" sx={{ fontSize: '1.2em', lineHeight: 1.6, mb: 2 }}>
                        Welcome to our bakery! We specialize in crafting the finest cakes and cupcakes for all your special moments.
                        Our mission is to deliver joy through delicious, beautifully crafted cakes that are perfect for any celebration.
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2em', lineHeight: 1.6 }}>
                        Whether it's a wedding, birthday, or a casual treat, we use the highest quality ingredients to ensure our products
                        taste as good as they look. Every cake is made with love and creativity, ensuring you receive a one-of-a-kind treat.
                    </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                    Why Choose Us?
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2em', lineHeight: 1.6 }}>
                    - Fresh ingredients sourced locally <br />
                    - Wide variety of customizable options <br />
                    - Dedicated to sustainability and eco-friendly packaging <br />
                    - Catering for special events and dietary requirements
                </Typography>
            </Box>
        </Container>
    );
};

export default About;
