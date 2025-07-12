const express = require("express");
const { InterviewResponseAnalyzer } = require("../services/InterviewResponseAnalyzer");

const InterviewResponseAnalysis = async (req, res) => {
    try {
     const { question, answer } = req.body;
    const analysis = await InterviewResponseAnalyzer(question, answer);
    res.json(analysis);    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
   

}
module.exports = {
    InterviewResponseAnalysis,
}
