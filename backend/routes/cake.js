const express = require("express");
const cakeRouter = express.Router();
const Cake = require("../models/cake");

cakeRouter.get('/', async (req, res) => {
  console.log("/cakes Endpoint");
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new cake
cakeRouter.post('/', async (req, res) => {
  const { name, price, description, category } = req.body;

  // Validate required fields
  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCake = new Cake({
    name,
    price,
    description,
    category,
  });

  console.log("Post Cake")
  try {
    const savedCake = await newCake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a cake by ID
cakeRouter.delete('/:id', async (req, res) => {
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
