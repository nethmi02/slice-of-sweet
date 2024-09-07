import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import pic1 from './assets/re.svg';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderDetails } from './OrderDetails';

const Ordersummary = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); 

  const defaultTheme = createTheme();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/orders/${id}`);
        if (response.ok) {
          const json = await response.json(); 
          setOrder(json);
        } else {
          console.error('Failed to fetch order:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"> 
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Order Details
          </Typography>

          {order ? ( 
            <Card key={order._id} style={{ marginRight: 20, marginTop: 0, textAlign: 'left' }}>
              <CardContent>
                <OrderDetails item={order} />

                <img
                  src={pic1}
                  alt="Order Image"
                  style={{ width: '100%', height: '100%', margin: '0 auto' }}
                />
                <Button onClick={() => navigate('/home')}>Go Home</Button>
              </CardContent>
            </Card>
          ) : (
            <Typography>No order found.</Typography> 
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Ordersummary;
