// const fetch = require("node-fetch"); // Only needed for Node.js < 18

// const getTopicSuggestions = async (input) => {
//   const prompt = `Suggest 5 specific quiz topics based on: "${input}". Return them in a clean JSON array like ["Topic 1", "Topic 2", ...].`;
//   const API_KEY = process.env.OPENROUTER_API_KEY_EXTRA;
//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://localhost:5173", // Optional but recommended
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-r1:free",
//           messages: [
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           temperature: 0.7,
//         }),
//       }
//     );

//     const data = await response.json();
//     const rawOutput = data.choices[0].message.content;

//     // Attempt to parse response as JSON
//     let suggestions = [];
//     try {
//       suggestions = JSON.parse(rawOutput);
//     } catch {
//       suggestions = rawOutput
//         .split("\n")
//         .map((line) => line.replace(/^\d+[\.\)]?\s*/, "").trim())
//         .filter(Boolean);
//     }

//     return suggestions;
//   } catch (error) {
//     console.error("Error fetching AI suggestions:", error);
//     return [];
//   }
// };

// module.exports = getTopicSuggestions;

// const fetch = require("node-fetch"); // Only needed for Node.js < 18

// const getTopicSuggestions = async (input) => {
//   const prompt = `Suggest 5 specific quiz topics based on: "${input}". Return them in a clean JSON array like ["Topic 1", "Topic 2", ...].`;
//   const API_KEY = process.env.OPENROUTER_API_KEY_EXTRA;
//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://localhost:5173", // Optional but recommended
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-r1:free",
//           messages: [
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           temperature: 0.7,
//         }),
//       }
//     );

//     const data = await response.json();
//     const rawOutput = data.choices[0].message.content;

//     // Attempt to parse response as JSON
//     let suggestions = [];
//     try {
//       // Handle the case where response is wrapped in code blocks
//       let jsonString = rawOutput;
//       // Remove code block markers if present
//       if (rawOutput.startsWith("```json") && rawOutput.endsWith("```")) {
//         jsonString = rawOutput.slice(7, -3).trim(); // Remove ```json and ```
//       } else if (rawOutput.startsWith("```") && rawOutput.endsWith("```")) {
//         jsonString = rawOutput.slice(3, -3).trim(); // Remove ``` and ```
//       }

//       suggestions = JSON.parse(jsonString);
//     } catch {
//       // Fallback to line-by-line parsing if JSON parsing fails
//       suggestions = rawOutput
//         .split("\n")
//         .map((line) => line.replace(/^\d+[\.\)]?\s*/, "").trim())
//         .filter(Boolean);
//     }

//     return suggestions;
//   } catch (error) {
//     console.error("Error fetching AI suggestions:", error);
//     return [];
//   }
// };

// module.exports = getTopicSuggestions;

// const fetch = require("node-fetch");

const getTopicSuggestions = async (input) => {
  const prompt = `Suggest 5 specific quiz topics based on: "${input}". Return them in a clean JSON array like ["Topic 1", "Topic 2", ...].`;
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
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check if response has the expected structure
    if (!data?.choices?.[0]?.message?.content) {
      console.error("Unexpected API response structure:", data);
      return [];
    }

    const rawOutput = data.choices[0].message.content;

    // Attempt to parse response as JSON
    let suggestions = [];
    try {
      // Handle the case where response is wrapped in code blocks
      let jsonString = rawOutput;
      if (rawOutput.startsWith("```json") && rawOutput.endsWith("```")) {
        jsonString = rawOutput.slice(7, -3).trim();
      } else if (rawOutput.startsWith("```") && rawOutput.endsWith("```")) {
        jsonString = rawOutput.slice(3, -3).trim();
      }

      suggestions = JSON.parse(jsonString);

      // Ensure we always return an array
      if (!Array.isArray(suggestions)) {
        console.error("Parsed suggestions is not an array:", suggestions);
        return [];
      }
    } catch (error) {
      console.error("Error parsing suggestions:", error);
      // Fallback to line-by-line parsing if JSON parsing fails
      suggestions = rawOutput
        .split("\n")
        .map((line) => line.replace(/^\d+[\.\)]?\s*/, "").trim())
        .filter(Boolean);
    }

    return suggestions;
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [];
  }
};

module.exports = getTopicSuggestions;