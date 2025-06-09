// const axios = require("axios");


// const cleanAndParseJson = (rawText) => {
//   if (!rawText || typeof rawText !== "string") {
//     throw new Error(
//       "Invalid input to cleanAndParseJson: rawText is empty or not a string"
//     );
//   }
//   let rawJson = rawText.trim();
//   rawJson = rawJson.replace(/```json|```/g, "").trim();

//   const firstCurly = rawJson.indexOf("{");
//   const lastCurly = rawJson.lastIndexOf("}");
//   if (firstCurly === -1 || lastCurly === -1) {
//     throw new Error("Invalid JSON response: missing curly braces");
//   }
//   rawJson = rawJson.slice(firstCurly, lastCurly + 1);

//   // Normalize field names and question types
//   rawJson = rawJson
//     .replace(/"question":/g, '"questions":')
//     .replace(/"option":/g, '"options":')
//     .replace(/"question_type":\s*"MCQ"/gi, '"question_type": "mcq"')
//     .replace(
//       /"question_type":\s*"True_False"/gi,
//       '"question_type": "true_false"'
//     )
//     .replace(
//       /"question_type":\s*"Fill_in_the_Blank"/gi,
//       '"question_type": "fill_in_the_blanks"'
//     );

//   return JSON.parse(rawJson);
// };


// const getQuizBatch = async ({
//   topic,
//   difficultyLevel,
//   questionTypes,
//   grade,
//   questionsCount,
//   API_KEY,
//   previousQuestions,
// }) => {
//   let previousQuestionsText = "";

//   if (previousQuestions && previousQuestions.length > 0) {
//     // Join previous questions' texts into a single string to send as context
//     previousQuestionsText = `\n\nPreviously generated questions:\n${previousQuestions
//       .map((q, i) => `${i + 1}. ${q.question_text}`)
//       .join(
//         "\n"
//       )}\n\nPlease generate different questions than the ones listed above.\n\n`;
//   }

//   const prompt = `Generate a unique quiz in PURE JSON format about ${topic} with ${questionsCount} ${difficultyLevel}-level questions for grade ${grade}, using ${questionTypes} question types.

//   CRITICAL REQUIREMENTS:
//   1. All questions must be completely different from these previously generated questions:
//   ${previousQuestionsText}
  
//   2. For multiple choice questions, ensure all options are plausible but only one is correct.
  
//   3. Vary the question types appropriately based on requested types: ${questionTypes}.
  
//   4. Focus on different aspects or subtopics of ${topic} to ensure variety.
  

// Return ONLY valid JSON with this EXACT structure:
// {
//     "quiz_title": "string",
//     "questions": [
//         {
//             "question_number": number,
//             "question_type": "mcq|true_false|fill_in_the_blanks|short_answer",
//             "question_text": "string",
//             "options": ["string", "string", ...],
//             "correct_answer": "string",
//             "explanation": "string"
//         }
//     ]
// }

// IMPORTANT FORMATTING REQUIREMENTS:
// 1. Return ONLY the JSON object with no text before, after, or around it
// 2. Do not include any markdown formatting (no \`\`\` code blocks)
// 3. Use lowercase for all question_type values
// 4. Include "options" array only for "mcq" question_type
// 5. Ensure questions are appropriate for ${grade} grade level
// 6. Ensure questions directly relate to ${topic}
// 7. Start your response with the opening curly brace of the JSON object
// 8. Ensure the JSON is properly formatted and valid`;

//   const response = await axios.post(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       model: "deepseek/deepseek-r1:free",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.3,
//       max_tokens: 4000,
//       response_format: { type: "json_object" },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "https://localhost:5173",
//         "X-Title": "Quiz Generator",
//       },
//     }
//   );
//   console.log("Full API response:", JSON.stringify(response.data, null, 2));
//   const rawResponse = response.data?.choices?.[0]?.message?.content;

//   if (!rawResponse || typeof rawResponse !== "string") {
//     throw new Error("Invalid or empty API response");
//   }

//   return rawResponse;

  
// };

// // Main function to generate quiz with batching and merging
// const generateQuiz = async ({
//   topic,
//   questionsCount,
//   difficultyLevel,
//   questionTypes,
//   grade,
// }) => {
//   const API_KEY = process.env.OPENROUTER_API_KEY;

//   if (!API_KEY) {
//     throw new Error("OPENROUTER_API_KEY is missing in environment variables");
//   }

//   const batchSize = 5;
//   const numBatches = Math.ceil(questionsCount / batchSize);

//   try {
//     // Create array of batch requests
//     const allResponses = await Promise.all(
//       Array.from({ length: numBatches }).map((_, batchIndex) =>
//         getQuizBatch({
//           topic,
//           difficultyLevel,
//           questionTypes,
//           grade,
//           questionsCount: Math.min(
//             batchSize,
//             questionsCount - batchIndex * batchSize
//           ),
//           API_KEY,
//         })
//       )
//     );

//     // Parse and merge all questions
//     let allQuestions = [];
//     let quizTitle = null;

//     for (const rawResponse of allResponses) {
//       const quizPart = cleanAndParseJson(rawResponse);
//       if (!quizTitle && quizPart.quiz_title) quizTitle = quizPart.quiz_title;
//       if (Array.isArray(quizPart.questions)) {
//         allQuestions = allQuestions.concat(quizPart.questions);
//       }
//     }

//     // Renumber question_number sequentially
//     allQuestions.forEach((q, i) => {
//       q.question_number = i + 1;
//     });

//     // Validate quiz structure (basic validation)
//     if (
//       !quizTitle ||
//       !Array.isArray(allQuestions) ||
//       allQuestions.length === 0
//     ) {
//       throw new Error("Merged quiz data is invalid or empty");
//     }

//     // Optional: Add your existing validation of each question here if needed

//     return {
//       success: true,
//       quiz: { quiz_title: quizTitle, questions: allQuestions },
//     };
//   } catch (error) {
//     console.error("Quiz generation error:", error);

//     return {
//       success: false,
//       error: "Failed to generate quiz",
//       details: error.message,
//     };
//   }
// };

// module.exports = generateQuiz;


const axios = require("axios");

const cleanAndParseJson = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    throw new Error(
      "Invalid input to cleanAndParseJson: rawText is empty or not a string"
    );
  }

  let rawJson = rawText.trim();

  // Remove markdown code blocks
  rawJson = rawJson.replace(/```json|```/g, "").trim();

  // Find the first valid JSON object
  const firstCurly = rawJson.indexOf("{");
  if (firstCurly === -1) {
    throw new Error("Invalid JSON response: no opening brace found");
  }

  // Start from the first curly brace
  rawJson = rawJson.substring(firstCurly);

  // Find the matching closing brace by counting braces
  let braceCount = 0;
  let inString = false;
  let escaped = false;
  let jsonEndIndex = -1;

  for (let i = 0; i < rawJson.length; i++) {
    const char = rawJson[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === "{") {
        braceCount++;
      } else if (char === "}") {
        braceCount--;
        if (braceCount === 0) {
          jsonEndIndex = i;
          break;
        }
      }
    }
  }

  if (jsonEndIndex === -1) {
    throw new Error("Invalid JSON response: no matching closing brace found");
  }

  // Extract the complete JSON object
  rawJson = rawJson.substring(0, jsonEndIndex + 1);

  // Clean up any duplicate structures or malformed parts
  // Remove any text before the actual JSON structure
  rawJson = rawJson.replace(/^[^{]*/, "");

  // Handle common malformed patterns from AI responses
  // Remove duplicate quiz_title lines
  rawJson = rawJson.replace(
    /"quiz_title":\s*"[^"]*",\s*\{\s*"quiz_title":/g,
    '"quiz_title":'
  );

  // Normalize field names and question types
  rawJson = rawJson
    .replace(/"question":/g, '"questions":')
    .replace(/"option":/g, '"options":')
    .replace(/"question_type":\s*"MCQ"/gi, '"question_type": "mcq"')
    .replace(
      /"question_type":\s*"True_False"/gi,
      '"question_type": "true_false"'
    )
    .replace(
      /"question_type":\s*"Fill_in_the_Blank"/gi,
      '"question_type": "fill_in_the_blanks"'
    )
    .replace(
      /"question_type":\s*"Short_Answer"/gi,
      '"question_type": "short_answer"'
    );

  try {
    return JSON.parse(rawJson);
  } catch (parseError) {
    console.error("JSON Parse Error:", parseError.message);
    console.error("Cleaned JSON:", rawJson);
    throw new Error(`Failed to parse JSON: ${parseError.message}`);
  }
};

const getQuizBatch = async ({
  topic,
  difficultyLevel,
  questionTypes,
  grade,
  questionsCount,
  API_KEY,
  previousQuestions,
}) => {
  let previousQuestionsText = "";

  if (previousQuestions && previousQuestions.length > 0) {
    previousQuestionsText = `\n\nPreviously generated questions:\n${previousQuestions
      .map((q, i) => `${i + 1}. ${q.question_text}`)
      .join(
        "\n"
      )}\n\nPlease generate different questions than the ones listed above.\n\n`;
  }

  const prompt = `You must generate ONLY a valid JSON object for a quiz about ${topic}. 

REQUIREMENTS:
- ${questionsCount} ${difficultyLevel}-level questions for grade ${grade}
- Question types: ${questionTypes}
- All questions must be different from previously generated ones
${previousQuestionsText}

CRITICAL: Your response must start with { and end with }. Do not include any text before or after the JSON.

JSON Structure:
{
    "quiz_title": "string",
    "questions": [
        {
            "question_number": 1,
            "question_type": "mcq",
            "question_text": "string",
            "options": ["option1", "option2", "option3", "option4"],
            "correct_answer": "string",
            "explanation": "string"
        }
    ]
}

Rules:
- Use lowercase for question_type: "mcq", "true_false", "fill_in_the_blanks", "short_answer"
- Include "options" array only for "mcq" type
- For true_false: correct_answer should be "true" or "false"
- For fill_in_the_blanks and short_answer: options should be empty array []
- Make questions appropriate for grade ${grade}
- Focus on ${topic}

Start your response with { immediately:`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4000,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://localhost:5173",
        "X-Title": "Quiz Generator",
      },
    }
  );

  console.log("Full API response:", JSON.stringify(response.data, null, 2));
  const rawResponse = response.data?.choices?.[0]?.message?.content;

  if (!rawResponse || typeof rawResponse !== "string") {
    throw new Error("Invalid or empty API response");
  }

  return rawResponse;
};

// Main function to generate quiz with batching and merging
const generateQuiz = async ({
  topic,
  questionsCount,
  difficultyLevel,
  questionTypes,
  grade,
}) => {
  const API_KEY = process.env.OPENROUTER_API_KEY;

  if (!API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing in environment variables");
  }

  const batchSize = 5;
  const numBatches = Math.ceil(questionsCount / batchSize);
  let allQuestions = [];
  let quizTitle = null;

  try {
    // Process batches sequentially to avoid overwhelming the API
    for (let batchIndex = 0; batchIndex < numBatches; batchIndex++) {
      const currentBatchSize = Math.min(
        batchSize,
        questionsCount - batchIndex * batchSize
      );

      const rawResponse = await getQuizBatch({
        topic,
        difficultyLevel,
        questionTypes,
        grade,
        questionsCount: currentBatchSize,
        API_KEY,
        previousQuestions: allQuestions, // Pass existing questions to avoid duplicates
      });

      console.log(`Processing batch ${batchIndex + 1}/${numBatches}`);
      console.log("Raw response:", rawResponse);

      const quizPart = cleanAndParseJson(rawResponse);

      if (!quizTitle && quizPart.quiz_title) {
        quizTitle = quizPart.quiz_title;
      }

      if (Array.isArray(quizPart.questions)) {
        allQuestions = allQuestions.concat(quizPart.questions);
      }
    }

    // Renumber questions sequentially
    allQuestions.forEach((q, i) => {
      q.question_number = i + 1;
    });

    // Validate final quiz structure
    if (
      !quizTitle ||
      !Array.isArray(allQuestions) ||
      allQuestions.length === 0
    ) {
      throw new Error("Merged quiz data is invalid or empty");
    }

    // Additional validation for each question
    for (const question of allQuestions) {
      if (
        !question.question_text ||
        !question.question_type ||
        !question.correct_answer
      ) {
        throw new Error(
          `Invalid question structure: ${JSON.stringify(question)}`
        );
      }

      if (
        question.question_type === "mcq" &&
        (!question.options || question.options.length === 0)
      ) {
        throw new Error(
          `MCQ question missing options: ${JSON.stringify(question)}`
        );
      }
    }

    return {
      success: true,
      quiz: { quiz_title: quizTitle, questions: allQuestions },
    };
  } catch (error) {
    console.error("Quiz generation error:", error);
    return {
      success: false,
      error: "Failed to generate quiz",
      details: error.message,
    };
  }
};

module.exports = generateQuiz;