
import { Button, TextField, Box, CssBaseline, FormControl, FormGroup, FormControlLabel, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar } from '@mui/material'
import { Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState } from 'react'
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';

import pic1 from '../order/assets/profile.svg'
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
const OrderButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});


const defaultTheme = createTheme();

const Editprofile = ({setprofiledata}) => {

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  const [open, setopen] = useState(false)
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.fullname != '' && form.email != "" && form.address != "" && form.phone != "") {
      navigate('/newprofile');
      
    }else{
      setopen(true)
    }
  }
  const handleclose = (e, reason) => {
    if (reason == 'clickaway') {
        return
    } else {
        setopen(false)
    }
}


const handleRegister=()=>{
setprofiledata(form)
}
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Paper elevation={3}>
          <Grid container >


            <CssBaseline />
            {/* 1 grid */}

            <Grid item md={16}>

              <img
                src={pic1}
                alt="First"
                style={{ width: '30%', height: '50%', marginLeft: '34%' }}
              />
            </Grid>
            <Grid item md={8}>
              <Box  component="form" onSubmit={handleSubmit}  sx={{ marginLeft: '50%' }} >
                <Typography component="h1" variant="h4">
                  Set User Profile
                </Typography>
                <Typography component="h1" variant="h6">
                  Basic Info
                </Typography>
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="fullname"
                   label="Full Name"
                   name="fullname"
                   autoComplete="name"
                   autoFocus
                   value={form.fullname}
                   onChange={handleChange}
                  />
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="email"
                   label="Email Address"
                   name="email"
                   autoComplete="email"
     
                   value={form.email}
                   onChange={handleChange}

                  />
                <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="phone"
                     label=" Contact No:"
                     type="text"
                     id="phone"
       
                     value={form.phone}
                     onChange={handleChange}
                  />
                <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="address"
                      label="Address "
                      type="text"
                      id="address"
        
                      value={form.address}
                      onChange={handleChange} />

                <OrderButton type="submit"
                  fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleRegister}>Save changes</OrderButton>

                <Snackbar
                  message='please fill out the form first!'
                  autoHideDuration={4000}
                  open={open}
                  onClose={handleclose}
                />






              </Box>



            </Grid>
            {/* 2 grid */}


          </Grid>

        </Paper>
      </ThemeProvider>


    </div>
  )
}

export default Editprofile