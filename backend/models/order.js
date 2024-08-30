const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: {
        type: Array,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderPlacedTime: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
