
// import { useState, useEffect, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Confetti from "react-confetti";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   BarChart2,
//   ChevronDown,
//   RefreshCw,
//   Home,
//   Share2,
//   BookOpen,
//   Trophy,
//   Award,
//   HelpCircle,
//   TrendingUp,
//   Sparkles,
//   Target,
//   Medal,
//   Lightbulb,
//   PanelLeftOpen,
//   Hash,
//   Zap,
//   ArrowLeft,
//   ArrowRight,
//   Clipboard,
//   Download,
// } from "lucide-react";
// import { AppContext } from "../../context/AppContext";
// import { useParams } from "react-router-dom";

// const QuizResults = ({
//   score,
//   quizData,
//   answers = {},
//   isAnswerCorrect,
//   resetQuiz,
//   setCurrentQuestion,
//   setShowResults,
//   setIsReviewing,
//   timeSpent = 0,
//   attempts = 1,
// }) => {
//   const [expandedResults, setExpandedResults] = useState(false);
//   const [showStats, setShowStats] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [animateScore, setAnimateScore] = useState(false);
//   const [confettiShown, setConfettiShown] = useState(false);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });
//   const { quizId } = useParams();
//   const {backend_URL}= useContext(AppContext)

//   const fetchResult = async () => {
//     try {
//       const response = await fetch(`${backend_URL}/api/quiz/get-quiz-result/${quizId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         }
//       });
//       console.log(response.data);
      
//     } catch (error) {
//       console.error("Error fetching quiz result:", error);
//       alert("Failed to fetch quiz result. Please try again later.");
      
//     }
//   }

//   useEffect(() => {
//     fetchResult();
//   }, [quizId]);

//   const answersArray = Array.isArray(answers)
//     ? answers
//     : Object.values(answers);

//   const totalQuestions = quizData.questions.length;
//   const percentage = Math.round((score / totalQuestions) * 100);
//   const correctAnswers = answersArray.filter((_, i) =>
//     isAnswerCorrect(i)
//   ).length;
//   const wrongAnswers = answersArray.filter(
//     (_, i) => !isAnswerCorrect(i) && answers[i] !== undefined
//   ).length; // Filter actual wrong answers, not just unattempted
//   const unattempted = totalQuestions - answersArray.length;

//   const perfectScore = score === totalQuestions;
//   const excellentScore = percentage >= 90;
//   const goodScore = percentage >= 75;
//   const passingScore = percentage >= 60;

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     setAnimateScore(true);
//     if ((perfectScore || excellentScore) && !confettiShown) {
//       setConfettiShown(true);
//       const timer = setTimeout(() => setConfettiShown(false), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [perfectScore, excellentScore, confettiShown]);

//   const getPerformanceLevel = () => {
//     if (perfectScore)
//       return {
//         level: "Perfect Score!",
//         color: "from-yellow-400 to-amber-500",
//         bgColor:
//           "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
//         icon: Trophy,
//         message: "Flawless victory! You're a quiz master!",
//         emoji: "🏆",
//       };
//     if (excellentScore)
//       return {
//         level: "Excellent!",
//         color: "from-purple-500 to-indigo-600",
//         bgColor:
//           "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
//         icon: Award,
//         message: "Outstanding performance! You're brilliant!",
//         emoji: "🌟",
//       };
//     if (goodScore)
//       return {
//         level: "Great Job!",
//         color: "from-emerald-500 to-teal-600",
//         bgColor:
//           "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
//         icon: Award,
//         message: "Amazing work! You're doing fantastic!",
//         emoji: "🎯",
//       };
//     if (passingScore)
//       return {
//         level: "Well Done!",
//         color: "from-blue-500 to-cyan-600",
//         bgColor:
//           "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
//         icon: CheckCircle,
//         message: "You passed! Keep up the momentum!",
//         emoji: "✅",
//       };
//     return {
//       level: "Keep Practicing!",
//       color: "from-orange-500 to-red-600",
//       bgColor:
//         "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
//       icon: TrendingUp,
//       message: "Don't give up! Review and try again!",
//       emoji: "📚",
//     };
//   };

//   const performance = getPerformanceLevel();

//   const normalize = (val) => {
//     if (val === undefined || val === null) return "";
//     return val.toString().trim().toLowerCase();
//   };

//   const allQuestionIndices = quizData.questions.map((_, i) => i);

//   const filteredQuestionIndices = allQuestionIndices.filter((index) => {
//     const userAnswer = normalize(answers[index]);
//     const correctAnswer = normalize(quizData.questions[index]?.correct_answer);
//     const isCorrect = userAnswer === correctAnswer;
//     const wasAttempted = answers[index] !== undefined;

//     if (selectedFilter === "correct") return isCorrect;
//     if (selectedFilter === "incorrect") return !isCorrect && wasAttempted;
//     if (selectedFilter === "unattempted") return !wasAttempted;
//     return true; // "all" filter
//   });

//   const timePerQuestion = totalQuestions > 0 ? timeSpent / totalQuestions : 0;

//   const ShareModal = () => (
//     <AnimatePresence>
//       {showShareModal && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
//             onClick={() => setShowShareModal(false)}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 50 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 50 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md z-50 shadow-xl border border-gray-200 dark:border-gray-700"
//           >
//             <div className="text-center mb-6">
//               <div className="text-5xl mb-3">{performance.emoji}</div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Share Your Results
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 You scored {percentage}% - {performance.level}
//               </p>
//             </div>
//             <div className="space-y-3">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
//                 onClick={() => {
//                   navigator.clipboard.writeText(
//                     `I scored ${percentage}% on the quiz! ${performance.emoji} Check it out!`
//                   );
//                   alert("Results copied to clipboard!");
//                   setShowShareModal(false);
//                 }}
//               >
//                 <Clipboard size={18} />
//                 <span className="font-medium">Copy Result Text</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full p-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
//               >
//                 <Download size={18} />
//                 <span className="font-medium">Download Results Image</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
//               >
//                 <Share2 size={18} />
//                 <span className="font-medium">Share to Social Media</span>
//               </motion.button>
//             </div>
//             <button
//               onClick={() => setShowShareModal(false)}
//               className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               Close
//             </button>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div
//       className={`min-h-screen w-full bg-gray-100 dark:bg-gray-900 font-sans`}
//     >
//       {/* Confetti for perfect/excellent scores */}
//       {confettiShown && (perfectScore || excellentScore) && (
      
//             <Confetti
//               width={windowSize.width}
//               height={windowSize.height}
//               recycle={false}
//               numberOfPieces={500}
//             />
         
//       )}

//       <div className="flex justify-center items-center py-10 md:px-4 min-h-screen">
//         <div className="max-w-4xl w-full mx-auto">
//           {/* Header */}

//           {/* <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
//               Quiz Results
//             </h1>
//             <button
//               onClick={() => {
//                 resetQuiz();
//                 setShowResults(false);
//               }}
//               className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all shadow-md"
//             >
//               <Home size={18} />
//               <span>Exit Quiz</span>
//             </button>
//           </div> */}
          

//           {/* Main Results Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8 border ${
//               darkMode ? "border-gray-700" : "border-gray-200"
//             }`}
//           >
//             {/* Performance Header */}
//             <div
//               className={`p-8 bg-gradient-to-r ${performance.color} text-white relative overflow-hidden`}
//             >
//               <div className="absolute inset-0 bg-black/10"></div>
//               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
//                 <div className="flex items-center text-center md:text-left mb-4 md:mb-0">
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
//                     className="mr-4"
//                   >
//                     {perfectScore ? (
//                       <div className="relative">
//                         <Trophy className="w-16 h-16 text-yellow-300 drop-shadow-lg" />
//                         <motion.div
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             rotate: [0, 5, -5, 0],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                           className="absolute -top-1 -right-1"
//                         >
//                           <Sparkles className="w-8 h-8 text-yellow-200" />
//                         </motion.div>
//                       </div>
//                     ) : (
//                       <performance.icon className="w-16 h-16 opacity-90" />
//                     )}
//                   </motion.div>
//                   <div>
//                     <motion.h1
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="text-3xl font-bold mb-1 drop-shadow"
//                     >
//                       {performance.level}
//                     </motion.h1>
//                     <motion.p
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.5 }}
//                       className="text-white/90 text-lg"
//                     >
//                       {performance.message}
//                     </motion.p>
//                   </div>
//                 </div>
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.6, type: "spring" }}
//                   className="relative flex items-center justify-center w-28 h-28 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 shadow-inner"
//                 >
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.8 }}
//                     className="text-4xl font-extrabold"
//                   >
//                     {percentage}%
//                   </motion.div>
//                   <div className="absolute bottom-3 text-white/90 text-sm">
//                     {score}/{totalQuestions} correct
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* Stats Overview */}
//             <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 {
//                   icon: CheckCircle,
//                   value: correctAnswers,
//                   label: "Correct",
//                   color: "from-green-400 to-emerald-500",
//                   bgColor:
//                     "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
//                 },
//                 {
//                   icon: XCircle,
//                   value: wrongAnswers,
//                   label: "Wrong",
//                   color: "from-red-400 to-pink-500",
//                   bgColor:
//                     "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
//                 },
//                 {
//                   icon: HelpCircle,
//                   value: unattempted,
//                   label: "Skipped",
//                   color: "from-gray-400 to-slate-500",
//                   bgColor:
//                     "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800",
//                 },
//                 {
//                   icon: Clock,
//                   value: `${Math.floor(timeSpent / 60)}:${(timeSpent % 60)
//                     .toString()
//                     .padStart(2, "0")}`,
//                   label: "Time Taken",
//                   color: "from-purple-400 to-indigo-500",
//                   bgColor:
//                     "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
//                 },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 + index * 0.1 }}
//                   className={`bg-gradient-to-br ${
//                     stat.bgColor
//                   } rounded-xl p-4 border ${
//                     darkMode ? "border-gray-700/50" : "border-gray-200"
//                   } flex items-center space-x-3`}
//                 >
//                   <div
//                     className={`p-2 rounded-full bg-gradient-to-r ${stat.color} shadow-lg`}
//                   >
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {stat.value}
//                     </div>
//                     <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
//                       {stat.label}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Progress Visualization */}
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//               <h3 className="text-lg font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                 <Target className="w-5 h-5 mr-2 text-indigo-500" />
//                 Performance Overview
//               </h3>
//               <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${percentage}%` }}
//                   transition={{ duration: 1.5, ease: "easeOut" }}
//                   className={`h-full bg-gradient-to-r ${performance.color} relative`}
//                 >
//                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
//                 </motion.div>
//               </div>
//               <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
//                 <span>0%</span>
//                 <span className="font-semibold text-sm">
//                   Your Score: {percentage}%
//                 </span>
//                 <span>100%</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Detailed Stats Toggle */}
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             whileHover={{ scale: 1.01, y: -2 }}
//             whileTap={{ scale: 0.99 }}
//             onClick={() => setShowStats(!showStats)}
//             className={`w-full mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-between border ${
//               darkMode ? "border-gray-700" : "border-gray-200"
//             } hover:shadow-lg transition-all`}
//           >
//             <div className="flex items-center">
//               <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3">
//                 <BarChart2 className="w-5 h-5 text-white" />
//               </div>
//               <span className="font-bold text-gray-900 dark:text-white">
//                 View Detailed Analytics
//               </span>
//             </div>
//             <motion.div
//               animate={{ rotate: showStats ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ChevronDown className="w-5 h-5 text-gray-500" />
//             </motion.div>
//           </motion.button>

//           {/* Detailed Stats Panel */}
//           <AnimatePresence>
//             {showStats && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6 border ${
//                   darkMode ? "border-gray-700" : "border-gray-200"
//                 }`}
//               >
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
//                     <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
//                     Quiz Analytics
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Time Metrics */}
//                     <div
//                       className={`p-5 rounded-xl border ${
//                         darkMode ? "border-gray-700" : "border-gray-200"
//                       } bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20`}
//                     >
//                       <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                         <Clock className="w-5 h-5 mr-2 text-blue-600" />
//                         Time Analysis
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-700/50">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Total Time:
//                           </span>
//                           <span className="font-extrabold text-blue-700 dark:text-blue-400 text-lg">
//                             {Math.floor(timeSpent / 60)}:
//                             {(timeSpent % 60).toString().padStart(2, "0")}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Avg Time/Question:
//                           </span>
//                           <span className="font-extrabold text-blue-700 dark:text-blue-400 text-lg">
//                             {Math.round(timePerQuestion)}s
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Accuracy Metrics */}
//                     <div
//                       className={`p-5 rounded-xl border ${
//                         darkMode ? "border-gray-700" : "border-gray-200"
//                       } bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20`}
//                     >
//                       <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                         <Target className="w-5 h-5 mr-2 text-emerald-600" />
//                         Accuracy Stats
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex justify-between items-center pb-2 border-b border-emerald-200 dark:border-emerald-700/50">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Overall Accuracy:
//                           </span>
//                           <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-lg">
//                             {percentage}%
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Attempted Correctness:
//                           </span>
//                           <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-lg">
//                             {Math.round(
//                               (correctAnswers /
//                                 (correctAnswers + wrongAnswers || 1)) *
//                                 100
//                             )}
//                             %
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Additional Stats */}
//                     <div
//                       className={`p-5 rounded-xl border ${
//                         darkMode ? "border-gray-700" : "border-gray-200"
//                       } bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 col-span-1 md:col-span-2`}
//                     >
//                       <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                         <Zap className="w-5 h-5 mr-2 text-orange-600" />
//                         Quiz Metrics
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Total Attempts:
//                           </span>
//                           <span className="font-bold text-orange-700 dark:text-orange-400">
//                             {attempts}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Questions Asked:
//                           </span>
//                           <span className="font-bold text-orange-700 dark:text-orange-400">
//                             {totalQuestions}
//                           </span>
//                         </div>
//                         {/* You can add more metrics here, e.g., "Hardest Question" if you have data */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Question Review Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border ${
//               darkMode ? "border-gray-700" : "border-gray-200"
//             }`}
//           >
//             <button
//               onClick={() => setExpandedResults(!expandedResults)}
//               className={`w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
//                 !expandedResults ? "rounded-b-3xl" : ""
//               }`}
//             >
//               <div className="flex items-center">
//                 <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-3 shadow-lg">
//                   <BookOpen className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <span className="text-xl font-bold text-gray-900 dark:text-white">
//                     Question Review
//                   </span>
//                   <div className="flex items-center mt-1">
//                     <span className="text-sm px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full font-semibold">
//                       {filteredQuestionIndices.length} filtered questions
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <motion.div
//                 animate={{ rotate: expandedResults ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <ChevronDown className="w-6 h-6 text-gray-500" />
//               </motion.div>
//             </button>

//             <AnimatePresence>
//               {expandedResults && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//                     {/* Filter Buttons */}
//                     <div className="flex flex-wrap gap-3 mb-6">
//                       {[
//                         {
//                           key: "all",
//                           label: "All Questions",
//                           icon: PanelLeftOpen,
//                           color: "from-gray-500 to-slate-600",
//                         },
//                         {
//                           key: "correct",
//                           label: "Correct",
//                           icon: CheckCircle,
//                           color: "from-green-500 to-emerald-600",
//                         },
//                         {
//                           key: "incorrect",
//                           label: "Incorrect",
//                           icon: XCircle,
//                           color: "from-red-500 to-pink-600",
//                         },
//                         {
//                           key: "unattempted",
//                           label: "Skipped",
//                           icon: HelpCircle,
//                           color: "from-orange-500 to-amber-600",
//                         },
//                       ].map(({ key, label, icon: Icon, color }) => (
//                         <motion.button
//                           key={key}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setSelectedFilter(key)}
//                           className={`px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 transition-all shadow-sm ${
//                             selectedFilter === key
//                               ? `bg-gradient-to-r ${color} text-white`
//                               : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
//                           }`}
//                         >
//                           <Icon className="w-4 h-4" />
//                           <span>{label}</span>
//                         </motion.button>
//                       ))}
//                     </div>

//                     {/* Questions List */}
//                     <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//                       {filteredQuestionIndices.length > 0 ? (
//                         filteredQuestionIndices.map((questionIndex) => {
//                           const question = quizData.questions[questionIndex];
//                           const isCorrect = isAnswerCorrect(questionIndex);
//                           const wasAttempted =
//                             answers[questionIndex] !== undefined &&
//                             answers[questionIndex] !== null &&
//                             answers[questionIndex] !== "";

//                           return (
//                             <motion.div
//                               key={questionIndex}
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: questionIndex * 0.03 }}
//                               className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md
//                               ${
//                                 !wasAttempted
//                                   ? "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
//                                   : isCorrect
//                                   ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
//                                   : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
//                               }`}
//                               onClick={() => {
//                                 setCurrentQuestion(questionIndex);
//                                 setIsReviewing(true);
//                                 setShowResults(false);
//                               }}
//                             >
//                               <div className="flex justify-between items-start">
//                                 <div className="flex-1">
//                                   <div className="flex items-start mb-2">
//                                     <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
//                                       Q{questionIndex + 1}:
//                                     </span>
//                                     <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
//                                       {question.question_text}
//                                     </p>
//                                   </div>

//                                   {wasAttempted ? (
//                                     <div className="space-y-1 text-sm">
//                                       <div
//                                         className={`flex items-center ${
//                                           isCorrect
//                                             ? "text-green-700 dark:text-green-400"
//                                             : "text-red-700 dark:text-red-400"
//                                         }`}
//                                       >
//                                         {isCorrect ? (
//                                           <CheckCircle className="w-4 h-4 mr-2" />
//                                         ) : (
//                                           <XCircle className="w-4 h-4 mr-2" />
//                                         )}
//                                         <span>
//                                           Your answer:{" "}
//                                           <span className="font-semibold">
//                                             {answers[questionIndex]}
//                                           </span>
//                                         </span>
//                                       </div>
//                                       {!isCorrect && (
//                                         <div className="flex items-center text-green-700 dark:text-green-400">
//                                           <CheckCircle className="w-4 h-4 mr-2" />
//                                           <span>
//                                             Correct answer:{" "}
//                                             <span className="font-semibold">
//                                               {question.correct_answer}
//                                             </span>
//                                           </span>
//                                         </div>
//                                       )}
//                                     </div>
//                                   ) : (
//                                     <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
//                                       <HelpCircle className="w-4 h-4 mr-2" />
//                                       <span>Not attempted</span>
//                                     </div>
//                                   )}

//                                   {question.explanation && (
//                                     <motion.div
//                                       initial={{ opacity: 0, height: 0 }}
//                                       animate={{ opacity: 1, height: "auto" }}
//                                       transition={{ delay: 0.1 }}
//                                       className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
//                                     >
//                                       <strong className="flex items-center mb-1">
//                                         <Lightbulb className="w-4 h-4 mr-2 text-blue-500" />
//                                         Explanation:
//                                       </strong>
//                                       <p>{question.explanation}</p>
//                                     </motion.div>
//                                   )}
//                                 </div>
//                               </div>
//                             </motion.div>
//                           );
//                         })
//                       ) : (
//                         <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                           No questions match the current filter.
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Action Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
//           >
//             <motion.button
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 resetQuiz();
//                 setCurrentQuestion(0);
//                 setShowResults(false);
//               }}
//               className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all text-lg font-semibold"
//             >
//               <RefreshCw className="w-6 h-6" />
//               <span>Retake Quiz</span>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setShowShareModal(true)}
//               className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all text-lg font-semibold"
//             >
//               <Share2 className="w-6 h-6" />
//               <span>Share Results</span>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 resetQuiz();
//                 setShowResults(false);
//                 // Optionally navigate to a home page or dashboard
//               }}
//               className="p-4 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all text-lg font-semibold"
//             >
//               <Home className="w-6 h-6" />
//               <span>Back to Home</span>
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Share Modal */}
//       <ShareModal />
//     </div>
//   );
// };

// export default QuizResults;

// import { useState, useEffect, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Confetti from "react-confetti";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   BarChart2,
//   ChevronDown,
//   RefreshCw,
//   Home,
//   Share2,
//   BookOpen,
//   Trophy,
//   Award,
//   HelpCircle,
//   TrendingUp,
//   Sparkles,
//   Target,
//   PanelLeftOpen,
//   Clipboard,
//   Download,
//   Loader,
//   Lightbulb,
// } from "lucide-react";
// import { AppContext } from "../../context/AppContext";
// import { useParams, useNavigate } from "react-router-dom";

// const QuizResults = ({
//   resetQuiz,
//   setCurrentQuestion,
//   setShowResults,
//   setIsReviewing,
// }) => {
//   // State for UI controls
//   const [expandedResults, setExpandedResults] = useState(false);
//   const [showStats, setShowStats] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [confettiShown, setConfettiShown] = useState(false);

//   // State for data fetching
//   const [resultData, setResultData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   // Hooks for context and routing
//   const { backend_URL, darkMode } = useContext(AppContext);
//   const { quizId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResult = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `${backend_URL}/api/quiz/get-quiz-result/${quizId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch: ${response.status}`);
//         }

//         const rawData = await response.json();

//         // --- DATA TRANSFORMATION LOGIC ---
//         // This block maps your specific API response to the structure the component uses.
//         const latestScoreData = rawData.attempt.latestScore;
//         const totalQuestions = latestScoreData.totalQuestions;
//         const correctAnswers = latestScoreData.correct;

//         // Calculate unattempted questions by checking for null/undefined answers
//         let unattemptedCount = 0;
//         latestScoreData.questions.forEach((q) => {
//           if (q.selectedOption === null || q.selectedOption === undefined) {
//             unattemptedCount++;
//           }
//         });

//         // Calculate wrong answers
//         const wrongAnswers = totalQuestions - correctAnswers - unattemptedCount;

//         const formattedData = {
//           score: correctAnswers,
//           totalQuestions: totalQuestions,
//           percentage: latestScoreData.percentage,
//           correctAnswers: correctAnswers,
//           wrongAnswers: wrongAnswers,
//           unattempted: unattemptedCount,
//           timeSpent: latestScoreData.timeSpent,
//           attempts: rawData.attempt.totalAttempts,
//           questions: latestScoreData.questions.map((q) => ({
//             question_text: q.questionText,
//             user_answer: q.selectedOption,
//             correct_answer: q.correctOption,
//             is_correct: q.isCorrect,
//             explanation: q.explanation || null, // Gracefully handle optional explanation
//           })),
//         };
//         // --- END OF TRANSFORMATION ---

//         setResultData(formattedData);
//       } catch (error) {
//         console.error("Error fetching or processing quiz result:", error);
//         alert("Failed to process quiz result. Please try again later.");
//         setResultData(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResult();
//   }, [quizId, backend_URL]);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (resultData) {
//       const perfectOrExcellent = resultData.percentage >= 90;
//       if (perfectOrExcellent && !confettiShown) {
//         setConfettiShown(true);
//         const timer = setTimeout(() => setConfettiShown(false), 8000);
//         return () => clearTimeout(timer);
//       }
//     }
//   }, [resultData, confettiShown]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//         <div className="text-center">
//           <Loader className="w-12 h-12 mx-auto animate-spin text-indigo-500" />
//           <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
//             Finalizing your results...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!resultData) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//         <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//           <XCircle className="w-12 h-12 mx-auto text-red-500" />
//           <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
//             Could Not Load Results
//           </h2>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             There was an error fetching your quiz results.
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
//           >
//             Go Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Destructure data from the formatted state object
//   const {
//     score,
//     totalQuestions,
//     percentage,
//     correctAnswers,
//     wrongAnswers,
//     unattempted,
//     timeSpent,
//     attempts,
//     questions,
//   } = resultData;

//   const perfectScore = score === totalQuestions;
//   const excellentScore = percentage >= 90;
//   const goodScore = percentage >= 75;
//   const passingScore = percentage >= 60;

//   const getPerformanceLevel = () => {
//     if (perfectScore)
//       return {
//         level: "Perfect Score!",
//         color: "from-yellow-400 to-amber-500",
//         icon: Trophy,
//         message: "Flawless victory! You're a quiz master!",
//         emoji: "🏆",
//       };
//     if (excellentScore)
//       return {
//         level: "Excellent!",
//         color: "from-purple-500 to-indigo-600",
//         icon: Award,
//         message: "Outstanding performance! You're brilliant!",
//         emoji: "🌟",
//       };
//     if (goodScore)
//       return {
//         level: "Great Job!",
//         color: "from-emerald-500 to-teal-600",
//         icon: Award,
//         message: "Amazing work! You're doing fantastic!",
//         emoji: "🎯",
//       };
//     if (passingScore)
//       return {
//         level: "Well Done!",
//         color: "from-blue-500 to-cyan-600",
//         icon: CheckCircle,
//         message: "You passed! Keep up the momentum!",
//         emoji: "✅",
//       };
//     return {
//       level: "Keep Practicing!",
//       color: "from-orange-500 to-red-600",
//       icon: TrendingUp,
//       message: "Don't give up! Review and try again!",
//       emoji: "📚",
//     };
//   };

//   const performance = getPerformanceLevel();

//   const filteredQuestionIndices = questions
//     .map((_, i) => i)
//     .filter((index) => {
//       const question = questions[index];
//       const wasAttempted =
//         question.user_answer !== undefined && question.user_answer !== null;

//       if (selectedFilter === "correct") return question.is_correct;
//       if (selectedFilter === "incorrect")
//         return !question.is_correct && wasAttempted;
//       if (selectedFilter === "unattempted") return !wasAttempted;
//       return true; // "all" filter
//     });

//   const timePerQuestion = totalQuestions > 0 ? timeSpent / totalQuestions : 0;

//   const ShareModal = () => (
//     <AnimatePresence>
//       {showShareModal && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
//             onClick={() => setShowShareModal(false)}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 50 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 50 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md z-50 shadow-xl border border-gray-200 dark:border-gray-700"
//           >
//             <div className="text-center mb-6">
//               <div className="text-5xl mb-3">{performance.emoji}</div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Share Your Results
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 You scored {percentage}% - {performance.level}
//               </p>
//             </div>
//             <div className="space-y-3">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
//                 onClick={() => {
//                   navigator.clipboard.writeText(
//                     `I scored ${percentage}% on the quiz! ${performance.emoji} Check it out!`
//                   );
//                   alert("Results copied to clipboard!");
//                   setShowShareModal(false);
//                 }}
//               >
//                 <Clipboard size={18} />
//                 <span className="font-medium">Copy Result Text</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full p-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
//               >
//                 <Download size={18} />
//                 <span className="font-medium">Download Results Image</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
//               >
//                 <Share2 size={18} />
//                 <span className="font-medium">Share to Social Media</span>
//               </motion.button>
//             </div>
//             <button
//               onClick={() => setShowShareModal(false)}
//               className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               Close
//             </button>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div
//       className={`min-h-screen w-full bg-gray-100 dark:bg-gray-900 font-sans`}
//     >
//       {/* Confetti for perfect/excellent scores */}
//       {confettiShown && (perfectScore || excellentScore) && (
//         <Confetti
//           width={windowSize.width}
//           height={windowSize.height}
//           recycle={false}
//           numberOfPieces={500}
//         />
//       )}

//       <div className="flex justify-center items-center py-10 md:px-4 min-h-screen">
//         <div className="max-w-4xl w-full mx-auto">
//           {/* Header */}

//           {/* <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
//               Quiz Results
//             </h1>
//             <button
//               onClick={() => {
//                 resetQuiz();
//                 setShowResults(false);
//               }}
//               className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all shadow-md"
//             >
//               <Home size={18} />
//               <span>Exit Quiz</span>
//             </button>
//           </div> */}

//           {/* Main Results Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8 border ${
//               darkMode ? "border-gray-700" : "border-gray-200"
//             }`}
//           >
//             {/* Performance Header */}
//             <div
//               className={`p-8 bg-gradient-to-r ${performance.color} text-white relative overflow-hidden`}
//             >
//               <div className="absolute inset-0 bg-black/10"></div>
//               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
//                 <div className="flex items-center text-center md:text-left mb-4 md:mb-0">
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
//                     className="mr-4"
//                   >
//                     {perfectScore ? (
//                       <div className="relative">
//                         <Trophy className="w-16 h-16 text-yellow-300 drop-shadow-lg" />
//                         <motion.div
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             rotate: [0, 5, -5, 0],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                           className="absolute -top-1 -right-1"
//                         >
//                           <Sparkles className="w-8 h-8 text-yellow-200" />
//                         </motion.div>
//                       </div>
//                     ) : (
//                       <performance.icon className="w-16 h-16 opacity-90" />
//                     )}
//                   </motion.div>
//                   <div>
//                     <motion.h1
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="text-3xl font-bold mb-1 drop-shadow"
//                     >
//                       {performance.level}
//                     </motion.h1>
//                     <motion.p
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.5 }}
//                       className="text-white/90 text-lg"
//                     >
//                       {performance.message}
//                     </motion.p>
//                   </div>
//                 </div>
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.6, type: "spring" }}
//                   className="relative flex items-center justify-center w-28 h-28 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 shadow-inner"
//                 >
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.8 }}
//                     className="text-4xl font-extrabold"
//                   >
//                     {percentage}%
//                   </motion.div>
//                   <div className="absolute bottom-3 text-white/90 text-sm">
//                     {score}/{totalQuestions} correct
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* Stats Overview */}
            // <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            //   {[
            //     {
            //       icon: CheckCircle,
            //       value: correctAnswers,
            //       label: "Correct",
            //       color: "from-green-400 to-emerald-500",
            //       bgColor:
            //         "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
            //     },
            //     {
            //       icon: XCircle,
            //       value: wrongAnswers,
            //       label: "Wrong",
            //       color: "from-red-400 to-pink-500",
            //       bgColor:
            //         "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
            //     },
            //     {
            //       icon: HelpCircle,
            //       value: unattempted,
            //       label: "Skipped",
            //       color: "from-gray-400 to-slate-500",
            //       bgColor:
            //         "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800",
            //     },
            //     {
            //       icon: Clock,
            //       value: `${Math.floor(timeSpent / 60)}:${(timeSpent % 60)
            //         .toString()
            //         .padStart(2, "0")}`,
            //       label: "Time Taken",
            //       color: "from-purple-400 to-indigo-500",
            //       bgColor:
            //         "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
            //     },
            //   ].map((stat, index) => (
            //     <motion.div
            //       key={index}
            //       initial={{ opacity: 0, y: 20 }}
            //       animate={{ opacity: 1, y: 0 }}
            //       transition={{ delay: 0.2 + index * 0.1 }}
            //       className={`bg-gradient-to-br ${
            //         stat.bgColor
            //       } rounded-xl p-4 border ${
            //         darkMode ? "border-gray-700/50" : "border-gray-200"
            //       } flex items-center space-x-3`}
            //     >
            //       <div
            //         className={`p-2 rounded-full bg-gradient-to-r ${stat.color} shadow-lg`}
            //       >
            //         <stat.icon className="w-6 h-6 text-white" />
            //       </div>
            //       <div>
            //         <div className="text-2xl font-bold text-gray-900 dark:text-white">
            //           {stat.value}
            //         </div>
            //         <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            //           {stat.label}
            //         </div>
            //       </div>
            //     </motion.div>
            //   ))}
            // </div>

//             {/* Progress Visualization */}
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//               <h3 className="text-lg font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                 <Target className="w-5 h-5 mr-2 text-indigo-500" />
//                 Performance Overview
//               </h3>
//               <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${percentage}%` }}
//                   transition={{ duration: 1.5, ease: "easeOut" }}
//                   className={`h-full bg-gradient-to-r ${performance.color} relative`}
//                 >
//                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
//                 </motion.div>
//               </div>
//               <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
//                 <span>0%</span>
//                 <span className="font-semibold text-sm">
//                   Your Score: {percentage}%
//                 </span>
//                 <span>100%</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Detailed Stats Toggle */}
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             whileHover={{ scale: 1.01, y: -2 }}
//             whileTap={{ scale: 0.99 }}
//             onClick={() => setShowStats(!showStats)}
//             className={`w-full mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-between border ${
//               darkMode ? "border-gray-700" : "border-gray-200"
//             } hover:shadow-lg transition-all`}
//           >
//             <div className="flex items-center">
//               <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3">
//                 <BarChart2 className="w-5 h-5 text-white" />
//               </div>
//               <span className="font-bold text-gray-900 dark:text-white">
//                 View Detailed Analytics
//               </span>
//             </div>
//             <motion.div
//               animate={{ rotate: showStats ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ChevronDown className="w-5 h-5 text-gray-500" />
//             </motion.div>
//           </motion.button>

//           {/* Detailed Stats Panel */}
//           <AnimatePresence>
//             {showStats && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6 border ${
//                   darkMode ? "border-gray-700" : "border-gray-200"
//                 }`}
//               >
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
//                     <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
//                     Quiz Analytics
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Time Metrics */}
//                     <div
//                       className={`p-5 rounded-xl border ${
//                         darkMode ? "border-gray-700" : "border-gray-200"
//                       } bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20`}
//                     >
//                       <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                         <Clock className="w-5 h-5 mr-2 text-blue-600" />
//                         Time Analysis
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-700/50">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Total Time:
//                           </span>
//                           <span className="font-extrabold text-blue-700 dark:text-blue-400 text-lg">
//                             {Math.floor(timeSpent / 60)}:
//                             {(timeSpent % 60).toString().padStart(2, "0")}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Avg Time/Question:
//                           </span>
//                           <span className="font-extrabold text-blue-700 dark:text-blue-400 text-lg">
//                             {Math.round(timePerQuestion)}s
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Accuracy Metrics */}
//                     <div
//                       className={`p-5 rounded-xl border ${
//                         darkMode ? "border-gray-700" : "border-gray-200"
//                       } bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20`}
//                     >
//                       <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                         <Target className="w-5 h-5 mr-2 text-emerald-600" />
//                         Accuracy Stats
//                       </h4>
//                       <div className="space-y-3">
//                         <div className="flex justify-between items-center pb-2 border-b border-emerald-200 dark:border-emerald-700/50">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Overall Accuracy:
//                           </span>
//                           <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-lg">
//                             {percentage}%
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Attempted Correctness:
//                           </span>
//                           <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-lg">
//                             {Math.round(
//                               (correctAnswers /
//                                 (correctAnswers + wrongAnswers || 1)) *
//                                 100
//                             )}
//                             %
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Additional Stats */}
//                     <div
//                       className={`p-5 rounded-xl border ${
//                         darkMode ? "border-gray-700" : "border-gray-200"
//                       } bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 col-span-1 md:col-span-2`}
//                     >
//                       <h4 className="font-bold mb-3 flex items-center text-gray-900 dark:text-white">
//                         <RefreshCw className="w-5 h-5 mr-2 text-orange-600" />
//                         Quiz Metrics
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Total Attempts:
//                           </span>
//                           <span className="font-bold text-orange-700 dark:text-orange-400">
//                             {attempts}
//                           </span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             Questions Asked:
//                           </span>
//                           <span className="font-bold text-orange-700 dark:text-orange-400">
//                             {totalQuestions}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Question Review Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border ${
//               darkMode ? "border-gray-700" : "border-gray-200"
//             }`}
//           >
//             <button
//               onClick={() => setExpandedResults(!expandedResults)}
//               className={`w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
//                 !expandedResults ? "rounded-b-3xl" : ""
//               }`}
//             >
//               <div className="flex items-center">
//                 <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-3 shadow-lg">
//                   <BookOpen className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <span className="text-xl font-bold text-gray-900 dark:text-white">
//                     Question Review
//                   </span>
//                   <div className="flex items-center mt-1">
//                     <span className="text-sm px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full font-semibold">
//                       {filteredQuestionIndices.length} filtered questions
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <motion.div
//                 animate={{ rotate: expandedResults ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <ChevronDown className="w-6 h-6 text-gray-500" />
//               </motion.div>
//             </button>

//             <AnimatePresence>
//               {expandedResults && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//                     {/* Filter Buttons */}
//                     <div className="flex flex-wrap gap-3 mb-6">
//                       {[
//                         {
//                           key: "all",
//                           label: "All Questions",
//                           icon: PanelLeftOpen,
//                           color: "from-gray-500 to-slate-600",
//                         },
//                         {
//                           key: "correct",
//                           label: "Correct",
//                           icon: CheckCircle,
//                           color: "from-green-500 to-emerald-600",
//                         },
//                         {
//                           key: "incorrect",
//                           label: "Incorrect",
//                           icon: XCircle,
//                           color: "from-red-500 to-pink-600",
//                         },
//                         {
//                           key: "unattempted",
//                           label: "Skipped",
//                           icon: HelpCircle,
//                           color: "from-orange-500 to-amber-600",
//                         },
//                       ].map(({ key, label, icon: Icon, color }) => (
//                         <motion.button
//                           key={key}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setSelectedFilter(key)}
//                           className={`px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 transition-all shadow-sm ${
//                             selectedFilter === key
//                               ? `bg-gradient-to-r ${color} text-white`
//                               : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
//                           }`}
//                         >
//                           <Icon className="w-4 h-4" />
//                           <span>{label}</span>
//                         </motion.button>
//                       ))}
//                     </div>

//                     {/* Questions List */}
//                     <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//                       {filteredQuestionIndices.length > 0 ? (
//                         filteredQuestionIndices.map((questionIndex, idx) => {
//                           const question = questions[questionIndex];
//                           const wasAttempted =
//                             question.user_answer !== undefined &&
//                             question.user_answer !== null;

//                           return (
//                             <motion.div
//                               key={questionIndex}
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: idx * 0.03 }}
//                               className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md
//                                 ${
//                                   !wasAttempted
//                                     ? "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
//                                     : question.is_correct
//                                     ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
//                                     : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
//                                 }`}
//                               onClick={() => {
//                                 setCurrentQuestion(questionIndex);
//                                 setIsReviewing(true);
//                                 setShowResults(false);
//                               }}
//                             >
//                               <div className="flex justify-between items-start">
//                                 <div className="flex-1">
//                                   <div className="flex items-start mb-2">
//                                     <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
//                                       Q{questionIndex + 1}:
//                                     </span>
//                                     <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
//                                       {question.question_text}
//                                     </p>
//                                   </div>

//                                   {wasAttempted ? (
//                                     <div className="space-y-1 text-sm">
//                                       <div
//                                         className={`flex items-center ${
//                                           question.is_correct
//                                             ? "text-green-700 dark:text-green-400"
//                                             : "text-red-700 dark:text-red-400"
//                                         }`}
//                                       >
//                                         {question.is_correct ? (
//                                           <CheckCircle className="w-4 h-4 mr-2" />
//                                         ) : (
//                                           <XCircle className="w-4 h-4 mr-2" />
//                                         )}
//                                         <span>
//                                           Your answer:{" "}
//                                           <span className="font-semibold">
//                                             {question.user_answer}
//                                           </span>
//                                         </span>
//                                       </div>
//                                       {!question.is_correct && (
//                                         <div className="flex items-center text-green-700 dark:text-green-400">
//                                           <CheckCircle className="w-4 h-4 mr-2" />
//                                           <span>
//                                             Correct answer:{" "}
//                                             <span className="font-semibold">
//                                               {question.correct_answer}
//                                             </span>
//                                           </span>
//                                         </div>
//                                       )}
//                                     </div>
//                                   ) : (
//                                     <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
//                                       <HelpCircle className="w-4 h-4 mr-2" />
//                                       <span>Not attempted</span>
//                                     </div>
//                                   )}

//                                   {question.explanation && (
//                                     <motion.div
//                                       initial={{ opacity: 0, height: 0 }}
//                                       animate={{ opacity: 1, height: "auto" }}
//                                       transition={{ delay: 0.1 }}
//                                       className="mt-3 p-3 bg-gray-100 dark:bg-gray-700/70 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
//                                     >
//                                       <strong className="flex items-center mb-1">
//                                         <Lightbulb className="w-4 h-4 mr-2 text-blue-500" />
//                                         Explanation:
//                                       </strong>
//                                       <p>{question.explanation}</p>
//                                     </motion.div>
//                                   )}
//                                 </div>
//                               </div>
//                             </motion.div>
//                           );
//                         })
//                       ) : (
//                         <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                           No questions match the current filter.
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Action Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
//           >
//             <motion.button
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 resetQuiz();
//                 setCurrentQuestion(0);
//                 setShowResults(false);
//               }}
//               className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all text-lg font-semibold"
//             >
//               <RefreshCw className="w-6 h-6" />
//               <span>Retake Quiz</span>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setShowShareModal(true)}
//               className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all text-lg font-semibold"
//             >
//               <Share2 className="w-6 h-6" />
//               <span>Share Results</span>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 resetQuiz();
//                 setShowResults(false);
//                 navigate("/"); // Navigate to home or dashboard
//               }}
//               className="p-4 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all text-lg font-semibold"
//             >
//               <Home className="w-6 h-6" />
//               <span>Back to Home</span>
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Share Modal */}
//       <ShareModal />
//     </div>
//   );
// };

// export default QuizResults;

import { useState, useEffect, useContext } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Confetti from "react-confetti";
import {
  CheckCircle,
  XCircle,
  Clock,
  Hash,
  RefreshCw,
  Home,
  Share2,
  Award,
  Trophy,
  TrendingUp,
  Star,
  Download,
  ChevronDown,
  Target,
} from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/learnexa-logo.png";


// --- Animated Score Component ---
const AnimatedScore = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      delay: 0.5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

// --- Main Results Component ---
const QuizResults = () => {
  // The data fetching logic remains the same
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confettiShown, setConfettiShown] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { backend_URL } = useContext(AppContext);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // This entire data fetching and transformation logic remains unchanged.
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${backend_URL}/api/quiz/get-quiz-result/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.status}`);
        const rawData = await response.json();

        const latestScoreData = rawData.attempt.latestScore;
        const totalQuestions = latestScoreData.totalQuestions;
        const correctAnswers = latestScoreData.correct;
        let unattemptedCount = 0;
        latestScoreData.questions.forEach((q) => {
          if (q.selectedOption === null || q.selectedOption === undefined)
            unattemptedCount++;
        });
        const wrongAnswers = totalQuestions - correctAnswers - unattemptedCount;

        const formattedData = {
          userName: rawData.attempt.user.name,
          quizName: rawData.quiz,
          score: correctAnswers,
          totalQuestions,
          percentage: latestScoreData.percentage,
          correctAnswers,
          wrongAnswers,
          unattempted: unattemptedCount,
          timeSpent: latestScoreData.timeSpent,
          attempts: rawData.attempt.totalAttempts,
          questions: latestScoreData.questions.map((q) => ({
            question_text: q.questionText,
            user_answer: q.selectedOption,
            correct_answer: q.correctOption,
            is_correct: q.isCorrect,
            explanation: q.explanation || null,
          })),
        };
        setResultData(formattedData);

        if (formattedData.percentage >= 90) {
          setConfettiShown(true);
          const timer = setTimeout(() => setConfettiShown(false), 6000);
          return () => clearTimeout(timer);
        }
        if (formattedData.percentage >= 60) {
          setShowCertificate(true);
        }
      } catch (error) {
        console.error("Error processing quiz result:", error);
        setResultData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [quizId, backend_URL]);

  // Loading and Error states remain the same.
  // ...

  // Helper function to get performance details
  const getPerformanceLevel = (percentage) => {
    if (percentage === 100)
      return {
        level: "Perfect Score!",
        textColor: "text-amber-500",
        icon: Trophy,
        message: "Absolutely flawless. A true master!",
      };
    if (percentage >= 90)
      return {
        level: "Excellent!",
        textColor: "text-teal-500",
        icon: Award,
        message: "Outstanding performance. You're brilliant!",
      };
    if (percentage >= 75)
      return {
        level: "Great Job!",
        textColor: "text-sky-500",
        icon: Star,
        message: "Amazing work. You're doing fantastic!",
      };
    if (percentage >= 60)
      return {
        level: "Well Done!",
        textColor: "text-indigo-500",
        icon: CheckCircle,
        message: "You passed! Keep up the momentum!",
      };
    return {
      level: "Keep Practicing",
      textColor: "text-red-500",
      icon: TrendingUp,
      message: "Every mistake is a chance to learn. Review and try again.",
    };
  };

  // Guard clauses for loading and error states...
  if (isLoading || !resultData) {
    // Return your existing loading/error component
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;
  }

  const performance = getPerformanceLevel(resultData.percentage);

  // --- NEW MINIMALIST JSX RETURN ---
  return (
    <>
      {confettiShown && <Confetti recycle={false} numberOfPieces={400} />}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        resultData={resultData}
        performance={performance}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 flex items-center justify-center transition-colors duration-300">
        <main className="w-full max-w-3xl mx-auto space-y-8">
          {/* Hero Section */}
          <motion.section
            className="text-center relative"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <div
              className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 ${performance.textColor}/10 dark:${performance.textColor}/5 rounded-full blur-3xl -z-0`}
            ></div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center justify-center gap-3"
            >
              <performance.icon
                className={`w-8 h-8 ${performance.textColor}`}
              />
              <h1
                className={`text-2xl md:text-4xl font-bold ${performance.textColor}`}
              >
                {performance.level}
              </h1>
            </motion.div>

            <motion.p
              className="text-7xl md:text-9xl font-bold my-4 text-gray-900 dark:text-white"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <AnimatedScore value={resultData.percentage} />%
            </motion.p>

            <motion.p
              className="text-sm sm:text-lg md:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {performance.message}
            </motion.p>
          </motion.section>

          {/* Stats Section */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-3 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                icon: CheckCircle,
                value: resultData.correctAnswers,
                label: "Correct",
                color: "from-green-400 to-emerald-500",
                bgColor:
                  "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
              },
              {
                icon: XCircle,
                value: resultData.wrongAnswers,
                label: "Wrong",
                color: "from-red-400 to-pink-500",
                bgColor:
                  "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
              },
              {
                icon: Target,
                value: `#${resultData.attempts}`,
                label: "Attempt",
                color: "from-gray-400 to-slate-500",
                bgColor:
                  "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800",
              },
              {
                icon: Clock,
                value: `${Math.floor(resultData.timeSpent / 60)}:${(
                  resultData.timeSpent % 60
                )
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
                className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-2 md:p-4 border 
                    dark:border-gray-700/50 border-gray-200"
                   flex flex-col items-center space-x-3`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={` rounded-full bg-gradient-to-r ${stat.color} `}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Review Accordion Section */}
          <div className="text-center">
            <motion.button
              onClick={() => setIsReviewOpen(!isReviewOpen)}
              className="px-8 text-sm md:text-base cursor-pointer py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isReviewOpen ? "Hide" : "Review Your Answers"}
              <motion.div animate={{ rotate: isReviewOpen ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {isReviewOpen && (
              <motion.section
                key="review-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-3 overflow-hidden"
              >
                {resultData.questions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          q.is_correct ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          Q{index + 1}: {q.question_text}
                        </p>
                        <p
                          className={`text-sm mt-2 font-medium ${
                            q.is_correct
                              ? "text-gray-600 dark:text-gray-400"
                              : "text-red-500"
                          }`}
                        >
                          Your answer:{" "}
                          <span className="font-semibold">
                            {q.user_answer || "Not Answered"}
                          </span>
                        </p>
                        {!q.is_correct && (
                          <p className="text-sm mt-1 font-medium text-green-600 dark:text-green-500">
                            Correct answer:{" "}
                            <span className="font-semibold">
                              {q.correct_answer}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>

          {/* Footer Actions */}
          <motion.footer
            className="flex items-center flex-wrap justify-center gap-4 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => {
                navigate(`/quiz/${quizId}`);
                setShowCertificate(false);
              }}
              className="flex items-center cursor-pointer gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
            >
              <RefreshCw size={16} /> Retake
            </button>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center gap-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
            >
              <Share2 size={16} /> Certificate
            </button>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center cursor-pointer gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
            >
              <Home size={16} /> Dashboard
            </button>
          </motion.footer>
        </main>
      </div>
    </>
  );
};

// Redesigned Certificate Modal
const CertificateModal = ({ isOpen, onClose, resultData, performance }) => {
  if (!isOpen) return null;
  const issueDate = new Date().toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

   return (
     <AnimatePresence>
       <div
         className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
         onClick={onClose}
       >
         <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.9, opacity: 0 }}
           transition={{ duration: 0.3, ease: "easeOut" }}
           // REMOVED: h-[50vh] md:h-auto. Height is now determined by content.
           className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl shadow-2xl relative overflow-hidden"
           onClick={(e) => e.stopPropagation()}
         >
           <div
             className={`h-2 w-full bg-gradient-to-r ${
               performance.textColor === "text-amber-500"
                 ? "from-amber-400 to-amber-600"
                 : "from-teal-400 to-teal-600"
             }`}
           ></div>
           {/* UPDATED: Padding is now responsive */}
           <div className="p-4 sm:p-6 md:p-8 text-center">
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.2, type: "spring" }}
               className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
             >
               <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
                 {/* Ensure the logo prop is passed to the component */}
                 {logo && (
                   <img
                     src={logo}
                     alt="Learnexa"
                     className="w-full h-full object-contain"
                   />
                 )}
               </div>
             </motion.div>
             {/* UPDATED: Font size is now responsive */}
             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-4">
               Certificate of Completion
             </h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
               This is to certify that
             </p>
             {/* UPDATED: Font size is now responsive */}
             <p className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white my-3 sm:my-4">
               {resultData.userName}
             </p>
             <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
               has successfully completed the quiz
             </p>
             {/* UPDATED: Font size is now responsive */}
             <p className="font-semibold text-base sm:text-lg text-gray-700 dark:text-gray-100 mt-1">
               {resultData.quizName}
             </p>
             {/* UPDATED: Margin is now responsive */}
             <div className="my-4 md:my-6 py-2 px-4 inline-block bg-gray-100 dark:bg-gray-700 rounded-full">
               <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                 SCORE:{" "}
               </span>
               <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                 {resultData.percentage}%
               </span>
             </div>
             <p className="text-xs text-gray-400 dark:text-gray-500">
               Issued on: {issueDate}
             </p>
           </div>
           <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
             <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-semibold">
               <Download size={16} /> Download
             </button>
           </div>
         </motion.div>
       </div>
     </AnimatePresence>
   );
};

export default QuizResults;