const express = require('express');
const {
  login,
  register,
  changePassword,
  verifyToken,
  uploadImage,
  sendOTP,
} = require('../controllers/auth-controller');
const {
  uploadimage,
  upload,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/user-controller');
const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.use('/change-password', verifyToken);
authRouter.post('/change-password', changePassword);
authRouter.post('/upload-profile-pic', upload);
authRouter.put('/upload-profile-pic', uploadimage);
authRouter.use('/profile', verifyToken);
authRouter.post('/profile', getUserProfile);
authRouter.post('/profile', getUserProfile);
authRouter.get('/send-otp', sendOTP);
authRouter.put('/update-profile', updateUserProfile);
// updateUserProfile;
module.exports = authRouter;
