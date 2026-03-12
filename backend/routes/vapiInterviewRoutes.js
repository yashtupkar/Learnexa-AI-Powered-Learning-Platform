const express = require("express");
const vapiInterviewRouter = express.Router();
const { startInterview, handleVapiWebhook, getInterviewReport } = require("../controllers/vapiInterviewController");
const userAuth = require("../middleware/userAuth"); // Corrected middleware name

// Note: handleVapiWebhook shouldn't have auth as it's called by Vapi
vapiInterviewRouter.post("/start", userAuth, startInterview);
vapiInterviewRouter.post("/webhook", handleVapiWebhook);
vapiInterviewRouter.get("/report/:sessionId", getInterviewReport);

module.exports = vapiInterviewRouter;
