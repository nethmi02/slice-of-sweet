import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Snackbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import pic1 from '../assets/signup.svg'
import { styled } from '@mui/system';
import { userSchema } from '../data/UserValidtation';
import axios from 'axios';
import User from '../data/user';

const OrderButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});

const defaultTheme = createTheme();

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formdata={
      name:form.fullname,
      email:form.email,
      password:form.password,
      phone:form.phone,
      address:form.address,
    }
    alert(await userSchema.validate(formdata))
    const isValid = await userSchema.isValid(formdata)

    if (!isValid) {
      setErrorMessage("Invalid Data!")
      return
    }

    if (form.password!=form.confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match!")
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', formdata);
      if (response.status === 201) {
        User.instance.setToken(response.data.token);
        navigate('/profile');      
      } else {
        setErrorMessage("Failed to register: " + response.data.message)
      }
    } catch (error) {
      setErrorMessage('Error registering user:' + error);
    }
  };
  const handleclose = (e, reason) => {
    if (reason == 'clickaway') {
      return
    } else {
      setErrorMessage("")
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ><img
            src={pic1}
            alt="First"
            style={{ width: '100%', height: '50%', margin: '0 auto',maxWidth:200 }}
          />

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '400px' }}>
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
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label=" Confirm The Password"
              type="password"
              id="password"

              value={form.confirmPassword}
              onChange={handleChange}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <OrderButton type="submit"
              fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>Sign up</OrderButton>
            <Snackbar
              message={errorMessage}
              autoHideDuration={4000}
              open={errorMessage!=''}
              onClose={handleclose}
            />
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {"already have an account? Sign in"}
              </Link>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default SignUp
