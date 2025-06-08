// // import { motion } from "framer-motion";
// // import { Sun, Moon, Trophy, BookOpen, Clock, Hash, Zap } from "lucide-react";
// // import { ThemeToggle } from "../ThemeTogler";

// // const QuizStartScreen = ({
// //   quizData,
// //   setQuizStarted,
// // }) => {
// //   return (
// //     <div
// //       className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden`}
// //     >
// //       {/* Animated background gradient */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-gradient-shift" />

// //       {/* Floating shapes */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         {[...Array(6)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
// //             animate={{
// //               x: [
// //                 Math.random() * window.innerWidth,
// //                 Math.random() * window.innerWidth,
// //               ],
// //               y: [
// //                 Math.random() * window.innerHeight,
// //                 Math.random() * window.innerHeight,
// //               ],
// //               scale: [1, 1.2, 1],
// //               rotate: [0, 360],
// //             }}
// //             transition={{
// //               duration: Math.random() * 10 + 10,
// //               repeat: Infinity,
// //               ease: "linear",
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Theme Toggle */}
// // <ThemeToggle/>

// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         className={`dark:bg-gray-800/90 border dark:border-gray-700 bg-white/90 shadow-2xl rounded-3xl p-8 max-w-lg w-full backdrop-blur-sm transition-colors duration-300`}
// //       >
// //         <motion.div
// //           className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg transform rotate-45"
// //           animate={{ rotate: 405 }}
// //           transition={{ duration: 1, delay: 0.2 }}
// //         >
// //           <motion.div
// //             animate={{ rotate: -45 }}
// //             transition={{ duration: 1, delay: 0.2 }}
// //           >
// //             <Trophy className="w-12 h-12 text-white" />
// //           </motion.div>
// //         </motion.div>

// //         <motion.h1
// //           className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.3 }}
// //         >
// //           {quizData.quiz_title}
// //         </motion.h1>

// //         <motion.div
// //           className="flex flex-wrap justify-center gap-3 mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.4 }}
// //         >
// //           <span className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm">
// //             {quizData.questions.length} Questions
// //           </span>
// //           <span className="px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 rounded-full text-sm font-medium backdrop-blur-sm">
// //             {quizData.quiz_timer} Minutes
// //           </span>
// //           <span className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded-full text-sm font-medium capitalize backdrop-blur-sm">
// //             {quizData.difficultyLevel}
// //           </span>
// //         </motion.div>

// //         <motion.div
// //           className="grid grid-cols-1 gap-4 mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.5 }}
// //         >
// //           {[
// //             { icon: BookOpen, label: "Topic", value: quizData.topic },
// //             {
// //               icon: Clock,
// //               label: "Time Limit",
// //               value: `${quizData.quiz_timer} minutes`,
// //             },
// //             { icon: Hash, label: "Level", value: quizData.difficultyLevel },
// //           ].map((item, index) => (
// //             <motion.div
// //               key={index}
// //               whileHover={{ scale: 1.02 }}
// //               className={`dark:bg-gray-700/50 bg-gray-100/50 p-4 rounded-xl flex items-center space-x-3 backdrop-blur-sm`}
// //             >
// //               <item.icon className="w-5 h-5 text-blue-500" />
// //               <span className="text-gray-700 dark:text-gray-300">
// //                 {item.label}:{" "}
// //                 <span className="font-medium capitalize">{item.value}</span>
// //               </span>
// //             </motion.div>
// //           ))}
// //         </motion.div>

// //         <motion.button
// //           whileHover={{ scale: 1.02 }}
// //           whileTap={{ scale: 0.98 }}
// //           onClick={() => setQuizStarted(true)}
// //           className="relative w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-medium shadow-lg overflow-hidden group"
// //         >
// //           <span className="relative z-10 flex items-center justify-center gap-2">
// //             <Zap className="w-5 h-5" />
// //             Start Quiz
// //           </span>
// //           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
// //         </motion.button>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default QuizStartScreen;
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Sun,
//   Moon,
//   Trophy,
//   BookOpen,
//   Clock,
//   Hash,
//   Zap,
//   Play,
//   Users,
//   Book,
//   Timer,
//   Award,
// } from "lucide-react";

// const QuizStartScreen = ({
//   quizData = {
//     quiz_title: "JavaScript Fundamentals Quiz",
//     questions: Array(15).fill(),
//     quiz_timer: 30,
//     difficultyLevel: "intermediate",
//     topic: "JavaScript",
//   },
//   setQuizStarted = () => {},
// }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6 flex items-center justify-center">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
//       </div>

//       <div className="relative w-full max-w-md mx-auto space-y-6">
//         {/* Header with Quiz Icon */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-8"
//         >
//           <div className="w-16 h-16 bg-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
//             <BookOpen className="w-8 h-8 text-white" />
//           </div>
//           <div className="text-orange-300 text-sm font-medium">
//             {quizData.questions.length} questions
//           </div>
//         </motion.div>

//         {/* Quiz Title Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
//         >
//           <h1 className="text-2xl font-bold text-white text-center mb-4">
//             {quizData.quiz_title}
//           </h1>

//           {/* Quiz Stats */}
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="text-center">
//               <div className="w-10 h-10 bg-blue-500/20 rounded-xl mx-auto mb-2 flex items-center justify-center">
//                 <Hash className="w-5 h-5 text-blue-400" />
//               </div>
//               <div className="text-xs text-gray-300 uppercase tracking-wider">
//                 Questions
//               </div>
//               <div className="text-sm font-semibold text-white">
//                 {quizData.questions.length}
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="w-10 h-10 bg-green-500/20 rounded-xl mx-auto mb-2 flex items-center justify-center">
//                 <Timer className="w-5 h-5 text-green-400" />
//               </div>
//               <div className="text-xs text-gray-300 uppercase tracking-wider">
//                 Minutes
//               </div>
//               <div className="text-sm font-semibold text-white">
//                 {quizData.quiz_timer}
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="w-10 h-10 bg-purple-500/20 rounded-xl mx-auto mb-2 flex items-center justify-center">
//                 <Award className="w-5 h-5 text-purple-400" />
//               </div>
//               <div className="text-xs text-gray-300 uppercase tracking-wider">
//                 Level
//               </div>
//               <div className="text-sm font-semibold text-white capitalize">
//                 {quizData.difficultyLevel}
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Start Button */}
//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => setQuizStarted(true)}
//           className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
//         >
//           <Play className="w-5 h-5 fill-current" />
//           Start Quiz
//         </motion.button>

//         {/* Additional Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="space-y-3"
//         >
//           <button className="w-full bg-indigo-600/30 hover:bg-indigo-600/40 backdrop-blur-md text-white py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-indigo-500/30">
//             <Users className="w-4 h-4" />
//             Challenge Friends
//           </button>

//           <button className="w-full bg-purple-600/30 hover:bg-purple-600/40 backdrop-blur-md text-white py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-purple-500/30">
//             <Book className="w-4 h-4" />
//             Study Mode
//           </button>
//         </motion.div>

//         {/* Settings Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10"
//         >
//           <h3 className="text-white font-medium mb-3 text-sm">
//             Quick Settings
//           </h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Timer className="w-4 h-4 text-green-400" />
//                 <span className="text-sm text-gray-300">Timer</span>
//               </div>
//               <div className="w-10 h-6 bg-green-500 rounded-full relative">
//                 <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Zap className="w-4 h-4 text-orange-400" />
//                 <span className="text-sm text-gray-300">Power-ups</span>
//               </div>
//               <div className="w-10 h-6 bg-orange-500 rounded-full relative">
//                 <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Topic Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//           className="text-center"
//         >
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
//             <BookOpen className="w-4 h-4 text-blue-400" />
//             <span className="text-sm text-white font-medium">
//               {quizData.topic}
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizStartScreen;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sun,
//   Moon,
//   Trophy,
//   BookOpen,
//   Clock,
//   Hash,
//   Zap,
//   Play,
//   Users,
//   Book,
//   Timer,
//   Award,
//   Settings,
//   Share2,
//   Star,
//   Target,
//   Brain,
//   Lightbulb,
//   ChevronRight,
//   Volume2,
//   VolumeX,
//   RotateCcw,
//   Medal,
//   Flame,
//   Crown,
//   Gift,
//   Sparkles,
//   Music,
//   Headphones,
// } from "lucide-react";

// const QuizStartScreen = ({
//   quizData = {
//     quiz_title: "Advanced JavaScript Mastery",
//     questions: Array(20).fill(),
//     quiz_timer: 45,
//     difficultyLevel: "expert",
//     topic: "JavaScript",
//     category: "Programming",
//     totalPoints: 2000,
//     passingScore: 70,
//     attempts: 3,
//     bestScore: 85,
//   },
//   setQuizStarted = () => {},
// }) => {
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [selectedTheme, setSelectedTheme] = useState("cosmic");
//   const [showSettings, setShowSettings] = useState(false);
//   const [level, setLevel] = useState(12);

//   // Floating particles animation
//   const particles = Array.from({ length: 12 }, (_, i) => i);

//   const themes = [
//     {
//       id: "cosmic",
//       name: "Cosmic",
//       colors: "from-purple-900 via-blue-900 to-indigo-900",
//     },
//     {
//       id: "sunset",
//       name: "Sunset",
//       colors: "from-orange-900 via-red-900 to-pink-900",
//     },
//     {
//       id: "forest",
//       name: "Forest",
//       colors: "from-emerald-900 via-green-900 to-teal-900",
//     },
//     {
//       id: "ocean",
//       name: "Ocean",
//       colors: "from-blue-900 via-cyan-900 to-teal-900",
//     },
//   ];

//   const currentTheme = themes.find((t) => t.id === selectedTheme);

//   const difficultyColors = {
//     beginner: "text-green-400 bg-green-500/20",
//     intermediate: "text-yellow-400 bg-yellow-500/20",
//     advanced: "text-orange-400 bg-orange-500/20",
//     expert: "text-red-400 bg-red-500/20",
//   };

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden`}
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         {/* Gradient Orbs */}
//         <motion.div
//           className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{ duration: 8, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.6, 0.3, 0.6],
//           }}
//           transition={{ duration: 10, repeat: Infinity }}
//         />

//         {/* Floating Particles */}
//         {particles.map((i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-white/20 rounded-full"
//             animate={{
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: Math.random() * 5 + 3,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen max-w-md mx-auto">
//         {/* Header with User Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full mb-6"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                   <BookOpen className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-bold text-white">{level}</span>
//                 </div>
//               </div>
//               <div>
//                 <div className="text-white font-semibold">
//                   Level {level} Master
//                 </div>
//                 <div className="text-gray-300 text-sm">Quiz Champion</div>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
//             >
//               <Settings className="w-5 h-5 text-white" />
//             </button>
//           </div>
//         </motion.div>

//         {/* Settings Panel */}
//         <AnimatePresence>
//           {showSettings && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="w-full bg-black/30 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-white/10"
//             >
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     {soundEnabled ? (
//                       <Volume2 className="w-4 h-4 text-blue-400" />
//                     ) : (
//                       <VolumeX className="w-4 h-4 text-gray-400" />
//                     )}
//                     <span className="text-sm text-white">Sound Effects</span>
//                   </div>
//                   <button
//                     onClick={() => setSoundEnabled(!soundEnabled)}
//                     className={`w-12 h-6 rounded-full relative transition-all ${
//                       soundEnabled ? "bg-blue-500" : "bg-gray-600"
//                     }`}
//                   >
//                     <div
//                       className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
//                         soundEnabled ? "right-0.5" : "left-0.5"
//                       }`}
//                     />
//                   </button>
//                 </div>

//                 <div>
//                   <span className="text-sm text-white mb-2 block">Theme</span>
//                   <div className="grid grid-cols-4 gap-2">
//                     {themes.map((theme) => (
//                       <button
//                         key={theme.id}
//                         onClick={() => setSelectedTheme(theme.id)}
//                         className={`h-8 rounded-lg bg-gradient-to-r ${
//                           theme.colors
//                         } border-2 transition-all ${
//                           selectedTheme === theme.id
//                             ? "border-white"
//                             : "border-transparent"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Quiz Header Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20 relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

//           <div className="relative">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                   <Brain className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-orange-300 text-sm font-medium">
//                   {quizData.category}
//                 </span>
//               </div>
//               <div
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   difficultyColors[quizData.difficultyLevel]
//                 }`}
//               >
//                 {quizData.difficultyLevel.toUpperCase()}
//               </div>
//             </div>

//             <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
//               {quizData.quiz_title}
//             </h1>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="bg-white/5 rounded-2xl p-3 text-center">
//                 <Hash className="w-5 h-5 text-blue-400 mx-auto mb-1" />
//                 <div className="text-xs text-gray-300">Questions</div>
//                 <div className="text-lg font-bold text-white">
//                   {quizData.questions.length}
//                 </div>
//               </div>
//               <div className="bg-white/5 rounded-2xl p-3 text-center">
//                 <Timer className="w-5 h-5 text-green-400 mx-auto mb-1" />
//                 <div className="text-xs text-gray-300">Duration</div>
//                 <div className="text-lg font-bold text-white">
//                   {quizData.quiz_timer}m
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-1">
//                   <Target className="w-4 h-4 text-purple-400" />
//                   <span className="text-gray-300">
//                     Pass: {quizData.passingScore}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Medal className="w-4 h-4 text-yellow-400" />
//                   <span className="text-gray-300">
//                     Best: {quizData.bestScore}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="w-full space-y-4"
//         >
//           {/* Primary Start Button */}
//           <motion.button
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setQuizStarted(true)}
//             className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 relative overflow-hidden group"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             <div className="relative flex items-center justify-center gap-3">
//               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                 <Play className="w-4 h-4 fill-current ml-0.5" />
//               </div>
//               Start Quiz Adventure
//               <Sparkles className="w-5 h-5" />
//             </div>
//           </motion.button>

//           {/* Secondary Buttons Grid */}
//           <div className="grid grid-cols-2 gap-3">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-indigo-600/30 hover:bg-indigo-600/50 backdrop-blur-md text-white py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-indigo-500/30"
//             >
//               <Users className="w-4 h-4" />
//               Challenge
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-purple-600/30 hover:bg-purple-600/50 backdrop-blur-md text-white py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-purple-500/30"
//             >
//               <Book className="w-4 h-4" />
//               Practice
//             </motion.button>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full bg-gradient-to-r from-pink-600/30 to-rose-600/30 hover:from-pink-600/50 hover:to-rose-600/50 backdrop-blur-md text-white py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-pink-500/30"
//           >
//             <Gift className="w-4 h-4" />
//             Study with Flashcards
//             <ChevronRight className="w-4 h-4" />
//           </motion.button>
//         </motion.div>

//         {/* Bottom Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="w-full mt-6 flex items-center justify-between"
//         >
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="text-sm text-gray-300">
//                 {quizData.totalPoints} pts
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <RotateCcw className="w-4 h-4 text-blue-400" />
//               <span className="text-sm text-gray-300">
//                 {quizData.attempts} attempts left
//               </span>
//             </div>
//           </div>

//           <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all">
//             <Share2 className="w-3 h-3 text-white" />
//             <span className="text-xs text-white">Share</span>
//           </button>
//         </motion.div>

//         {/* Topic Badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="mt-4"
//         >
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/30">
//             <Lightbulb className="w-4 h-4 text-blue-400" />
//             <span className="text-sm text-white font-medium">
//               {quizData.topic}
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizStartScreen;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sun,
//   Moon,
//   Trophy,
//   BookOpen,
//   Clock,
//   Hash,
//   Zap,
//   Play,
//   Users,
//   Book,
//   Timer,
//   Award,
//   Settings,
//   Share2,
//   Star,
//   Target,
//   Brain,
//   Lightbulb,
//   ChevronRight,
//   Volume2,
//   VolumeX,
//   RotateCcw,
//   Medal,
//   Flame,
//   Crown,
//   Gift,
//   Sparkles,
//   Music,
//   Headphones,
// } from "lucide-react";

// const QuizStartScreen = ({
//   quizData = {
//     quiz_title: "Advanced JavaScript Mastery",
//     questions: Array(20).fill(),
//     quiz_timer: 45,
//     difficultyLevel: "expert",
//     topic: "JavaScript",
//     category: "Programming",
//     totalPoints: 2000,
//     passingScore: 70,
//     attempts: 3,
//     bestScore: 85,
//   },
//   setQuizStarted = () => {},
// }) => {
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [selectedTheme, setSelectedTheme] = useState("cosmic");
//   const [showSettings, setShowSettings] = useState(false);
//   const [level, setLevel] = useState(12);

//   // Floating particles animation
//   const particles = Array.from({ length: 12 }, (_, i) => i);

//   const themes = [
//     {
//       id: "cosmic",
//       name: "Cosmic",
//       colors: "from-purple-900 via-blue-900 to-indigo-900",
//     },
//     {
//       id: "sunset",
//       name: "Sunset",
//       colors: "from-orange-900 via-red-900 to-pink-900",
//     },
//     {
//       id: "forest",
//       name: "Forest",
//       colors: "from-emerald-900 via-green-900 to-teal-900",
//     },
//     {
//       id: "ocean",
//       name: "Ocean",
//       colors: "from-blue-900 via-cyan-900 to-teal-900",
//     },
//   ];

//   const currentTheme = themes.find((t) => t.id === selectedTheme);

//   const difficultyColors = {
//     beginner: "text-green-400 bg-green-500/20",
//     intermediate: "text-yellow-400 bg-yellow-500/20",
//     advanced: "text-orange-400 bg-orange-500/20",
//     expert: "text-red-400 bg-red-500/20",
//   };

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden`}
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         {/* Gradient Orbs - Responsive positioning */}
//         <motion.div
//           className="absolute top-10 left-4 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{ duration: 8, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.6, 0.3, 0.6],
//           }}
//           transition={{ duration: 10, repeat: Infinity }}
//         />

//         {/* Floating Particles - Reduced for mobile */}
//         {particles.slice(0, window.innerWidth < 768 ? 6 : 12).map((i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full"
//             animate={{
//               x: [0, Math.random() * 50 - 25],
//               y: [0, Math.random() * 50 - 25],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: Math.random() * 5 + 3,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
//         {/* Header with User Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full mb-4 sm:mb-6"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="relative">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                   <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-bold text-white">{level}</span>
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm sm:text-base text-white font-semibold">
//                   Level {level} Master
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-300">
//                   Quiz Champion
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
//             >
//               <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </button>
//           </div>
//         </motion.div>

//         {/* Settings Panel */}
//         <AnimatePresence>
//           {showSettings && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="w-full bg-black/30 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-white/10"
//             >
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     {soundEnabled ? (
//                       <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
//                     ) : (
//                       <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
//                     )}
//                     <span className="text-xs sm:text-sm text-white">
//                       Sound Effects
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => setSoundEnabled(!soundEnabled)}
//                     className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full relative transition-all ${
//                       soundEnabled ? "bg-blue-500" : "bg-gray-600"
//                     }`}
//                   >
//                     <div
//                       className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full absolute top-0.5 transition-all ${
//                         soundEnabled ? "right-0.5" : "left-0.5"
//                       }`}
//                     />
//                   </button>
//                 </div>

//                 <div>
//                   <span className="text-xs sm:text-sm text-white mb-2 block">
//                     Theme
//                   </span>
//                   <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
//                     {themes.map((theme) => (
//                       <button
//                         key={theme.id}
//                         onClick={() => setSelectedTheme(theme.id)}
//                         className={`h-6 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-r ${
//                           theme.colors
//                         } border-2 transition-all ${
//                           selectedTheme === theme.id
//                             ? "border-white"
//                             : "border-transparent"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Quiz Header Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="w-full bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/20 relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8 sm:-translate-y-16 sm:translate-x-16" />

//           <div className="relative">
//             <div className="flex items-center justify-between mb-3 sm:mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-md sm:rounded-lg flex items-center justify-center">
//                   <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                 </div>
//                 <span className="text-orange-300 text-xs sm:text-sm font-medium">
//                   {quizData.category}
//                 </span>
//               </div>
//               <div
//                 className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
//                   difficultyColors[quizData.difficultyLevel]
//                 }`}
//               >
//                 {quizData.difficultyLevel.toUpperCase()}
//               </div>
//             </div>

//             <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
//               {quizData.quiz_title}
//             </h1>

//             <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
//               <div className="bg-white/5 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
//                 <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mx-auto mb-1" />
//                 <div className="text-xs text-gray-300">Questions</div>
//                 <div className="text-base sm:text-lg font-bold text-white">
//                   {quizData.questions.length}
//                 </div>
//               </div>
//               <div className="bg-white/5 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
//                 <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto mb-1" />
//                 <div className="text-xs text-gray-300">Duration</div>
//                 <div className="text-base sm:text-lg font-bold text-white">
//                   {quizData.quiz_timer}m
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-xs sm:text-sm">
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <div className="flex items-center gap-1">
//                   <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
//                   <span className="text-gray-300">
//                     Pass: {quizData.passingScore}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
//                   <span className="text-gray-300">
//                     Best: {quizData.bestScore}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="w-full space-y-3 sm:space-y-4"
//         >
//           {/* Primary Start Button */}
//           <motion.button
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setQuizStarted(true)}
//             className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-2xl transition-all duration-300 relative overflow-hidden group"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             <div className="relative flex items-center justify-center gap-2 sm:gap-3">
//               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
//                 <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5" />
//               </div>
//               <span className="hidden sm:inline">Start Quiz Adventure</span>
//               <span className="sm:hidden">Start Quiz</span>
//               <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
//             </div>
//           </motion.button>

//           {/* Secondary Buttons Grid */}
//           <div className="grid grid-cols-2 gap-2 sm:gap-3">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-indigo-600/30 hover:bg-indigo-600/50 backdrop-blur-md text-white py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 border border-indigo-500/30"
//             >
//               <Users className="w-3 h-3 sm:w-4 sm:h-4" />
//               <span className="hidden sm:inline">Challenge</span>
//               <span className="sm:hidden">Battle</span>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-purple-600/30 hover:bg-purple-600/50 backdrop-blur-md text-white py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 border border-purple-500/30"
//             >
//               <Book className="w-3 h-3 sm:w-4 sm:h-4" />
//               Practice
//             </motion.button>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full bg-gradient-to-r from-pink-600/30 to-rose-600/30 hover:from-pink-600/50 hover:to-rose-600/50 backdrop-blur-md text-white py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 border border-pink-500/30"
//           >
//             <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
//             <span className="hidden sm:inline">Study with Flashcards</span>
//             <span className="sm:hidden">Flashcards</span>
//             <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
//           </motion.button>
//         </motion.div>

//         {/* Bottom Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="w-full mt-4 sm:mt-6 flex items-center justify-between"
//         >
//           <div className="flex items-center gap-2 sm:gap-4">
//             <div className="flex items-center gap-1 sm:gap-2">
//               <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
//               <span className="text-xs sm:text-sm text-gray-300">
//                 {quizData.totalPoints} pts
//               </span>
//             </div>
//             <div className="flex items-center gap-1 sm:gap-2">
//               <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
//               <span className="text-xs sm:text-sm text-gray-300 hidden sm:inline">
//                 {quizData.attempts} attempts left
//               </span>
//               <span className="text-xs sm:text-sm text-gray-300 sm:hidden">
//                 {quizData.attempts} left
//               </span>
//             </div>
//           </div>

//           <button className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all">
//             <Share2 className="w-3 h-3 text-white" />
//             <span className="text-xs text-white">Share</span>
//           </button>
//         </motion.div>

//         {/* Topic Badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="mt-3 sm:mt-4"
//         >
//           <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-400/30">
//             <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
//             <span className="text-xs sm:text-sm text-white font-medium">
//               {quizData.topic}
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizStartScreen;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import {
//   Brain,
//   BookOpen,
//   Timer,
//   Medal,
//   Play,
//   Users,
//   Book,
//   Gift,
//   ChevronRight,
//   Share2,
//   Star,
//   RotateCcw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Lightbulb,
//   Zap,
//   Trophy,
//   Sparkles,
//   Target,
//   Crown,
//   Flame,
// } from "lucide-react";

// const QuizStartScreen = ({
//   quizData = {
//     quiz_title: "Advanced JavaScript Mastery",
//     questions: Array(20).fill(),
//     quiz_timer: 45,
//     difficultyLevel: "expert",
//     topic: "JavaScript",
//     category: "Programming",
//     totalPoints: 2000,
//     passingScore: 70,
//     attempts: 3,
//     bestScore: 85,
//   },
//   setQuizStarted = () => {},
// }) => {
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [selectedTheme, setSelectedTheme] = useState("cyber");
//   const [showSettings, setShowSettings] = useState(false);
//   const [level, setLevel] = useState(12);
//   const [isHoveringStart, setIsHoveringStart] = useState(false);
//   const controls = useAnimation();

//   const themes = [
//     {
//       id: "neon",
//       name: "Neon Dreams",
//       colors: "from-indigo-900 via-purple-900 to-fuchsia-900",
//       accent: "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
//     },
//     {
//       id: "cyber",
//       name: "Cyber Punk",
//       colors: "from-gray-900 via-blue-900 to-indigo-900",
//       accent: "bg-gradient-to-r from-green-400 to-blue-500",
//     },
//     {
//       id: "sunset",
//       name: "Electric Sunset",
//       colors: "from-orange-900 via-rose-900 to-fuchsia-900",
//       accent: "bg-gradient-to-r from-yellow-400 to-red-500",
//     },
//     {
//       id: "ocean",
//       name: "Deep Ocean",
//       colors: "from-blue-900 via-indigo-900 to-violet-900",
//       accent: "bg-gradient-to-r from-teal-400 to-blue-500",
//     },
//   ];

//   const currentTheme = themes.find((t) => t.id === selectedTheme);

//   const difficultyColors = {
//     beginner: "text-green-400 bg-green-900/50",
//     intermediate: "text-yellow-400 bg-yellow-900/50",
//     advanced: "text-orange-400 bg-orange-900/50",
//     expert: "text-red-400 bg-red-900/50",
//   };

//   // Floating particles animation
//   const particles = Array.from({ length: 16 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 1,
//     duration: Math.random() * 8 + 5,
//     delay: Math.random() * 3,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//   }));

//   // Interactive background effect
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;
//       const x = clientX / window.innerWidth;
//       const y = clientY / window.innerHeight;
      
//       controls.start({
//         x: (x - 0.5) * 20,
//         y: (y - 0.5) * 20,
//         transition: { type: "spring", damping: 10 }
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [controls]);

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden text-white`}
//     >
//       {/* Interactive Parallax Background */}
//       <motion.div
//         className="absolute inset-0"
//         animate={controls}
//       >
//         {/* Animated grid lines */}
//         <div className="absolute inset-0 opacity-10">
//           {Array.from({ length: 20 }).map((_, i) => (
//             <motion.div
//               key={`line-${i}`}
//               className="absolute top-0 bottom-0 w-px bg-white"
//               style={{ left: `${i * 5}%` }}
//               animate={{
//                 opacity: [0.3, 0.7, 0.3],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 3,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </div>

//         {/* Floating particles */}
//         {particles.map((particle) => (
//           <motion.div
//             key={particle.id}
//             className="absolute rounded-full bg-white/20 backdrop-blur-sm"
//             style={{
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//             }}
//             animate={{
//               x: [0, Math.random() * 60 - 30],
//               y: [0, Math.random() * 60 - 30],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//             }}
//           />
//         ))}

//         {/* Animated gradient orbs */}
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{ duration: 10, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.4, 0.7, 0.4],
//           }}
//           transition={{ duration: 8, repeat: Infinity, delay: 2 }}
//         />
//       </motion.div>

//       <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen w-full max-w-md lg:max-w-xl mx-auto">
//         {/* Header with User Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="w-full mb-6 flex items-center justify-between"
//         >
//           <div className="flex items-center gap-3">
//             <motion.div
//               className="relative"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <Brain className="w-6 h-6 text-white" />
//               </div>
//               <motion.div
//                 className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center shadow-md"
//                 animate={{
//                   scale: [1, 1.1, 1],
//                   boxShadow: ["0 0 0 0 rgba(34, 211, 238, 0.7)", "0 0 0 6px rgba(34, 211, 238, 0)", "0 0 0 0 rgba(34, 211, 238, 0)"]
//                 }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <span className="text-xs font-bold text-gray-900">{level}</span>
//               </motion.div>
//             </motion.div>
//             <div>
//               <div className="text-sm font-semibold text-white">
//                 Level {level} Scholar
//               </div>
//               <div className="text-xs text-gray-300/80">
//                 {quizData.category} Expert
//               </div>
//             </div>
//           </div>
          
//           <motion.button
//             onClick={() => setShowSettings(!showSettings)}
//             className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
//             whileHover={{ rotate: 15 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <Settings className="w-5 h-5 text-white" />
//           </motion.button>
//         </motion.div>

//         {/* Settings Panel */}
//         <AnimatePresence>
//           {showSettings && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="w-full bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 mb-6 border border-white/10 overflow-hidden"
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     {soundEnabled ? (
//                       <Volume2 className="w-4 h-4 text-cyan-400" />
//                     ) : (
//                       <VolumeX className="w-4 h-4 text-gray-400" />
//                     )}
//                     <span className="text-sm text-white">Sound Effects</span>
//                   </div>
//                   <motion.button
//                     onClick={() => setSoundEnabled(!soundEnabled)}
//                     className={`w-12 h-6 rounded-full relative transition-all ${
//                       soundEnabled ? "bg-cyan-500" : "bg-gray-600"
//                     }`}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
//                         soundEnabled ? "right-0.5" : "left-0.5"
//                       }`}
//                       layout
//                     />
//                   </motion.button>
//                 </div>

//                 <div>
//                   <span className="text-sm text-white mb-2 block">
//                     Theme
//                   </span>
//                   <div className="grid grid-cols-4 gap-2">
//                     {themes.map((theme) => (
//                       <motion.button
//                         key={theme.id}
//                         onClick={() => setSelectedTheme(theme.id)}
//                         className={`h-8 rounded-lg ${theme.accent} border-2 transition-all ${
//                           selectedTheme === theme.id
//                             ? "border-white scale-105"
//                             : "border-transparent"
//                         }`}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Quiz Header Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10 relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

//           <div className="relative">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
//                   <Zap className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-orange-300 text-sm font-medium">
//                   {quizData.category}
//                 </span>
//               </div>
//               <motion.div
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   difficultyColors[quizData.difficultyLevel]
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {quizData.difficultyLevel.toUpperCase()}
//               </motion.div>
//             </div>

//             <motion.h1
//               className="text-2xl font-bold text-white mb-4 leading-tight"
//               whileHover={{ x: 2 }}
//             >
//               {quizData.quiz_title}
//             </motion.h1>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <motion.div
//                 className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
//                 whileHover={{ y: -2 }}
//               >
//                 <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                   <Target className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="text-xs text-gray-300">Questions</div>
//                 <div className="text-lg font-bold text-white">
//                   {quizData.questions.length}
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
//                 whileHover={{ y: -2 }}
//               >
//                 <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <Timer className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="text-xs text-gray-300">Duration</div>
//                 <div className="text-lg font-bold text-white">
//                   {quizData.quiz_timer}m
//                 </div>
//               </motion.div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <Trophy className="w-4 h-4 text-purple-400" />
//                   <span className="text-gray-300">
//                     Pass: {quizData.passingScore}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Crown className="w-4 h-4 text-yellow-400" />
//                   <span className="text-gray-300">
//                     Best: {quizData.bestScore}%
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Flame className="w-4 h-4 text-orange-400" />
//                 <span className="text-gray-300">
//                   {quizData.totalPoints} XP
//                 </span>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="w-full space-y-4"
//         >
//           {/* Primary Start Button */}
//           <motion.button
//             onClick={() => setQuizStarted(true)}
//             className={`w-full ${currentTheme.accent} text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all relative overflow-hidden group`}
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             onHoverStart={() => setIsHoveringStart(true)}
//             onHoverEnd={() => setIsHoveringStart(false)}
//           >
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
//               animate={{
//                 x: isHoveringStart ? "100%" : "-100%",
//                 opacity: isHoveringStart ? 0.2 : 0,
//               }}
//               transition={{ duration: 0.6 }}
//             />
//             <div className="relative flex items-center justify-center gap-3">
//               <motion.div
//                 className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
//                 animate={{
//                   scale: isHoveringStart ? [1, 1.2, 1] : 1,
//                 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Play className="w-4 h-4 fill-current ml-0.5" />
//               </motion.div>
//               <span>Start Quiz Challenge</span>
//               <motion.div
//                 animate={{
//                   rotate: isHoveringStart ? [0, 20, -20, 0] : 0,
//                 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Sparkles className="w-5 h-5" />
//               </motion.div>
//             </div>
//           </motion.button>

//           {/* Secondary Buttons Grid */}
//           <div className="grid grid-cols-2 gap-3">
//             <motion.button
//               className="bg-indigo-600/40 hover:bg-indigo-600/60 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-indigo-500/30"
//               whileHover={{ y: -1, scale: 1.01 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Users className="w-4 h-4" />
//               <span>Challenge</span>
//             </motion.button>

//             <motion.button
//               className="bg-purple-600/40 hover:bg-purple-600/60 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-purple-500/30"
//               whileHover={{ y: -1, scale: 1.01 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Book className="w-4 h-4" />
//               <span>Practice</span>
//             </motion.button>
//           </div>

//           <motion.button
//             className="w-full bg-gradient-to-r from-pink-600/40 to-rose-600/40 hover:from-pink-600/60 hover:to-rose-600/60 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-pink-500/30"
//             whileHover={{ y: -1 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <Gift className="w-4 h-4" />
//             <span>Study with Flashcards</span>
//             <ChevronRight className="w-4 h-4" />
//           </motion.button>
//         </motion.div>

//         {/* Bottom Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="w-full mt-6 flex items-center justify-between"
//         >
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="text-sm text-gray-300">
//                 {quizData.totalPoints} XP
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <RotateCcw className="w-4 h-4 text-cyan-400" />
//               <span className="text-sm text-gray-300">
//                 {quizData.attempts} attempts left
//               </span>
//             </div>
//           </div>

//           <motion.button
//             className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Share2 className="w-4 h-4 text-white" />
//             <span className="text-xs text-white">Share</span>
//           </motion.button>
//         </motion.div>

//         {/* Topic Badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-4"
//         >
//           <motion.div
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/30"
//             whileHover={{ scale: 1.05 }}
//           >
//             <Lightbulb className="w-4 h-4 text-blue-400" />
//             <span className="text-sm text-white font-medium">
//               {quizData.topic}
//             </span>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizStartScreen;
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import {
//   Brain,
//   BookOpen,
//   Timer,
//   Medal,
//   Play,
//   Users,
//   Book,
//   Gift,
//   ChevronRight,
//   Share2,
//   Star,
//   RotateCcw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Lightbulb,
//   Zap,
//   Trophy,
//   Sparkles,
//   Target,
//   Crown,
//   Flame,
// } from "lucide-react";

// const QuizStartScreen = ({
//   quizData = {
//     quiz_title: "Beginner Permutation Concepts Quiz",
//     questions: [],
//     quiz_timer: 10,
//     difficultyLevel: "beginner",
//     topic: "Permutation",
//     grade: "placements",
//     question_type: "mixed",
//   },
//   setQuizStarted = () => {},
// }) => {
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [selectedTheme, setSelectedTheme] = useState("cyber");
//   const [showSettings, setShowSettings] = useState(false);
//   const [level, setLevel] = useState(5); // Adjusted level for beginner quiz
//   const [isHoveringStart, setIsHoveringStart] = useState(false);
//   const controls = useAnimation();

//   const themes = [
//     {
//       id: "neon",
//       name: "Neon Dreams",
//       colors: "from-indigo-900 via-purple-900 to-fuchsia-900",
//       accent: "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
//     },
//     {
//       id: "cyber",
//       name: "Cyber Punk",
//       colors: "from-gray-900 via-blue-900 to-indigo-900",
//       accent: "bg-gradient-to-r from-green-400 to-blue-500",
//     },
//     {
//       id: "sunset",
//       name: "Electric Sunset",
//       colors: "from-orange-900 via-rose-900 to-fuchsia-900",
//       accent: "bg-gradient-to-r from-yellow-400 to-red-500",
//     },
//     {
//       id: "ocean",
//       name: "Deep Ocean",
//       colors: "from-blue-900 via-indigo-900 to-violet-900",
//       accent: "bg-gradient-to-r from-teal-400 to-blue-500",
//     },
//   ];

//   const currentTheme = themes.find((t) => t.id === selectedTheme);

//   const difficultyColors = {
//     beginner: "text-green-400 bg-green-900/50",
//     intermediate: "text-yellow-400 bg-yellow-900/50",
//     advanced: "text-orange-400 bg-orange-900/50",
//     expert: "text-red-400 bg-red-900/50",
//   };

//   // Calculate derived values based on quiz data
//   const totalQuestions = quizData.questions?.length || 0;
//   const totalPoints = totalQuestions * 100; // 100 points per question
//   const passingScore = 70; // Default passing score
//   const attempts = 3; // Default attempts
//   const bestScore = 0; // Default best score

//   // Floating particles animation
//   const particles = Array.from({ length: 16 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 1,
//     duration: Math.random() * 8 + 5,
//     delay: Math.random() * 3,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//   }));

//   // Interactive background effect
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;
//       const x = clientX / window.innerWidth;
//       const y = clientY / window.innerHeight;

//       controls.start({
//         x: (x - 0.5) * 20,
//         y: (y - 0.5) * 20,
//         transition: { type: "spring", damping: 10 },
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [controls]);

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden text-white`}
//     >
//       {/* Interactive Parallax Background */}
//       <motion.div className="absolute inset-0" animate={controls}>
//         {/* Animated grid lines */}
//         <div className="absolute inset-0 opacity-10">
//           {Array.from({ length: 20 }).map((_, i) => (
//             <motion.div
//               key={`line-${i}`}
//               className="absolute top-0 bottom-0 w-px bg-white"
//               style={{ left: `${i * 5}%` }}
//               animate={{
//                 opacity: [0.3, 0.7, 0.3],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 3,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </div>

//         {/* Floating particles */}
//         {particles.map((particle) => (
//           <motion.div
//             key={particle.id}
//             className="absolute rounded-full bg-white/20 backdrop-blur-sm"
//             style={{
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//             }}
//             animate={{
//               x: [0, Math.random() * 60 - 30],
//               y: [0, Math.random() * 60 - 30],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//             }}
//           />
//         ))}

//         {/* Animated gradient orbs */}
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{ duration: 10, repeat: Infinity }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.4, 0.7, 0.4],
//           }}
//           transition={{ duration: 8, repeat: Infinity, delay: 2 }}
//         />
//       </motion.div>

//       <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen w-full max-w-md lg:max-w-xl mx-auto">
//         {/* Header with User Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="w-full mb-6 flex items-center justify-between"
//         >
//           <div className="flex items-center gap-3">
//             <motion.div
//               className="relative"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <Brain className="w-6 h-6 text-white" />
//               </div>
//               <motion.div
//                 className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center shadow-md"
//                 animate={{
//                   scale: [1, 1.1, 1],
//                   boxShadow: [
//                     "0 0 0 0 rgba(34, 211, 238, 0.7)",
//                     "0 0 0 6px rgba(34, 211, 238, 0)",
//                     "0 0 0 0 rgba(34, 211, 238, 0)",
//                   ],
//                 }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <span className="text-xs font-bold text-gray-900">{level}</span>
//               </motion.div>
//             </motion.div>
//             <div>
//               <div className="text-sm font-semibold text-white">
//                 Level {level} Scholar
//               </div>
//               <div className="text-xs text-gray-300/80">
//                 {quizData.grade} Level
//               </div>
//             </div>
//           </div>

//           <motion.button
//             onClick={() => setShowSettings(!showSettings)}
//             className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
//             whileHover={{ rotate: 15 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <Settings className="w-5 h-5 text-white" />
//           </motion.button>
//         </motion.div>

//         {/* Settings Panel */}
//         <AnimatePresence>
//           {showSettings && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="w-full bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 mb-6 border border-white/10 overflow-hidden"
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     {soundEnabled ? (
//                       <Volume2 className="w-4 h-4 text-cyan-400" />
//                     ) : (
//                       <VolumeX className="w-4 h-4 text-gray-400" />
//                     )}
//                     <span className="text-sm text-white">Sound Effects</span>
//                   </div>
//                   <motion.button
//                     onClick={() => setSoundEnabled(!soundEnabled)}
//                     className={`w-12 h-6 rounded-full relative transition-all ${
//                       soundEnabled ? "bg-cyan-500" : "bg-gray-600"
//                     }`}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
//                         soundEnabled ? "right-0.5" : "left-0.5"
//                       }`}
//                       layout
//                     />
//                   </motion.button>
//                 </div>

//                 <div>
//                   <span className="text-sm text-white mb-2 block">Theme</span>
//                   <div className="grid grid-cols-4 gap-2">
//                     {themes.map((theme) => (
//                       <motion.button
//                         key={theme.id}
//                         onClick={() => setSelectedTheme(theme.id)}
//                         className={`h-8 rounded-lg ${
//                           theme.accent
//                         } border-2 transition-all ${
//                           selectedTheme === theme.id
//                             ? "border-white scale-105"
//                             : "border-transparent"
//                         }`}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Quiz Header Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10 relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

//           <div className="relative">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
//                   <Zap className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-orange-300 text-sm font-medium">
//                   {quizData.question_type} Questions
//                 </span>
//               </div>
//               <motion.div
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   difficultyColors[quizData.difficultyLevel]
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {quizData.difficultyLevel.toUpperCase()}
//               </motion.div>
//             </div>

//             <motion.h1
//               className="text-2xl font-bold text-white mb-4 leading-tight"
//               whileHover={{ x: 2 }}
//             >
//               {quizData.quiz_title}
//             </motion.h1>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <motion.div
//                 className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
//                 whileHover={{ y: -2 }}
//               >
//                 <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                   <Target className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="text-xs text-gray-300">Questions</div>
//                 <div className="text-lg font-bold text-white">
//                   {totalQuestions}
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
//                 whileHover={{ y: -2 }}
//               >
//                 <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <Timer className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="text-xs text-gray-300">Duration</div>
//                 <div className="text-lg font-bold text-white">
//                   {quizData.quiz_timer}m
//                 </div>
//               </motion.div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <Trophy className="w-4 h-4 text-purple-400" />
//                   <span className="text-gray-300">Pass: {passingScore}%</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Crown className="w-4 h-4 text-yellow-400" />
//                   <span className="text-gray-300">Best: {bestScore}%</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Flame className="w-4 h-4 text-orange-400" />
//                 <span className="text-gray-300">{totalPoints} XP</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="w-full space-y-4"
//         >
//           {/* Primary Start Button */}
//           <motion.button
//             onClick={() => setQuizStarted(true)}
//             className={`w-full ${currentTheme.accent} text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all relative overflow-hidden group`}
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             onHoverStart={() => setIsHoveringStart(true)}
//             onHoverEnd={() => setIsHoveringStart(false)}
//           >
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
//               animate={{
//                 x: isHoveringStart ? "100%" : "-100%",
//                 opacity: isHoveringStart ? 0.2 : 0,
//               }}
//               transition={{ duration: 0.6 }}
//             />
//             <div className="relative flex items-center justify-center gap-3">
//               <motion.div
//                 className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
//                 animate={{
//                   scale: isHoveringStart ? [1, 1.2, 1] : 1,
//                 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Play className="w-4 h-4 fill-current ml-0.5" />
//               </motion.div>
//               <span>Start Quiz Challenge</span>
//               <motion.div
//                 animate={{
//                   rotate: isHoveringStart ? [0, 20, -20, 0] : 0,
//                 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Sparkles className="w-5 h-5" />
//               </motion.div>
//             </div>
//           </motion.button>

//           {/* Secondary Buttons Grid */}
//           <div className="grid grid-cols-2 gap-3">
//             <motion.button
//               className="bg-indigo-600/40 hover:bg-indigo-600/60 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-indigo-500/30"
//               whileHover={{ y: -1, scale: 1.01 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Users className="w-4 h-4" />
//               <span>Challenge</span>
//             </motion.button>

//             <motion.button
//               className="bg-purple-600/40 hover:bg-purple-600/60 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-purple-500/30"
//               whileHover={{ y: -1, scale: 1.01 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Book className="w-4 h-4" />
//               <span>Practice</span>
//             </motion.button>
//           </div>

//           <motion.button
//             className="w-full bg-gradient-to-r from-pink-600/40 to-rose-600/40 hover:from-pink-600/60 hover:to-rose-600/60 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-pink-500/30"
//             whileHover={{ y: -1 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <Gift className="w-4 h-4" />
//             <span>Study with Flashcards</span>
//             <ChevronRight className="w-4 h-4" />
//           </motion.button>
//         </motion.div>

//         {/* Bottom Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="w-full mt-6 flex items-center justify-between"
//         >
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="text-sm text-gray-300">{totalPoints} XP</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <RotateCcw className="w-4 h-4 text-cyan-400" />
//               <span className="text-sm text-gray-300">
//                 {attempts} attempts left
//               </span>
//             </div>
//           </div>

//           <motion.button
//             className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Share2 className="w-4 h-4 text-white" />
//             <span className="text-xs text-white">Share</span>
//           </motion.button>
//         </motion.div>

//         {/* Topic Badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-4"
//         >
//           <motion.div
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/30"
//             whileHover={{ scale: 1.05 }}
//           >
//             <Lightbulb className="w-4 h-4 text-blue-400" />
//             <span className="text-sm text-white font-medium">
//               {quizData.topic}
//             </span>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizStartScreen;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Brain,
  BookOpen,
  Timer,
  Medal,
  Play,
  Users,
  Book,
  Gift,
  ChevronRight,
  Share2,
  Star,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Lightbulb,
  Zap,
  Trophy,
  Sparkles,
  Target,
  Crown,
  Flame,
} from "lucide-react";

const CountdownScreen = ({ onComplete, theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Ready", "3", "2", "1", "GO!"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const isNumber = !isNaN(parseInt(steps[currentStep]));
  const isGo = steps[currentStep] === "GO!";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-gradient-to-br ${theme.colors} flex items-center justify-center z-50 overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Pulsing circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-white/20"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main countdown display */}
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              scale: 0.3,
              opacity: 0,
              rotateY: -90,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotateY: 0,
            }}
            exit={{
              scale: 1.2,
              opacity: 0,
              rotateY: 90,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-3xl ${
                isGo
                  ? "bg-green-500/50"
                  : isNumber
                  ? "bg-white"
                  : "bg-yellow-500/50"
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />

            {/* Text display */}
           
            <motion.div
              className={`relative text-8xl md:text-9xl font-black tracking-wider  ${
                isGo
                  ? "text-green-400"
                  : isNumber
                  ? "text-white"
                  : "text-yellow-400"
              } drop-shadow-2xl`}
              animate={{
                scale: isGo ? [1, 1.1, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            >
              {steps[currentStep]}
            </motion.div>

            {/* Subtitle for "Ready" */}
            {steps[currentStep] === "Ready" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl text-white/80 mt-4 font-medium"
              >
                Get ready to start your quiz!
              </motion.div>
            )}

            {/* Subtitle for "GO!" */}
            {steps[currentStep] === "GO!" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl text-white/80 mt-4 font-medium"
              >
                Let's begin!
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex items-center gap-3">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? "bg-green-500" : "bg-white/30"
                }`}
                animate={{
                  scale: index === currentStep ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: index === currentStep ? Infinity : 0,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 border-4 border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-32 h-32 border-4 border-white/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

const QuizStartScreen = ({
  quizData = {
    quiz_title: "Beginner Permutation Concepts Quiz",
    questions: [],
    quiz_timer: 10,
    difficultyLevel: "beginner",
    topic: "Permutation",
    grade: "placements",
    question_type: "mixed",
  },
  setQuizStarted = () => { },
  setQuizMode = () => { },
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("cyber");
  const [showSettings, setShowSettings] = useState(false);
  const [level, setLevel] = useState(5);
  const [isHoveringStart, setIsHoveringStart] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const controls = useAnimation();

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
      accent: "bg-gradient-to-r from-green-400 to-blue-500",
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
      accent: "bg-gradient-to-r from-teal-400 to-blue-500",
    },
  ];

  const currentTheme = themes.find((t) => t.id === selectedTheme);

  const difficultyColors = {
    beginner: "text-green-400 bg-green-900/50",
    intermediate: "text-yellow-400 bg-yellow-900/50",
    advanced: "text-orange-400 bg-orange-900/50",
    expert: "text-red-400 bg-red-900/50",
  };

  const totalQuestions = quizData.questions?.length || 0;
  const totalPoints = totalQuestions * 100;
  const passingScore = 70;
  const attempts = 3;
  const bestScore = 0;

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      controls.start({
        x: (x - 0.5) * 20,
        y: (y - 0.5) * 20,
        transition: { type: "spring", damping: 10 },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [controls]);

  const handleStartQuiz = () => {
    setShowCountdown(true);
  };

   const handleStartPracticeQuiz = () => {
     setQuizMode("practice");
    
      setShowCountdown(true);
  };



  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setQuizStarted(true);
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden text-white`}
      >
        {/* Interactive Parallax Background */}
        <motion.div className="absolute inset-0" animate={controls}>
          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute top-0 bottom-0 w-px bg-white"
                style={{ left: `${i * 5}%` }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
        </motion.div>

        <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen w-full max-w-md lg:max-w-xl mx-auto">
          {/* Header with User Stats */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center shadow-md"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 211, 238, 0.7)",
                      "0 0 0 6px rgba(34, 211, 238, 0)",
                      "0 0 0 0 rgba(34, 211, 238, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs font-bold text-gray-900">
                    {level}
                  </span>
                </motion.div>
              </motion.div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Level {level} Scholar
                </div>
                <div className="text-xs text-gray-300/80">
                  {quizData.grade} Level
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 mb-6 border border-white/10 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-white">Sound Effects</span>
                    </div>
                    <motion.button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`w-12 h-6 rounded-full relative transition-all ${
                        soundEnabled ? "bg-cyan-500" : "bg-gray-600"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                          soundEnabled ? "right-0.5" : "left-0.5"
                        }`}
                        layout
                      />
                    </motion.button>
                  </div>

                  <div>
                    <span className="text-sm text-white mb-2 block">Theme</span>
                    <div className="grid grid-cols-4 gap-2">
                      {themes.map((theme) => (
                        <motion.button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`h-8 rounded-lg ${
                            theme.accent
                          } border-2 transition-all ${
                            selectedTheme === theme.id
                              ? "border-white scale-105"
                              : "border-transparent"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-orange-300 text-sm font-medium">
                    {quizData.question_type} Questions
                  </span>
                </div>
                <motion.div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    difficultyColors[quizData.difficultyLevel]
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {quizData.difficultyLevel.toUpperCase()}
                </motion.div>
              </div>

              <motion.h1
                className="text-2xl font-bold text-white mb-4 leading-tight"
                whileHover={{ x: 2 }}
              >
                {quizData.quiz_title}
              </motion.h1>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div
                  className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-300">Questions</div>
                  <div className="text-lg font-bold text-white">
                    {totalQuestions}
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Timer className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-300">Duration</div>
                  <div className="text-lg font-bold text-white">
                    {quizData.quiz_timer}m
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Pass: {passingScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">Best: {bestScore}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300">{totalPoints} XP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full space-y-4"
          >
            {/* Primary Start Button */}
            <motion.button
              onClick={handleStartQuiz}
              className={`w-full ${currentTheme.accent} text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all relative overflow-hidden group`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHoveringStart(true)}
              onHoverEnd={() => setIsHoveringStart(false)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: isHoveringStart ? "100%" : "-100%",
                  opacity: isHoveringStart ? 0.2 : 0,
                }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex items-center justify-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{
                    scale: isHoveringStart ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </motion.div>
                <span>Start Quiz Challenge</span>
                <motion.div
                  animate={{
                    rotate: isHoveringStart ? [0, 20, -20, 0] : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.button>

            {/* Secondary Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                className="bg-indigo-600 hover:bg-indigo-600/80 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-indigo-500/30"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-4 h-4" />
                <span>Challenge</span>
              </motion.button>

              <motion.button
                onClick={handleStartPracticeQuiz}
                className="bg-purple-600 hover:bg-purple-600/80 cursor-pointer backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-purple-500/30"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Book className="w-4 h-4" />
                <span>Practice</span>
              </motion.button>
            </div>

          
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full mt-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">{totalPoints} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">
                  {attempts} attempts left
                </span>
              </div>
            </div>

            <motion.button
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Share</span>
            </motion.button>
          </motion.div>

          {/* Topic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white font-medium">
                {quizData.topic}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Countdown Screen */}
      <AnimatePresence>
        {showCountdown && (
          <CountdownScreen
            onComplete={handleCountdownComplete}
            theme={currentTheme}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizStartScreen;