// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
const port = 3001;

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
// Cake endpoints
app.get("/", (req, res) => {
  res.send({
    message: "Hello World from Express API backend!",
  });
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
