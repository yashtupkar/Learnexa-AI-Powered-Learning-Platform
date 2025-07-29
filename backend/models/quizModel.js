// models/Quiz.js
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const questionSchema = new mongoose.Schema({
  question_number: { type: Number, required: true },
  question_type: {
    type: String,
    enum: ["mcq", "true_false", "fill_in_the_blanks", "short_answer"],
    required: true,
  },
  question_text: { type: String, required: true },
  options: [String], // Only for MCQ
  correct_answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  explanation: { type: String },
});

// const userAttemptSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "userModel",
//     required: true,
//   },
//   attempted_at: { type: Date, default: Date.now },
//   score: {
//     correct: Number,
//     totalQuestions: Number,
//     percentage: Number,
//   },
// });
const userAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  lastSubmittedAt: { type: Date, default: Date.now },
  scores: [
    {
      correct: Number,
      totalQuestions: Number,
      percentage: Number,
      timeSpent: Number, // in seconds
      questions: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
          questionText: String,
          selectedOption: String,
          correctOption: String,
          isCorrect: Boolean,
        },
      ],
      submittedAt: { type: Date, default: Date.now },
    },
  ],
});

const quizSchema = new mongoose.Schema(
  {
    quiz_title: { type: String, required: true },
    questions: [questionSchema],
    attempts: [userAttemptSchema],
    topic: { type: String, },
    grade: { type: String, required: true },
    question_type: { type: String, required: true },
    quiz_timer: { type: Number, default: 0 },
    quiz_type: {
      type: String,
      enum: ["standard-quiz", "coding-quiz", "pdf-quiz"],
      default: "standard-quiz",
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    difficultyLevel: {
      type: String,

      required: true,
    },
    
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
