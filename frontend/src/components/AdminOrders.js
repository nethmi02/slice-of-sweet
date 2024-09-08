import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Paper, Snackbar, Container, Grid, Stack, Typography, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { OrderDetails } from './OrderDetails'; // Import the OrderDetails component

const OrderButton = styled(Button)({
    backgroundColor: '#ff69b4',
    '&:hover': {
        backgroundColor: '#9b2226',
    },
    color: '#fff',
});

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [order_id, setOrder_id] = useState('');
    const [status, setStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/api/orders/admin`, { order_id, status }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Order updated successfully');
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/orders/admin', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            response.data.forEach(order => {
                order.item_names = order.items.map(item => item.name).join(', ');
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/api/orders/admin/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          fetchOrders();
          alert('Order deleted successfully');
        } catch (error) {
          console.error('Error deleting order:', error);
        }
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    const columns = [
        { field: 'deliveryAddress', headerName: 'Delivery Address', width: document.documentElement.clientWidth/8*3 },
        { field: 'item_names', headerName: 'Items', width: document.documentElement.clientWidth/8*3 },
        { field: 'status', headerName: 'Status', width: document.documentElement.clientWidth/8*2 }, // New Status column
        {
            field: 'actions',
            headerName: 'Actions',
            width: document.documentElement.clientWidth/8*2,
            renderCell: (params) => (
                <Box display="flex" gap="10px">
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#9b2226' } }}
                        onClick={() => setOrder_id(params.row._id)} // Load order ID into text box
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
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#ff69b4', '&:hover': { backgroundColor: '#9b2226' } }}
                        onClick={() => handleView(params.row)} // Open modal with order details
                    >
                        View
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
                            <Typography component="h1" variant='h5' align='center' gutterBottom>Update Order Status</Typography>
                            <TextField
                                autoFocus
                                name='order_id'
                                label="Order ID:"
                                value={order_id}
                                onChange={(e) => setOrder_id(e.target.value)} />
                            <TextField
                                name='status'
                                label="Status:"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} />
                            <Grid container >
                                <Grid item md={6}>    
                                    <OrderButton type="submit"
                                         sx={{ mt: 3, mb: 2,}} onClick={handleClick}>
                                        Update
                                    </OrderButton>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>
                </Box>
            </Container>
            <Paper sx={{ mt: 4, p: 3 }}>
                <DataGrid
                    rows={orders}
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
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ /* Add your styles here */ padding: 4, backgroundColor: 'white', borderRadius: 2 }}>
                    <OrderDetails item={selectedOrder} />
                </Box>
            </Modal>
        </div>
    );
};

export default AdminOrders;
