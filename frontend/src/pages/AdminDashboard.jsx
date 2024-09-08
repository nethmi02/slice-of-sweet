import React, { useState, useEffect } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import AdminOrders from '../components/AdminOrders';
import AdminCakes from '../components/AdminCakes';
import User from '../data/user'; // Import the User class

const AdminDashboard = () => {
  const [selectedPane, setSelectedPane] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null); // Add state for user

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUser = async () => {
    const userInstance = User.instance;
    await userInstance.fetchData();
    setUser(userInstance);
  };

  useEffect(() => {
    fetchUser();
    if (selectedPane === 'orders') {
      fetchOrders();
    }
  }, [selectedPane]);

  const handleRefresh = () => {
    fetchOrders();
  };

  if (!user) {
    return <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
        <Typography variant="h6" color="error">
            Loading...
        </Typography>
    </Box>
  }

  if (user.role !== 'admin') {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
            You need to sign in as an admin.
        </Typography>
    </Box>
  }

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
        {selectedPane === 'orders' && (
          <AdminOrders/>
        )}
        {selectedPane === 'cakes' && (
          <AdminCakes/>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
