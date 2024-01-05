const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const {
    createPlaylist,
    getAllPlaylists,
    getPlaylist,
    deletePlaylist,
    addSongToPlaylist
} = require("../controllers/playlist");

router.post('/', [
    protect,
    body("name").notEmpty().withMessage("You must choose a name for the playlist"),
  ], createPlaylist)

router.get('/one/:playlistId', protect, getPlaylist);

router.get('/all', protect, getAllPlaylists);

router.delete("/del/:playlistId", protect, deletePlaylist);

router.put("/song/add", protect, addSongToPlaylist);

module.exports = router;
