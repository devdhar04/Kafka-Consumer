// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cpuRoutes = require('./CpuUsageRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb://0.0.0.0:27017/cpu-monitor';

app.use(bodyParser.json());
app.use(cpuRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
