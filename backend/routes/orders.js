const express = require('express');
const Order = require('../models/order');
const authenticate = require('../auth');
const User = require('../models/user');

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

router.get('/admin', authenticate, async (req, res) => {
  const user_id = req.user.userId;
  const user = await User.findById(user_id);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/admin', authenticate, async (req, res) => {
  const user_id = req.user.userId;
  const user = await User.findById(user_id);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  const { order_id, status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(order_id, { status });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/admin/:id', authenticate, async (req, res) => {
  const user_id = req.user.userId;
  const user = await User.findById(user_id);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  const order_id = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(order_id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
