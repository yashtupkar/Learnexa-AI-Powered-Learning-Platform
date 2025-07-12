const express = require("express");

const interviewRouter = express.Router();
const { InterviewResponseAnalysis } = require("../controllers/InterviewController");

interviewRouter.post("/analyze", InterviewResponseAnalysis);

module.exports = interviewRouter
