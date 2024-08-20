const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const loginpage=require('./routes/login')
const registerpage=require('./routes/register')
const app = express()
app.use(cors());
//use the bodyparser for body in login.js
app.use(bodyParser.json()); // <-- This is crucial
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001

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

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
