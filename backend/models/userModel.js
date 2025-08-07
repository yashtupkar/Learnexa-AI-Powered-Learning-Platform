const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const Quiz = require("../models/quizModel")

const streakHistorySchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  length: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  youtubeApiKey:{type: String },
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
  lastActivityDate: {
    type: Date,
    default: null,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  },
  activeDates: [Date],
  streakHistory: [streakHistorySchema],
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

  notifications: [
    {
      type: {
        type: String,
        enum: ["info", "success", "error","welcome", "warning"],
        default: "info",
      },
      title: { type: String, required: true },
      message: { type: String, required: true },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],

});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;