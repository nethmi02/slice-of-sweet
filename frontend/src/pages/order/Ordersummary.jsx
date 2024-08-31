import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import pic1 from './assets/re.svg'
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
// Example order data
const order = [
  {
    "order_id": "ORD67890",
    "order_name": "Chocolate Cake",
    "price": 25.50,
    "order_date": "2024-08-12",
    "estimated_delivery": "2024-08-15"
  }
];



const Ordersummary = () => {
  const navigate = useNavigate()

  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="s">
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

            <Typography component="h1" variant="h5">Your Order</Typography>
            {order.map((item) => (
              <Card key={item.order_id} style={{ marginRight: 20, marginTop: 0, textAlign: 'left' }}>
                <CardContent>
                  <Typography variant="h6">{item.order_name}</Typography>
                  <Typography color="textSecondary">Order ID: {item.order_id}</Typography>
                  <Typography color="textSecondary">Price: ${item.price}</Typography>
                  <Typography color="textSecondary">Order Date: {item.order_date}</Typography>
                  <Typography color="textSecondary">Estimated Delivery: {item.estimated_delivery}</Typography>

                  <img
                    src={pic1}
                    alt="First"
                    style={{ width: '100%', height: '100%', margin: '0 auto' }}
                  />
                  <Button onClick={() => navigate('/')}> Go Home</Button>
                </CardContent>
              </Card>
            ))}


          </Box>

        </Container>
      </ThemeProvider>

    </>
  );
};

export default Ordersummary;
