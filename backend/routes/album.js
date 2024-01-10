const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const {
    createAlbum,
    getAllAlbums,
    uploadSong,
    getAlbum,
    deleteAlbum,
    getAlbumsView,
    getLatestAlbums,
    getSong
} = require("../controllers/album");
const { uploadFile } = require("../utils/uploadFile");

router.post('/', [
    protect,
    body("name").notEmpty().withMessage("You must choose a name for the album"),
  ], createAlbum)

router.get('/one/:albumId', protect, getAlbum);

router.get('/all', protect, getAllAlbums);

router.get("/view/:profileId", protect, getAlbumsView)

router.get("/latest", protect, getLatestAlbums)

router.post("/uploadSong", [
  protect,
  uploadFile.single("file")
], uploadSong)

router.get('/song/:songUrl', protect, getSong);

router.delete("/del/:albumId", protect, deleteAlbum);

module.exports = router;
