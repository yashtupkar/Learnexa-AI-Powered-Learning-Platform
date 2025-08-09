// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   // Core question information
//   questionText: {
//     type: String,
//     required: true,
//     trim: true
//   },
// subject: {
//     type: String,
//     required: true,
//     enum: ['aptitude', 'logical-reasoning', 'verbal-reasoning', 'verbal-ability'],
//     index: true
//   },
//   category: {
//     type: String,
//     required: true,
//     index: true
//   },

//   options: [{
//     identifier: {
//       type: String,
//       required: true,
//       uppercase: true,
//       match: /^[A-Z]$/
//     },
//     text: {
//       type: String,
//       required: true
//     },
//     isCorrect: {
//       type: Boolean,
//       default: false
//     }
//   }],
//   correctAnswer: {
//     type: String,
//     required: true,
//     uppercase: true,
//     match: /^[A-Z]$/
//   },
//   explanation: {
//     type: String,
//     required: true
//   },
//   solution: String,
//   diagrams: [{
//     url: String,
//     caption: String
//   }],
//   hasDiagram: {
//     type: Boolean,
//     default: false
//   }
// }, { timestamps: true });

// // Indexes for optimal querying

// const Question = mongoose.model('Question', questionSchema);
// module.exports = Question;


const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    // Core question information
    questionType: {
      type: String,
      required: true,
      enum: ["standard", "reading-comprehension"],
      default: "standard",
    },
    questionText: {
      type: String,
      required: function () {
        return this.questionType === "standard";
      },
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      enum: [
        "aptitude",
        "logical-reasoning",
        "verbal-reasoning",
        "non-verbal-reasoning",
        "verbal-ability",
        "reading-comprehension",
      ],
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },

    // For standard questions
    options: [
      {
        identifier: {
          type: String,
          required: function () {
            return this.questionType === "standard";
          },
          uppercase: true,
          match: /^[A-Z]$/,
        },
        text: {
          type: String,
          required: function () {
            return this.questionType === "standard";
          },
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],
    correctAnswer: {
      type: String,
      required: function () {
        return this.questionType === "standard";
      },
      uppercase: true,
      match: /^[A-Z]$/,
    },

    // For reading comprehension
    passage: {
      type: String,
      required: function () {
        return this.questionType === "reading-comprehension";
      },
      trim: true,
    },
    passageTitle: {
      type: String,
      required: function () {
        return this.questionType === "reading-comprehension";
      },
      trim: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
          trim: true,
        },
        options: [
          {
            identifier: {
              type: String,
              required: true,
              uppercase: true,
              match: /^[A-Z]$/,
            },
            text: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              default: false,
            },
          },
        ],
        correctAnswer: {
          type: String,
          required: true,
          uppercase: true,
          match: /^[A-Z]$/,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],

    // Common fields
    explanation: {
      type: String,
      required: function () {
        return this.questionType === "standard";
      },
    },
    solution: String,
    diagrams: [
      {
        url: String,
        caption: String,
      },
    ],
    hasDiagram: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for optimal querying
questionSchema.index({ subject: 1, category: 1 });
questionSchema.index({ questionType: 1 });

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;