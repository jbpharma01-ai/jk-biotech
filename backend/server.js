const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const config = require('./src/config/env');

const apiRoutes = require('./src/routes');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');

const connectDB = require('./src/config/db');
const app = express();

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);


connectDB();

// ================================
// Server
// ================================

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 J K BIOTECH Backend running on port ${PORT}`);
});