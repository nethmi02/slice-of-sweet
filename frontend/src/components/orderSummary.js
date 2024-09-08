import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import pic1 from '../assets/noorder.svg'
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useEffect } from 'react';

const Ordersummary = () => {
  const defaultTheme = createTheme();

  const [order, setOrder] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/api/orders", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>res.json())
    .then(data=>setOrder(data))
  },[])

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft:'2%'
              
            }}
          >
       
            <Typography component="h1" variant="h5">
              Order Details
            </Typography>

            <Typography component="h1" variant="h5">No orders</Typography>
            {order.map((item) => (
              <Card key={item.order_id} style={{  marginTop: 20, textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6">{item.order_name}</Typography>
                  <Typography color="textSecondary">Order ID: {item.order_id}</Typography>
                  <Typography color="textSecondary">Price: ${item.price}</Typography>
                  <Typography color="textSecondary">Order Date: {item.order_date}</Typography>
                  <Typography color="textSecondary">Estimated Delivery: {item.estimated_delivery || "Not available"}</Typography>
                  <Typography color="textSecondary">Delivery Address:{item.delivery_address} </Typography>

                 {item.items.map((product,index)=>(
                  <div key={index} >
                    
                    <Typography variant="h6" color="textSecondary">item:{product.name}</Typography>
                    <Typography color="textSecondary">price:{product.price}</Typography>
                    <Typography color="textSecondary">quantity:{product.category}</Typography>
                    <Typography color="textSecondary">category:{product.quantity}</Typography>


                  </div>
                ) )}
                 
                
                  <img
                    src={pic1}
                    alt="First"
                    style={{ width: '100%', height: '100%', margin: '0 auto' }}
                  />

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