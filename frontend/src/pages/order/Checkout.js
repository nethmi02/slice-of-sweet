import React from 'react'
import Ordersummary from './Ordersummary';
import Delivery from './Delivery';
import Paymentoption from './Paymentoption';
import { Stack } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Snakbar1 from './Placeorderbutton';
const Checkout = () => {

 

  return (
    <div>
      {/* stepper here */}
      
        <Typography component='h1' variant='h5' sx={{marginLeft:50,fontSize:100}}>Checkout</Typography>
        <Grid container columnSpacing={2}>
        
          <Grid item md={8}>  <Delivery />   </Grid>
          <Grid item md={4}>    <Ordersummary />    
          
          </Grid>    
      
          
   </Grid>
         
      
  
       
    
        

     
     
    </div>
  )
}

export default Checkout