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
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

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
  const [timeSpent, setTimeSpent] = useState(0);

  const answerRefs = useRef([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { backend_URL } = useContext(AppContext);
 const [initialLoad, setInitialLoad] = useState(true); 
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get current tab from URL
  const currentTab = searchParams.get('tab') || 'startscreen';

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

  // Sync component state with URL tab
  useEffect(() => {
    if (!quizData || !initialLoad) return;

    // Prevent flickering by waiting for initial data load
    let shouldUpdateState = true;

    switch (currentTab) {
      case "startscreen":
        if (quizStarted) {
          resetQuiz(false); // Pass false to prevent URL update
          shouldUpdateState = false;
        }
        break;

      case "results":
        if (!showResults) {
          setShowResults(true);
          shouldUpdateState = false;
        }
        break;

      default:
        if (currentTab.startsWith("question")) {
          const questionNum = parseInt(currentTab.replace("question", ""));
          if (!isNaN(questionNum)) {
            const questionIndex = Math.min(
              Math.max(questionNum - 1, 0),
              quizData.questions.length - 1
            );

            if (currentQuestion !== questionIndex) {
              setCurrentQuestion(questionIndex);
              shouldUpdateState = false;
            }

            if (!quizStarted) {
              setQuizStarted(true);
              shouldUpdateState = false;
            }
          }
        }
    }

    // Only update URL if we didn't just sync from URL
    if (shouldUpdateState) {
      updateUrlFromState();
    }

    setInitialLoad(false);
  }, [quizData, currentTab]);

  // Update URL based on current state
  const updateUrlFromState = () => {
    if (!quizData) return;

    let newTab = "";
    if (!quizStarted) {
      newTab = "startscreen";
    } else if (showResults) {
      newTab = "results";
    } else {
      newTab = `question${currentQuestion + 1}`;
    }

    navigate(`/quiz/${quizId}?tab=${newTab}`, { replace: true });
  };

  // Update URL when state changes
  useEffect(() => {
    if (!quizData) return;

    let newTab = '';
    if (!quizStarted) {
      newTab = 'startscreen';
    } 
    else if (showResults) {
      newTab = 'results';
    }
    else {
      newTab = `question${currentQuestion + 1}`;
    }

    if (currentTab !== newTab) {
      navigate(`/quiz/${quizId}?tab=${newTab}`, { replace: true });
    }
  }, [quizStarted, showResults, currentQuestion, quizData, currentTab, quizId, navigate]);

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

    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      const newQuestion = currentQuestion + 1;
      setCurrentQuestion(newQuestion);
      setShowExplanation(false);
      navigate(`/quiz/${quizId}?tab=question${newQuestion + 1}`, {
        replace: true,
      });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      const newQuestion = currentQuestion - 1;
      setCurrentQuestion(newQuestion);
      setShowExplanation(false);
      navigate(`/quiz/${quizId}?tab=question${newQuestion + 1}`, {
        replace: true,
      });
    }
  };

  const handleStartQuiz = (mode) => {
    setQuizMode(mode);
    setQuizStarted(true);
    navigate(`/quiz/${quizId}?tab=question1`, { replace: true });
  };

  const calculateDetailedScore = () => {
    // 1. Handle case where quiz data isn't loaded
    if (!quizData?.questions) {
      return {
        correct: 0,
        totalQuestions: 0,
        percentage: 0,
        questions: [],
        submittedAt: new Date(),
      };
    }

    // 2. Map through each question to create detailed results
    const questionsWithResults = quizData.questions.map((question, index) => {
      const isCorrect = isAnswerCorrect(index);
      return {
        questionId: question._id, // From quiz data
        questionText: question.question_text, // From quiz data
        selectedOption: answers[index] || null, // From user's answers
        correctOption: question.correct_answer, // From quiz data
        isCorrect, // Calculated
      };
    });

    // 3. Calculate summary statistics
    const correct = questionsWithResults.filter((q) => q.isCorrect).length;
    const totalQuestions = quizData.questions.length;
    const percentage = Math.round((correct / totalQuestions) * 100);

    // 4. Return complete score object
    return {
      correct,
      totalQuestions,
      percentage,
      questions: questionsWithResults,
      submittedAt: new Date(), // Current timestamp
      timeSpent, // Optional: seconds taken
    };
  };


  const handleSubmit = async () => {
    const scoreDetails = calculateDetailedScore();
    try {
      const response = await axios.post(`${backend_URL}/api/quiz/submit-quiz`, {
        quizId: quizId,
        userId: user._id,
        score: scoreDetails,
      });
      navigate(`/quiz-result/${quizId}`);
      setShowConfetti(scoreDetails.percentage >= 90);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz");
    }
  };

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



  const capitalize = (val) => {
    if (val === undefined || val === null) return "";
    const str = val.toString().trim().toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const resetQuiz = (updateUrl = true) => {
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
    if (updateUrl) {
      navigate(`/quiz/${quizId}?tab=startscreen`, { replace: true });
    }
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

  // Calculate progress
  const progress = quizData?.questions?.length
    ? ((currentQuestion + 1) / quizData.questions.length) * 100
    : 0;

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
        setQuizStarted={handleStartQuiz} // Updated to use handleStartQuiz
        setQuizMode={setQuizMode}
      />
    );
  }

  // Results Screen
  // if (showResults && quizData) {
  //   const scoreDetails = calculateDetailedScore();
  //   return (
  //     <QuizResults
  //       score={scoreDetails.correct}
  //       quizData={quizData}
  //       answers={answers}
  //       isAnswerCorrect={isAnswerCorrect}
  //       showConfetti={showConfetti}
  //       expandedResults={expandedResults}
  //       setExpandedResults={setExpandedResults}
  //       resetQuiz={resetQuiz}
  //       setCurrentQuestion={setCurrentQuestion}
  //       setShowResults={setShowResults}
  //       setIsReviewing={setIsReviewing}
  //       timeSpent={timeSpent}
  //       attempts={1}
  //       darkMode={darkMode}
  //     />
  //   );
  // }

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

  // Main Quiz Interface starts here with the return statement...

  // Main Quiz Interface

  return (
    <div className={`min-h-screen w-full bg-white dark:bg-zinc-900 `}>
      {/* Mobile Header - Fixed at Top */}
      <div className=" fixed top-0 left-0 right-0 z-20 bg-gradient-to-br from-indigo-600 to-indigo-400  text-white  backdrop-blur-lg  p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg text-gray-100 dark:bg-zinc-800 hover:bg-gray-200/30 cursor-pointer dark:hover:bg-zinc-700 transition-colors"
            >
              <Menu size={18} className="text-white dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-lg text-white font- line-clamp-1 max-w-[200px] sm:max-w-[300px] md:max-w-[500px] lg:max-w-[700px]">
                {capitalize(quizData.quiz_title) || "Quiz"}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-md flex gap-2 items-center bg-gray-100/20 px-2 py-1 rounded font-medium">
              <Clock size={20} />
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
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:block">Previous</span>
            </button>

            <div className="flex space-x-2">
              {quizMode === "practice" && answered && (
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={`px-3 py-2  cursor-pointer flex gap-2 items-center rounded-lg bg-gradient-to-br from-green-500 to-blue-400  text-white `}
                >
                  <BookOpen className="w-5 h-5" />
                  {showExplanation ? (
                    <span className="hidden md:block">Hide Explanation</span>
                  ) : (
                    <span className="hidden md:block">Show Explanation</span>
                  )}
                </button>
              )}

              {currentQuestion < quizData.questions.length - 1 ? (
                <>
                  <button
                    onClick={nextQuestion}
                    className="px-3 py-2 rounded-lg cursor-pointer dark:text-gray-300 dark:bg-gray-800 bg-gray-200 text-gray-600"
                  >
                    Skip
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={!answered}
                    className={`px-3 py-2 flex  gap-2 items-center rounded-lg ${
                      !answered
                        ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-br from-indigo-600 to-indigo-400  text-white cursor-pointer "
                    }`}
                  >
                    <span className="hidden md:block">Save & Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-3 py-2 cursor-pointer bg-gradient-to-br from-indigo-600 to-purple-400  text-white  rounded-lg hover:from-blue-600 hover:to-purple-600"
                >
                  Submit
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

