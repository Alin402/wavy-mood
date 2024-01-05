const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const ArtistProfile = require("../models/artistProfile");
const {
    createArtistProfile,
    getArtistProfile,
    createNormalUserProfile,
    getNormalUserProfile,
    editArtistProfile,
    editNormalUserProfile,
    getArtistProfileView,
    followArtist
} = require("../controllers/profile");
const UserProfile = require('../models/userProfile');

router.post('/artist', [
    protect,
    body("username").notEmpty().withMessage("You must choose a username"),
  ], createArtistProfile)

router.get('/artist', protect, getArtistProfile);

router.get("/artist/one/:artistId", protect, getArtistProfileView)

router.post('/normalUser', [
  protect,
  body("username").notEmpty().withMessage("You must choose a username"),
  body('username').custom(async value => {
    const profile = await UserProfile.findOne({ username: value });
    if (profile) {
      throw new Error('Username already taken');
    }
  })
], createNormalUserProfile)

router.get('/normalUser', protect, getNormalUserProfile);

router.put('/artist/edit', [
  protect,
  body("username").notEmpty().withMessage("You must choose a username"),
], editArtistProfile)

router.put('/normalUser/edit', [
  protect,
  body("username").notEmpty().withMessage("You must choose a username"),
], editNormalUserProfile)

router.put('/follow', [
  protect,
], followArtist)

module.exports = router;
