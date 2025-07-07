import React, { useState, useEffect } from "react";
import {
  X,
  Share,
  Play,
  Users,
  Copy,
  Check,
  BarChart2,
  Award,
  Clock,
  Logs,
} from "lucide-react";
import Lottie from "lottie-react";
import quizModalAnimation from "../../assets/quizModalAnimation.json";
import { useNavigate } from "react-router-dom";


const QuizOpenModal = ({ quiz, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!quiz || !isOpen || !isMounted) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Backdrop with fade-in animation */}
      <div className="fixed inset-0 bg-black/70   z-50" onClick={onClose} />

      {/* Modal with slide-up animation */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="bg-white dark:bg-zinc-900 rounded-2xl  overflow-hidden w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient background */}
          <div className="relative h-48 bg-gray-100 flex items-center justify-center">
            {/* Close and Share buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleShare}
                className="bg-gray-400 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-400  text-white p-2 rounded-full hover:bg-gray-700 transition-all hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Large Q logo with subtle animation */}
            <Lottie
              animationData={quizModalAnimation}
              loop
              className={`w-56 h-56 md:w-64 md:h-64 transition-all duration-500`}
            />
          </div>

          {/* Content */}
          <div className="p-6 dark:text-gray-100">
            {/* Quiz info */}
            <div className="text-center mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <BarChart2 size={14} />
                  {quiz.questions.length} questions
                </span>
                <span className="text-orange-500 bg-yellow-100  dark:bg-yellow-200/20 px-3 py-1 rounded-full dark:text-orange-300 text-xs font-medium flex items-center gap-1">
                  <Clock size={14} />
                  {quiz.quiz_timer || "10"} mins
                </span>
                <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Logs size={14} />
                  {quiz.question_type === "mcq"
                    ? "MCQ"
                    : quiz.question_type === "fill-blank"
                    ? "Fill in the Blank"
                    : quiz.question_type === "short-answer"
                    ? "Short Answer"
                    : "True/False"}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {quiz.quiz_title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Grades: {quiz.grade}
              </p>

              <div className="inline-flex bg-gradient-to-r from-orange-400 to-pink-500 dark:from-orange-500 dark:to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Difficulty: {quiz.difficultyLevel}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(`/quiz/${quiz._id}`);
                }}
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-5 h-5" />
                Start Quiz
              </button>

              <button className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                <Users className="w-5 h-5" />
                Challenge Friends
              </button>
            </div>

            {/* Additional metadata */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              <p className="text-center">
                Created by: {quiz.created_by.name || "Anonymous"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizOpenModal;
