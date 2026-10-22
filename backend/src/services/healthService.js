const mongoose = require('mongoose');

const getHealthStatus = () => {
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return {
    service: 'J K BIOTECH Backend',
    status: 'healthy',
    database: dbStates[mongoose.connection.readyState] || 'unknown',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  getHealthStatus,
};