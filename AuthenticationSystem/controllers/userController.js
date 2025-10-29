import User from '../model/users.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH, {
    expiresIn: '7d',
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error('please provide all information');
  }
  const userexists = await User.findOne({ email });
  if (userexists) {
    throw new Error('email already exist');
  }
  if (password !== confirmPassword) {
    throw new Error('password doesnt match');
  }
  const newUser = await User.create({ firstName, lastName, email, password });
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'registerd successfully',
  });
});
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('please enter all the fields');
  const user = await User.findOne({ email });
  if (!user) throw new Error('your are not registered with this email');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('password doesnt match');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  // Store refresh token in an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // cannot be accessed by JavaScript
    secure: process.env.NODE_ENV === 'production', // only HTTPS in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json({
    success: true,
    accessToken,
    data: user,
  });
});
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) {
      throw new Error('Invalid or expired refresh token');
    }
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});
export const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new Error('No refresh token');
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
  res.clearCookie('refreshToken');
  res.json({ message: 'user  has logged out from the device' });
});
