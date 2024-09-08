import React from 'react';
import { Typography } from '@mui/material';

export const OrderDetails = ({ item }) => {
    if (!item) {
        return <Typography variant="body1">No order details available.</Typography>;
    }
    return (
        <div>
            <Typography variant="h6">Order Details</Typography>
            <div>
                <Typography variant="h6">Items</Typography>
                {item.items.map((item, index) => (
                    <div key={index}>

                        <Typography variant="body2"><strong>Name:</strong> {item.name}</Typography>
                        <Typography variant="body2"><strong>Price:</strong> {item.price}</Typography>
                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                        <Typography variant="body2"><strong>Category:</strong> {item.category}</Typography>
                        <Typography variant="body2"><strong>Quantity:</strong> {item.quantity}</Typography>
                    </div>
                ))}

                <Typography variant="body1"><strong>Order Date:</strong> {item.orderPlacedTime}</Typography>

                <Typography variant="body1"><strong>Delivery Address:</strong> {item.deliveryAddress}</Typography>
                <Typography variant="body1"><strong>Total Price:</strong> {item.totalPrice}</Typography>

            </div>
        </div>
    );
};

