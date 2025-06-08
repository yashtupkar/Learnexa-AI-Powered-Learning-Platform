const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  verifyOtp: {
    type: String,
    default: "",
  },
  avatar: { type: String },

  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resetPassOtp: {
    type: String,
    default: "",
  },
  resetPassOtpExpireAt: {
    type: Number,
    default: 0,
  },
  generatedQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;