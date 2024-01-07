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
    favoriteGenres: [
      {
        type: String
      }
    ],
    followedArtists: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('UserProfile', profileSchema)
