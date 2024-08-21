import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EnhancedTable from './order_acceptance_table';

const Baker = () => {
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', item: 'Chocolate Cake', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', item: 'Lemon Tart', status: 'Completed' }
  ]);

  const handleToggleAvailability = () => {
    setIsAcceptingOrders(prevState => !prevState);
    // Optionally, you can also save this state to the backend here
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Baker Dashboard
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Availability
        </Typography>
        <Button
          variant="contained"
          color={isAcceptingOrders ? 'success' : 'error'}
          onClick={handleToggleAvailability}
        >
          {isAcceptingOrders ? 'Accepting Orders' : 'Not Accepting Orders'}
        </Button>
      </Box>
    
    <div>
      <h1>Order Management</h1>
      <EnhancedTable />
    </div>
  
      {/* <Box>
        <Typography variant="h6" gutterBottom>
          Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
    </Box>
  );
};

export default Baker;
