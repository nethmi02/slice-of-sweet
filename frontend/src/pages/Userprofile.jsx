import { Button, TextField, Box, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Ordersummary from '../components/orderSummary';
import pic1 from '../assets/profile.svg'
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import User from '../data/user';
import { useEffect } from 'react';

const OrderButton = styled(Button)({
    backgroundColor: '#ff69b4',
    '&:hover': {
        backgroundColor: '#9b2226',
    },
    color: '#fff',
});

const defaultTheme = createTheme();

const Userprofile = () => {
    const [fullname, setfullname] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [password, setpassword] = useState("")
    const [oldPassword, setoldpassword] = useState("")
    const [confirmPassword, setconfirmpassword] = useState("")
    const [phone, setphone] = useState("")
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setpassword("");
        setconfirmpassword("");

    };

    const handleChangePassword = () => {
        if (password === confirmPassword) {
            let didChange = User.instance.changePassword(oldPassword, password)
            if (didChange) {
                handleClose()
            } else {
                alert("Password change failed")
            }
        }
    }

    const handleSubmit = async () => {
        let formdata={
            name:fullname,
            email:email,
            phone:phone,
            address:address
        }
        let res = await User.instance.updateData(formdata)
        console.log(res)
        if(res){
            alert("Profile updated successfully")
        }else{
            alert("Profile update failed")
        }
    }

    useEffect(()=>{
        User.instance.fetchData().then(()=>{
            setfullname(User.instance.name)
            setemail(User.instance.email)
            setphone(User.instance.phone)
            setaddress(User.instance.address)
        })
    },[])

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Paper elevation={3}>
                    <Grid container >
                        <CssBaseline />
                        <Grid item md={16}>
                            <img
                                src={pic1}
                                alt="First"
                                style={{ width: '30%', height: '50%', marginLeft: '34%' }}
                            />
                        </Grid>

                        <Grid item md={8}>
                            <Box sx={{ marginLeft: '50%', gap: '10px'}}>
                                <Typography component="h1" variant="h4">
                                    User Profile
                                </Typography>
                                <TextField
                                    label="Full Name:"
                                    value={fullname}
                                    onChange={(e) => setfullname(e.target.value)}
                                    fullWidth
                                    autoFocus
                                    autoComplete='name' />
                                <TextField
                                    label="Email:"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    fullWidth

                                    autoComplete='name' />
                                <TextField
                                    label="Contact No:"
                                    value={phone}
                                    onChange={(e) => setphone(e.target.value)}
                                    fullWidth

                                    autoComplete='name' />
                                <TextField
                                    label="Address:"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                    fullWidth

                                    autoComplete='name' />
                                {/* edit password option with a button */}
                                <Button variant="outlined" color="primary" onClick={handleOpen} style={{ marginTop: '16px' }}>
                                    Set/Reset Password
                                </Button>
                                <OrderButton type="submit"
                                    fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>Edit Profile</OrderButton>

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
                                            fullWidth/>

                                        <TextField
                                            label="Confirm Password:"
                                            value={confirmPassword}
                                            onChange={(e) => setconfirmpassword(e.target.value)}
                                            fullWidth/>

                                        <TextField
                                            label="Old Password:"
                                            value={oldPassword}
                                            onChange={(e) => setoldpassword(e.target.value)}
                                            fullWidth/>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleChangePassword} color="primary">
                                            Set Password
                                        </Button>
                                    </DialogActions>
                                </Dialog>


                            </Box>



                        </Grid>
                        {/* 2 grid */}

                        <Grid item md={12}>   
                            <Ordersummary />
                        </Grid>
                    </Grid>

                </Paper>
            </ThemeProvider>


        </div>
    )
}

export default Userprofile