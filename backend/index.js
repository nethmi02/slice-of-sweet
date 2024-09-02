const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const loginpage=require('./routes/login')
const registerpage=require('./routes/register')
const mongoose = require('mongoose');

const app = express();
app.use(cors());
//use the bodyparser for body in login.js
app.use(bodyParser.json()); // <-- This is crucial
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://lakshithknishshanke:8MUl3eWMAiiVXh71@cluster0.kvljp.mongodb.net/slice-of-sweet?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB Atlas");
  }
);

const Cake = require("./models/cake");
const ReviewRoutes = require("./routes/review");
const Order = require('./models/order');

app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    })
})

app.get("/cakes", async (req, res) => {
  console.log("/cakes Endpoint");
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Use review routes
app.use("/api/reviews", ReviewRoutes);

app.post('/order', async (req, res) => {
    const { items, deliveryAddress, totalPrice, user } = req.body;

    const newOrder = new Order({
        items,
        deliveryAddress,
        totalPrice,
        orderPlacedTime: new Date(),
        user
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
