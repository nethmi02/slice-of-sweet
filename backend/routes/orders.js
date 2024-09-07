const express = require('express');
const Order = require('../models/order');
const authenticate = require('../auth');

const router = express.Router();

// Order Routes
router.post('/order', async (req, res) => {
  const { items, deliveryAddress, totalPrice, user } = req.body;

  const newOrder = new Order({
    items,
    deliveryAddress,
    totalPrice,
    orderPlacedTime: new Date(),
    user,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});