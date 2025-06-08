// models/Quiz.js

const mongoose = require("mongoose");
const userModel = require("./userModel");

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

const userAttemptSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  attempted_at: { type: Date, default: Date.now },
  answers: [
    {
      question_number: Number,
      answer: mongoose.Schema.Types.Mixed, // string, boolean, etc.
      is_correct: Boolean,
    },
  ],
  score: { type: Number, default: 0 },
});

const quizSchema = new mongoose.Schema(
  {
    quiz_title: { type: String, required: true },
    questions: [questionSchema],
    attempts: [userAttemptSchema],
    topic: { type: String, required: true },
    grade: { type: String, required: true },
    question_type: { type: String, required: true },
    quiz_timer:{type: Number , default: 0},
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
