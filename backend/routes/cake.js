const express = require("express");
const cakeRouter = express.Router();
const Cake = require("../models/cake");
const authenticate = require("../auth");
const User = require("../models/user");

cakeRouter.get('/', async (req, res) => {
  console.log("/cakes Endpoint");
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cakeRouter.get('/:id', async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cakeRouter.post('/', authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId);
  console.log(user);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { id, name, price, description, category } = req.body;
  console.log(req.body);

  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let cake;
  if (id) {
    cake = await Cake.findById(id);
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    cake.name = name;
    cake.price = price;
    cake.description = description;
    cake.category = category;
  } else {
    cake = new Cake({
      name,
      price,
      description,
      category,
    });
  }

  try {
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cakeRouter.delete('/:id', async (req, res) => {
  const user = await User.findById(req.user.userID);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    res.status(200).json({ message: 'Cake deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cakeRouter;
