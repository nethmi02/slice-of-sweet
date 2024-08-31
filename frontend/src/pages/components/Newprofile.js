import { Button, TextField, Box, CssBaseline, FormControl, FormGroup, FormControlLabel, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material'
import { Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState } from 'react'
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Ordersummary from '../order/Ordersummary';
import Intialordersummary from './Intialordersummary';
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
const Newprofile = ({ profiledata, setprofiledata }) => {

    const [fullname, setfullname] = useState("")

    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmpassword] = useState("")
    const [phone, setphone] = useState("")
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()


    const handleClick = () => {
        navigate('/editprofile')
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setpassword("");
        setconfirmpassword("");

    };

    const handleResetPassword = () => {
        if (password !== confirmPassword) {
            alert("password do not match")
        } else {
            profiledata.password = password; // or however you handle user data update
            setOpen(false);
            setpassword("");
            setconfirmpassword("");

        }
    };


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
                            <Box sx={{ marginLeft: '50%' }}>
                                <Typography component="h1" variant="h4">
                                    Set User Profile
                                </Typography>
                                <Typography component="h1" variant="h6">
                                    Basic Info
                                </Typography>
                                <TextField
                                    label="Full Name:"
                                    value={profiledata.fullname}
                                    onChange={(e) => setfullname(e.target.value)}
                                    fullWidth
                                    autoFocus
                                    autoComplete='name' />
                                <TextField
                                    label="Email:"
                                    value={profiledata.email}
                                    onChange={(e) => setemail(e.target.value)}
                                    fullWidth

                                    autoComplete='name' />
                                <TextField
                                    label="Contact No:"
                                    value={profiledata.phone}
                                    onChange={(e) => setphone(e.target.value)}
                                    fullWidth

                                    autoComplete='name' />
                                <TextField
                                    label="Address:"
                                    value={profiledata.address}
                                    onChange={(e) => setaddress(e.target.value)}
                                    fullWidth

                                    autoComplete='name' />
                                {/* edit password option with a button */}
                                <Button variant="outlined" color="primary" onClick={handleOpen} style={{ marginTop: '16px' }}>
                                    Set/Reset Password
                                </Button>
                                <OrderButton type="submit"
                                    fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleClick}>Edit Profile</OrderButton>




                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Set/Reset Password</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            To reset your password, please enter and confirm your new password here.
                                        </DialogContentText>
                                        <TextField
                                            label="Set password:"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            fullWidth

                                            autoComplete='name' />

                                        <TextField
                                            label="Confirm Password:"
                                            value={confirmPassword}
                                            onChange={(e) => setconfirmpassword(e.target.value)}
                                            fullWidth

                                            autoComplete='name' />

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleResetPassword} color="primary">
                                            Set Password
                                        </Button>
                                    </DialogActions>
                                </Dialog>


                            </Box>



                        </Grid>
                        {/* 2 grid */}

                        <Grid item md={12}>   <Intialordersummary />
                        </Grid>
                    </Grid>

                </Paper>
            </ThemeProvider>


        </div>
    )
}

export default Newprofile