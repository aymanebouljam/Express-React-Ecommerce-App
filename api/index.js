const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const usersRouter = require('./routes/usersRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

// Connection to Database
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB Database'))
  .catch((error) => console.error('Failed to connect to Database: ', error));

// Test route
app.get('/', (req, res) => {
  res.send('app is running');
});

// Users Routes
app.use('/api/users', usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
