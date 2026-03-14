const InterviewSession = require("../models/interviewSessionModel");
const { InterviewResponseAnalyzer } = require("../services/InterviewResponseAnalyzer");
const pdf = require("pdf-parse");
const axios = require("axios");

// Start an interview session
const startInterview = async (req, res) => {
  try {
    const { interviewType, role, level, content } = req.body;
    const userId = req.user?.userId || req.body.userId; // Matches userAuth.js

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create a new session
    const session = new InterviewSession({
      userId,
      interviewType,
      metadata: {
        uploadedInfo: content,
        role,
        level,
      },
    });

    await session.save();

    // Construct the system prompt for Vapi
    const systemPrompt = `
      You are Rohan, an expert and friendly interviewer. You are conducting a ${level} level ${interviewType} interview for the role of ${role}.
      
      Candidate Context:
      ${content}
      
      Operating Rules:
      1. CRITICAL: Introduce yourself as Rohan. Never say "my name is your name" or ask for your own name.
      2. Ask small, concise, and focused questions. One question at a time.
      3. DO NOT number your questions. Never say "Question 1", "First question", or "Question numbers". Just ask naturally as if in a real conversation.
      4. Listen to the candidate. If an answer is too short, ask a quick follow-up to probe deeper before moving to a new topic.
      5. Aim for a total of 5-7 targeted questions.
      6. End the interview gracefully by thanking the candidate. 
      7. CRITICAL: Once you have thanked the candidate and concluded the interview, you MUST say exactly: "The interview is now concluded. Goodbye!" to automatically disconnect the session.
      
      Tone: Professional, conversational, and encouraging.
    `;

    res.status(200).json({
      sessionId: session._id,
      systemPrompt,
      vapiPublicKey: process.env.VAPI_PUBLIC_KEY, // Send public key to frontend
    });
  } catch (error) {
    console.error("Error starting interview:", error);
    res.status(500).json({ message: "Failed to start interview" });
  }
};

// Vapi Webhook for call completion
const handleVapiWebhook = async (req, res) => {
  try {
    const { type, call } = req.body;

    if (type === "call.ended") {
      const { id, transcript, customer } = call;
      // We need to find the session. We can use metadata passed in call or customer info
      // For now, let's assume we pass sessionId in the call metadata
      const sessionId = call.metadata?.sessionId;

      if (!sessionId) {
        console.warn("No sessionId found in Vapi webhook metadata");
        return res.status(200).send();
      }

      const session = await InterviewSession.findById(sessionId);
      if (!session) {
        console.error(`Session ${sessionId} not found`);
        return res.status(404).send();
      }

      session.status = "in_progress";
      session.transcript = transcript;
      session.vapiCallId = id;

      // Generate report using existing InterviewResponseAnalyzer logic
      // We might need to adapt it for full transcripts vs single answers
      // For now, we'll try to generate a summary report
      try {
          const reportData = await InterviewResponseAnalyzer("Overall Interview Transcript", transcript);
          session.report = {
              overallScore: reportData.overallScore,
              feedback: reportData.analysisSummary,
              strengths: reportData.strengths?.items || [],
              weaknesses: reportData.improvements?.items || [],
              suggestions: reportData.suggestions || [],
              detailedAnalysis: reportData
          };
          session.status = "completed";
      } catch (reportError) {
          console.error("Error generating report:", reportError);
          session.status = "failed";
      }

      await session.save();
    }

    res.status(200).send();
  } catch (error) {
    console.error("Error handling Vapi webhook:", error);
    res.status(500).send();
  }
};

const getInterviewReport = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await InterviewSession.findById(sessionId);
        
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: "Error fetching report" });
    }
};

const generateReportFromTranscript = async (req, res) => {
  try {
    const { sessionId, transcript } = req.body;
    const userId = req.user?.userId || req.body.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!sessionId || !Array.isArray(transcript) || transcript.length === 0) {
      return res.status(400).json({ message: "Transcript is required" });
    }

    const session = await InterviewSession.findOne({ _id: sessionId, userId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const formattedTranscript = transcript
      .filter((message) => message && message.text)
      .map((message) => {
        const speaker =
          message.speaker ||
          (message.role === "assistant" || message.role === "agent"
            ? "Interviewer"
            : "Candidate");
        return `${speaker}: ${message.text}`;
      })
      .join("\n");

    if (!formattedTranscript.trim()) {
      return res.status(400).json({ message: "Transcript is empty" });
    }

    session.status = "in_progress";
    session.transcript = formattedTranscript;

    try {
      const reportData = await InterviewResponseAnalyzer(
        "Overall Interview Transcript",
        formattedTranscript
      );
      session.report = {
        overallScore: reportData.overallScore,
        feedback: reportData.analysisSummary,
        strengths: reportData.strengths?.items || [],
        weaknesses: reportData.improvements?.items || [],
        suggestions: reportData.suggestions || [],
        detailedAnalysis: reportData,
      };
      session.status = "completed";
    } catch (reportError) {
      console.error("Error generating report:", reportError);
      session.status = "failed";
    }

    await session.save();
    res.status(200).json({ status: session.status, report: session.report });
  } catch (error) {
    res.status(500).json({ message: "Error generating report" });
  }
};

const getUserInterviews = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const sessions = await InterviewSession.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching user interviews:", error);
    res.status(500).json({ message: "Error fetching user interviews" });
  }
};

module.exports = {
  startInterview,
  handleVapiWebhook,
  getInterviewReport,
  generateReportFromTranscript,
  getUserInterviews
};
