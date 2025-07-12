// routes/indiabixRoutes.js
const express = require("express");
const router = express.Router();
const { getPageContent, getAllPagesContent } = require("../Scraper/IndiaBixScraper");
const Question = require("../models/questionsModel");


// API endpoint to fetch questions
router.post("/questions", async (req, res) => {
  try {
    const { subject, topic } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({ error: "Subject and Topic are required" });
    }

  

    const result = await getAllPagesContent(subject,topic);
    const scrapedQuestions = result.questions;
    
    // Save questions to database
    const savedQuestions = [];
    let savedCount = 0;
    let errorCount = 0;
    
    for (const q of scrapedQuestions) {
      try {
        // Format the question to match our schema
        const questionData = {
          questionText: q.text,
          subject: subject,
          category: topic,
          options: q.options.map((opt) => ({
            identifier: opt.letter,
            text: opt.text,
            isCorrect: opt.letter === q.correctAnswer,
          })),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "No explanation provided",
          hasDiagram: false,
        };
        
        // Check if question already exists to avoid duplicates
        const existingQuestion = await Question.findOne({ questionText: q.text });
        
        if (!existingQuestion) {
          const newQuestion = new Question(questionData);
          await newQuestion.save();
          savedQuestions.push(newQuestion);
          savedCount++;
        }
      } catch (err) {
        console.error(`Error saving question: ${err.message}`);
        errorCount++;
      }
    }
    
    res.json({
      success: true,
      topic: topic,
      totalQuestions: scrapedQuestions.length,
      savedCount,
      errorCount,
      message: `Successfully saved ${savedCount} questions to the database.`
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to fetch and save questions",
      details: error.message,
    });
  }
});





// API endpoint to get questions from database by topic
router.get("/questions/:subject/:topic", async (req, res) => {
  try {
    const { topic, subject } = req.params;
    const { limit = 20, page = 1 } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    
    // Query the database for questions
    const questions = await Question.find({ 
      category: topic.toLowerCase(),
      subject: subject.toLowerCase()
    })
    .skip(skip)
    .limit(parseInt(limit))
    .exec();
    
    // Get total count for pagination
    const totalCount = await Question.countDocuments({ 
      category: topic.toLowerCase(),
    });
    
    res.json({
      success: true,
      topic,
      totalQuestions: questions.length,
      questions
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to fetch questions from database",
      details: error.message,
    });
  }
});

router.put("/update-question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the request body
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    // Validate the question text if provided
    if (updateData.questionText && updateData.questionText.trim() === "") {
      return res.status(400).json({ error: "Question text cannot be empty" });
    }

    // Validate options if provided
    if (updateData.options) {
      if (!Array.isArray(updateData.options)) {
        return res.status(400).json({ error: "Options must be an array" });
      }

      if (updateData.options.length < 2) {
        return res.status(400).json({ error: "At least 2 options are required" });
      }

      const hasEmptyOption = updateData.options.some(opt => !opt.text || opt.text.trim() === "");
      if (hasEmptyOption) {
        return res.status(400).json({ error: "Option text cannot be empty" });
      }

      const hasCorrectAnswer = updateData.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        return res.status(400).json({ error: "At least one correct answer is required" });
      }
    }

    // Find and update the question
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({
      error: "Failed to update question",
      details: error.message,
    });
  }
});

module.exports = router;
