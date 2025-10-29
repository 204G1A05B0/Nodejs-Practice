import express from 'express';

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.post('/refresh', refreshAccessToken);
// router.patch('/forgotPassword', forgotPassword);
router.post('/logout', logoutUser);

export default router;
