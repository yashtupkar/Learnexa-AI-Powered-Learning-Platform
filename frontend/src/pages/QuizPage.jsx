import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  RefreshCw,
  Sun,
  Moon,
  Lightbulb,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Flag,
  Award,
  Zap,
  HelpCircle,
  Home,
  List,
  BookOpen,
  Hash,
  Star,
  AlertCircle,
  X,
  Target,
  Timer,
  Menu,
  PanelRightOpen,
  PanelLeftOpen,
  Clock1,
} from "lucide-react";
import QuizStartScreen from "../components/QuizInterface/QuizStartScreen";
import QuizResults from "../components/QuizInterface/QuizResults";
import QuizQuestionRenderer from "../components/QuizInterface/QuizQuestionRenderer";
import { ThemeToggle } from "../components/ThemeTogler";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizInterface = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [expandedResults, setExpandedResults] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("cyber");
  const [darkMode, setDarkMode] = useState(false);
  const [quizMode, setQuizMode] = useState("competitive");
  const [isReviewing, setIsReviewing] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0); // Track total time spent

  const answerRefs = useRef([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);
  const { quizId } = useParams();

  // Timer for tracking total time spent
  useEffect(() => {
    let timer;
    if (quizStarted && !showResults) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, showResults]);

  // Fetch quiz data
  const fetchQuiz = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!quizId) throw new Error("Quiz ID is missing");
      if (!backend_URL) throw new Error("Backend URL is not configured");

      const url = `${backend_URL}/api/quiz/get-quiz-by-id/${quizId}`;
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          ...(isAuthenticated && { Authorization: `Bearer ${user?.token}` }),
        },
      });

      if (response.data) {
        setQuizData(response.data);
        if (response.data.quiz_timer) {
          setTimeLeft(response.data.quiz_timer * 60);
        }
      } else {
        throw new Error("No quiz data received");
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      let errorMessage = "Failed to load quiz";

      if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout - please check your connection";
      } else if (err.response) {
        const status = err.response.status;
        errorMessage =
          status === 404
            ? "Quiz not found"
            : status === 401
            ? "Unauthorized - please log in"
            : status === 403
            ? "Access denied"
            : status === 500
            ? "Server error - please try again later"
            : `Server error (${status})`;
      } else if (err.request) {
        errorMessage = "Network error - please check your connection";
      } else {
        errorMessage = err.message || "Unknown error occurred";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) fetchQuiz();
    else {
      setError("Quiz ID is missing from URL");
      setLoading(false);
    }
  }, [quizId, backend_URL]);

  // Calculate progress
  const progress = quizData?.questions?.length
    ? ((currentQuestion + 1) / quizData.questions.length) * 100
    : 0;

  // Quiz timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted && quizData) {
      handleSubmit();
    }
  }, [timeLeft, quizStarted, showResults, quizData]);

  // Check if current question is answered
  useEffect(() => {
    const isAnswered = answers[currentQuestion] !== undefined;
    setAnswered(isAnswered);

    if (quizMode === "practice" && isAnswered) {
      setShowExplanation(true);
    } else {
      setShowExplanation(false);
    }
  }, [currentQuestion, answers, quizMode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    setAnswered(true);

    // Track answered questions
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = async () => {
    const scoreDetails = calculateDetailedScore();
    try {
      const response = await axios.post(`${backend_URL}/api/quiz/submit-quiz`, {
        quizId: quizId,
        userId: user._id,
        score: scoreDetails,
      });
      setShowResults(true);
      setShowConfetti(scoreDetails.percentage >= 90);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz");
    }
  };

  // Case-insensitive answer comparison
  const isAnswerCorrect = (questionIndex) => {
    if (!quizData?.questions || answers[questionIndex] === undefined)
      return false;

    const question = quizData.questions[questionIndex];
    const userAnswer = answers[questionIndex]?.toString().trim().toLowerCase();
    const correctAnswer = question.correct_answer
      ?.toString()
      .trim()
      .toLowerCase();

    return userAnswer === correctAnswer;
  };

  const calculateScore = () => {
    if (!quizData?.questions) return 0;

    return quizData.questions.reduce((score, _, index) => {
      return score + (isAnswerCorrect(index) ? 1 : 0);
    }, 0);
  };

  const calculateDetailedScore = () => {
    if (!quizData?.questions) {
      return {
        correct: 0,
        totalQuestions: 0,
        percentage: 0,
      };
    }

    const correct = calculateScore();
    const totalQuestions = quizData.questions.length;
    const percentage = Math.round((correct / totalQuestions) * 100);

    return {
      correct,
      totalQuestions,
      percentage,
      timeSpent, // Add time spent to the score details
      attempts: 1, // You can track attempts if needed
    };
  };

  const capitalize = (val) => {
    if (val === undefined || val === null) return "";
    const str = val.toString().trim().toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(quizData?.quiz_timer ? quizData.quiz_timer * 60 : 0);
    setQuizStarted(false);
    setShowExplanation(false);
    setAnswered(false);
    setBookmarkedQuestions([]);
    setFlaggedQuestions([]);
    setExpandedResults(false);
    setAnsweredQuestions([]);
    setTimeSpent(0);
  };

  const toggleBookmark = () => {
    setBookmarkedQuestions((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion]
    );
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion]
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Quiz...
          </h2>
          <p className="text-blue-200">Please wait while we fetch your quiz</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Quiz Load Failed
          </h2>
          <p className="text-red-200 mb-6">{error}</p>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retry</span>
            </motion.button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show start screen if quiz hasn't started
  if (!quizStarted && quizData) {
    return (
      <QuizStartScreen
        quizData={quizData}
        setQuizStarted={setQuizStarted}
        setQuizMode={setQuizMode}
      />
    );
  }

  // Results Screen
  if (showResults && quizData) {
    const scoreDetails = calculateDetailedScore();
    return (
      <QuizResults
        score={scoreDetails.correct}
        quizData={quizData}
        answers={answers}
        isAnswerCorrect={isAnswerCorrect}
        showConfetti={showConfetti}
        expandedResults={expandedResults}
        setExpandedResults={setExpandedResults}
        resetQuiz={resetQuiz}
        setCurrentQuestion={setCurrentQuestion}
        setShowResults={setShowResults}
        setIsReviewing={setIsReviewing}
        timeSpent={timeSpent}
        attempts={1}
        darkMode={darkMode}
      />
    );
  }

  // Don't render main interface if no quiz data
  if (!quizData) {
    return null;
  }

  const themes = [
    {
      id: "neon",
      name: "Neon Dreams",
      colors: "from-indigo-900 via-purple-900 to-fuchsia-900",
      accent: "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
    },
    {
      id: "cyber",
      name: "Cyber Punk",
      colors: "from-gray-900 via-blue-900 to-indigo-900",
      accent: "bg-gradient-to-b from-green-400 to-blue-500",
    },
    {
      id: "sunset",
      name: "Electric Sunset",
      colors: "from-orange-900 via-rose-900 to-fuchsia-900",
      accent: "bg-gradient-to-r from-yellow-400 to-red-500",
    },
    {
      id: "ocean",
      name: "Deep Ocean",
      colors: "from-blue-900 via-indigo-900 to-violet-900",
      accent: "bg-gradient-to-b from-teal-400 to-blue-500",
    },
  ];

  const currentTheme = themes.find((t) => t.id === selectedTheme);

  // Main Quiz Interface

  return (
    <div
      className={`min-h-screen w-full bg-white dark:bg-zinc-900 `}
    >
      {/* Mobile Header - Fixed at Top */}
      <div className=" fixed top-0 left-0 right-0 z-20 bg-gradient-to-br from-indigo-600 to-indigo-400  text-white  backdrop-blur-lg  p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg text-gray-100 dark:bg-zinc-800 hover:bg-gray-200/30 cursor-pointer dark:hover:bg-zinc-700 transition-colors"
            >
              <Menu
                size={18}
                className="text-white dark:text-gray-300"
              />
            </button>
            <div>
              <h1 className="text-lg text-white font- line-clamp-1 max-w-[200px] sm:max-w-[300px] md:max-w-[500px] lg:max-w-[700px]">
                {capitalize(quizData.quiz_title) || "Quiz"}
              </h1>
            
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-md flex gap-2 items-center bg-gray-100/20 px-2 py-1 rounded font-medium">
              <Clock size={20}/>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-screen overflow-hidden  pb-20 md:pt-0 md:pb-0">
        {/* Sidebar Container - Fixed */}
        <AnimatePresence>
          {/* Mobile Toggle Button */}
          {/* <motion.div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8 fixed top-4 left-4 z-30 bg-white/95 dark:bg-black backdrop-blur-lg rounded-xl shadow-lg shadow-black/20 md:flex items-center justify-center cursor-pointer hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <PanelLeftOpen
              size={20}
              className="text-black dark:text-gray-300"
            />
          </motion.div> */}

          {/* Black Overlay for Mobile */}
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed  inset-0 z-40 bg-black md:hidden"
            />
          )}

          {/* Sidebar Container */}
          <motion.div
            key="sidebar"
            initial={{ x: -400 }}
            animate={{
              x: sidebarOpen ? 0 : -400,
              opacity: sidebarOpen ? 1 : 0.9,
            }}
            exit={{ x: -400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full w-80 bg-white/95 dark:bg-black backdrop-blur-xl shadow-2xl border-r border-gray-200 dark:border-zinc-600 fixed z-50 md:z-40"
            style={{
              width: "85vw",
              maxWidth: "320px",
            }}
          >
            <div className="p-4 md:p-6 h-full flex flex-col overflow-y-auto">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Quiz Info
                  </h3>
                  <p className="text-xs md:text-sm dark:text-gray-400 text-gray-500 mt-1">
                    Track your progress
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors duration-200"
                >
                  <PanelRightOpen className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Quiz Stats */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-3 md:p-4 rounded-xl text-white">
                  <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                    <Target className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium">
                      Progress
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold">
                    {Math.round(progress)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 md:p-4 rounded-xl text-white">
                  <div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                    <Timer className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium">
                      Time Left
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="flex-1 overflow-y-auto">
                <h4 className="font-semibold text-sm md:text-base text-gray-700 dark:text-gray-400 mb-3 md:mb-4 flex items-center space-x-2">
                  <Hash className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Questions</span>
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2 md:gap-3 mb-6 p-2 md:p-3">
                  {quizData.questions.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentQuestion(index);
                        if (window.innerWidth < 768) {
                          setSidebarOpen(false);
                        }
                      }}
                      className={`relative p-2 md:p-3 rounded-lg md:rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-sm ${
                        quizMode === "practice"
                          ? currentQuestion === index
                            ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 cursor-pointer"
                            : answers[index] !== undefined
                            ? isAnswerCorrect(index)
                              ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg shadow-emerald-500/25 cursor-pointer"
                              : "bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-lg shadow-red-500/25 cursor-pointer"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 dark:from-gray-500 dark:to-gray-600 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-400 dark:hover:to-gray-500 cursor-pointer"
                          : currentQuestion === index
                          ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 cursor-pointer"
                          : answers[index] !== undefined
                          ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg shadow-emerald-500/25 cursor-pointer"
                          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 dark:from-gray-500 dark:to-gray-600 dark:text-gray-200"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold">
                        Q{index + 1}
                      </span>

                      {/* Status indicators */}
                      <div className="absolute -top-1 -right-1 flex space-x-1">
                        {flaggedQuestions.includes(index) && (
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full border border-white" />
                        )}
                        {bookmarkedQuestions.includes(index) && (
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full border border-white" />
                        )}
                      </div>

                      {/* Answer status */}
                      {quizMode === "practice" &&
                        answers[index] !== undefined && (
                          <div className="absolute -bottom-1 -right-1">
                            {isAnswerCorrect(index) ? (
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600 dark:text-white" />
                            ) : (
                              <XCircle className="w-3 h-3 md:w-4 md:h-4 text-red-600 dark:text-white" />
                            )}
                          </div>
                        )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-gray-200 dark:border-zinc-700">
                <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                  <div className="flex items-center justify-between p-2 md:p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Answered</span>
                    <span className="text-blue-900 font-bold">
                      {Object.keys(answers).length}/{quizData.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 md:p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700 font-medium">
                      Bookmarked
                    </span>
                    <span className="text-purple-900 font-bold">
                      {bookmarkedQuestions.length}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2 md:py-3 rounded-lg md:rounded-xl font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-purple-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">Submit Quiz</span>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleSubmit();
                    setQuizStarted(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSidebarOpen(false);
                    setTimeLeft(
                      quizData?.quiz_timer ? quizData.quiz_timer * 60 : 0
                    );
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 md:py-3 rounded-lg md:rounded-xl font-semibold shadow-lg shadow-violet-500/25 hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm md:text-base">Exit Quiz</span>
                  </div>
                </motion.button>

                <div className="flex items-center space-x-2 md:space-x-3 pt-3 md:pt-4 border-t border-gray-200 dark:border-zinc-700">
                  <Avatar
                    name={user?.name}
                    size={32}
                   
                    variant="bean"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      Pro Plan
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full md:max-w-3xl mx-auto  py-18 ">
            {/* Enhanced Progress Bar - Hidden on mobile */}
            <div className="mb-2 sticky top-14 md:mb-6 bg-white z-30 dark:bg-black p-4 md:p-4 md:rounded-xl md:shadow-sm dark:shadow-gray-700/50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Question {currentQuestion + 1} of{" "}
                    {quizData.questions.length}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    {Math.round(
                      ((currentQuestion + 1) / quizData.questions.length) * 100
                    )}
                    % complete
                  </span>
                </div>
                {/* <div className="flex items-center">
                  <span className="text-xs mr-2 text-gray-500 dark:text-gray-400">
                    Score:
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                    {calculateScore()} points
                  </span>
                </div> */}
              </div>

              {/* Multi-segment progress bar */}
              <div className="w-full h-2  rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="relative h-full">
                  {/* Background progress */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute h-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                  />

                  {/* Animated pulse effect at progress head */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                    className="absolute top-0 right-0 h-full w-2 bg-white rounded-full"
                    style={{ left: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question navigation quick links */}
              <div className="mt-3 flex flex-wrap gap-1">
                {quizData.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${
                      index === currentQuestion
                        ? "bg-gradient-to-br from-indigo-600 to-indigo-400  text-white  shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    } ${
                      answeredQuestions.includes(index)
                        ? "ring-1 ring-green-500 dark:ring-green-400"
                        : ""
                    } ${
                      bookmarkedQuestions.includes(index)
                        ? "ring-1 ring-amber-500 dark:ring-amber-400"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Card - Fixed height on mobile */}
            <div className="md:min-h-[60vh] min-h-[calc(100vh-12rem)]">
              <QuizQuestionRenderer
                question={quizData.questions[currentQuestion]}
                currentQuestion={currentQuestion}
                answers={answers}
                showResults={showResults}
                handleAnswer={handleAnswer}
                answerRefs={answerRefs}
                isAnswerCorrect={isAnswerCorrect}
                bookmarkedQuestions={bookmarkedQuestions}
                flaggedQuestions={flaggedQuestions}
                toggleBookmark={toggleBookmark}
                toggleFlag={toggleFlag}
                showExplanation={showExplanation}
                quizData={quizData}
                quizMode={quizMode}
              />
            </div>

            {/* Desktop Navigation Buttons */}
            {/* <div className="hidden  justify-between items-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  currentQuestion === 0
                    ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </motion.button>

              <div className="flex space-x-3">
                {quizMode === "practice" && answered && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowExplanation(!showExplanation)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>
                      {showExplanation
                        ? "Hide Explanation"
                        : "Show Explanation"}
                    </span>
                  </motion.button>
                )}

                {currentQuestion < quizData.questions.length - 1 ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextQuestion}
                      className="flex items-center space-x-2 dark:text-gray-300 cursor-pointer dark:bg-gray-800 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
                    >
                      <span>Skip</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextQuestion}
                      disabled={!answered}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        !answered
                          ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <span>Next</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                  >
                    <span>Submit Quiz</span>
                    <Zap className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div> */}
          </div>
        </div>

        {/* Mobile Navigation Buttons - Fixed at Bottom */}
        <div className=" fixed bottom-0 left-0 right-0 z-20 bg-white/95 dark:bg-black backdrop-blur-lg border-t border-gray-200 dark:border-zinc-600 p-3 shadow-sm">
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-3 py-2 flex gap-2 items-center rounded-lg ${
                currentQuestion === 0
                  ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:block">Previous</span>
            </button>

            <div className="flex space-x-2">
              {quizMode === "practice" && answered && (
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={`px-3 py-2 flex gap-2 items-center rounded-lg bg-gradient-to-br from-green-500 to-blue-400  text-white `}
                >
                  <BookOpen className="w-5 h-5" />
               {showExplanation ? <span className="hidden md:block">Hide Explanation</span>:<span className="hidden md:block">Show Explanation</span> }   

                </button>
              )}

              {currentQuestion < quizData.questions.length - 1 ? (
                <>
                  <button
                    onClick={nextQuestion}
                    className="px-3 py-2 rounded-lg dark:text-gray-300 dark:bg-gray-800 bg-gray-200 text-gray-600"
                  >
                    Skip
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={!answered}
                    className={`px-3 py-2 flex gap-2 items-center rounded-lg ${
                      !answered
                        ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-br from-indigo-600 to-indigo-400  text-white "
                    }`}
                  >
                    <span className="hidden md:block">Save & Next</span>
                    <ArrowRight className="w-5 h-5" />

                  </button>
                </>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-400  text-white  rounded-lg hover:from-blue-600 hover:to-purple-600"
                >
                  <Zap className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Clock,
//   List,
//   ArrowLeft,
//   ArrowRight,
//   Bookmark,
//   Flag,
//   HelpCircle,
//   Zap,
//   XCircle,
//   Sun,
//   Moon,
//   Trophy,
//   Target,
//   TrendingUp,
//   RotateCcw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Pause,
//   Play,
//   CheckCircle2,
//   AlertCircle,
//   Star,
//   Award,
//   Timer,
//   Eye,
//   EyeOff,
//   Filter,
//   Shuffle,
// } from "lucide-react";

// // Sample quiz data
// const sampleQuizData = {
//   title: "Advanced JavaScript Quiz",
//   description: "Test your knowledge of advanced JavaScript concepts",
//   questions: [
//     {
//       id: 1,
//       question: "What is the output of: console.log(typeof typeof 1)?",
//       options: ["number", "string", "undefined", "object"],
//       correct: 1,
//       explanation:
//         "typeof 1 returns 'number', and typeof 'number' returns 'string'.",
//       difficulty: "medium",
//       category: "JavaScript Fundamentals",
//     },
//     {
//       id: 2,
//       question:
//         "Which method is used to remove the last element from an array?",
//       options: ["pop()", "push()", "shift()", "unshift()"],
//       correct: 0,
//       explanation:
//         "The pop() method removes and returns the last element of an array.",
//       difficulty: "easy",
//       category: "Arrays",
//     },
//     {
//       id: 3,
//       question: "What does 'use strict' do in JavaScript?",
//       options: [
//         "Makes code run faster",
//         "Enables strict mode for error checking",
//         "Allows ES6 features",
//         "Compresses the code",
//       ],
//       correct: 1,
//       explanation:
//         "'use strict' enables strict mode, which catches common coding mistakes and unsafe actions.",
//       difficulty: "hard",
//       category: "Best Practices",
//     },
//   ],
// };

// // Quiz Question Renderer Component
// const QuizQuestionRenderer = ({
//   question,
//   currentQuestion,
//   answers,
//   showResults,
//   darkMode,
//   handleAnswer,
//   isAnswerCorrect,
//   bookmarkedQuestions,
//   flaggedQuestions,
//   toggleBookmark,
//   toggleFlag,
//   showExplanation,
//   soundEnabled,
//   reviewMode,
// }) => {
//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "easy":
//         return "text-green-500";
//       case "medium":
//         return "text-yellow-500";
//       case "hard":
//         return "text-red-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const getDifficultyBg = (difficulty) => {
//     switch (difficulty) {
//       case "easy":
//         return "bg-green-100 dark:bg-green-900/30";
//       case "medium":
//         return "bg-yellow-100 dark:bg-yellow-900/30";
//       case "hard":
//         return "bg-red-100 dark:bg-red-900/30";
//       default:
//         return "bg-gray-100 dark:bg-gray-900/30";
//     }
//   };

//   return (
//     <motion.div
//       key={currentQuestion}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.4 }}
//       className={`${
//         darkMode ? "bg-gray-800" : "bg-white"
//       } rounded-2xl shadow-2xl p-8 mb-6 border ${
//         darkMode ? "border-gray-700" : "border-gray-100"
//       } backdrop-blur-sm`}
//     >
//       {/* Question Header */}
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex-1">
//           <div className="flex items-center space-x-3 mb-3">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyBg(
//                 question.difficulty
//               )} ${getDifficultyColor(question.difficulty)}`}
//             >
//               {question.difficulty?.toUpperCase()}
//             </span>
//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//               {question.category}
//             </span>
//           </div>
//           <h2
//             className={`text-xl font-bold mb-4 ${
//               darkMode ? "text-white" : "text-gray-800"
//             }`}
//           >
//             {question.question}
//           </h2>
//         </div>

//         <div className="flex space-x-2 ml-4">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => toggleBookmark(currentQuestion)}
//             className={`p-2 rounded-full transition-colors duration-200 ${
//               bookmarkedQuestions.includes(currentQuestion)
//                 ? "bg-yellow-500 text-white"
//                 : darkMode
//                 ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
//                 : "bg-gray-200 text-gray-600 hover:bg-gray-300"
//             }`}
//           >
//             <Bookmark
//               className="w-4 h-4"
//               fill={
//                 bookmarkedQuestions.includes(currentQuestion)
//                   ? "currentColor"
//                   : "none"
//               }
//             />
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => toggleFlag(currentQuestion)}
//             className={`p-2 rounded-full transition-colors duration-200 ${
//               flaggedQuestions.includes(currentQuestion)
//                 ? "bg-red-500 text-white"
//                 : darkMode
//                 ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
//                 : "bg-gray-200 text-gray-600 hover:bg-gray-300"
//             }`}
//           >
//             <Flag
//               className="w-4 h-4"
//               fill={
//                 flaggedQuestions.includes(currentQuestion)
//                   ? "currentColor"
//                   : "none"
//               }
//             />
//           </motion.button>
//         </div>
//       </div>

//       {/* Options */}
//       <div className="space-y-3 mb-6">
//         {question.options.map((option, index) => {
//           const isSelected = answers[currentQuestion] === index;
//           const isCorrect = index === question.correct;
//           const showResult = showResults || reviewMode;

//           let optionClass = `w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//             darkMode ? "border-gray-600" : "border-gray-200"
//           }`;

//           if (showResult) {
//             if (isCorrect) {
//               optionClass += ` bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-500 dark:text-emerald-300`;
//             } else if (isSelected && !isCorrect) {
//               optionClass += ` bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300`;
//             } else {
//               optionClass += ` ${
//                 darkMode
//                   ? "bg-gray-800 text-gray-300"
//                   : "bg-gray-50 text-gray-600"
//               }`;
//             }
//           } else if (isSelected) {
//             optionClass += ` bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300`;
//           } else {
//             optionClass += ` hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 ${
//               darkMode
//                 ? "bg-gray-700 text-gray-300"
//                 : "bg-gray-50 text-gray-700"
//             }`;
//           }

//           return (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.02, x: 4 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => !reviewMode && handleAnswer(index)}
//               className={optionClass}
//               disabled={reviewMode}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div
//                     className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
//                       showResult && isCorrect
//                         ? "border-emerald-500 bg-emerald-500 text-white"
//                         : showResult && isSelected && !isCorrect
//                         ? "border-red-500 bg-red-500 text-white"
//                         : isSelected
//                         ? "border-blue-500 bg-blue-500 text-white"
//                         : "border-gray-400"
//                     }`}
//                   >
//                     {String.fromCharCode(65 + index)}
//                   </div>
//                   <span className="font-medium">{option}</span>
//                 </div>

//                 {showResult && (
//                   <div className="flex items-center space-x-1">
//                     {isCorrect && (
//                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
//                     )}
//                     {isSelected && !isCorrect && (
//                       <AlertCircle className="w-5 h-5 text-red-500" />
//                     )}
//                   </div>
//                 )}
//               </div>
//             </motion.button>
//           );
//         })}
//       </div>

//       {/* Explanation */}
//       <AnimatePresence>
//         {showExplanation && question.explanation && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`p-4 rounded-xl ${
//               darkMode
//                 ? "bg-blue-900/20 border-blue-500/50"
//                 : "bg-blue-50 border-blue-200"
//             } border-l-4 border-blue-500`}
//           >
//             <div className="flex items-start space-x-2">
//               <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
//               <div>
//                 <h4
//                   className={`font-semibold mb-1 ${
//                     darkMode ? "text-blue-300" : "text-blue-700"
//                   }`}
//                 >
//                   Explanation
//                 </h4>
//                 <p
//                   className={`text-sm ${
//                     darkMode ? "text-blue-200" : "text-blue-600"
//                   }`}
//                 >
//                   {question.explanation}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // Statistics Component
// const QuizStats = ({ answers, quizData, darkMode }) => {
//   const totalQuestions = quizData.questions.length;
//   const answeredQuestions = Object.keys(answers).length;
//   const correctAnswers = Object.entries(answers).filter(
//     ([index, answer]) => answer === quizData.questions[index].correct
//   ).length;
//   const accuracy =
//     answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//       <div
//         className={`p-4 rounded-xl ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg`}
//       >
//         <div className="flex items-center space-x-2">
//           <Target className="w-5 h-5 text-blue-500" />
//           <div>
//             <p className="text-xs text-gray-500">Progress</p>
//             <p className="font-bold">
//               {answeredQuestions}/{totalQuestions}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`p-4 rounded-xl ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg`}
//       >
//         <div className="flex items-center space-x-2">
//           <TrendingUp className="w-5 h-5 text-green-500" />
//           <div>
//             <p className="text-xs text-gray-500">Accuracy</p>
//             <p className="font-bold">{accuracy.toFixed(1)}%</p>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`p-4 rounded-xl ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg`}
//       >
//         <div className="flex items-center space-x-2">
//           <CheckCircle2 className="w-5 h-5 text-emerald-500" />
//           <div>
//             <p className="text-xs text-gray-500">Correct</p>
//             <p className="font-bold">{correctAnswers}</p>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`p-4 rounded-xl ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg`}
//       >
//         <div className="flex items-center space-x-2">
//           <AlertCircle className="w-5 h-5 text-red-500" />
//           <div>
//             <p className="text-xs text-gray-500">Incorrect</p>
//             <p className="font-bold">{answeredQuestions - correctAnswers}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Settings Panel Component
// const SettingsPanel = ({
//   isOpen,
//   onClose,
//   darkMode,
//   soundEnabled,
//   setSoundEnabled,
//   autoAdvance,
//   setAutoAdvance,
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 z-40"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ x: 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 300, opacity: 0 }}
//             className={`fixed top-0 right-0 h-full w-80 ${
//               darkMode ? "bg-gray-800" : "bg-white"
//             } shadow-xl z-50 p-6`}
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold">Settings</h3>
//               <button
//                 onClick={onClose}
//                 className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//               >
//                 <XCircle className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium">Sound Effects</p>
//                   <p className="text-sm text-gray-500">
//                     Play sounds for interactions
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setSoundEnabled(!soundEnabled)}
//                   className={`p-2 rounded-full ${
//                     soundEnabled
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {soundEnabled ? (
//                     <Volume2 className="w-4 h-4" />
//                   ) : (
//                     <VolumeX className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium">Auto Advance</p>
//                   <p className="text-sm text-gray-500">
//                     Move to next question automatically
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setAutoAdvance(!autoAdvance)}
//                   className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//                     autoAdvance ? "bg-blue-500" : "bg-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
//                       autoAdvance ? "translate-x-7" : "translate-x-1"
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Main Quiz Component
// const EnhancedQuizApp = () => {
//   const [quizData] = useState(sampleQuizData);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
//   const [flaggedQuestions, setFlaggedQuestions] = useState([]);
//   const [isPaused, setIsPaused] = useState(false);
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [autoAdvance, setAutoAdvance] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [reviewMode, setReviewMode] = useState(false);
//   const [filter, setFilter] = useState("all"); // all, bookmarked, flagged, incorrect

//   const answerRefs = useRef([]);

//   // Timer effect
//   useEffect(() => {
//     if (timeLeft > 0 && !showResults && !isPaused) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0) {
//       handleSubmit();
//     }
//   }, [timeLeft, showResults, isPaused]);

//   // Auto advance effect
//   useEffect(() => {
//     if (
//       autoAdvance &&
//       answers[currentQuestion] !== undefined &&
//       !showExplanation
//     ) {
//       const timer = setTimeout(() => {
//         if (currentQuestion < quizData.questions.length - 1) {
//           nextQuestion();
//         }
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [answers, currentQuestion, autoAdvance, showExplanation]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleAnswer = (answerIndex) => {
//     setAnswers({ ...answers, [currentQuestion]: answerIndex });
//     setShowExplanation(true);

//     // Play sound effect
//     if (soundEnabled) {
//       const isCorrect =
//         answerIndex === quizData.questions[currentQuestion].correct;
//       // In a real app, you'd play actual sound files here
//       console.log(isCorrect ? "✓ Correct!" : "✗ Incorrect");
//     }
//   };

//   const nextQuestion = () => {
//     setShowExplanation(false);
//     if (currentQuestion < quizData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const prevQuestion = () => {
//     setShowExplanation(false);
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmit = () => {
//     setShowResults(true);
//     setIsPaused(true);
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setAnswers({});
//     setShowResults(false);
//     setShowExplanation(false);
//     setTimeLeft(1800);
//     setIsPaused(false);
//     setReviewMode(false);
//   };

//   const toggleBookmark = (questionIndex) => {
//     setBookmarkedQuestions((prev) =>
//       prev.includes(questionIndex)
//         ? prev.filter((q) => q !== questionIndex)
//         : [...prev, questionIndex]
//     );
//   };

//   const toggleFlag = (questionIndex) => {
//     setFlaggedQuestions((prev) =>
//       prev.includes(questionIndex)
//         ? prev.filter((q) => q !== questionIndex)
//         : [...prev, questionIndex]
//     );
//   };

//   const isAnswerCorrect = (questionIndex) => {
//     return answers[questionIndex] === quizData.questions[questionIndex].correct;
//   };

//   const progress =
//     (Object.keys(answers).length / quizData.questions.length) * 100;
//   const answered = answers[currentQuestion] !== undefined;
//   const themeClasses = darkMode
//     ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
//     : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900";

//   if (showResults) {
//     const correctAnswers = Object.entries(answers).filter(
//       ([index, answer]) => answer === quizData.questions[index].correct
//     ).length;
//     const percentage = (correctAnswers / quizData.questions.length) * 100;

//     return (
//       <div
//         className={`min-h-screen ${themeClasses} transition-colors duration-300 p-4`}
//       >
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className={`${
//               darkMode ? "bg-gray-800" : "bg-white"
//             } rounded-3xl shadow-2xl p-8 text-center`}
//           >
//             <div className="mb-8">
//               <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
//               <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
//               <p className="text-xl text-gray-600 dark:text-gray-400">
//                 You scored {correctAnswers} out of {quizData.questions.length}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div
//                 className={`p-6 rounded-2xl ${
//                   darkMode ? "bg-gray-700" : "bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <Award className="w-8 h-8 text-blue-500" />
//                 </div>
//                 <h3 className="text-2xl font-bold">{percentage.toFixed(1)}%</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Score</p>
//               </div>

//               <div
//                 className={`p-6 rounded-2xl ${
//                   darkMode ? "bg-gray-700" : "bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <Timer className="w-8 h-8 text-green-500" />
//                 </div>
//                 <h3 className="text-2xl font-bold">
//                   {formatTime(1800 - timeLeft)}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">Time Taken</p>
//               </div>

//               <div
//                 className={`p-6 rounded-2xl ${
//                   darkMode ? "bg-gray-700" : "bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <Star className="w-8 h-8 text-yellow-500" />
//                 </div>
//                 <h3 className="text-2xl font-bold">
//                   {percentage >= 90
//                     ? "A+"
//                     : percentage >= 80
//                     ? "A"
//                     : percentage >= 70
//                     ? "B"
//                     : percentage >= 60
//                     ? "C"
//                     : "F"}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">Grade</p>
//               </div>
//             </div>

//             <div className="flex justify-center space-x-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setReviewMode(true)}
//                 className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
//               >
//                 <Eye className="w-5 h-5" />
//                 <span>Review Answers</span>
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetQuiz}
//                 className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
//               >
//                 <RotateCcw className="w-5 h-5" />
//                 <span>Retake Quiz</span>
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen ${themeClasses} transition-colors duration-300`}
//     >
//       {/* Enhanced Sidebar */}
//       <motion.div
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen ? 0 : -300 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className={`fixed top-0 left-0 h-full w-80 ${
//           darkMode ? "bg-gray-800/95" : "bg-white/95"
//         } backdrop-blur-lg shadow-2xl z-40 border-r ${
//           darkMode ? "border-gray-700" : "border-gray-200"
//         }`}
//       >
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-bold">Quiz Navigation</h3>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <XCircle className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Filter Options */}
//           <div className="mb-4">
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className={`w-full p-2 rounded-lg ${
//                 darkMode
//                   ? "bg-gray-700 text-white"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               <option value="all">All Questions</option>
//               <option value="bookmarked">Bookmarked</option>
//               <option value="flagged">Flagged</option>
//               <option value="incorrect">Incorrect</option>
//             </select>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="grid grid-cols-4 gap-2">
//               {quizData.questions.map((_, index) => {
//                 const shouldShow =
//                   filter === "all" ||
//                   (filter === "bookmarked" &&
//                     bookmarkedQuestions.includes(index)) ||
//                   (filter === "flagged" && flaggedQuestions.includes(index)) ||
//                   (filter === "incorrect" &&
//                     answers[index] !== undefined &&
//                     !isAnswerCorrect(index));

//                 if (!shouldShow) return null;

//                 return (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       setCurrentQuestion(index);
//                       setSidebarOpen(false);
//                       setShowExplanation(false);
//                     }}
//                     className={`p-3 rounded-xl flex flex-col items-center justify-center relative aspect-square ${
//                       currentQuestion === index
//                         ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
//                         : answers[index] !== undefined
//                         ? isAnswerCorrect(index)
//                           ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
//                           : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
//                         : darkMode
//                         ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     <span className="text-sm font-bold">{index + 1}</span>
//                     {flaggedQuestions.includes(index) && (
//                       <Flag className="absolute top-1 right-1 w-3 h-3 text-current" />
//                     )}
//                     {bookmarkedQuestions.includes(index) && (
//                       <Bookmark className="absolute bottom-1 right-1 w-3 h-3 text-current fill-current" />
//                     )}
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>

//           <QuizStats
//             answers={answers}
//             quizData={quizData}
//             darkMode={darkMode}
//           />

//           <div className="space-y-3">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleSubmit}
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600"
//             >
//               Submit Quiz
//             </motion.button>

//             <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//               <span>Time: {formatTime(timeLeft)}</span>
//               <span>
//                 {Object.keys(answers).length}/{quizData.questions.length}
//               </span>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Top Bar */}
//       <div className="fixed top-0 left-0 right-0 z-30 bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border-b border-white/20">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSidebarOpen(true)}
//               className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
//             >
//               <List className="w-5 h-5" />
//             </motion.button>

//             <div className="flex items-center space-x-2">
//               <div
//                 className={`w-3 h-3 rounded-full ${
//                   isPaused ? "bg-yellow-500" : "bg-green-500"
//                 } animate-pulse`}
//               />
//               <span className="font-medium">{quizData.title}</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-1">
//               <Clock className="w-4 h-4" />
//               <span className="font-mono font-bold">
//                 {formatTime(timeLeft)}
//               </span>
//               <button
//                 onClick={() => setIsPaused(!isPaused)}
//                 className="ml-2 p-1 rounded hover:bg-white/20"
//               >
//                 {isPaused ? (
//                   <Play className="w-4 h-4" />
//                 ) : (
//                   <Pause className="w-4 h-4" />
//                 )}
//               </button>
//             </div>

//             <button
//               onClick={() => setSettingsOpen(true)}
//               className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
//             >
//               <Settings className="w-5 h-5" />
//             </button>

//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
//             >
//               {darkMode ? (
//                 <Sun className="w-5 h-5" />
//               ) : (
//                 <Moon className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Settings Panel */}
//       <SettingsPanel
//         isOpen={settingsOpen}
//         onClose={() => setSettingsOpen(false)}
//         darkMode={darkMode}
//         soundEnabled={soundEnabled}
//         setSoundEnabled={setSoundEnabled}
//         autoAdvance={autoAdvance}
//         setAutoAdvance={setAutoAdvance}
//       />

//       {/* Main Content */}
//       <div className="pt-20 pb-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           {/* Enhanced Progress Bar */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm font-medium">
//                 Question {currentQuestion + 1} of {quizData.questions.length}
//               </span>
//               <span className="text-sm font-medium">
//                 {Math.round(progress)}% Complete
//               </span>
//             </div>
//             <div className="relative">
//               <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progress}%` }}
//                   transition={{ duration: 0.5, ease: "easeOut" }}
//                   className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
//                 />
//               </div>
//               <div className="absolute inset-0 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse" />
//             </div>
//           </div>

//           {/* Question Card */}
//           <AnimatePresence mode="wait">
//             <QuizQuestionRenderer
//               question={quizData.questions[currentQuestion]}
//               currentQuestion={currentQuestion}
//               answers={answers}
//               showResults={showResults}
//               darkMode={darkMode}
//               handleAnswer={handleAnswer}
//               isAnswerCorrect={isAnswerCorrect}
//               bookmarkedQuestions={bookmarkedQuestions}
//               flaggedQuestions={flaggedQuestions}
//               toggleBookmark={toggleBookmark}
//               toggleFlag={toggleFlag}
//               showExplanation={showExplanation}
//               soundEnabled={soundEnabled}
//               reviewMode={reviewMode}
//             />
//           </AnimatePresence>

//           {/* Enhanced Navigation */}
//           <div className="flex justify-between items-center mt-8">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={prevQuestion}
//               disabled={currentQuestion === 0}
//               className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                 currentQuestion === 0
//                   ? "bg-gray-200/50 text-gray-500 cursor-not-allowed"
//                   : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
//               }`}
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>Previous</span>
//             </motion.button>

//             <div className="flex items-center space-x-3">
//               {answered && !reviewMode && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowExplanation(!showExplanation)}
//                   className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center space-x-2"
//                 >
//                   <HelpCircle className="w-4 h-4" />
//                   <span className="text-sm">
//                     {showExplanation ? "Hide" : "Show"} Explanation
//                   </span>
//                 </motion.button>
//               )}

//               {currentQuestion < quizData.questions.length - 1 ? (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={nextQuestion}
//                   disabled={!answered && !reviewMode}
//                   className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                     !answered && !reviewMode
//                       ? "bg-gray-200/50 text-gray-500 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg"
//                   }`}
//                 >
//                   <span>Next</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </motion.button>
//               ) : (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={
//                     reviewMode ? () => setReviewMode(false) : handleSubmit
//                   }
//                   className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 font-medium shadow-lg"
//                 >
//                   <span>{reviewMode ? "Exit Review" : "Submit Quiz"}</span>
//                   {reviewMode ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Zap className="w-5 h-5" />
//                   )}
//                 </motion.button>
//               )}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="flex justify-center mt-6 space-x-2">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => toggleBookmark(currentQuestion)}
//               className={`p-3 rounded-full transition-all duration-200 ${
//                 bookmarkedQuestions.includes(currentQuestion)
//                   ? "bg-yellow-500 text-white shadow-lg"
//                   : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
//               }`}
//               title="Bookmark Question"
//             >
//               <Bookmark
//                 className="w-5 h-5"
//                 fill={
//                   bookmarkedQuestions.includes(currentQuestion)
//                     ? "currentColor"
//                     : "none"
//                 }
//               />
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => toggleFlag(currentQuestion)}
//               className={`p-3 rounded-full transition-all duration-200 ${
//                 flaggedQuestions.includes(currentQuestion)
//                   ? "bg-red-500 text-white shadow-lg"
//                   : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
//               }`}
//               title="Flag Question for Review"
//             >
//               <Flag
//                 className="w-5 h-5"
//                 fill={
//                   flaggedQuestions.includes(currentQuestion)
//                     ? "currentColor"
//                     : "none"
//                 }
//               />
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Floating Timer Warning */}
//       <AnimatePresence>
//         {timeLeft <= 300 && timeLeft > 0 && !isPaused && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 50 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 50 }}
//             className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-2xl shadow-2xl z-50"
//           >
//             <div className="flex items-center space-x-2">
//               <AlertCircle className="w-5 h-5 animate-pulse" />
//               <div>
//                 <p className="font-bold">Time Warning!</p>
//                 <p className="text-sm">{formatTime(timeLeft)} remaining</p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EnhancedQuizApp;
