import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Paper, Snackbar, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const CakeButton = styled(Button)({
    backgroundColor: '#ff69b4',
    '&:hover': {
        backgroundColor: '#9b2226',
    },
    color: '#fff',
});

const AdminCakes = () => {
    const [cakes, setCakes] = useState([]);
    const [cake_id, setCakeId] = useState(""); // New state for cake_id
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();
    
    const handleClick = async (e) => {
        e.preventDefault();

        // Check if any field except cake_id is empty
        if (name === '' || price === '' || description === '' || category === '') {
            setAlertMessage('Please fill out all fields except Cake ID!');
            setOpen(true);
            return; // Exit the function if validation fails
        }

        const cakeData = {
            id: cake_id,
            name,
            price,
            description,
            category
        };

        try {
          const response = await axios.post('http://localhost:3001/api/cakes', cakeData, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
          console.log('cake placed successfully:', response.data);
          fetchCakes(); // Update the list after adding/updating a cake
          alert('Cake added successfully!');
        } catch (error) {
            console.error('Error adding/updating cake:', error);
        }
    };

    const handleEdit = (cake) => {
        setCakeId(cake._id); // Load cake ID
        setName(cake.name);
        setPrice(cake.price);
        setDescription(cake.description);
        setCategory(cake.category);
    };

    const handleClear = () => {
        setCakeId("");
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
    };

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        fetchCakes();
    }, []);

    const fetchCakes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/cakes');
            setCakes(response.data);
        } catch (error) {
            console.error('Error fetching cakes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/cakes/${id}`, 
              { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }); 
            fetchCakes(); // Update the list after deleting a cake
        } catch (error) {
            console.error('Error deleting cake:', error);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box display="flex" gap="10px">
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#9b2226' } }}
                        onClick={() => handleEdit(params.row)} // Load cake data into fields
                    >
                        Update
                    </Button>
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#9b2226' } }}
                        onClick={() => handleDelete(params.row._id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <div>
            <Container>
                <Box component='form' sx={{ mt: 2 }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, paddingBottom: 10 }}>
                        <Stack direction="column" spacing={2}>
                            <Typography component="h1" variant='h5' align='center' gutterBottom>ADD CAKE</Typography>
                            <TextField
                                autoFocus
                                name='cake_id'
                                label="Cake ID:"
                                value={cake_id}
                                onChange={(e) => setCakeId(e.target.value)} // Handle cake_id change
                            />
                            <TextField
                                name='name'
                                label="Name:"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <TextField
                                name='price'
                                label="Price:"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                            <TextField
                                name='description'
                                label="Description:"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                            <TextField
                                name='category'
                                label="Category:"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} />
                            <Grid container >
                                <Grid item md={6}>    
                                    <CakeButton type="submit"
                                         sx={{ mt: 3, mb: 2}} onClick={handleClick}>
                                        {cake_id ? 'Update' : 'Add'} {/* Change button text based on cake_id */}
                                    </CakeButton>
                                    <Button 
                                        variant="outlined" 
                                        sx={{ mt: 3, mb: 2, marginLeft: 2 }} 
                                        onClick={handleClear} // Clear fields
                                    >
                                        Clear
                                    </Button>
                                    <Snackbar
                                        message={alertMessage}
                                        autoHideDuration={4000}
                                        open={open}
                                        onClose={handleClose}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>
                </Box>
            </Container>
            <Paper sx={{ mt: 4, p: 3 }}>
                <DataGrid
                    rows={cakes}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    getRowId={(row) => row._id}
                    autoHeight
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f3f3f3',
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-row': {
                            backgroundColor: '#fff',
                            '&:nth-of-type(odd)': {
                                backgroundColor: '#fafafa',
                            },
                        },
                        '& .MuiButton-root': {
                            color: '#fff',
                        },
                    }}
                />
            </Paper>
        </div>
    );
};

export default AdminCakes;
