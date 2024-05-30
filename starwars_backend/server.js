const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(8000, () => {
      console.log('Server is running on http://localhost:8000');
    });
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });
