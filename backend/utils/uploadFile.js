const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "public/songs/")
    },

    filename: (req, file, cb) => {
        return cb(null, `song_${Date.now()}.mp3`)
    }
})

const uploadFile = multer({ storage });

module.exports = {
    uploadFile
}
