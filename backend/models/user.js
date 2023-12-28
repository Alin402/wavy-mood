const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isArtist: {
      type: Boolean,
      required: [true, 'Please specify wheter you are an artist or not']
    },
    hasProfile: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
