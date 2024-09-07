const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  
    
    orderPlacedTime: Date,
    
    deliveryAddress: String,
    items: [{
       
        name: String,
        price: String,
        image: String,
        category: String,
        quantity: Number
    }],
    user: String,
    _v: Number
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
