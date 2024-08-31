import React, { useState, useEffect } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [selectedPane, setSelectedPane] = useState('orders');
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (selectedPane === 'orders') {
      fetchOrders();
    }
  }, [selectedPane]);

  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <Box sx={{ display: 'flex', pt: 20 }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Typography variant="h6" noWrap sx={{ p: 2 }}>
          Admin Dashboard
        </Typography>
        <List>
          <ListItem button onClick={() => setSelectedPane('orders')}>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPane('cakes')}>
            <ListItemText primary="Cakes" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {selectedPane === 'items' && (
          <Typography variant="h4">Items</Typography>
        )}
        {selectedPane === 'orders' && (
          <Box>
            <Typography variant="h4">Orders</Typography>
            <Button variant="contained" onClick={handleRefresh}>Refresh</Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Item Price</TableCell>
                    <TableCell>Item Quantity</TableCell>
                    <TableCell>Delivery Address</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Order Placed Time</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    order.items.map((item, index) => (
                      <TableRow key={`${order._id}-${index}`}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{order.deliveryAddress}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>{new Date(order.orderPlacedTime).toLocaleString()}</TableCell>
                        <TableCell>{order.user}</TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {selectedPane === 'cakes' && (
          <Typography variant="h4">Cakes</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
