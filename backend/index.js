require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const loginpage=require('./routes/login')
const registerpage=require('./routes/register')
const mongoose = require('mongoose');
const Cake = require('./models/cake');

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



const Cake = require('./models/cake');

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

//add a new cake
app.post('/cakes', async(req,res) =>{
    const cake = new Cake({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        image:req.body.image,
        category:req.body.category
    });

    try{
        const newCake = await cake.save();
        res.status(201).json(newCake);
    }catch(error){
        res.status(400).json({message:error.message});
    }
    
});

//update a cake
app.put('/cakes/:id', async (req, res) => {
    try{
        const cake = await Cake.findAndUpdate(req.params.id, req.body, {new:true});
         res.json(cake);
    }catch (err) {
        res.status(400).json({message:err.message});
    }
    
});

//delete a cake
app.delete('/cakes/:id', async(req,res) =>{
    try{
        await Cake.findAndUpdate(req.params.id);
        res.json({message:"Deleted Cake"});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

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

console.log(`Example app listening on port ${port}`)
  console.log(`Example app listening on port ${port}`);

});
