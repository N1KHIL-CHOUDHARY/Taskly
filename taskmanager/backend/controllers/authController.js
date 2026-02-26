const { validationResult } = require('express-validator');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');

const sendTokenResponse = (user, res) => {
  const token = generateToken(user._id);

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({ name, email, password });

  sendTokenResponse(user, res);
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  sendTokenResponse(user, res);
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authorized');
  }

  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

module.exports = { register, login, logout, getMe };
