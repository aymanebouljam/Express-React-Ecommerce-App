const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/router');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === process.env.CLIENT_URL) {
        callback(null, true);
      } else {
        callback(new Error('Not Allow by CORS'));
      }
    },
  }),
);
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

// Routes
app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
