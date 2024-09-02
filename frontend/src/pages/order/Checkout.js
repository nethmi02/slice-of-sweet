import React from 'react'
import Ordersummary from './Ordersummary';
import Delivery from './Delivery';


import { Button, Grid, Typography } from '@mui/material';

const Checkout = () => {

 

  return (
    <div>
      {/* stepper here */}
      
        
        <Grid container columnSpacing={2}>
 
        <Grid item md={12}>         <Typography component='h1' variant='h5' sx={{marginLeft:50,fontSize:50,width:'100%',maxWidth:200}}>Checkout</Typography> <Delivery/> </Grid>
         
          <Grid item md={4}>    <Ordersummary />    
          Delivery
          </Grid>    
      
          
   </Grid>
         
      
  
       
    
        

     
     
    </div>
  )
}

export default Checkout
