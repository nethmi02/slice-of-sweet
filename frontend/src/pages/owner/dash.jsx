import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Paper } from '@mui/material';

const Dash = () => {
    const [cakes, setCakes] = useState([]);
    const [formData, setFormData] = useState({ name: '', price: '', description: '', imageUrl: '', category: '' });


    useEffect(() => {
        fetchCakes();
    }, []);

    const fetchCakes = async () => {
    try {
        const response = await axios.get('http://localhost:3001/cakes');
        setCakes(response.data);
    } catch (error) {
        console.error('Error fetching cakes:', error);
    }
    };

    const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/cakes/${id}`); 
        fetchCakes(); 
    } catch (error) {
        console.error('Error deleting cake:', error);
    }
  };

    const handleAddCake = async () => {
    try {
        await axios.post('http://localhost:3001/cakes', formData); 
        setFormData({ name: '', price: '', description: '', imageUrl: '', category: '' });
        fetchCakes();
    } catch (error) {
        console.error('Error adding cake:', error);
    }
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
            <Box display="flex" gap="10px">
            <Button 
                variant="contained" 
                sx={{ backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#9b2226' } }}
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
        <Box p={3}>
        <form onSubmit={(e) => { e.preventDefault(); handleAddCake(); }}>
        <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            margin="normal"
        />
        <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#9b2226' } }}
        >
            Add Cake
        </Button>
        </form>
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
    </Box>
  );
};

export default Dash;