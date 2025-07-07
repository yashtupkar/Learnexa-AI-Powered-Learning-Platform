const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const Quiz = require("../models/quizModel")

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
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  // attemptedQuizzes: [
  //   {
  //     quiz: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Quiz",
  //     },
  //     score: {
  //       correct: Number,
  //       totalQuestions: Number,
  //       percentage: Number,
  //     },

  //     submittedAt: { type: Date, default: Date.now },
  //   },
  // ],
  attemptedQuizzes: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      scores: [
        {
          correct: Number,
          totalQuestions: Number,
          percentage: Number,
          submittedAt: { type: Date, default: Date.now },
        },
      ],
      lastSubmittedAt: { type: Date, default: Date.now },
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;