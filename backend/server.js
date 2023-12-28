const connectDB = require('./config/db');
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require('./middleware/error');
const cors = require("cors");
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config();
connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', require('./routes/user'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
