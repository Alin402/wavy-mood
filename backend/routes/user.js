const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  googleRegisterUser
} = require('../controllers/user')
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const User = require("../models/user");

router.post('/', [
  body("name").notEmpty().withMessage("Name is required"),
  body("isArtist").notEmpty().withMessage("Account type is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 8 }).withMessage("The password must have a minimum of 8 characters"),
  body('email').custom(async value => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error('Email already in use');
    }
  }),
], registerUser)

router.post('/google', [
  body("code").notEmpty().withMessage("Google auth code is required"),
], googleRegisterUser)

router.post('/login', [
  body('email').custom(async value => {
    const user = await User.findOne({ email: value });
    if (!user) {
      throw new Error('Email not registered or empty');
    }
  }),
], loginUser)
router.get('/me', protect, getMe)

module.exports = router;
