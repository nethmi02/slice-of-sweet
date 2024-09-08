const express = require('express');
const Order = require('../models/order');
const authenticate = require('../auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const user_id = req.user.userId;
  try {
    const orders = await Order.find({ user: user_id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const user_id = req.user.userId;
  const { items, deliveryAddress, totalPrice } = req.body;

  const newOrder = new Order({
    items,
    deliveryAddress,
    totalPrice,
    orderPlacedTime: new Date(),
    user: user_id,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
