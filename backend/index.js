const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const loginpage=require('./routes/login')
const registerpage=require('./routes/register')
const mongoose = require('mongoose');

const app = express()
app.use(cors());
//use the bodyparser for body in login.js
app.use(bodyParser.json()); // <-- This is crucial
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001

// todo move this to env variable
mongoose.connect("mongodb+srv://lakshithknishshanke:8MUl3eWMAiiVXh71@cluster0.kvljp.mongodb.net/slice-of-sweet?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB Atlas');
})

const Cake = require('./models/cake');

app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    })
})
// Data
const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

// Route to get items
app.get('/api/items', (req, res) => {
    res.json(items);
});
//routes 
//path name with api any name
app.use('/api/login',loginpage)
app.use('/api/registerpage',registerpage)

app.get('/cakes', async (req, res) => {
    console.log("/cakes Endpoint")
    try {
        const cakes = await Cake.find();
        res.json(cakes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
