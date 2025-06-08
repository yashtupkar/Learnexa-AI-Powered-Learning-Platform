const axios = require("axios");

const generateCodingQuiz = async ({
  topic,
  questionsCount,
  programmingLanguage,
  difficultyLevel,
  targetCompany,
  grade,
}) => {
  const API_KEY = process.env.OPENROUTER_API_KEY_EXTRA;

  if (!API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing in environment variables");
  }

  // const prompt = `Generate a coding quiz in PURE JSON format (no markdown, no code blocks, no extra text) with:
  // - Topic: ${topic}
  // - Number of questions: ${questionsCount}
  // - Programming Language: ${programmingLanguage}
  // - Difficulty: ${difficultyLevel}
  // - Specific Company: ${targetCompany}
  // - Grade: ${grade}

  // IMPORTANT NOTE: 
  // - Don't do extra Reasoning. Only provide strict JSON.
  // - Dont generate any explanation or any extra text befor or around the JSON. Provide strick JSON file
  
  // Return ONLY a valid JSON object with this EXACT structure:
  // {
  //     "quiz_title": "string",
  //     "questions": [
  //         {
  //             "question_number": number,
  //             "question_type": "coding",
  //             "scenario": "string (real-world problem scenario)",
  //             "problem_statement": "string (specific coding problem)",
  //             "programming_language": "string",
  //             "starter_code": "string (starter code template according to question for the user to complete)",
  //             "sample_input": "string",
  //             "sample_output": "string",
  //             "test_cases": [
  //                 {
  //                     "input": "string (In cases testing empty inputs then use [])",
  //                     "output": "string ( testing empty outputs then use [])"
  //                 }
  //             ],
  //             "solution": "string (code solution)",
  //             "explanation": "string (step-by-step explanation)",
  //             "time_complexity": "string (e.g., O(n))",
  //             "space_complexity": "string (e.g., O(1))",
  //             "hints": ["string"] (optional)
  //         }
  //     ]
  // }
  
  // IMPORTANT FORMATTING INSTRUCTIONS:
  // - Return ONLY the JSON object, no text, no markdown, no code blocks, no explanations, no disclaimers, no extra content before or after the JSON.
  // - The JSON must be well-formed and valid.
  // - Use "questions" (not "question") for the array of questions.
  // - Use "hints" (array) instead of "hint" (singular).
  // - Ensure your JSON keys exactly match the required schema.
  // - Focus on practical, scenario-based coding problems.
  // - Include at least 3 test cases per question.
  // - Provide detailed explanations and complexity analyses inside the JSON fields only.
  // - Use ONLY the specified field names exactly as shown.
  // - Do NOT add or omit fields.
  // - Do NOT wrap the response in any code block or quotes.
  // - Do NOT add any content outside the JSON object.
  // - Ensure every test case has non-empty "input" and "output" fields; do NOT use empty strings "" for input or output.  
  // - For cases testing empty inputs, represent them explicitly, e.g., use "[]" or a descriptive string like "empty array".

  
  // Failure to follow these instructions will result in the output being rejected. Strictly adhere to the JSON format only.`;
  const prompt = `RESPOND ONLY WITH A VALID JSON OBJECT - NO PREAMBLE, NO COMMENTARY

  ABSOLUTELY DO NOT INCLUDE ANY THINKING, REASONING, OR EXPLANATION BEFORE, WITHIN, OR AFTER THE JSON.
  
  IMPORTANT: YOUR RESPONSE MUST BEGIN WITH "{" AND END WITH "}" WITH NO OTHER CHARACTERS.
  
  Generate a coding quiz with these parameters:
  - Topic: ${topic}
  - Number of questions: ${questionsCount}
  - Programming Language: ${programmingLanguage}
  - Difficulty: ${difficultyLevel}
  - Specific Company: ${targetCompany}
  - Grade: ${grade}
  
  EXACT JSON STRUCTURE REQUIRED:
  {
    "quiz_title": "string",
    "questions": [
      {
        "question_number": number,
        "question_type": "coding",
        "scenario": "string (real-world problem scenario)",
        "problem_statement": "string (specific coding problem)",
        "programming_language": "string",
        "starter_code": "string (starter code template)",
        "sample_input": "string",
        "sample_output": "string",
        "test_cases": [
          {
            "input": "string",
            "output": "string"
          }
        ],
        "solution": "string (code solution)",
        "explanation": "string (step-by-step explanation)",
        "time_complexity": "string (e.g., O(n))",
        "space_complexity": "string (e.g., O(1))",
        "hints": ["string"]
      }
    ]
  }
  
  CRITICAL REQUIREMENTS:
  1. YOUR RESPONSE MUST BE VALID JSON ONLY - NO TEXT BEFORE OR AFTER
  2. Start with { and end with } with no other characters
  3. Provide at least 3 test cases per question
  4. For empty inputs/outputs, use "[]" instead of empty strings
  5. All fields must match the schema exactly
  6. Do NOT add any explanatory text outside the JSON structure
  7. Do NOT wrap the response in code blocks, quotes, or any other formatting
  
  REMEMBER: YOUR ENTIRE RESPONSE MUST PARSE AS VALID JSON`;
  let responseText;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 4000, // Increased for longer coding questions
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "Coding Quiz Generator",
        },
      }
    );

    responseText = response.data?.choices?.[0]?.message?.content;
    if (!responseText) {
      throw new Error("Empty response from API");
    }

    // Clean and parse the response
    let rawJson = responseText.trim();

    // Remove markdown code block syntax if present
    if (rawJson.startsWith("```json")) {
      rawJson = rawJson.slice(7).trim();
    }
    if (rawJson.endsWith("```")) {
      rawJson = rawJson.slice(0, -3).trim();
    }

    const quizData = JSON.parse(rawJson);

    // Validate quiz structure
    if (!quizData.quiz_title || !Array.isArray(quizData.questions)) {
      throw new Error(
        "Invalid quiz structure - missing title or questions array"
      );
    }

    // Validate each coding question
    quizData.questions.forEach((question, index) => {
      const requiredFields = [
        "scenario",
        "problem_statement",
        "programming_language",
        "sample_input",
        "sample_output",
        "test_cases",
        "solution",
        "explanation",
        "time_complexity",
        "space_complexity",
      ];

      requiredFields.forEach((field) => {
        if (!question[field]) {
          throw new Error(
            `Question ${index + 1} is missing required field: ${field}`
          );
        }
      });

      // Validate test cases
      if (!Array.isArray(question.test_cases)) {
        throw new Error(`Question ${index + 1} test_cases must be an array`);
      }

      // Validate at least 3 test cases
      if (question.test_cases.length < 3) {
        throw new Error(
          `Question ${index + 1} must have at least 3 test cases`
        );
      }

      // Validate each test case
      question.test_cases.forEach((testCase, caseIndex) => {
        if (!testCase.input || !testCase.output) {
          throw new Error(
            `Question ${index + 1}, Test Case ${
              caseIndex + 1
            } is missing input or output`
          );
        }
      });

      // Validate complexity analysis
      if (
        !question.time_complexity.startsWith("O(") ||
        !question.space_complexity.startsWith("O(")
      ) {
        throw new Error(
          `Question ${index + 1} complexity analysis must be in Big-O notation`
        );
      }
    });

    return { success: true, quiz: quizData };
  } catch (error) {
    console.error("Coding quiz generation error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      rawResponse: responseText,
    });

    return {
      success: false,
      error: "Failed to generate coding quiz",
      details: error.message,
      apiError: error.response?.data,
      rawResponse: responseText,
    };
  }
};

module.exports = generateCodingQuiz;