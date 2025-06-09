// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Award,
//   CheckCircle,
//   XCircle,
//   BarChart2,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
// } from "lucide-react";

// export const QuizResults = ({
//   quizData,
//   answers,
//   darkMode,
//   expandedResults,
//   perfectScore,
//   passingScore,
//   score,
//   percentage,
//   onReset,
//   onToggleResults,
//   onReviewQuestion,
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9, y: 50 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, type: "spring" }}
//       className={`${
//         darkMode
//           ? "bg-gray-800 border border-gray-700"
//           : "bg-white/80 backdrop-blur-sm"
//       } rounded-3xl shadow-2xl p-10 max-w-2xl w-full relative overflow-hidden z-10`}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl" />

//       <motion.div
//         initial={{ scale: 0, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//         className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center relative z-10 ${
//           perfectScore
//             ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
//             : passingScore
//             ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
//             : "bg-gradient-to-r from-red-400 via-rose-500 to-pink-500"
//         }`}
//       >
//         {perfectScore ? (
//           <Award className="w-12 h-12 text-white" />
//         ) : passingScore ? (
//           <CheckCircle className="w-12 h-12 text-white" />
//         ) : (
//           <XCircle className="w-12 h-12 text-white" />
//         )}
//       </motion.div>

//       <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
//         {perfectScore
//           ? "Perfect Score!"
//           : passingScore
//           ? "Quiz Complete!"
//           : "Try Again!"}
//       </h2>
//       <p
//         className={`${
//           darkMode ? "text-gray-300" : "text-gray-600"
//         } mb-8 text-lg text-center`}
//       >
//         {perfectScore
//           ? "You got every question right! Amazing!"
//           : passingScore
//           ? "You passed the quiz! Well done!"
//           : `Keep practicing to improve your score!`}
//       </p>

//       <div
//         className={`${
//           darkMode
//             ? "bg-gray-700/50"
//             : "bg-gradient-to-r from-blue-50 to-purple-50"
//         } rounded-3xl p-8 mb-8 relative overflow-hidden`}
//       >
//         <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center">
//           {score}/{quizData.questions.length}
//         </div>
//         <div
//           className={`text-2xl font-semibold ${
//             darkMode ? "text-gray-300" : "text-gray-700"
//           } mb-6 text-center`}
//         >
//           {percentage.toFixed(1)}% Correct
//         </div>

//         <div
//           className={`${
//             darkMode ? "bg-gray-600" : "bg-gray-200"
//           } rounded-full h-4 overflow-hidden relative`}
//         >
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${percentage}%` }}
//             transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
//             className={`h-full relative ${
//               perfectScore
//                 ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
//                 : passingScore
//                 ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
//                 : "bg-gradient-to-r from-red-400 via-rose-500 to-pink-500"
//             }`}
//           >
//             <motion.div
//               className="absolute inset-0 bg-white/20"
//               animate={{ x: ["-100%", "100%"] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             />
//           </motion.div>
//         </div>
//       </div>

//       {/* Detailed results */}
//       <motion.div
//         className={`rounded-2xl overflow-hidden mb-8 ${
//           darkMode ? "bg-gray-700/50" : "bg-gray-50"
//         }`}
//       >
//         <motion.button
//           whileHover={{
//             backgroundColor: darkMode
//               ? "rgba(55, 65, 81, 0.7)"
//               : "rgba(243, 244, 246, 0.7)",
//           }}
//           whileTap={{ scale: 0.98 }}
//           onClick={onToggleResults}
//           className={`w-full p-4 flex justify-between items-center ${
//             darkMode ? "text-gray-200" : "text-gray-700"
//           }`}
//         >
//           <div className="flex items-center space-x-3">
//             <BarChart2 className="w-5 h-5" />
//             <span className="font-semibold">View Detailed Results</span>
//           </div>
//           {expandedResults ? (
//             <ChevronUp className="w-5 h-5" />
//           ) : (
//             <ChevronDown className="w-5 h-5" />
//           )}
//         </motion.button>

//         <AnimatePresence>
//           {expandedResults && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="p-4 border-t border-gray-200 dark:border-gray-600">
//                 {quizData.questions.map((question, index) => {
//                   const isCorrect =
//                     answers[index] === question.correct_answer ||
//                     (question.question_type === "true_false" &&
//                       answers[index] === (question.correct_answer === "true"));

//                   return (
//                     <div
//                       key={index}
//                       className={`mb-4 last:mb-0 p-4 rounded-xl ${
//                         isCorrect
//                           ? darkMode
//                             ? "bg-emerald-500/10 border border-emerald-500/20"
//                             : "bg-emerald-50 border border-emerald-200"
//                           : darkMode
//                           ? "bg-red-500/10 border border-red-500/20"
//                           : "bg-red-50 border border-red-200"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4
//                             className={`font-medium ${
//                               darkMode ? "text-gray-200" : "text-gray-700"
//                             }`}
//                           >
//                             Q{index + 1}: {question.question_text}
//                           </h4>
//                           <p
//                             className={`text-sm mt-1 ${
//                               isCorrect
//                                 ? darkMode
//                                   ? "text-emerald-300"
//                                   : "text-emerald-600"
//                                 : darkMode
//                                 ? "text-red-300"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {isCorrect ? (
//                               <span className="flex items-center">
//                                 <CheckCircle className="w-4 h-4 mr-1" />
//                                 Correct
//                               </span>
//                             ) : (
//                               <span className="flex items-center">
//                                 <XCircle className="w-4 h-4 mr-1" />
//                                 Your answer:{" "}
//                                 {answers[index] !== undefined
//                                   ? answers[index].toString()
//                                   : "Skipped"}{" "}
//                                 • Correct answer: {question.correct_answer}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => onReviewQuestion(index)}
//                           className={`px-3 py-1 rounded-lg text-sm ${
//                             darkMode
//                               ? "bg-gray-700 hover:bg-gray-600"
//                               : "bg-gray-200 hover:bg-gray-300"
//                           }`}
//                         >
//                           Review
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <motion.button
//           whileHover={{ scale: 1.02, y: -2 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={onReset}
//           className="flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl relative overflow-hidden group"
//         >
//           <RefreshCw className="w-5 h-5" />
//           <span>Restart Quiz</span>
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//             initial={{ opacity: 0 }}
//             whileHover={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.02, y: -2 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={onReset}
//           className={`px-6 py-4 rounded-2xl font-bold shadow-xl relative overflow-hidden group ${
//             darkMode
//               ? "bg-gray-700 text-white hover:bg-gray-600"
//               : "bg-white text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           <span>Back to Quizzes</span>
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? "bg-gray-600" : "bg-gray-200"
//             }`}
//             initial={{ opacity: 0 }}
//             whileHover={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };



// QuizResults.jsx
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Award,
//   CheckCircle,
//   XCircle,
//   Sun,
//   Moon,
//   BarChart2,
//   ChevronUp,
//   ChevronDown,
//   RefreshCw,
//   Home,
// } from "lucide-react";
// const QuizResults = ({
//   score,
//   quizData,
//   answers,
//   isAnswerCorrect,
//   darkMode,
//   setDarkMode,
//   showConfetti,
//   expandedResults,
//   setExpandedResults,
//   resetQuiz,
//   setCurrentQuestion,
//   setShowResults,
// }) => {
//   const percentage = (score / quizData.questions.length) * 100;
//   const perfectScore = score === quizData.questions.length;
//   const passingScore = percentage >= 70;

//   const themeClasses = darkMode
//     ? "bg-gray-900 text-gray-100"
//     : "bg-gray-50 text-gray-900";

//   return (
//     <div
//       className={`min-h-screen ${themeClasses} flex items-center justify-center p-4 transition-colors duration-300`}
//     >
//       {/* Theme Toggle */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setDarkMode(!darkMode)}
//         className={`fixed top-6 right-6 p-2 rounded-full ${
//           darkMode
//             ? "bg-gray-800 text-yellow-400"
//             : "bg-white text-gray-700 shadow-md"
//         } transition-all duration-300 z-50`}
//       >
//         {darkMode ? (
//           <Sun className="w-5 h-5" />
//         ) : (
//           <Moon className="w-5 h-5" />
//         )}
//       </motion.button>

//       {/* Confetti effect */}
      // {showConfetti && (
      //   <div className="absolute inset-0 pointer-events-none overflow-hidden">
      //     {[...Array(50)].map((_, i) => (
      //       <motion.div
      //         key={i}
      //         className={`absolute w-2 h-2 rounded-full ${
      //           [
      //             "bg-yellow-400",
      //             "bg-red-400",
      //             "bg-blue-400",
      //             "bg-green-400",
      //             "bg-purple-400",
      //           ][i % 5]
      //         }`}
      //         style={{
      //           left: `${Math.random() * 100}%`,
      //           top: `${Math.random() * 100}%`,
      //         }}
      //         animate={{
      //           y: [0, window.innerHeight],
      //           x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
      //           rotate: [0, 360],
      //           opacity: [1, 0],
      //         }}
      //         transition={{
      //           duration: Math.random() * 2 + 2,
      //           ease: "linear",
      //         }}
      //       />
      //     ))}
      //   </div>
      // )}

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className={`${
//           darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-xl"
//         } rounded-2xl p-8 max-w-md w-full transition-colors duration-300`}
//       >
//         <div
//           className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg ${
//             perfectScore
//               ? "bg-gradient-to-r from-yellow-400 to-amber-500"
//               : passingScore
//               ? "bg-gradient-to-r from-green-400 to-teal-500"
//               : "bg-gradient-to-r from-red-400 to-pink-500"
//           }`}
//         >
//           {perfectScore ? (
//             <Award className="w-8 h-8 text-white" />
//           ) : passingScore ? (
//             <CheckCircle className="w-8 h-8 text-white" />
//           ) : (
//             <XCircle className="w-8 h-8 text-white" />
//           )}
//         </div>

//         <h2 className="text-2xl font-bold mb-3 text-center text-gray-800 dark:text-white">
//           {perfectScore
//             ? "Perfect Score!"
//             : passingScore
//             ? "Quiz Complete!"
//             : "Try Again!"}
//         </h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
//           {perfectScore
//             ? "You got every question right! Amazing!"
//             : passingScore
//             ? "You passed the quiz! Well done!"
//             : `Keep practicing to improve your score!`}
//         </p>

//         <div
//           className={`${
//             darkMode ? "bg-gray-700" : "bg-gray-100"
//           } rounded-xl p-6 mb-6`}
//         >
//           <div className="flex items-center justify-center mb-4">
//             <div className="relative w-24 h-24">
//               <svg className="w-full h-full" viewBox="0 0 36 36">
//                 <path
//                   d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke={darkMode ? "#374151" : "#e5e7eb"}
//                   strokeWidth="3"
//                 />
//                 <path
//                   d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke={
//                     perfectScore
//                       ? "#f59e0b"
//                       : passingScore
//                       ? "#10b981"
//                       : "#ef4444"
//                   }
//                   strokeWidth="3"
//                   strokeDasharray={`${percentage}, 100`}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-2xl font-bold text-gray-800 dark:text-white">
//                   {percentage.toFixed(0)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold mb-1 text-gray-800 dark:text-white">
//               {score}/{quizData.questions.length}
//             </div>
//             <div className="text-lg text-gray-600 dark:text-gray-300">
//               Correct Answers
//             </div>
//           </div>
//         </div>

//         {/* Detailed results */}
//         <div
//           className={`rounded-xl overflow-hidden mb-6 ${
//             darkMode ? "bg-gray-700" : "bg-gray-100"
//           }`}
//         >
//           <motion.button
//             whileHover={{
//               backgroundColor: darkMode
//                 ? "rgba(55, 65, 81, 0.5)"
//                 : "rgba(243, 244, 246, 0.7)",
//             }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setExpandedResults(!expandedResults)}
//             className={`w-full p-4 flex justify-between items-center text-sm ${
//               darkMode ? "text-gray-200" : "text-gray-700"
//             }`}
//           >
//             <div className="flex items-center space-x-2">
//               <BarChart2 className="w-5 h-5" />
//               <span className="font-medium">View Detailed Results</span>
//             </div>
//             {expandedResults ? (
//               <ChevronUp className="w-5 h-5" />
//             ) : (
//               <ChevronDown className="w-5 h-5" />
//             )}
//           </motion.button>

//           <AnimatePresence>
//             {expandedResults && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="overflow-hidden"
//               >
//                 <div className="p-4 border-t border-gray-200 dark:border-gray-600">
//                   {quizData.questions.map((question, index) => (
//                     <div
//                       key={index}
//                       className={`mb-3 last:mb-0 p-3 rounded-lg text-sm ${
//                         isAnswerCorrect(index)
//                           ? "bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
//                           : "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-medium text-gray-700 dark:text-gray-200">
//                             Q{index + 1}: {question.question_text}
//                           </h4>
//                           <p
//                             className={`mt-1 ${
//                               isAnswerCorrect(index)
//                                 ? "text-emerald-600 dark:text-emerald-400"
//                                 : "text-red-600 dark:text-red-400"
//                             }`}
//                           >
//                             {isAnswerCorrect(index) ? (
//                               <span className="flex items-center">
//                                 <CheckCircle className="w-3 h-3 mr-1" />
//                                 Correct
//                               </span>
//                             ) : (
//                               <span className="flex items-center">
//                                 <XCircle className="w-3 h-3 mr-1" />
//                                 Your answer:{" "}
//                                 {answers[index] !== undefined
//                                   ? answers[index].toString()
//                                   : "Skipped"}{" "}
//                                 • Correct answer: {question.correct_answer}
//                               </span>
//                             )}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => {
//                             setCurrentQuestion(index);
//                             setShowResults(false);
//                           }}
//                           className={`px-2 py-1 rounded-md text-xs ${
//                             darkMode
//                               ? "bg-gray-600 hover:bg-gray-500"
//                               : "bg-gray-200 hover:bg-gray-300"
//                           }`}
//                         >
//                           Review
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={resetQuiz}
//             className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-purple-600"
//           >
//             <RefreshCw className="w-5 h-5" />
//             <span>Restart Quiz</span>
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={resetQuiz}
//             className={`px-4 py-3 rounded-lg font-medium shadow-md flex items-center justify-center ${
//               darkMode
//                 ? "bg-gray-700 text-white hover:bg-gray-600"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             <Home className="w-5 h-5 mr-2" />
//             <span>Back to Quizzes</span>
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };
// export default QuizResults;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  BarChart2,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Home,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Share2,
  Download,
  Eye,
  BookOpen,
  Medal,
} from "lucide-react";
import { ThemeToggle } from "../ThemeTogler";

const QuizResults = ({
  score,
  quizData,
  answers,
  isAnswerCorrect,
  showConfetti,
  expandedResults,
  setExpandedResults,
  resetQuiz,
  setCurrentQuestion,
  setShowResults,
  setIsReviewing,
  timeSpent = 0,
  attempts = 1,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const percentage = Math.round((score / quizData.questions.length) * 100);
  const perfectScore = score === quizData.questions.length;
  const excellentScore = percentage >= 90;
  const goodScore = percentage >= 80;
  const passingScore = percentage >= 70;

  const shouldShowConfetti = excellentScore || perfectScore;

  useEffect(() => {
    setAnimateScore(true);
  }, []);

  const getPerformanceLevel = () => {
    if (perfectScore)
      return {
        level: "Perfect",
        color: "from-yellow-400 to-amber-500",
        icon: Trophy,
      };
    if (excellentScore)
      return {
        level: "Excellent",
        color: "from-purple-400 to-pink-500",
        icon: Medal,
      };
    if (goodScore)
      return { level: "Good", color: "from-green-400 to-teal-500", icon: Star };
    if (passingScore)
      return {
        level: "Pass",
        color: "from-blue-400 to-cyan-500",
        icon: Target,
      };
    return {
      level: "Needs Improvement",
      color: "from-red-400 to-orange-500",
      icon: TrendingUp,
    };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  const filteredQuestions = quizData.questions.filter((_, index) => {
    if (selectedFilter === "correct") return isAnswerCorrect(index);
    if (selectedFilter === "incorrect") return !isAnswerCorrect(index);
    return true;
  });

const Confetti = () => {
  // Create an array of confetti particles with random properties
  const particles = Array.from({ length: 100 }).map((_, i) => {
    const color = [
      "bg-yellow-400",
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-indigo-400",
      "bg-orange-400",
    ][i % 8];

    const shape =
      i % 3 === 0 ? "triangle" : i % 3 === 1 ? "circle" : "pentagon";

    return {
      id: i,
      color,
      shape,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      rotate: Math.random() * 360,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-3 h-3 ${particle.color} ${
            particle.shape === "triangle"
              ? "clip-triangle"
              : particle.shape === "pentagon"
              ? "clip-pentagon"
              : "rounded-full"
          }`}
          initial={{
            top: -10,
            left: `${particle.left}%`,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            top: "110%",
            rotate: particle.rotate,
            x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: particle.duration + Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

  const ShareModal = () => (
    <>
      {showShareModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={() => setShowShareModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 w-80 z-50 shadow-2xl transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Share Your Results
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share on Social Media</span>
              </button>
              <button className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Certificate</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 transition-all duration-500">
      {shouldShowConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                [
                  "bg-yellow-400",
                  "bg-red-400",
                  "bg-blue-400",
                  "bg-green-400",
                  "bg-purple-400",
                ][i % 5]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, window.innerHeight],
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <ThemeToggle />

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-2xl w-full transform transition-all duration-500 hover:shadow-3xl"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div
              className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl bg-gradient-to-r ${performance.color} relative overflow-hidden transition-all duration-500 hover:scale-105`}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <PerformanceIcon className="w-12 h-12 text-white relative z-10" />
            </div>

            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {performance.level}!
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {perfectScore
                ? "Flawless performance! You're a quiz master!"
                : excellentScore
                ? "Outstanding work! You really know your stuff!"
                : goodScore
                ? "Great job! You're doing really well!"
                : passingScore
                ? "Good effort! Keep up the practice!"
                : "Don't give up! Every attempt makes you stronger!"}
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>

            <div className="flex items-center justify-center space-x-12">
              {/* Circular Progress */}
              <div className="relative">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-gray-600"
                  />
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`${
                      perfectScore
                        ? "text-yellow-500"
                        : excellentScore
                        ? "text-purple-500"
                        : goodScore
                        ? "text-green-500"
                        : passingScore
                        ? "text-blue-500"
                        : "text-red-500"
                    } transition-all duration-1000`}
                    strokeDasharray="100"
                    strokeDashoffset={100 - percentage}
                    style={{
                      transition: "stroke-dashoffset 1.5s ease-in-out",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {score}/{quizData.questions.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Correct Answers
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {Math.floor(timeSpent / 60)}:
                      {(timeSpent % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-500">Time</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                    <Zap className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      #{attempts}
                    </div>
                    <div className="text-xs text-gray-500">Attempt</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Toggle */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="w-full mb-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50 flex items-center justify-between text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-3">
              <BarChart2 className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Performance Analytics</span>
            </div>
            <div
              className={`transform transition-transform duration-200 ${
                showStats ? "rotate-180" : ""
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>

          {/* Enhanced Stats */}
          {showStats && (
            <div className="mb-6 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {answers.filter((_, i) => isAnswerCorrect(i)).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Correct
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {answers.filter((_, i) => !isAnswerCorrect(i)).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Incorrect
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {Math.round(timeSpent / quizData.questions.length)}s
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Avg/Question
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {performance.level}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Grade
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Results */}
          <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl overflow-hidden mb-6">
            <button
              onClick={() => setExpandedResults(!expandedResults)}
              className="w-full p-4 flex justify-between items-center hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-indigo-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Question Review
                </span>
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs">
                  {quizData.questions.length} questions
                </span>
              </div>
              <div
                className={`transform transition-transform duration-200 ${
                  expandedResults ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <AnimatePresence>
              {expandedResults && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Filter Buttons */}
                  <div className="px-4 pb-4 border-t border-gray-200/50 dark:border-gray-600/50">
                    <div className="flex space-x-2 mt-4 mb-4">
                      {[
                        { key: "all", label: "All", icon: BookOpen },
                        { key: "correct", label: "Correct", icon: CheckCircle },
                        { key: "incorrect", label: "Incorrect", icon: XCircle },
                      ].map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setSelectedFilter(key)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition-all ${
                            selectedFilter === key
                              ? "bg-indigo-500 text-white shadow-md"
                              : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {filteredQuestions.map((question, originalIndex) => {
                        const questionIndex = quizData.questions.findIndex(
                          (q) => q === question
                        );
                        const isCorrect = isAnswerCorrect(questionIndex);

                        return (
                          <motion.div
                            key={questionIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: originalIndex * 0.1 }}
                            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                              isCorrect
                                ? "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50"
                                : "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-800 dark:text-gray-200 pr-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Q{questionIndex + 1}:
                                </span>{" "}
                                {question.question_text}
                              </h4>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                {isCorrect ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                                <button
                                  onClick={() => {
                                    setCurrentQuestion(questionIndex);
                                    setIsReviewing(true);
                                    setShowResults(false);
                                  }}
                                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md text-xs transition-colors"
                                >
                                  Review
                                </button>
                              </div>
                            </div>

                            <div
                              className={`text-sm ${
                                isCorrect
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-red-700 dark:text-red-400"
                              }`}
                            >
                              {isCorrect ? (
                                <span className="flex items-center">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                  Correct answer selected
                                </span>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex items-center">
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    Your answer:{" "}
                                    <span className="font-medium ml-1">
                                      {answers[questionIndex] !== undefined
                                        ? answers[questionIndex].toString()
                                        : "Skipped"}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Correct answer:{" "}
                                    <span className="font-medium ml-1">
                                      {question.correct_answer}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={resetQuiz}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowShareModal(true)}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </motion.button>
          </div>

          <div className="mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetQuiz}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Quizzes</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <ShareModal />
    </div>
  );
};

export default QuizResults;