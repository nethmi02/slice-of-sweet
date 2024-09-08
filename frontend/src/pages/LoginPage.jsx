import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import pic1 from '../assets/signin.svg'
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { userSchema } from '../data/UserValidtation';
import axios from 'axios';
import User from '../data/user'

const OrderButton = styled(Button)({
  backgroundColor: '#ff69b4',
  '&:hover': {
    backgroundColor: '#9b2226',
  },
  color: '#fff',
});

const defaultTheme = createTheme();

const Login = () => {
  const navigate=useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, setError] = useState("")
  
  const handleClick = async(e) => {
    e.preventDefault();

    const isvalid=email.length>0 && password.length>0
    if (isvalid) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
        if (response.status === 200) {
          User.instance.setToken(response.data.token)
          alert("Successful")
          navigate('/profile')
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error('Login failed:', error);
        setError("Invalid email or password");
      }
    } else {
      setError("Invalid Data!")
    }
  };
 
  const handleclose = (e, reason) => {
    if (reason == 'clickaway') {
      return
    } else {
      setError("")
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
        >
          <img
            src={pic1}
            alt="First"
            style={{ width: '100%', height: '100%', margin: '0 auto' ,maxWidth:200}}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: '400px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setemail(e.target.value)}
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
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <OrderButton type="submit"
              fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleClick} >Sign in</OrderButton>
               <Snackbar
              message={error}
              autoHideDuration={4000}
              open={error != ""}
              onClose={handleclose}
            />
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  Register Instead
                </Link>
              </Grid>

            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default Login