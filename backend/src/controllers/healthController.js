const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');
const { getHealthStatus } = require('../services/healthService');

const healthController = asyncHandler(async (req, res) => {
  const healthStatus = getHealthStatus();

  successResponse(
    res,
    'J K BIOTECH Backend API is running',
    healthStatus
  );
});


module.exports = healthController;