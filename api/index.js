const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

// Test route
app.get('/', (req, res) => {
  res.send('app is running');
});

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB Database'))
  .catch((error) => console.error(error));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
