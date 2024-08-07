const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
app.use(cors());
const port = 3001

mongoose.connect('your_mongodb_atlas_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});

const Cake = require('./models/cake');

app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    })
})

app.get('/cakes', async (req, res) => {
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
