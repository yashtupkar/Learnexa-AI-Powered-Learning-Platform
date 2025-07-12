const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // Core question information
  questionText: {
    type: String,
    required: true,
    trim: true
  },
subject: {
    type: String,
    required: true,
    enum: ['aptitude', 'logical-reasoning', 'verbal-reasoning'],
    index: true
  },
  category: {
    type: String, 
    required: true,
    index: true
  },

  options: [{
    identifier: {
      type: String,
      required: true,
      uppercase: true,
      match: /^[A-Z]$/
    },
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  correctAnswer: {
    type: String,
    required: true,
    uppercase: true,
    match: /^[A-Z]$/
  },
  explanation: {
    type: String,
    required: true
  },
  solution: String,
  diagrams: [{
    url: String,
    caption: String
  }],
  hasDiagram: {
    type: Boolean,
    default: false
  }
});

// Indexes for optimal querying

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
