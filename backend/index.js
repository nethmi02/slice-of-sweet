const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://lakshithknishshanke:8MUl3eWMAiiVXh71@cluster0.kvljp.mongodb.net/slice-of-sweet?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("Failed to connect to MongoDB Atlas:", err);
    } else {
      console.log("Connected to MongoDB Atlas");
    }
  }
);

// Import Models
const Cake = require('./models/cake');
const Order = require('./models/order');

// Import Routes
const ReviewRoutes = require('./routes/review');
const LoginPageRoutes = require('./routes/login');
const RegisterPageRoutes = require('./routes/register');



// Home Route
app.get('/', (req, res) => {
  res.send({
    message: "Hello World from Express API backend!"
  });
});

// Get all cakes
app.get('/cakes', async (req, res) => {
  console.log("/cakes Endpoint");
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/cakes/:id', (req, res) => {
  const cakeId = req.params._id;
  const cake = cakes.find(cake => cake._id === cakeId);
  
  if (cake) {
    res.status(200).json(cake);
  } else {
    res.status(404).json({ message: 'Cake not found' });
  }
});

// Add a new cake
app.post('/cakes', async (req, res) => {
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
app.delete('/cakes/:id', async (req, res) => {
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

// Order Routes
app.post('/order', async (req, res) => {
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

app.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Use review routes
app.use('/api/reviews', ReviewRoutes);



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
