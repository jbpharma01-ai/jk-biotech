const mongoose = require('mongoose');
const { errorResponse } = require('../utils/response');

const validateEnquiry = (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Full name is required');
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email address is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    errors.push('Phone number is required');
  } else {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      errors.push('Phone number must be exactly 10 digits');
    }
  }

  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    errors.push('Subject is required');
  }

  // Note: Message is optional as per backend requirement specification

  if (errors.length > 0) {
    return errorResponse(res, errors.join('. '), 400, { errors });
  }

  next();
};

const validateAuthLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email is required');
  }
  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return errorResponse(res, errors.join('. '), 400, { errors });
  }

  next();
};

const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, `Invalid ${paramName} format`, 400);
    }
    next();
  };
};

module.exports = {
  validateEnquiry,
  validateAuthLogin,
  validateObjectId,
};
