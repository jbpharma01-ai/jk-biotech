const { errorResponse } = require('../utils/response');
const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message;

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Mongoose validation error
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  // Mongoose duplicate key error
  else if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyPattern || {})[0];

    message = duplicateField
      ? `${duplicateField} already exists`
      : 'Duplicate value already exists';
  }

  // Existing error handling
  else {
    const defaultMessage =
      statusCode >= 500
        ? 'Internal Server Error'
        : 'Request failed';

    message =
      config.nodeEnv === 'development'
        ? err.message || defaultMessage
        : statusCode >= 500
          ? 'Internal Server Error'
          : err.message || defaultMessage;
  }

  errorResponse(res, message, statusCode);
};

module.exports = errorHandler;