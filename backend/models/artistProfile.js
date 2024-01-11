const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    profilePhotoUrl: {
      type: String,
    },
    coverPhotoUrl: {
      type: String,
    },
    genres: [
      {
        type: String
      }
    ],
    followers: [
      {
          type: mongoose.Schema.Types.ObjectId
      }
    ],
    noFollowers: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('ArtistProfile', profileSchema)
