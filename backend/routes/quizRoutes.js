const express = require("express");
const { GenerateQuiz, GenerateCodingQuiz, GenerateQuizFromPdf, SuggestTopic, getAllQuiz, getQuizById,getUserAttemptedQuiz, submitQuiz, getUserGeneratedQuiz, getQuizResultById } = require("../controllers/quizController");


const userAuth = require("../middleware/userAuth");
const quizRouter = express.Router();


quizRouter.post('/generate-quiz', userAuth, GenerateQuiz)
quizRouter.post("/generate-coding-test", GenerateCodingQuiz);
quizRouter.post("/generate-quiz-from-pdf",userAuth, GenerateQuizFromPdf);
quizRouter.post("/suggest-topic", SuggestTopic);
quizRouter.get("/get-all-quizzes", getAllQuiz);
quizRouter.get("/get-quiz-by-id/:id", getQuizById);
quizRouter.post("/submit-quiz", submitQuiz);
quizRouter.get("/get-user-generated-quiz/:id", getUserGeneratedQuiz);
quizRouter.get("/get-user-attempted-quiz/:id", getUserAttemptedQuiz);
quizRouter.get("/get-quiz-result/:quizId", userAuth, getQuizResultById); // Assuming this is for fetching quiz results by ID




module.exports = quizRouter;