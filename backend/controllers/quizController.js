const express = require("express");
const generateQuiz = require("../services/QuizGenerator");
const generateCodingQuiz = require("../services/CodingQuizGenerator");
const axios = require("axios");
const path = require("path");
const generateQuizFromPdf = require("../services/PdfQuizGenerator");
const pdfPath = path.join(__dirname, "..", "testAssets", "story1.pdf");
const fs = require("fs");
const Quiz = require("../models/quizModel");
const Tesseract = require("tesseract.js");
const userModel = require("../models/userModel");

const pdf = require("pdf-parse");

async function extractTextFromPDF(pdfPath) {
  try {
    // 1. Verify file exists
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found at ${pdfPath}`);
    }

    // 2. Try regular text extraction first
    const dataBuffer = fs.readFileSync(pdfPath);

    // 3. Attempt standard PDF text extraction
    try {
      const data = await pdf(dataBuffer);
      if (data.text && data.text.trim().length > 0) {
        return data.text;
      }
    } catch (pdfError) {
      console.log("Standard PDF extraction failed, trying OCR...");
    }

    // 4. Fallback to OCR if standard extraction fails
    const {
      data: { text },
    } = await Tesseract.recognize(pdfPath, "eng", {
      logger: (m) => console.log(m),
    });

    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
}

//For Simple Quiz
const GenerateQuiz = async (req, res) => {
  const {
    topic,
    questionsCount,
    quizTimer,
    difficultyLevel,
    questionTypes,
    grade,
  } = req.body;
  const userId = req.user?.userId || req.user?._id;

  // Enhanced User ID check
  if (!userId) {
    // console.error("User ID missing in request");
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not identified",
    });
  }

  // Validation - improved with detailed error messages
  const missingFields = [];
  if (!topic) missingFields.push("topic");
  if (!questionsCount) missingFields.push("questionsCount");
  if (!difficultyLevel) missingFields.push("difficultyLevel");
  if (!questionTypes) missingFields.push("questionTypes");
  if (!grade) missingFields.push("grade");

  if (missingFields.length > 0) {
    // console.error("Missing required fields:", missingFields);
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
      requiredFields: {
        topic: "string",
        questionsCount: "number",
        difficultyLevel: ["easy", "medium", "hard"],
        questionTypes: [
          "mcq",
          "true_false",
          "fill_in_the_blanks",
          "short_answer",
        ],
        grade: ["10th", "12th", "JEE", "NEET", "Placements"],
      },
    });
  }

  try {
    // console.log("Starting quiz generation for user:", userId);

    const quizResult = await generateQuiz({
      topic,
      questionsCount: parseInt(questionsCount),
      difficultyLevel,
      questionTypes,
      grade,
    });

    console.log("Quiz generation result:", quizResult);

    if (!quizResult?.success || !quizResult.quiz?.questions) {
      console.error("Quiz generation failed:", quizResult?.error);
      return res.status(500).json({
        success: false,
        message: "Failed to generate quiz questions",
        error: quizResult?.error || "Unknown error",
        details: quizResult?.details,
      });
    }

    const newQuiz = new Quiz({
      quiz_title: quizResult.quiz.quiz_title,
      topic,
      grade,
      difficultyLevel,
      quiz_type: "standard-quiz",
      question_type: questionTypes,
      quiz_timer: quizTimer,
      questions: quizResult.quiz.questions,
      created_by: userId,
      created_at: new Date(),
    });

    const savedQuiz = await newQuiz.save();

    const user = await userModel.findById(userId);

    if (!user.generatedQuizzes) {
      user.generatedQuizzes = [];
    }

    user.generatedQuizzes.push({ quiz: newQuiz._id });


    await user.save();

    return res.status(201).json({
      success: true,
      message: "Quiz generated and stored successfully",
      quiz: savedQuiz,
    });
  } catch (error) {
    console.error("Full error in GenerateQuiz:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
      user: req.user,
    });

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }

    if (error.name === "MongoError") {
      return res.status(503).json({
        success: false,
        message: "Database operation failed",
        error: "Database error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

//For coding quiz
const GenerateCodingQuiz = async (req, res) => {
  const {
    topic,
    questionsCount,
    difficultyLevel,
    programmingLanguage,
    targetCompany,
    grade,
  } = req.body;

  // Validate required fields
  if (
    !topic ||
    !questionsCount ||
    !difficultyLevel ||
    !programmingLanguage ||
    !targetCompany ||
    !grade
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
      requiredFields: {
        topic: "string",
        questionsCount: "number",
        difficultyLevel: "'easy'|'medium'|'hard'",
        programmingLanguage:
          "'Python' | 'C' | 'C++' | 'JavaScript' | 'Java' | etc",
        targetCompany: "'Microsoft' |'Google' | 'TCS' | 'Wipro' | etc",
        grade: "10th | 12th | JEE | NEET | Placements",
      },
    });
  }

  try {
    // Call the quiz generation function with parameters from request body
    const quizResult = await generateCodingQuiz({
      topic,
      questionsCount: parseInt(questionsCount),
      difficultyLevel,
      programmingLanguage,
      targetCompany,
      grade,
    });

    if (quizResult.success) {
      res.json({
        success: true,
        quiz: quizResult.quiz,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Coding Quiz generation failed",
        error: quizResult.error,
        details: quizResult.details,
      });
    }
  } catch (error) {
    console.error("Coding Quiz generation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//For PDF to Quiz
const GenerateQuizFromPdf = async (req, res) => {
  const { pdfText, questionsCount, difficultyLevel,customInstructions, questionTypes, grade } =
    req.body;
  if (
    !pdfText ||
    !questionsCount ||
    !difficultyLevel ||
    !questionTypes ||
    !grade
  ) {
    res.json({ success: false, message: "Missing Fields" });
  }
  try {

     const userId = req.user?.userId || req.user?._id;

     // Enhanced User ID check
     if (!userId) {
       // console.error("User ID missing in request");
       return res.status(401).json({
         success: false,
         message: "Unauthorized: User not identified",
       });
     }

    const quizResult = await generateQuizFromPdf({
      extractedText: pdfText,
      questionsCount,
      difficultyLevel,
      questionTypes,
      customInstructions,
      grade,
    });

     console.log("Quiz generation result:", quizResult);

     if (!quizResult?.success || !quizResult.quiz?.questions) {
       console.error("Quiz generation failed:", quizResult?.error);
       return res.status(500).json({
         success: false,
         message: "Failed to generate quiz questions",
         error: quizResult?.error || "Unknown error",
         details: quizResult?.details,
       });
     }

     const newQuiz = new Quiz({
       quiz_title: quizResult.quiz.quiz_title,
       grade,
       difficultyLevel,
       question_type: questionTypes,
       quiz_timer: 10,
       quiz_type: "pdf-quiz",
       questions: quizResult.quiz.questions,
       created_by: userId,
       created_at: new Date(),
     });

     const savedQuiz = await newQuiz.save();

     const user = await userModel.findById(userId);

     if (!user.generatedQuizzes) {
       user.generatedQuizzes = [];
     }

     user.generatedQuizzes.push({ quiz: newQuiz._id });

     await user.save();

    res.json({
      success: true,
      message: "Quiz generated successfully",
      quiz: quizResult.quiz,
    });
  } catch (err) {
    console.error("Quiz generation failed:", err.message);
  }
};



//fetch all quiz
const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("created_by", "name email avatar");
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//fetch quiz by id
const getQuizById = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
  
    res.json(quiz); 
  }catch(error){
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// const submitQuiz = async (req, res) => {
//   const { quizId, userId, score } = req.body;

//   try {
  
  
//     if (
//       !score ||
//       typeof score.correct !== "number" ||
//       typeof score.totalQuestions !== "number" ||
//       typeof score.percentage !== "number"
//     ) {
//       return res.status(400).json({ error: "Invalid score format" });
//     }

//     // Find documents
//     const [quiz, user] = await Promise.all([
//       Quiz.findById(quizId),
//       userModel.findById(userId),
//     ]);

//     if (!quiz) return res.status(404).json({ error: "Quiz not found" });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Prepare score data
//     const newScore = {
//       correct: score.correct,
//       totalQuestions: score.totalQuestions,
//       percentage: score.percentage,
//       submittedAt: new Date(),
//     };

//     // Update user's attempts
//     const userAttemptIndex = user.attemptedQuizzes.findIndex(
//       (attempt) => attempt.quiz.toString() === quizId
//     );

//     if (userAttemptIndex !== -1) {
//       user.attemptedQuizzes[userAttemptIndex].scores.push(newScore);
//       user.attemptedQuizzes[userAttemptIndex].lastSubmittedAt = new Date();
//     } else {
//       user.attemptedQuizzes.push({
//         quiz: quizId,
//         scores: [newScore],
//         lastSubmittedAt: new Date(),
//       });
//     }

//     // Update quiz's attempts
//     const quizAttemptIndex = quiz.attempts.findIndex(
//       (attempt) => attempt.user.toString() === userId
//     );

//     if (quizAttemptIndex !== -1) {
//       quiz.attempts[quizAttemptIndex].scores.push(newScore);
//       quiz.attempts[quizAttemptIndex].lastSubmittedAt = new Date();
//     } else {
//       quiz.attempts.push({
//         user: userId,
//         scores: [newScore],
//         lastSubmittedAt: new Date(),
//       });
//     }

//     // Save changes
//     await Promise.all([user.save(), quiz.save()]);

//     res.status(200).json({
//       success: true,
//       message: "Quiz attempt recorded successfully",
//       attempt: newScore,
//       totalAttempts:
//         userAttemptIndex !== -1
//           ? user.attemptedQuizzes[userAttemptIndex].scores.length
//           : 1,
//     });
//   } catch (error) {
//     console.error("Error submitting quiz:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

//get User generated quiz

const submitQuiz = async (req, res) => {
  const { quizId, userId, score } = req.body;

  try {
    // Validate score structure
    if (
      !score ||
      typeof score.correct !== "number" ||
      typeof score.totalQuestions !== "number" ||
      typeof score.percentage !== "number" ||
      !Array.isArray(score.questions) ||
      !score.questions.every(
        (q) =>
          q.questionId &&
          typeof q.questionText === "string" &&
          typeof q.selectedOption === "string" &&
          typeof q.correctOption === "string" &&
          typeof q.isCorrect === "boolean"
      )
    ) {
      return res.status(400).json({ error: "Invalid score format" });
    }

    // Find documents
    const [quiz, user] = await Promise.all([
      Quiz.findById(quizId),
      userModel.findById(userId),
    ]);

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Prepare complete score data
    const newScore = {
      correct: score.correct,
      totalQuestions: score.totalQuestions,
      percentage: score.percentage,
      questions: score.questions.map((q) => ({
        questionId: q.questionId,
        questionText: q.questionText,
        selectedOption: q.selectedOption,
        correctOption: q.correctOption,
        isCorrect: q.isCorrect,
      })),
      submittedAt: new Date(),
      timeSpent: score.timeSpent || 0, // Include time spent if available
    };

    // Update user's attempts
    const userAttemptIndex = user.attemptedQuizzes.findIndex(
      (attempt) => attempt.quiz.toString() === quizId
    );

    if (userAttemptIndex !== -1) {
      user.attemptedQuizzes[userAttemptIndex].scores.push(newScore);
      user.attemptedQuizzes[userAttemptIndex].lastSubmittedAt = new Date();
    } else {
      user.attemptedQuizzes.push({
        quiz: quizId,
        scores: [newScore],
        lastSubmittedAt: new Date(),
      });
    }

    // Update quiz's attempts
    const quizAttemptIndex = quiz.attempts.findIndex(
      (attempt) => attempt.user.toString() === userId
    );

    if (quizAttemptIndex !== -1) {
      quiz.attempts[quizAttemptIndex].scores.push(newScore);
      quiz.attempts[quizAttemptIndex].lastSubmittedAt = new Date();
    } else {
      quiz.attempts.push({
        user: userId,
        scores: [newScore],
        lastSubmittedAt: new Date(),
      });
    }

    // Save changes
    await Promise.all([user.save(), quiz.save()]);

    res.status(200).json({
      success: true,
      message: "Quiz attempt recorded successfully",
      attempt: newScore,
      totalAttempts:
        userAttemptIndex !== -1
          ? user.attemptedQuizzes[userAttemptIndex].scores.length
          : 1,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

//get result by quiz id
const getQuizResultById = async (req, res) => {
  const quizId = req.params.quizId;
  const userId = req.user?.userId || req.user?._id;

  try {
    const quiz = await Quiz.findById(quizId).populate('attempts.user', 'name email avatar _id');
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" }); 
    }
    
    if (userId) {
      // Find attempt for specific user
      const userAttempt = quiz.attempts.find(attempt => attempt.user._id.toString() === userId);
      if (!userAttempt) {
        return res.status(404).json({ error: "No attempts found for this user" });
      }

      return res.json({
        quiz: quiz.quiz_title,
        attempt: {
          user: userAttempt.user,
          latestScore: userAttempt.scores[userAttempt.scores.length - 1],
          totalAttempts: userAttempt.scores.length,
          lastSubmittedAt: userAttempt.lastSubmittedAt
        }
      });
    }

    // Return all attempts if no userId provided
    const attempts = quiz.attempts.map((attempt) => ({
      user: attempt.user,
      latestScore: attempt.scores[attempt.scores.length - 1],
      totalAttempts: attempt.scores.length,
      lastSubmittedAt: attempt.lastSubmittedAt
    }));

    res.json({
      quiz: quiz.quiz_title,
      attempts
    });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



const getUserGeneratedQuiz = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId).populate({
      path: "generatedQuizzes.quiz",
      populate: {
        path: "created_by",
        select: "name",
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.generatedQuizzes);
  } catch (error) {
    console.error("Error fetching user generated quizzes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get user attempted quiz
const getUserAttemptedQuiz = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId).populate("attemptedQuizzes").populate({
      path: "attemptedQuizzes.quiz",
      populate: {
        path: "created_by",
        select: "name",
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.attemptedQuizzes);
  } catch (error) {
    console.error("Error fetching user attempted quizzes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  GenerateQuiz,
  GenerateCodingQuiz,
  GenerateQuizFromPdf,

  getAllQuiz,
  getQuizById,
  submitQuiz,
  getQuizResultById,
  getUserGeneratedQuiz,
  getUserAttemptedQuiz
};
