import { Button, TextField, Box, CssBaseline, FormControl, FormGroup, FormControlLabel, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Container } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, quantity, order_date, deliver_date, price) {
    return { name, quantity, order_date, deliver_date, price };
}
const rows = [
    createData('No-orders', null, null, null, null),

];
const defaultTheme = createTheme();
const Userprofile = ({ userData,setUserData }) => {

    const [fullname, setfullname] = useState("")

    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmpassword] = useState("")
    const [phone, setphone] = useState("")
    const [open, setOpen] = useState(false);

    const [profilepic, setprofilepic] = useState("/url")

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
            userData.password = password; // or however you handle user data update
            setOpen(false);
            setpassword("");
            setconfirmpassword("");
           
        }
    };
   

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Container component='main'>
                    <CssBaseline />
                    <Typography component="h1" variant="h4">
                        Set User Profile
                    </Typography>
                    <Box>
                        <Typography component="h1" variant="h6">
                            Basic Info
                        </Typography>
                        <TextField
                            label="Full Name:"
                            value={userData.fullname}
                            onChange={(e) => setfullname(e.target.value)}
                            fullWidth
                            autoFocus
                            autoComplete='name' />
                        <TextField
                            label="Email:"
                            value={userData.email}
                            onChange={(e) => setemail(e.target.value)}
                            fullWidth

                            autoComplete='name' />
                        <TextField
                            label="Contact No:"
                            value={userData.phone}
                            onChange={(e) => setphone(e.target.value)}
                            fullWidth

                            autoComplete='name' />
                        <TextField
                            label="Address:"
                            value={userData.address}
                            onChange={(e) => setaddress(e.target.value)}
                            fullWidth

                            autoComplete='name' />
                        {/* edit password option with a button */}
                        <Button variant="outlined" color="primary" onClick={handleOpen} style={{ marginTop: '16px' }}>
                            Set/Reset Password
                        </Button>
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                           
                            > edit Profile</Button>



                       
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
                    <TableContainer component={Paper}>
                        <Typography> My Order List</Typography>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert</TableCell>
                                    <TableCell align="right">order_name</TableCell>
                                    <TableCell align="right">quantity&nbsp;</TableCell>
                                    <TableCell align="right">order_date&nbsp;</TableCell>
                                    <TableCell align="right">deliver_date&nbsp;</TableCell>
                                    <TableCell align="right">price&nbsp;(Rs)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                        <TableCell align="right">{row.order_date}</TableCell>
                                        <TableCell align="right">{row.deliver_date}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Container>
            </ThemeProvider>


        </div>
    )
}

export default Userprofile