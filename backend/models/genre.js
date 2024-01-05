const mongoose = require('mongoose')

const genreSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Genre', genreSchema)
