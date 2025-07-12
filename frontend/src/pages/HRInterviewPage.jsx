// import React from "react";

// const HRInterviewPage = () => {
//   const questions = [
//     "Tell me about yourself.",
//     "What are your strengths and weaknesses?",
//     "Why do you want to work for our company?",
//     "Where do you see yourself in 5 years?",
//     "Describe a challenging work situation and how you overcame it.",
//   ];

//   // Store recognition objects by question index
  // const recognitionInstances = {};

  // // Mock AI analysis function (replace with real API call)
  // const analyzeWithAI = async (question, answer) => {
  //   // Simulate API call delay
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   // Generate mock analysis
  //   const analysis = {
  //     scores: {
  //       fluency: Math.floor(Math.random() * 5) + 1,
  //       confidence: Math.floor(Math.random() * 5) + 1,
  //       relevance: Math.floor(Math.random() * 5) + 1,
  //       clarity: Math.floor(Math.random() * 5) + 1,
  //     },
  //     feedback: {
  //       strengths: [
  //         "Clear articulation of thoughts",
  //         "Good use of specific examples",
  //         "Demonstrated relevant skills",
  //       ].slice(0, Math.floor(Math.random() * 3) + 1),
  //       improvements: [
  //         "Could provide more concrete examples",
  //         "Try to be more concise",
  //         "Consider linking to company values",
  //       ].slice(0, Math.floor(Math.random() * 2) + 1),
  //       suggestion:
  //         "Practice answering in STAR format (Situation, Task, Action, Result)",
  //     },
  //     transcript: answer,
  //   };

  //   return analysis;
  // };

  // const startRecording = (index) => {
  //   try {
  //     const recognition = new (window.SpeechRecognition ||
  //       window.webkitSpeechRecognition)();
  //     recognition.lang = "en-US";
  //     recognition.interimResults = false;
  //     recognition.maxAlternatives = 1;

  //     recognitionInstances[index] = recognition;

  //     const recordBtn = document.getElementById(`record-btn-${index}`);
  //     const resultDiv = document.getElementById(`result-${index}`);

  //     // Show recording UI
  //     recordBtn.innerHTML = `
  //       <span class="flex items-center">
  //         <span class="relative flex h-3 w-3 mr-2">
  //           <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
  //           <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
  //         </span>
  //         Recording... Click to Stop
  //       </span>
  //     `;
  //     recordBtn.onclick = () => stopRecording(index);

  //     resultDiv.innerHTML = `
  //       <div class="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
  //         <p class="text-center">Speak your answer now...</p>
  //       </div>
  //     `;

  //     recognition.onresult = async (event) => {
  //       const transcript = event.results[0][0].transcript;
  //       await processAnswer(index, questions[index], transcript);
  //     };

  //     recognition.onerror = (event) => {
  //       console.error("Recognition error:", event.error);
  //       resultDiv.innerHTML = `
  //         <div class="mt-4 p-4 border rounded-lg bg-red-50 dark:bg-red-900">
  //           <p>Error: ${event.error}</p>
  //         </div>
  //       `;
  //       resetRecordingUI(index);
  //     };

  //     recognition.onend = () => {
  //       if (recognitionInstances[index]) {
  //         // Only reset if not explicitly stopped
  //         resetRecordingUI(index);
  //       }
  //     };

  //     recognition.start();
  //   } catch (err) {
  //     console.error("Speech recognition error:", err);
  //     alert("Speech recognition not supported or error occurred");
  //   }
  // };

  // const stopRecording = (index) => {
  //   if (recognitionInstances[index]) {
  //     recognitionInstances[index].stop();
  //     delete recognitionInstances[index];

  //     const resultDiv = document.getElementById(`result-${index}`);
  //     resultDiv.innerHTML = `
  //       <div class="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
  //         <div class="text-center">
  //           <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  //           <p>Processing your answer...</p>
  //         </div>
  //       </div>
  //     `;
  //   }
  // };

  // const resetRecordingUI = (index) => {
  //   const recordBtn = document.getElementById(`record-btn-${index}`);
  //   if (recordBtn) {
  //     recordBtn.innerHTML = `
  //       <span class="flex items-center">
  //         <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
  //         </svg>
  //         Record Answer
  //       </span>
  //     `;
  //     recordBtn.onclick = () => startRecording(index);
  //   }
  // };

  // const processAnswer = async (index, question, transcript) => {
  //   const resultDiv = document.getElementById(`result-${index}`);

  //   try {
  //     // Show processing state
  //     resultDiv.innerHTML = `
  //       <div class="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
  //         <h3 class="font-bold">Your Answer:</h3>
  //         <p class="mt-2 p-2 bg-white dark:bg-gray-600 rounded">${transcript}</p>
  //         <div class="mt-4 text-center">
  //           <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  //           <p>Analyzing with AI...</p>
  //         </div>
  //       </div>
  //     `;

  //     // Get AI analysis
  //     const analysis = await analyzeWithAI(question, transcript);
  //     displayAnalysis(index, question, analysis);
  //   } catch (error) {
  //     console.error("Analysis error:", error);
  //     resultDiv.innerHTML = `
  //       <div class="mt-4 p-4 border rounded-lg bg-red-50 dark:bg-red-900">
  //         <p>Error analyzing answer: ${error.message}</p>
  //       </div>
  //     `;
  //   }
  // };

  // const displayAnalysis = (index, question, analysis) => {
  //   const resultDiv = document.getElementById(`result-${index}`);

  //   resultDiv.innerHTML = `
  //     <div class="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
  //       <h3 class="font-bold">Your Answer:</h3>
  //       <p class="mt-2 p-2 bg-white dark:bg-gray-600 rounded">${
  //         analysis.transcript
  //       }</p>
        
  //       <h3 class="font-bold mt-6 mb-3 border-b pb-2">AI Analysis Results</h3>
        
  //       <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  //         ${Object.entries(analysis.scores)
  //           .map(
  //             ([metric, score]) => `
  //           <div class="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
  //             <h4 class="text-sm font-medium capitalize mb-2">${metric}</h4>
  //             <div class="flex items-center">
  //               <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
  //                 <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${
  //                   score * 20
  //                 }%"></div>
  //               </div>
  //               <span class="text-sm font-bold">${score}/5</span>
  //             </div>
  //           </div>
  //         `
  //           )
  //           .join("")}
  //       </div>
        
  //       <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  //         <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
  //           <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Strengths</h4>
  //           <ul class="list-disc list-inside space-y-1">
  //             ${analysis.feedback.strengths
  //               .map((s) => `<li>${s}</li>`)
  //               .join("")}
  //           </ul>
  //         </div>
  //         <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
  //           <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Areas for Improvement</h4>
  //           <ul class="list-disc list-inside space-y-1">
  //             ${analysis.feedback.improvements
  //               .map((i) => `<li>${i}</li>`)
  //               .join("")}
  //           </ul>
  //         </div>
  //       </div>
        
  //       <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
  //         <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Suggestion</h4>
  //         <p>${analysis.feedback.suggestion}</p>
  //       </div>
        
  //       <div class="flex flex-col sm:flex-row gap-3">
  //         <button onclick="startRecording(${index})"
  //                 class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
  //           <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
  //           </svg>
  //           Record Again
  //         </button>
  //         <button onclick="showTextInput(${index})"
  //                 class="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-4 py-2 rounded-lg">
  //           Edit Text Answer
  //         </button>
  //       </div>
        
  //       <div id="text-input-${index}" class="hidden mt-4">
  //         <textarea id="answer-text-${index}" class="w-full p-3 border rounded-lg dark:bg-gray-600" 
  //                   rows="4" placeholder="Edit your answer...">${
  //                     analysis.transcript
  //                   }</textarea>
  //         <div class="flex justify-end gap-2 mt-2">
  //           <button onclick="document.getElementById('text-input-${index}').classList.add('hidden')"
  //                   class="px-4 py-2 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
  //             Cancel
  //           </button>
  //           <button onclick="submitTextAnswer(${index}, '${question.replace(
  //     /'/g,
  //     "\\'"
  //   )}')"
  //                   class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  //             Submit Edited Answer
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // };

  // // Global functions for button actions
  // window.showTextInput = (index) => {
  //   document.getElementById(`text-input-${index}`).classList.toggle("hidden");
  // };

  // window.submitTextAnswer = async (index, question) => {
  //   const textAnswer = document
  //     .getElementById(`answer-text-${index}`)
  //     .value.trim();
  //   if (!textAnswer) {
  //     alert("Please enter your answer");
  //     return;
  //   }

  //   document.getElementById(`text-input-${index}`).classList.add("hidden");
  //   await processAnswer(index, question, textAnswer);
  // };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center mb-8">
//           HR Interview Questions
//         </h1>

//         <div className="flex justify-between mb-6">
//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             Practice {questions.length} common HR interview questions
//           </div>
//           <button
//             onClick={() => document.documentElement.classList.toggle("dark")}
//             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
//           >
//             Toggle Dark Mode
//           </button>
//         </div>

//         <div className="space-y-6">
//           {questions.map((question, index) => (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
//             >
//               <h2 className="text-xl font-semibold mb-3">
//                 Question {index + 1}: {question}
//               </h2>
//               <button
//                 id={`record-btn-${index}`}
//                 onClick={() => startRecording(index)}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center"
//               >
//                 <svg
//                   className="w-5 h-5 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//                   ></path>
//                 </svg>
//                 Record Answer
//               </button>
//               <div id={`result-${index}`} className="min-h-[20px]"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HRInterviewPage;
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout";

const HRQuestionsListPage = () => {
  const navigate = useNavigate();

  const questions = [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Why do you want to work for our company?",
    "Where do you see yourself in 5 years?",
    "Describe a challenging work situation and how you overcame it.",
  ];

  // Mock responses data (in a real app, this would come from an API)
  const mockResponses = {
    0: 5, // 5 responses for question 0
    1: 3, // 3 responses for question 1
    2: 2, // etc.
    3: 0,
    4: 1,
  };

  const handleQuestionClick = (index) => {
    navigate(`/hr-interview/question/${index}`);
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          HR Interview Questions
        </h1>

        <div className="flex justify-between mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Practice {questions.length} common HR interview questions
          </div>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              onClick={() => handleQuestionClick(index)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Question {index + 1}: {question}
                </h2>
                <div className="flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    {mockResponses[index] || 0} responses
                  </span>
                  <svg
                    className="w-5 h-5 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></Layout>
  );
};

export default HRQuestionsListPage;