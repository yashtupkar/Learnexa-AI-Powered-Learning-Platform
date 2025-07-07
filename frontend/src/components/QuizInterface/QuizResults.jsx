import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  CheckCircle,
  XCircle,
  Clock,
  BarChart2,
  ChevronDown,
  RefreshCw,
  Home,
  Share2,
  BookOpen,
  Trophy,
  Award,
  HelpCircle,
  TrendingUp,
  Sparkles,
  Target,
  Medal,
  Lightbulb,
  PanelLeftOpen,
  Hash,
  Zap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const QuizResults = ({
  score,
  quizData,
  answers = {},
  isAnswerCorrect,
  resetQuiz,
  setCurrentQuestion,
  setShowResults,
  setIsReviewing,
  timeSpent = 0,
  attempts = 1,
  darkMode = false,
}) => {
  const [expandedResults, setExpandedResults] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [animateScore, setAnimateScore] = useState(false);
  const [confettiShown, setConfettiShown] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const answersArray = Array.isArray(answers)
    ? answers
    : Object.values(answers);

  const totalQuestions = quizData.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const correctAnswers = answersArray.filter((_, i) =>
    isAnswerCorrect(i)
  ).length;
  const wrongAnswers = answersArray.filter(
    (_, i) => !isAnswerCorrect(i)
  ).length;
  const unattempted = totalQuestions - answersArray.length;

  const perfectScore = score === totalQuestions;
  const excellentScore = percentage >= 90;
  const goodScore = percentage >= 75;
  const passingScore = percentage >= 60;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setAnimateScore(true);
    if ((perfectScore || excellentScore) && !confettiShown) {
      setConfettiShown(true);
      const timer = setTimeout(() => setConfettiShown(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [perfectScore, excellentScore, confettiShown]);

  const getPerformanceLevel = () => {
    if (perfectScore)
      return {
        level: "Perfect Score!",
        color: "from-yellow-400 to-amber-500",
        bgColor:
          "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
        icon: Trophy,
        message: "Flawless victory! You're a quiz master!",
        emoji: "🏆",
      };
    if (excellentScore)
      return {
        level: "Excellent!",
        color: "from-purple-500 to-indigo-600",
        bgColor:
          "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
        icon: Award,
        message: "Outstanding performance! You're brilliant!",
        emoji: "🌟",
      };
    if (goodScore)
      return {
        level: "Great Job!",
        color: "from-emerald-500 to-teal-600",
        bgColor:
          "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
        icon: Award,
        message: "Amazing work! You're doing fantastic!",
        emoji: "🎯",
      };
    if (passingScore)
      return {
        level: "Well Done!",
        color: "from-blue-500 to-cyan-600",
        bgColor:
          "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
        icon: CheckCircle,
        message: "You passed! Keep up the momentum!",
        emoji: "✅",
      };
    return {
      level: "Keep Practicing!",
      color: "from-orange-500 to-red-600",
      bgColor:
        "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      icon: TrendingUp,
      message: "Don't give up! Review and try again!",
      emoji: "📚",
    };
  };

  const performance = getPerformanceLevel();

  const filteredQuestions = quizData.questions.filter((_, index) => {
    if (selectedFilter === "correct") return isAnswerCorrect(index);
    if (selectedFilter === "incorrect") return !isAnswerCorrect(index);
    if (selectedFilter === "unattempted")
      return answersArray[index] === undefined;
    return true;
  });

  const timePerQuestion = timeSpent / totalQuestions;

  const ShareModal = () => (
    <AnimatePresence>
      {showShareModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={() => setShowShareModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md z-50 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{performance.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Share Your Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                You scored {percentage}% - {performance.level}
              </p>
            </div>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Share2 size={18} />
                <span className="font-medium">Share on Social Media</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Medal size={18} />
                <span className="font-medium">Generate Certificate</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <BarChart2 size={18} />
                <span className="font-medium">Share Detailed Stats</span>
              </motion.button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className={`min-h-screen w-full bg-white dark:bg-black`}
    >
      {/* Confetti for perfect/excellent scores */}
      {confettiShown && (perfectScore || excellentScore) && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.5}
          tweenDuration={50}
          colors={[
            "#f59e0b",
            "#ef4444",
            "#ec4899",
            "#a855f7",
            "#6366f1",
            "#3b82f6",
            "#0ea5e9",
          ]}
        />
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl w-full mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Quiz Results
              </h1>
              <button
                onClick={() => {
                  resetQuiz();
                  setShowResults(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <Home size={18} />
                <span>Exit</span>
              </button>
            </div>

            {/* Main Results Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              {/* Performance Header */}
              <div
                className={`p-6 bg-gradient-to-r ${performance.color} text-white relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                      className="mr-4"
                    >
                      {perfectScore ? (
                        <div className="relative">
                          <Trophy className="w-12 h-12 text-yellow-300" />
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1"
                          >
                            <Sparkles className="w-6 h-6 text-yellow-200" />
                          </motion.div>
                        </div>
                      ) : (
                        <performance.icon className="w-12 h-12" />
                      )}
                    </motion.div>
                    <div>
                      <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold mb-1"
                      >
                        {performance.level}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/90"
                      >
                        {performance.message}
                      </motion.p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/20"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-3xl font-bold mb-1"
                    >
                      {percentage}%
                    </motion.div>
                    <div className="text-white/90 text-sm">
                      {score}/{totalQuestions} correct
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: CheckCircle,
                    value: correctAnswers,
                    label: "Correct",
                    color: "from-green-400 to-emerald-500",
                    bgColor:
                      "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
                  },
                  {
                    icon: XCircle,
                    value: wrongAnswers,
                    label: "Wrong",
                    color: "from-red-400 to-pink-500",
                    bgColor:
                      "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
                  },
                  {
                    icon: HelpCircle,
                    value: unattempted,
                    label: "Skipped",
                    color: "from-gray-400 to-slate-500",
                    bgColor:
                      "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800",
                  },
                  {
                    icon: Clock,
                    value: `${Math.floor(timeSpent / 60)}:${(timeSpent % 60)
                      .toString()
                      .padStart(2, "0")}`,
                    label: "Time",
                    color: "from-purple-400 to-indigo-500",
                    bgColor:
                      "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`bg-gradient-to-br ${
                      stat.bgColor
                    } rounded-xl p-4 border ${
                      darkMode ? "border-gray-700/50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} mr-3`}
                      >
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress Visualization */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                  <Target className="w-5 h-5 mr-2 text-indigo-500" />
                  Performance Breakdown
                </h3>
                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${performance.color} relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                  <span>0%</span>
                  <span className="font-semibold">
                    Your Score: {percentage}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            </motion.div>

            {/* Detailed Stats Toggle */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowStats(!showStats)}
              className={`w-full mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-between border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } hover:shadow-lg transition-all`}
            >
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  View Detailed Analytics
                </span>
              </div>
              <motion.div
                animate={{ rotate: showStats ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </motion.button>

            {/* Detailed Stats Panel */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6 border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                      Quiz Analytics
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Time Metrics */}
                      <div
                        className={`p-4 rounded-xl border ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20`}
                      >
                        <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                          <Clock className="w-5 h-5 mr-2 text-blue-500" />
                          Time Analysis
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Total Time:
                            </span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {Math.floor(timeSpent / 60)}:
                              {(timeSpent % 60).toString().padStart(2, "0")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Avg Time/Question:
                            </span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {Math.round(timePerQuestion)}s
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Accuracy Metrics */}
                      <div
                        className={`p-4 rounded-xl border ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20`}
                      >
                        <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                          <Target className="w-5 h-5 mr-2 text-emerald-500" />
                          Accuracy Stats
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Accuracy:
                            </span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {percentage}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Confidence:
                            </span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {Math.round(
                                (correctAnswers /
                                  (correctAnswers + wrongAnswers || 1)) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Review Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setExpandedResults(!expandedResults)}
                className={`w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !expandedResults ? "rounded-b-xl" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      Question Review
                    </span>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
                        {totalQuestions} questions
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedResults ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      {/* Filter Buttons */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[
                          {
                            key: "all",
                            label: "All",
                            icon: BookOpen,
                            color: "from-gray-500 to-slate-600",
                          },
                          {
                            key: "correct",
                            label: "Correct",
                            icon: CheckCircle,
                            color: "from-green-500 to-emerald-600",
                          },
                          {
                            key: "incorrect",
                            label: "Incorrect",
                            icon: XCircle,
                            color: "from-red-500 to-pink-600",
                          },
                          {
                            key: "unattempted",
                            label: "Skipped",
                            icon: HelpCircle,
                            color: "from-orange-500 to-amber-600",
                          },
                        ].map(({ key, label, icon: Icon, color }) => (
                          <motion.button
                            key={key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedFilter(key)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                              selectedFilter === key
                                ? `bg-gradient-to-r ${color} text-white shadow-md`
                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                          </motion.button>
                        ))}
                      </div>

                      {/* Questions List */}
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {filteredQuestions.map((question, originalIndex) => {
                          const questionIndex = quizData.questions.findIndex(
                            (q) => q === question
                          );
                          const isCorrect = isAnswerCorrect(questionIndex);
                          const wasAttempted =
                            answers[questionIndex] !== undefined;

                          return (
                            <motion.div
                              key={questionIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: originalIndex * 0.05 }}
                              className={`p-3 rounded-lg border ${
                                !wasAttempted
                                  ? "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                                  : isCorrect
                                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-start mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                      Q{questionIndex + 1}:
                                    </span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                      {question.question_text}
                                    </p>
                                  </div>

                                  {wasAttempted ? (
                                    <div
                                      className={`text-xs ${
                                        isCorrect
                                          ? "text-green-700 dark:text-green-400"
                                          : "text-red-700 dark:text-red-400"
                                      }`}
                                    >
                                      {isCorrect ? (
                                        <div className="flex items-center">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          <span>You answered correctly</span>
                                        </div>
                                      ) : (
                                        <div className="space-y-1">
                                          <div className="flex items-center">
                                            <XCircle className="w-3 h-3 mr-1" />
                                            <span>
                                              Your answer:{" "}
                                              <span className="font-medium">
                                                {answers[questionIndex]}
                                              </span>
                                            </span>
                                          </div>
                                          <div className="flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            <span>
                                              Correct answer:{" "}
                                              <span className="font-medium">
                                                {question.correct_answer}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                      <HelpCircle className="w-3 h-3 mr-1" />
                                      <span>Not attempted</span>
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() => {
                                    setCurrentQuestion(questionIndex);
                                    setIsReviewing(true);
                                    setShowResults(false);
                                  }}
                                  className="ml-2 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded transition-colors whitespace-nowrap"
                                >
                                  Review
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  resetQuiz();
                  setCurrentQuestion(0);
                  setShowResults(false);
                }}
                className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="font-medium">Retake Quiz</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowShareModal(true)}
                className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share Results</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  resetQuiz();
                  setShowResults(false);
                }}
                className="p-3 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-lg shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal />
    </div>
  );
};

export default QuizResults;
