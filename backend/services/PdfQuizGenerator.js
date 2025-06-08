const axios = require("axios");

const cleanAndParseJson = (rawText) => {
  let rawJson = rawText.trim();
  rawJson = rawJson.replace(/```json|```/g, "").trim();

  const firstCurly = rawJson.indexOf("{");
  const lastCurly = rawJson.lastIndexOf("}");
  if (firstCurly === -1 || lastCurly === -1) {
    throw new Error("Invalid JSON response: missing curly braces");
  }
  rawJson = rawJson.slice(firstCurly, lastCurly + 1);

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
    );

  try {
    return JSON.parse(rawJson);
  } catch (err) {
    console.error("JSON parsing error:", err);
    throw new Error("Failed to parse JSON response from API");
  }
};

const getQuizBatchFromText = async ({
  extractedText,
  difficultyLevel,
  questionTypes,
  grade,
  questionsCount,
  API_KEY,
  previousQuestions = [],
}) => {
  try {
    const previousQuestionsText =
      previousQuestions.length > 0
        ? `\n\nPreviously generated questions:\n${previousQuestions
            .map((q, i) => `${i + 1}. ${q.question_text}`)
            .join("\n")}\n\nGenerate different questions.\n\n`
        : "";

    const prompt = `Generate ${questionsCount} quiz questions in JSON format based on given content:

        ${extractedText}
        
        Requirements:
        - Difficulty: ${difficultyLevel}
        - Grade: ${grade}
        - Types: ${questionTypes}
        ${previousQuestionsText}
        
        Return ONLY valid JSON with this structure:
        {
          "quiz_title": "string",
          "questions": [{
            "question_number": number,
            "question_type": "mcq|true_false|fill_in_the_blanks",
            "question_text": "string",
            "options": ["string"]  (required for "mcq" question_type, must include correct answer),
            "correct_answer": "string" (must exactly match one option for MCQ),
            "explanation": "string"
          }]
        }
          
        IMPORTANT NOTES:
        1. For "mcq" questions:
           - Generate 3-4 plausible options including the correct answer
           - The "correct_answer" must be one of the options verbatim
           - Distractors should be realistic but incorrect
           - Options should be in random order
        2. For "true_false":
           - "correct_answer" must be either "True" or "False"
        3. For "fill_in_the_blanks":
           - Include the exact expected answer in "correct_answer"
        4. All questions should be derived from the provided text
        5. Never repeat questions from ${previousQuestionsText}
        `;
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 4000,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://localhost:5173",
          "X-Title": "Quiz Generator",
        },
        timeout: 30000,
      }
    );

    return response.data?.choices?.[0]?.message?.content;
  } catch (err) {
    console.error("API request failed:", err);
    throw new Error(`Failed to generate quiz batch: ${err.message}`);
  }
};

const generateQuizFromPdf = async ({
  extractedText,
  questionsCount,
  difficultyLevel,
  questionTypes,
  grade,
}) => {
  const API_KEY = process.env.OPENROUTER_API_KEY_EXTRA;
  if (!API_KEY) throw new Error("Missing API key");

  try {
    console.log("Using extracted text for quiz generation...");

    const batchSize = 5;
    let allQuestions = [];
    let quizTitle = null;

    for (
      let batchIndex = 0;
      batchIndex < Math.ceil(questionsCount / batchSize);
      batchIndex++
    ) {
      const batchNum = Math.min(
        batchSize,
        questionsCount - batchIndex * batchSize
      );

      const rawResponse = await getQuizBatchFromText({
        extractedText,
        difficultyLevel,
        questionTypes,
        grade,
        questionsCount: batchNum,
        API_KEY,
        previousQuestions: allQuestions,
      });

      const quizPart = cleanAndParseJson(rawResponse);
      if (quizPart.quiz_title && !quizTitle) quizTitle = quizPart.quiz_title;
      if (quizPart.questions) allQuestions.push(...quizPart.questions);
    }

    allQuestions = allQuestions
      .slice(0, questionsCount)
      .map((q, i) => ({ ...q, question_number: i + 1 }));

    if (!allQuestions.length) throw new Error("No questions generated");

    return {
      success: true,
      quiz: {
        quiz_title: quizTitle || "Generated Quiz",
        questions: allQuestions,
      },
    };
  } catch (err) {
    console.error("Quiz generation failed:", err);
    return {
      success: false,
      error: err.message,
      details: err.stack,
    };
  }
};

module.exports = generateQuizFromPdf;
