const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const ReviewRoutes = require('./routes/review');
const AuthRoutes = require('./routes/auth');
const CakeRoutes = require('./routes/cake');
const OrderRoutes = require('./routes/orders');

app.use('/api/reviews', ReviewRoutes);
app.use('/api/cakes', CakeRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
