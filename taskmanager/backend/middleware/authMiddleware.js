const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');
const ApiError = require('../utils/ApiError');

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies && req.cookies.jwt;

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }
    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized, token failed');
  }
});

module.exports = { protect };
