const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const {
    getAllGenres,
    searchGenre
} = require("../controllers/genre");

router.get('/', protect, getAllGenres);
router.post("/search", protect, searchGenre);

module.exports = router;
