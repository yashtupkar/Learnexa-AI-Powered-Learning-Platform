const express = require("express");
const { fetchQuestionBySubjecTopic, getQuestionByTopic, fetchTopicsBySubject, updateQuestion, fetchReadingComprehensionPassage, fetchRcById, bulkInsertQuestions } = require("../controllers/questionController");
const questionRouter = express.Router();

questionRouter.post("/questions", fetchQuestionBySubjecTopic);
questionRouter.get("/questions/:subject/:topic", getQuestionByTopic);
questionRouter.post("/topics", fetchTopicsBySubject);
questionRouter.put("/update-question/:id", updateQuestion);
questionRouter.get("/reading-comprehension", fetchReadingComprehensionPassage);
questionRouter.get("/reading-comprehension/:id", fetchRcById);
questionRouter.post("/bulk-upload", bulkInsertQuestions);




module.exports = questionRouter;





