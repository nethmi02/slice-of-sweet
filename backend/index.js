require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const Cake = require('./models/cake');

const app = express()
app.use(cors());

app.use(express.json());
const port = 3001

// todo move this to env variable
mongoose.connect("mongodb+srv://lakshithknishshanke:8MUl3eWMAiiVXh71@cluster0.kvljp.mongodb.net/slice-of-sweet?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB Atlas');
})



app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    })
})

app.get('/cakes', async (req, res) => {
    console.log("/cakes Endpoint")
    try {
        const cakes = await Cake.find();
        res.json(cakes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
});
