// const fetch = require("node-fetch");

// const InterviewResponseAnalyzer = async (question, answer) => {
//   const prompt = `
//   You are a Interviewer you have to Analyze this interview response and provide detailed feedback in JSON format:
  
//   Question: "${question}"
//   Answer: "${answer}"

//   Provide analysis with these components:
//   1. Scores (1-5 scale) for: relevance, clarity, confidence, structure, specificity
//   2. Strengths (3-5 items)
//   3. Areas for improvement (3-5 items)
//   4. Detailed suggestions for improvement
//   5. Sample improved answer
//   6. Recommended follow-up questions
//   7. Response as a interviewer

//   Return format:
//   {
//     "response": string[],
//     "scores": {
//       "relevance": number,
//       "clarity": number,
//       "confidence": number,
//       "structure": number,
//       "specificity": number
//     },
//     "strengths": string[],
//     "improvements": string[],
//     "suggestions": string[],
//     "sampleAnswer": string,
//     "followUpQuestions": string[]
//   }
//   `;

//   const API_KEY = process.env.OPENROUTER_API_KEY;

//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://localhost:5173",
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-r1:free",
//           messages: [
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           temperature: 0.3,
//           response_format: { type: "json_object" },
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorBody = await response.text();
//       throw new Error(`API request failed: ${response.status} - ${errorBody}`);
//     }

//     const data = await response.json();
//     console.log(data?.choices?.[0]?.message);

//     // Check if response has the expected structure
//     if (!data?.choices?.[0]?.message?.content) {
//       console.error("Unexpected API response structure:", data);
//       throw new Error("Invalid API response structure");
//     }

//     const rawOutput = data.choices[0].message.content;

//     // Extract and clean JSON content
//     const jsonString = extractJsonFromResponse(rawOutput);

//     try {
//       const analysis = JSON.parse(jsonString);

//       // Validate the analysis structure
//       if (!isValidAnalysis(analysis)) {
//         throw new Error("Invalid analysis structure received");
//       }

//       // Calculate overall score
//       analysis.overallScore = calculateOverallScore(analysis.scores);

//       return analysis;
//     } catch (parseError) {
//       console.error("Error parsing analysis:", parseError);
//       console.error("Original content:", rawOutput);
//       throw new Error(`Failed to parse analysis: ${parseError.message}`);
//     }
//   } catch (error) {
//     console.error("Error in InterviewResponseAnalyzer:", error);
//     return {
//       error: "Failed to analyze response",
//       details: error.message,
//       fallbackAnalysis: getFallbackAnalysis(),
//     };
//   }
// };

// // Helper functions
// function extractJsonFromResponse(rawString) {
//   // Handle JSON wrapped in code blocks
//   const codeBlockMatch = rawString.match(/```(?:json)?\n([\s\S]*?)\n```/);
//   if (codeBlockMatch) return codeBlockMatch[1];

//   // Handle plain JSON
//   const jsonMatch = rawString.match(/{[\s\S]*}/);
//   if (jsonMatch) return jsonMatch[0];

//   // Fallback to cleaning the string
//   return rawString
//     .replace(/^```(?:json)?/, "")
//     .replace(/```$/, "")
//     .trim();
// }

// function isValidAnalysis(analysis) {
//   const requiredFields = ["scores", "strengths", "improvements", "suggestions"];
//   const requiredScores = [
//     "relevance",
//     "clarity",
//     "confidence",
//     "structure",
//     "specificity",
//   ];

//   return (
//     requiredFields.every((field) => analysis[field]) &&
//     requiredScores.every(
//       (score) =>
//         typeof analysis.scores[score] === "number" &&
//         analysis.scores[score] >= 1 &&
//         analysis.scores[score] <= 5
//     )
//   );
// }

// function calculateOverallScore(scores) {
//   const weights = {
//     relevance: 0.3,
//     clarity: 0.2,
//     confidence: 0.2,
//     structure: 0.15,
//     specificity: 0.15,
//   };

//   return parseFloat(
//     Object.entries(scores)
//       .reduce((sum, [key, value]) => sum + value * weights[key], 0)
//       .toFixed(1)
//   );
// }

// function getFallbackAnalysis() {
//   return {
//     scores: {
//       relevance: 3,
//       clarity: 3,
//       confidence: 3,
//       structure: 3,
//       specificity: 3,
//     },
//     strengths: ["Your answer was received"],
//     improvements: ["Service unavailable for detailed feedback"],
//     suggestions: ["Try again later or rephrase your answer"],
//     sampleAnswer: "Example response unavailable due to service error",
//     followUpQuestions: [
//       "What aspects would you like more feedback on?",
//       "Could you elaborate on your answer?",
//     ],
//   };
// }

// module.exports = { InterviewResponseAnalyzer };

// const fetch = require("node-fetch");

const InterviewResponseAnalyzer = async (question, answer) => {
  const prompt = `
  You are an experienced Interview Analyst specializing in comprehensive response evaluation. Analyze this interview response thoroughly and provide detailed feedback in JSON format.
  
  **Question:** "${question}"
  **Answer:** "${answer}"

  Provide a comprehensive analysis with these components:
  
  1. **Scores** (1-10 scale for precision):
     - relevance: How well the answer matches the question
     - clarity: How clear and understandable the response is
     - confidence: How assured and convincing the response sounds
     - structure: How well-organized the response is
     - specificity: How detailed and concrete the response is
     - depth: How insightful and thoughtful the response is
     - originality: How unique and creative the response is
  
  2. **Strengths** (5-7 items with explanations):
     - Identify specific positive aspects with examples from the answer
  
  3. **Areas for improvement** (5-7 items with explanations):
     - Identify specific weaknesses with examples from the answer
  
  4. **Detailed suggestions for improvement** (5-7 actionable items):
     - Provide concrete advice for each improvement area
  
  5. **Content analysis**:
     - keyThemes: List 3-5 main themes covered in the answer
     - emotionalTone: Analyze the emotional tone (confident, hesitant, enthusiastic, etc.)
     - technicalAccuracy: Evaluate if technical content is accurate (if applicable)
     - evidenceUsed: Note any examples, data, or evidence provided
     - missingElements: Identify important aspects not covered
  
  6. **Sample improved answer**:
     - Provide a rewritten version incorporating all suggested improvements
  
  7. **Recommended follow-up questions** (5-7 questions):
     - Questions that would probe deeper based on this response
  
  8. **Interviewer reaction analysis**:
     - How the interviewer might perceive this answer
     - Potential concerns or positive impressions
  
  9. **Comparative analysis** (if applicable):
     - How this answer compares to strong responses for this question
  
  Return format:
  {
    "analysisSummary": string,
    "scores": {
      "relevance": number,
      "clarity": number,
      "confidence": number,
      "structure": number,
      "specificity": number,
      "depth": number,
      "originality": number
    },
    "strengths": {
      "items": string[],
      "explanations": string[]
    },
    "improvements": {
      "items": string[],
      "explanations": string[]
    },
    "suggestions": string[],
    "contentAnalysis": {
      "keyThemes": string[],
      "emotionalTone": string,
      "technicalAccuracy": string,
      "evidenceUsed": string[],
      "missingElements": string[]
    },
    "sampleAnswer": string,
    "followUpQuestions": string[],
    "interviewerReaction": {
      "positiveImpressions": string[],
      "potentialConcerns": string[]
    },
    "comparativeAnalysis": string
  }
  `;

  const API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://localhost:5173",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free", // Using a more powerful model
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2, // Lower temperature for more focused responses
          max_tokens: 4000, // Allow for longer, more detailed responses
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();

    // Check if response has the expected structure
    if (!data?.choices?.[0]?.message?.content) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Invalid API response structure");
    }

    const rawOutput = data.choices[0].message.content;

    // Extract and clean JSON content
    const jsonString = extractJsonFromResponse(rawOutput);

    try {
      const analysis = JSON.parse(jsonString);

      // Validate the analysis structure
      if (!isValidEnhancedAnalysis(analysis)) {
        throw new Error("Invalid analysis structure received");
      }

      // Calculate overall score with weighted average
      analysis.overallScore = calculateEnhancedOverallScore(analysis.scores);

      // Add metadata
      analysis.metadata = {
        analyzedAt: new Date().toISOString(),
        modelUsed: "anthropic/claude-3-opus",
        questionLength: question.length,
        answerLength: answer.length,
        wordCount: answer.split(/\s+/).length,
      };

      return analysis;
    } catch (parseError) {
      console.error("Error parsing analysis:", parseError);
      console.error("Original content:", rawOutput);
      throw new Error(`Failed to parse analysis: ${parseError.message}`);
    }
  } catch (error) {
    console.error("Error in InterviewResponseAnalyzer:", error);
    return getEnhancedFallbackAnalysis(question, answer, error.message);
  }
};

// Helper functions
function extractJsonFromResponse(rawString) {
  // Handle JSON wrapped in code blocks
  const codeBlockMatch = rawString.match(/```(?:json)?\n([\s\S]*?)\n```/);
  if (codeBlockMatch) return codeBlockMatch[1];

  // Handle plain JSON
  const jsonMatch = rawString.match(/{[\s\S]*}/);
  if (jsonMatch) return jsonMatch[0];

  // Fallback to cleaning the string
  return rawString
    .replace(/^```(?:json)?/, "")
    .replace(/```$/, "")
    .trim();
}

function isValidEnhancedAnalysis(analysis) {
  const requiredFields = [
    "analysisSummary",
    "scores",
    "strengths",
    "improvements",
    "contentAnalysis",
    "sampleAnswer",
  ];

  const requiredScores = [
    "relevance",
    "clarity",
    "confidence",
    "structure",
    "specificity",
    "depth",
    "originality",
  ];

  return (
    requiredFields.every((field) => analysis[field]) &&
    requiredScores.every(
      (score) =>
        typeof analysis.scores[score] === "number" &&
        analysis.scores[score] >= 1 &&
        analysis.scores[score] <= 10
    ) &&
    typeof analysis.contentAnalysis === "object" &&
    Array.isArray(analysis.strengths.items) &&
    Array.isArray(analysis.strengths.explanations) &&
    analysis.strengths.items.length === analysis.strengths.explanations.length
  );
}

function calculateEnhancedOverallScore(scores) {
  const weights = {
    relevance: 0.25,
    clarity: 0.15,
    confidence: 0.15,
    structure: 0.1,
    specificity: 0.1,
    depth: 0.15,
    originality: 0.1,
  };

  return parseFloat(
    Object.entries(scores)
      .reduce((sum, [key, value]) => sum + value * weights[key], 0)
      .toFixed(1)
  );
}

function getEnhancedFallbackAnalysis(question, answer, errorMessage) {
  const wordCount = answer.split(/\s+/).length;
  const sentenceCount = answer.split(/[.!?]+/).filter(Boolean).length;

  return {
    analysisSummary: "Basic analysis due to service error",
    scores: {
      relevance: 5,
      clarity: 5,
      confidence: 5,
      structure: 5,
      specificity: 5,
      depth: 5,
      originality: 5,
    },
    strengths: {
      items: ["Your answer was received and contains content to analyze"],
      explanations: [
        `The response contains ${wordCount} words and ${sentenceCount} sentences`,
      ],
    },
    improvements: {
      items: ["Service unavailable for detailed feedback"],
      explanations: [errorMessage],
    },
    suggestions: [
      "Try again later when the service is available",
      "Rephrase your answer for potentially better analysis",
      "Break your answer into clearer sections",
    ],
    contentAnalysis: {
      keyThemes: ["General response detected"],
      emotionalTone: "neutral",
      technicalAccuracy: "unknown",
      evidenceUsed: [],
      missingElements: ["Detailed analysis unavailable"],
    },
    sampleAnswer: "Example improved response unavailable due to service error",
    followUpQuestions: [
      "What aspects would you like more feedback on?",
      "Could you elaborate on your answer?",
      "What challenges did you face in formulating this response?",
    ],
    interviewerReaction: {
      positiveImpressions: ["The candidate provided a response"],
      potentialConcerns: ["Unable to fully evaluate response quality"],
    },
    comparativeAnalysis:
      "Unable to compare with other responses due to service error",
    metadata: {
      analyzedAt: new Date().toISOString(),
      error: true,
      errorMessage: errorMessage,
      questionLength: question.length,
      answerLength: answer.length,
      wordCount: wordCount,
    },
  };
}

module.exports = { InterviewResponseAnalyzer };