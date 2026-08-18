const getHealthStatus = () => {
  return {
    service: 'J K BIOTECH Backend',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  };
};


module.exports = {
  getHealthStatus,
};