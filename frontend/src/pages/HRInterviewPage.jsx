
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