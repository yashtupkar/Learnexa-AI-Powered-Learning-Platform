import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const languageMap = {
  python: 71,
  cpp: 54,
  java: 62,
};

const CodingQuestion = () => {
  const question = {
    title: "Find Factorial",
    description: "Write a function to return the factorial of a given number.",
    functionSignature:
      "def factorial(n):\n    # write your code here\n    return 1",
    language: ["python", "cpp", "java"],
    sampleInput: "5",
    sampleOutput: "120",
    testCases: [
      { input: "4", expectedOutput: "24" },
      { input: "6", expectedOutput: "720" },
    ],
  };

  const [code, setCode] = useState(question.functionSignature);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const API_URL =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

  const API_HEADERS = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "acd77f6e54msh1efcd7293cab2a4p1b3c46jsnb831f49a988e",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  };

  const runCode = async (input) => {
    setLoading(true);
    try {
      const fullCode = `${code}\nprint(factorial(${
        input || question.sampleInput
      }))`;
      const response = await axios.post(
        API_URL,
        {
          source_code: fullCode,
          language_id: languageMap[language],
          stdin: "",
        },
        { headers: API_HEADERS }
      );

      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (err) {
      setOutput("Error executing code.");
    }
    setLoading(false);
  };

  const submitCode = async () => {
    setLoading(true);
    const resultList = [];

    for (const tc of question.testCases) {
      try {
        const fullCode = `${code}\nprint(factorial(${tc.input}))`;
        const response = await axios.post(
          API_URL,
          {
            source_code: fullCode,
            language_id: languageMap[language],
            stdin: "",
          },
          { headers: API_HEADERS }
        );

        const resultOutput =
          response.data.stdout?.trim().replace(/\n/g, "") || "";
        const expectedOutput = tc.expectedOutput.trim().replace(/\n/g, "");
        const passed = resultOutput === expectedOutput;

        resultList.push({ ...tc, actual: resultOutput, passed });
      } catch (err) {
        resultList.push({ ...tc, actual: "Error", passed: false });
      }
    }

    const passedCount = resultList.filter((r) => r.passed).length;
    setScore(Math.round((passedCount / question.testCases.length) * 100));
    setResults(resultList);
    setLoading(false);
    setQuizCompleted(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Quiz Header */}
        <div className="bg-indigo-600 text-white p-4">
          <h1 className="text-2xl font-bold">Coding Quiz</h1>
          <div className="flex justify-between items-center mt-2">
            <span className="text-indigo-100">Time remaining: 15:00</span>
            {quizCompleted && (
              <span className="bg-white text-indigo-600 px-3 py-1 rounded-full font-semibold">
                Score: {score}%
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Problem Statement */}
          <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "problem"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("problem")}
              >
                Problem
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "submissions"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("submissions")}
              >
                Submissions
              </button>
            </div>

            {activeTab === "problem" ? (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {question.title}
                </h2>
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700">{question.description}</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Function Signature:
                  </h3>
                  <pre className="bg-gray-200 p-2 rounded text-sm overflow-x-auto">
                    {question.functionSignature}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Sample Input:
                    </h3>
                    <pre className="bg-gray-200 p-2 rounded text-sm">
                      {question.sampleInput}
                    </pre>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Sample Output:
                    </h3>
                    <pre className="bg-gray-200 p-2 rounded text-sm">
                      {question.sampleOutput}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Submission History
                </h3>
                {results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map((res, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Test Case {i + 1}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              res.passed
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {res.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Input:</span>{" "}
                            {res.input}
                          </div>
                          <div>
                            <span className="text-gray-500">Expected:</span>{" "}
                            {res.expectedOutput}
                          </div>
                          <div>
                            <span className="text-gray-500">Actual:</span>{" "}
                            {res.actual}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No submissions yet</p>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="w-full md:w-1/2 p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language:
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {question.language.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden mb-4">
              <Editor
                height="400px"
                language={language}
                value={code}
                onChange={(val) => setCode(val)}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>

            <div className="flex space-x-3 mb-4">
              <button
                onClick={() => runCode()}
                disabled={loading}
                className="flex-1 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-200 transition disabled:opacity-50"
              >
                {loading ? "Running..." : "Run Code"}
              </button>
              <button
                onClick={submitCode}
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {output && (
              <div className="bg-gray-100 rounded-md p-4 mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Output:</h3>
                <pre className="bg-white p-2 rounded text-sm overflow-x-auto">
                  {output}
                </pre>
              </div>
            )}

            {quizCompleted && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Quiz Results</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Test Cases Passed:</span>
                  <span className="font-medium">
                    {results.filter((r) => r.passed).length} / {results.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 mb-2">
                    {score >= 80
                      ? "🎉 Great job!"
                      : score >= 50
                      ? "👍 Good attempt!"
                      : "Keep practicing!"}
                  </p>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View Detailed Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingQuestion;
