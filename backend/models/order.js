const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderPlacedTime: Date,
    deliveryAddress: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cake' }],
    user: String,
    _v: Number
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
