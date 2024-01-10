const mongoose = require('mongoose')

const verificationCodeSchema = mongoose.Schema(
  {
    code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('VerificationCode', verificationCodeSchema)