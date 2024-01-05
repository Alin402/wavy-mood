const mongoose = require('mongoose')

const albumSchema = mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    coverPhotoUrl: {
      type: String,
    },
    artistName: {
      type: String,
      required: true
    },
    songs: [
      {
        albumId: {
          type:  mongoose.Schema.Types.ObjectId,
          required: true
        },
        albumName: {
          type: String,
          required: true
        },
        artistName: {
          type: String,
          required: true
        },
        name: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        },
        duration: {
          type: Number,
          required: true
        }
      }
    ],
    creationDate: {
        type: Date,
        default: Date.now
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Album', albumSchema)
