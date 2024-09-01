import { Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react'
import pic1 from '../order/assets/delivery.svg'
import { useState } from 'react';
import { styled } from '@mui/system';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderButton = styled(Button)({
    backgroundColor: '#ff69b4',
    '&:hover': {
        backgroundColor: '#9b2226',
    },
    color: '#fff',
});


const Delivery = () => {
    const [name, setname] = useState("")
    const [address, setaddress] = useState("")
    const [city, setcity] = useState("")
    const [zip, setzip] = useState("")
    const [open, setopen] = useState(false)
   

    const navigate=useNavigate()


    const handleClick = (e) => {
        e.preventDefault();

        if (name == '' && address == "" && city == "" && zip == "") {
            setopen(true)
        } else {
            
            navigate('/orderconfirm')

        }
        // should go to the database
    }
    const handleclose = (e, reason) => {
        if (reason == 'clickaway') {
            return
        } else {
            setopen(false)
        }
    }
  
    return (
        <div>
            <div>
                <Container>
                    <Box component='form' sx={{ mt: 2, height: 800 }}>
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: 800, paddingBottom: 10 }}> <Stack direction="column" spacing={2}>
                            <Typography comoponent="h1" variant='h5' align='center' gutterBottom>Delivery Address</Typography>
                            <TextField
                                autoFocus
                                name='name'
                                label="Name:"
                                value={name}
                                onChange={(e) => setname(e.target.value)} />
                            <TextField
                                name='address'
                                label="Address:"
                                value={address}
                                onChange={(e) => setaddress(e.target.value)} />
                            <TextField
                                name='city'
                                label="City:"
                                value={city}
                                onChange={(e) => setcity(e.target.value)} />

                            <TextField
                                name='zip'
                                label="Zip Code:"
                                value={zip}
                                onChange={(e) => setzip(e.target.value)} />



                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <img
                                    src={pic1}
                                    alt="First"
                                    style={{ width: '30%', height: '30%', margin: '0 auto', marginBottom: '10%' }}
                                />
                            </Box>

                            <Grid container >
                                <Grid item md={6}>    <OrderButton type="submit"
                                    fullWidth sx={{ mt: 3, mb: 2, marginLeft:20 }} onClick={handleClick}>Place Order</OrderButton>
                                    <Snackbar
                                        message='Please fill out the details first!'
                                        autoHideDuration={4000}
                                        open={open}
                                        onClose={handleclose}
                                    />


                                </Grid>
                             
                            </Grid>
                        </Stack>


                        </Paper>


                    </Box>
                </Container>



            </div>
        </div >
    )
}

export default Delivery