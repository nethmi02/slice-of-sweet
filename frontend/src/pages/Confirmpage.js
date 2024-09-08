import { Button, Grid, Paper, Snackbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, margin } from '@mui/system'
import { styled } from '@mui/system';
import pic1 from '../assets/confirm.svg'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const OrderButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});

const defaultTheme = createTheme();
const Confirmpage = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate('/ordersummary')
  }
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
              backgroundColor: 'pink',
              height: '500px',
              width: '500px'

            }}
          >

            <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
              Thank you for your order!
            </Typography>
            <img
              src={pic1}
              alt="First"
              style={{ width: '70%', height: '70%', margin: '0 auto' }}
            />
            <OrderButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '38px', width: '300px' }}
              onClick={handleclick}
            >
              View order details
            </OrderButton>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Confirmpage