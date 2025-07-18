// import React from "react"
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CheckCircle,
//   XCircle,
//   Bookmark,
//   Flag,
//   Lightbulb,
//   Sparkles,
//   Target,
//   Clock,
//   CheckSquare,
//   HelpCircle,
//   Edit3,
//   RotateCcw,
// } from "lucide-react";

// const QuizQuestionRenderer = ({
//   question,
//   currentQuestion,
//   answers,
//   showResults,
//   handleAnswer,
//   answerRefs,
//   isAnswerCorrect,
//   bookmarkedQuestions,
//   flaggedQuestions,
//   toggleBookmark,
//   toggleFlag,
//   showExplanation,
//   quizData,
//   isPracticeMode,
// }) => {
//   const currentAnswer = answers[currentQuestion];
//   const isCorrect = isAnswerCorrect(currentQuestion);

//   // Get question type information
//   const getQuestionTypeInfo = (type) => {
//     switch (type) {
//       case "mcq":
//         return {
//           label: "Multiple Choice",
//           icon: CheckSquare,
//           color: "blue",
//           bgColor: "bg-blue-100 dark:bg-blue-900/30",
//           textColor: "text-blue-700 dark:text-blue-300",
//           borderColor: "border-blue-300 dark:border-blue-600",
//         };
//       case "true_false":
//         return {
//           label: "True / False",
//           icon: HelpCircle,
//           color: "purple",
//           bgColor: "bg-purple-100 dark:bg-purple-900/30",
//           textColor: "text-purple-700 dark:text-purple-300",
//           borderColor: "border-purple-300 dark:border-purple-600",
//         };
//       case "short_answer":
//         return {
//           label: "Short Answer",
//           icon: Edit3,
//           color: "green",
//           bgColor: "bg-green-100 dark:bg-green-900/30",
//           textColor: "text-green-700 dark:text-green-300",
//           borderColor: "border-green-300 dark:border-green-600",
//         };
//       case "fill_in_the_blanks":
//         return {
//           label: "Fill in Blanks",
//           icon: Edit3,
//           color: "orange",
//           bgColor: "bg-orange-100 dark:bg-orange-900/30",
//           textColor: "text-orange-700 dark:text-orange-300",
//           borderColor: "border-orange-300 dark:border-orange-600",
//         };
//       default:
//         return {
//           label: "Question",
//           icon: HelpCircle,
//           color: "gray",
//           bgColor: "bg-gray-100 dark:bg-gray-900/30",
//           textColor: "text-gray-700 dark:text-gray-300",
//           borderColor: "border-gray-300 dark:border-gray-600",
//         };
//     }
//   };

//   const questionTypeInfo = getQuestionTypeInfo(question.question_type);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.4,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         staggerChildren: 0.1,
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: -20,
//       scale: 0.95,
//       transition: { duration: 0.3 },
//     },
//   };

//   const optionVariants = {
//     hidden: { opacity: 0, x: -20, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//     hover: {
//       scale: 1.02,
//       x: 4,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       },
//     },
//     tap: { scale: 0.98 },
//   };

//   const correctVariants = {
//     hidden: { scale: 0, rotate: -180 },
//     visible: {
//       scale: 1,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         damping: 15,
//         delay: 0.2,
//       },
//     },
//   };

//   const pulseVariants = {
//     pulse: {
//       scale: [1, 1.05, 1],
//       transition: {
//         duration: 2,
//         repeat: Infinity,
//         ease: "easeInOut",
//       },
//     },
//   };

//   // Helper function to render MCQ options
//   const renderMCQOptions = () => (
//     <motion.div
//       className="space-y-4"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {question.options.map((option, index) => {
//         const isSelected = currentAnswer === option;
//         const isRightAnswer = option === question.correct_answer;
//         const showFeedback = showResults || (isPracticeMode && isSelected);

//         return (
//           <motion.button
//             key={index}
//             ref={(el) => (answerRefs.current[index] = el)}
//             variants={optionVariants}
//             whileHover={!showResults ? "hover" : {}}
//             whileTap={!showResults ? "tap" : {}}
//             onClick={() => !showResults && handleAnswer(option)}
//             className={`group relative w-full p-3 text-left rounded-xl border-2 transition-all duration-300 overflow-hidden select-none ${
//               showFeedback
//                 ? isRightAnswer
//                   ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-200/50 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-50 dark:shadow-emerald-900/20"
//                   : isSelected && !isRightAnswer
//                   ? "border-red-500 bg-red-50 text-red-900 shadow-lg shadow-red-200/50 dark:border-red-400 dark:bg-red-900/30 dark:text-red-50 dark:shadow-red-900/20"
//                   : isSelected
//                   ? "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-50"
//                   : "border-gray-200 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200"
//                 : isSelected
//                 ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg shadow-blue-200/50 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-50 dark:shadow-blue-900/20"
//                 : "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
//             }`}
//           >
//             {/* Animated background gradient */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5"
//               animate={{
//                 background: isSelected
//                   ? [
//                       "linear-gradient(45deg, #3B82F6, #8B5CF6)",
//                       "linear-gradient(45deg, #8B5CF6, #3B82F6)",
//                     ]
//                   : [
//                       "linear-gradient(45deg, #6B7280, #9CA3AF)",
//                       "linear-gradient(45deg, #9CA3AF, #6B7280)",
//                     ],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//             />

//             <div className="relative flex items-center space-x-4">
//               <motion.div
//                 className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
//                   showFeedback
//                     ? isRightAnswer
//                       ? "border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/30 dark:border-emerald-400 dark:bg-emerald-400"
//                       : isSelected && !isRightAnswer
//                       ? "border-red-500 bg-red-500 shadow-lg shadow-red-500/30 dark:border-red-400 dark:bg-red-400"
//                       : "border-gray-300 dark:border-gray-500"
//                     : isSelected
//                     ? "border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/30 dark:border-blue-400 dark:bg-blue-400"
//                     : "border-gray-300 group-hover:border-blue-300 dark:border-gray-500 dark:group-hover:border-blue-400"
//                 }`}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <AnimatePresence>
//                   {(isSelected || (showFeedback && isRightAnswer)) && (
//                     <motion.div
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       exit={{ scale: 0, rotate: 180 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 200,
//                         damping: 15,
//                       }}
//                       className="w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-100"
//                     />
//                   )}
//                 </AnimatePresence>
//               </motion.div>

//               <span className="text-base font-medium flex-1 leading-relaxed">
//                 {option}
//               </span>

//               <AnimatePresence>
//                 {showFeedback && isRightAnswer && (
//                   <motion.div
//                     variants={correctVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 shadow-lg dark:bg-emerald-400"
//                   >
//                     <CheckCircle className="w-5 h-5 text-white" />
//                   </motion.div>
//                 )}
//                 {showFeedback && isSelected && !isRightAnswer && (
//                   <motion.div
//                     variants={correctVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 shadow-lg dark:bg-red-400"
//                   >
//                     <XCircle className="w-5 h-5 text-white" />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Sparkle effect for correct answers */}
//             <AnimatePresence>
//               {showFeedback && isRightAnswer && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute top-2 right-2"
//                 >
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                   >
//                     <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-300" />
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         );
//       })}
//     </motion.div>
//   );

//   // Helper function to render True/False options
//   const renderTrueFalseOptions = () => (
//     <motion.div
//       className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {[
//         {
//           value: true,
//           label: "True",
//           icon: CheckCircle,
//           gradient: {
//             light: "from-emerald-500 to-green-500",
//             dark: "from-emerald-600 to-green-600",
//             hover: {
//               light: "from-emerald-600 to-green-600",
//               dark: "from-emerald-500 to-green-500",
//             },
//           },
//           baseColor: "emerald",
//         },
//         {
//           value: false,
//           label: "False",
//           icon: XCircle,
//           gradient: {
//             light: "from-red-500 to-rose-500",
//             dark: "from-red-600 to-rose-600",
//             hover: {
//               light: "from-red-600 to-rose-600",
//               dark: "from-red-500 to-rose-500",
//             },
//           },
//           baseColor: "red",
//         },
//       ].map((option) => {
//         const isSelected = currentAnswer === option.value;
//         const isRightAnswer =
//           (question.correct_answer === "true") === option.value;
//         const showFeedback = showResults || (isPracticeMode && isSelected);

//         return (
//           <motion.button
//             key={option.value}
//             variants={optionVariants}
//             whileHover={!showResults ? "hover" : {}}
//             whileTap={!showResults ? "tap" : {}}
//             onClick={() => !showResults && handleAnswer(option.value)}
//             className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[120px] select-none ${
//               showFeedback
//                 ? isRightAnswer
//                   ? `border-${option.baseColor}-400 bg-gradient-to-br from-${option.baseColor}-50 to-${option.baseColor}-100 text-${option.baseColor}-900 shadow-xl shadow-${option.baseColor}-200/50 dark:border-${option.baseColor}-500 dark:from-${option.baseColor}-900/30 dark:to-${option.baseColor}-800/30 dark:text-${option.baseColor}-100 dark:shadow-${option.baseColor}-900/20`
//                   : isSelected && !isRightAnswer
//                   ? "border-red-400 bg-gradient-to-br from-red-50 to-red-100 text-red-900 shadow-xl shadow-red-200/50 dark:border-red-500 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-100 dark:shadow-red-900/20"
//                   : isSelected
//                   ? "border-gray-300 bg-gray-100 text-gray-700 shadow-lg dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200"
//                   : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
//                 : isSelected
//                 ? `border-transparent bg-gradient-to-br ${option.gradient.light} text-white shadow-xl dark:${option.gradient.dark}`
//                 : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/70 dark:hover:border-gray-600"
//             }`}
//           >
//             {/* Animated icon */}
//             <motion.div
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               whileTap={{ scale: 0.9 }}
//               className="mb-3"
//             >
//               <option.icon
//                 className={`w-8 h-8 ${
//                   showFeedback
//                     ? isRightAnswer
//                       ? `text-${option.baseColor}-600 dark:text-${option.baseColor}-300`
//                       : isSelected && !isRightAnswer
//                       ? "text-red-600 dark:text-red-300"
//                       : isSelected
//                       ? "text-gray-600 dark:text-gray-400"
//                       : "text-gray-500 dark:text-gray-400"
//                     : isSelected
//                     ? "text-white"
//                     : `text-gray-600 dark:text-gray-300 group-hover:text-${option.baseColor}-600 dark:group-hover:text-${option.baseColor}-400`
//                 }`}
//               />
//             </motion.div>

//             {/* Label with consistent sizing */}
//             <motion.span
//               className={`text-xl font-bold tracking-wide ${
//                 showFeedback
//                   ? isRightAnswer
//                     ? `text-${option.baseColor}-900 dark:text-${option.baseColor}-100`
//                     : isSelected && !isRightAnswer
//                     ? "text-red-900 dark:text-red-100"
//                     : isSelected
//                     ? "text-gray-700 dark:text-gray-300"
//                     : "text-gray-600 dark:text-gray-400"
//                   : isSelected
//                   ? "text-white"
//                   : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
//               }`}
//               whileHover={{ scale: 1.05 }}
//             >
//               {option.label}
//             </motion.span>

//             {/* Result indicators */}
//             <AnimatePresence>
//               {showFeedback && isRightAnswer && (
//                 <motion.div
//                   variants={correctVariants}
//                   initial="hidden"
//                   animate="visible"
//                   className={`absolute -top-2 -right-2 w-10 h-10 bg-${option.baseColor}-500 rounded-full flex items-center justify-center shadow-lg dark:bg-${option.baseColor}-400`}
//                 >
//                   <CheckCircle className="w-6 h-6 text-white" />
//                 </motion.div>
//               )}
//               {showFeedback && isSelected && !isRightAnswer && (
//                 <motion.div
//                   variants={correctVariants}
//                   initial="hidden"
//                   animate="visible"
//                   className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg dark:bg-red-400"
//                 >
//                   <XCircle className="w-6 h-6 text-white" />
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Subtle glow for selected correct answers */}
//             {showFeedback && isRightAnswer && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.1 }}
//                 className="absolute inset-0 rounded-2xl pointer-events-none"
//                 style={{
//                   boxShadow: `0 0 60px 10px rgba(16, 185, 129, 0.5)`,
//                 }}
//               />
//             )}
//           </motion.button>
//         );
//       })}
//     </motion.div>
//   );

//   // Helper function to render short answer input
//   const renderShortAnswerInput = () => {
//     const [localAnswer, setLocalAnswer] = React.useState("");
//     const [submitted, setSubmitted] = React.useState(false);

//     // Reset local state when question changes
//     React.useEffect(() => {
//       setLocalAnswer(currentAnswer || "");
//       setSubmitted(currentAnswer !== undefined && currentAnswer !== null);
//     }, [currentQuestion, currentAnswer]);

//     const handleSubmit = () => {
//       handleAnswer(localAnswer);
//       setSubmitted(true);
//     };

//     return (
//       <motion.div
//         className="space-y-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.3 }}
//       >
//         <motion.div className="relative">
//           {/* Main Input Field */}
//           <motion.textarea
//             whileFocus={{
//               scale: 1.01,
//               y: -2,
//               boxShadow: "0 4px 20px -2px rgba(59, 130, 246, 0.3)",
//             }}
//             rows={4}
//             type="text"
//             value={localAnswer}
//             onChange={(e) => {
//               if (!showResults) {
//                 setLocalAnswer(e.target.value);
//                 setSubmitted(false);
//               }
//             }}
//             placeholder={showResults ? "" : "Type your answer here..."}
//             readOnly={showResults || submitted}
//             className={`w-full p-3 text-md rounded-xl border-2 transition-all duration-300 focus:outline-none select-none ${
//               showResults || submitted
//                 ?  "border-blue-500 bg-blue-50 text-blue-900 shadow-lg shadow-blue-200/50 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-50"
//                 : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800/70 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
//             }`}
//           />

//           {/* Submit Button */}
//           {!showResults && !submitted && (
//             <motion.div
//               className="mt-4 flex justify-end"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleSubmit}
//                 disabled={!localAnswer.trim()}
//                 className={`px-6 py-2 rounded-xl font-medium transition-all ${
//                   localAnswer.trim()
//                     ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
//                 }`}
//               >
//                 Submit Answer
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.div>
//       </motion.div>
//     );
//   };

//   const renderFillInBlanksInput = () => {
//     const [localAnswer, setLocalAnswer] = React.useState("");
//     const [submitted, setSubmitted] = React.useState(false);

//     // Reset local state when question changes
//     React.useEffect(() => {
//       setLocalAnswer(currentAnswer || "");
//       setSubmitted(currentAnswer !== undefined && currentAnswer !== null);
//     }, [currentQuestion, currentAnswer]);

//     const handleSubmit = () => {
//       handleAnswer(localAnswer);
//       setSubmitted(true);
//     };

//     return (
//       <motion.div
//         className="space-y-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.3 }}
//       >
//         <motion.div className="relative">
//           {/* Main Input Field */}
//           <motion.input
//             whileFocus={{
//               scale: 1.01,
//               y: -2,
//               boxShadow: "0 4px 20px -2px rgba(59, 130, 246, 0.3)",
//             }}
//             type="text"
//             value={localAnswer}
//             onChange={(e) => {
//               if (!showResults) {
//                 setLocalAnswer(e.target.value);
//                 setSubmitted(false);
//               }
//             }}
//             placeholder={showResults ? "" : "Type your answer here..."}
//             readOnly={showResults || submitted}
//             className={`w-full p-3 text-md rounded-xl border-2 transition-all duration-300 focus:outline-none select-none
//                 bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800/70 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
//             `}
//           />

//           {/* Submit Button */}
//           {!showResults && !submitted && (
//             <motion.div
//               className="mt-4 flex justify-end"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleSubmit}
//                 disabled={!localAnswer.trim()}
//                 className={`px-6 py-2 rounded-xl font-medium transition-all ${
//                   localAnswer.trim()
//                     ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
//                 }`}
//               >
//                 Submit Answer
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.div>
//       </motion.div>
//     );
//   };

//   // Helper function to render question content based on type
//   const renderQuestionContent = () => {
//     switch (question.question_type) {
//       case "mcq":
//         return renderMCQOptions();
//       case "true_false":
//         return renderTrueFalseOptions();
//       case "fill_in_the_blanks":
//         return renderFillInBlanksInput();
//       case "short_answer":
//         return renderShortAnswerInput();
//       default:
//         return null;
//     }
//   };

//   return (
//     <motion.div
//       key={currentQuestion}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       className="rounded-2xl p-8 mb-8 bg-white shadow-xl border border-gray-100 dark:bg-zinc-900 dark:border-gray-700 dark:shadow-2xl transition-colors duration-300 select-none"
//       style={{
//         WebkitUserSelect: "none",
//         MozUserSelect: "none",
//         msUserSelect: "none",
//         userSelect: "none",
//         WebkitTouchCallout: "none",
//         WebkitTapHighlightColor: "transparent",
//       }}
//       onContextMenu={(e) => e.preventDefault()}
//       onDragStart={(e) => e.preventDefault()}
//     >
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Main Question Content */}
//         <div className="flex-1">
//           {/* Question Header */}
//           <motion.div
//             className="flex flex-col items-start mb-8"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//           >
//             <div className="flex w-full items-center justify-between pr-4">
//               <motion.div
//                 className="flex items-center space-x-3"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <motion.div
//                   className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
//                   variants={pulseVariants}
//                   animate="pulse"
//                 >
//                   <Target className="w-4 h-4 text-white" />
//                 </motion.div>
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
//                   Question {currentQuestion + 1}
//                 </span>

//                 {/* Question Type Badge */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${questionTypeInfo.bgColor} ${questionTypeInfo.textColor} ${questionTypeInfo.borderColor}`}
//                 >
//                   <questionTypeInfo.icon className="w-4 h-4" />
//                   <span className="text-xs font-semibold uppercase tracking-wide">
//                     {questionTypeInfo.label}
//                   </span>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="flex space-x-3"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleBookmark}
//                   className={`p-3 rounded-xl transition-all duration-200 ${
//                     bookmarkedQuestions.includes(currentQuestion)
//                       ? "text-yellow-500 bg-yellow-100 shadow-lg shadow-yellow-200/50 dark:bg-yellow-900/30 dark:shadow-yellow-900/20"
//                       : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:text-yellow-400 dark:hover:bg-yellow-900/20"
//                   }`}
//                 >
//                   <Bookmark
//                     className="w-5 h-5"
//                     fill={
//                       bookmarkedQuestions.includes(currentQuestion)
//                         ? "currentColor"
//                         : "none"
//                     }
//                   />
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: -5 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleFlag}
//                   className={`p-3 rounded-xl transition-all duration-200 ${
//                     flaggedQuestions.includes(currentQuestion)
//                       ? "text-red-500 bg-red-100 shadow-lg shadow-red-200/50 dark:bg-red-900/30 dark:shadow-red-900/20"
//                       : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20"
//                   }`}
//                 >
//                   <Flag
//                     className="w-5 h-5"
//                     fill={
//                       flaggedQuestions.includes(currentQuestion)
//                         ? "currentColor"
//                         : "none"
//                     }
//                   />
//                 </motion.button>
//               </motion.div>
//             </div>
//             <motion.h3
//               className="text-xl mt-2 font-bold text-gray-800 dark:text-white leading-relaxed select-none"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               {quizData.questions[currentQuestion].question_text}
//             </motion.h3>
//           </motion.div>

//           {/* Question Content */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             {renderQuestionContent()}
//           </motion.div>
//         </div>

//         {/* Explanation Sidebar */}
//         {showExplanation  && (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5 }}
//             className="md:w-1/3"
//           >
//             <div className="sticky top-4">
//               <motion.div
//                 className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-500"
//                 layout
//               >
//                 <motion.div
//                   className="flex items-center mb-3"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <motion.div
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                     className="mr-3"
//                   >
//                     <Lightbulb className="w-6 h-6 text-amber-500" />
//                   </motion.div>
//                   <h4 className="text-lg font-bold text-amber-800 dark:text-amber-200">
//                     Explanation
//                   </h4>
//                 </motion.div>

//                 {/* User's Answer (if answered) */}
//                 {currentAnswer !== undefined &&
//                   currentAnswer !== null &&
//                   !isCorrect && (
//                     <motion.div
//                       className={`mb-4 p-4 rounded-lg border ${
//                         isCorrect
//                           ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
//                           : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700"
//                       }`}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.15 }}
//                     >
//                       <div className="flex items-center mb-2">
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             delay: 0.2,
//                             type: "spring",
//                             stiffness: 200,
//                           }}
//                         >
//                           {isCorrect ? (
//                             <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
//                           ) : (
//                             <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
//                           )}
//                         </motion.div>
//                         <span
//                           className={`text-sm font-semibold ${
//                             isCorrect
//                               ? "text-green-800 dark:text-green-200"
//                               : "text-red-800 dark:text-red-200"
//                           }`}
//                         >
//                           Your Answer:
//                         </span>
//                       </div>
//                       <p
//                         className={`font-medium ${
//                           isCorrect
//                             ? "text-green-700 dark:text-green-300"
//                             : "text-red-700 dark:text-red-300"
//                         }`}
//                       >
//                         {question.question_type === "mcq" ||
//                         question.question_type === "true_false"
//                           ? question.options[currentAnswer] ||
//                             currentAnswer?.toString()
//                           : currentAnswer}
//                       </p>
//                     </motion.div>
//                   )}

//                 {/* Correct Answer */}
//                 <motion.div
//                   className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: currentAnswer !== undefined ? 0.25 : 0.15,
//                   }}
//                 >
//                   <div className="flex items-center mb-2">
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{
//                         delay: currentAnswer !== undefined ? 0.3 : 0.2,
//                         type: "spring",
//                         stiffness: 200,
//                       }}
//                     >
//                       <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
//                     </motion.div>
//                     <span className="text-sm font-semibold text-green-800 dark:text-green-200">
//                       Correct Answer:
//                     </span>
//                   </div>
//                   <p className="text-green-700 dark:text-green-300 font-medium">
//                     {question.question_type === "mcq" ||
//                     question.question_type === "true_false"
//                       ? question.options[question.correct_answer] ||
//                         question.correct_answer?.toString()
//                       : question.correct_answer}
//                   </p>
//                 </motion.div>

//                 {/* Explanation Text */}
//                 <motion.p
//                   className="text-base text-amber-700 dark:text-amber-300 leading-relaxed select-none"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: currentAnswer !== undefined ? 0.35 : 0.25,
//                   }}
//                 >
//                   {question.explanation}
//                 </motion.p>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default QuizQuestionRenderer;


import React from "react"
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Bookmark,
  Flag,
  Lightbulb,
  Sparkles,
  Target,
  Clock,
  CheckSquare,
  HelpCircle,
  Edit3,
  RotateCcw,
} from "lucide-react";

const QuizQuestionRenderer = ({
  question,
  currentQuestion,
  answers,
  showResults,
  handleAnswer,
  answerRefs,
  isAnswerCorrect,
  bookmarkedQuestions,
  flaggedQuestions,
  toggleBookmark,
  toggleFlag,
  showExplanation,
  quizData,
  isPracticeMode,
}) => {
  const currentAnswer = answers[currentQuestion];
  const isCorrect = isAnswerCorrect(currentQuestion);

  // Get question type information
  const getQuestionTypeInfo = (type) => {
    switch (type) {
      case "mcq":
        return {
          label: "Multiple Choice",
          icon: CheckSquare,
          color: "blue",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          textColor: "text-blue-700 dark:text-blue-300",
          borderColor: "border-blue-300 dark:border-blue-600",
        };
      case "true_false":
        return {
          label: "True / False",
          icon: HelpCircle,
          color: "purple",
          bgColor: "bg-purple-100 dark:bg-purple-900/30",
          textColor: "text-purple-700 dark:text-purple-300",
          borderColor: "border-purple-300 dark:border-purple-600",
        };
      case "short_answer":
        return {
          label: "Short Answer",
          icon: Edit3,
          color: "green",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-300 dark:border-green-600",
        };
      case "fill_in_the_blanks":
        return {
          label: "Fill in Blanks",
          icon: Edit3,
          color: "orange",
          bgColor: "bg-orange-100 dark:bg-orange-900/30",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-300 dark:border-orange-600",
        };
      default:
        return {
          label: "Question",
          icon: HelpCircle,
          color: "gray",
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-300 dark:border-gray-600",
        };
    }
  };

  const questionTypeInfo = getQuestionTypeInfo(question.question_type);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      x: 4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: { scale: 0.98 },
  };

  const correctVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Helper function to render MCQ options
  const renderMCQOptions = () => (
    <motion.div
      className="space-y-3 md:space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {question.options.map((option, index) => {
        const isSelected = currentAnswer === option;
        const isRightAnswer = option === question.correct_answer;
        const showFeedback = showResults || (isPracticeMode && isSelected);

        return (
          <motion.button
            key={index}
            ref={(el) => (answerRefs.current[index] = el)}
            variants={optionVariants}
            whileHover={!showResults ? "hover" : {}}
            whileTap={!showResults ? "tap" : {}}
            onClick={() => !showResults && handleAnswer(option)}
            className={`group relative w-full p-3 md:p-4 text-left rounded-lg md:rounded-xl border-2 transition-all duration-300 overflow-hidden select-none ${
              showFeedback
                ? isRightAnswer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-200/50 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-50 dark:shadow-emerald-900/20"
                  : isSelected && !isRightAnswer
                  ? "border-red-500 bg-red-50 text-red-900 shadow-lg shadow-red-200/50 dark:border-red-400 dark:bg-red-900/30 dark:text-red-50 dark:shadow-red-900/20"
                  : isSelected
                  ? "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-50"
                  : "border-gray-200 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200"
                : isSelected
                ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg shadow-blue-200/50 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-50 dark:shadow-blue-900/20"
                : "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
            }`}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5"
              animate={{
                background: isSelected
                  ? [
                      "linear-gradient(45deg, #3B82F6, #8B5CF6)",
                      "linear-gradient(45deg, #8B5CF6, #3B82F6)",
                    ]
                  : [
                      "linear-gradient(45deg, #6B7280, #9CA3AF)",
                      "linear-gradient(45deg, #9CA3AF, #6B7280)",
                    ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <div className="relative flex items-center space-x-3 md:space-x-4">
              <motion.div
                className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  showFeedback
                    ? isRightAnswer
                      ? "border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/30 dark:border-emerald-400 dark:bg-emerald-400"
                      : isSelected && !isRightAnswer
                      ? "border-red-500 bg-red-500 shadow-lg shadow-red-500/30 dark:border-red-400 dark:bg-red-400"
                      : "border-gray-300 dark:border-gray-500"
                    : isSelected
                    ? "border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/30 dark:border-blue-400 dark:bg-blue-400"
                    : "border-gray-300 group-hover:border-blue-300 dark:border-gray-500 dark:group-hover:border-blue-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence>
                  {(isSelected || (showFeedback && isRightAnswer)) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-white dark:bg-gray-100"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              <span className="text-sm capitalize md:text-base  flex-1 leading-relaxed">
                {option}
              </span>

              <AnimatePresence>
                {showFeedback && isRightAnswer && (
                  <motion.div
                    variants={correctVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-500 shadow-lg dark:bg-emerald-400"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </motion.div>
                )}
                {showFeedback && isSelected && !isRightAnswer && (
                  <motion.div
                    variants={correctVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-500 shadow-lg dark:bg-red-400"
                  >
                    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sparkle effect for correct answers */}
            <AnimatePresence>
              {showFeedback && isRightAnswer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1 right-1 md:top-2 md:right-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 dark:text-emerald-300" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </motion.div>
  );

  // Helper function to render True/False options
  const renderTrueFalseOptions = () => (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {[
        {
          value: true,
          label: "True",
          icon: CheckCircle,
          gradient: {
            light: "from-emerald-500 to-green-500",
            dark: "from-emerald-600 to-green-600",
            hover: {
              light: "from-emerald-600 to-green-600",
              dark: "from-emerald-500 to-green-500",
            },
          },
          baseColor: "emerald",
        },
        {
          value: false,
          label: "False",
          icon: XCircle,
          gradient: {
            light: "from-red-500 to-rose-500",
            dark: "from-red-600 to-rose-600",
            hover: {
              light: "from-red-600 to-rose-600",
              dark: "from-red-500 to-rose-500",
            },
          },
          baseColor: "red",
        },
      ].map((option) => {
        const isSelected = currentAnswer === option.value;
        const isRightAnswer =
          (question.correct_answer === "true") === option.value;
        const showFeedback = showResults || (isPracticeMode && isSelected);

        return (
          <motion.button
            key={option.value}
            variants={optionVariants}
            whileHover={!showResults ? "hover" : {}}
            whileTap={!showResults ? "tap" : {}}
            onClick={() => !showResults && handleAnswer(option.value)}
            className={`group relative p-4 sm:p-6 md:p-8 rounded-lg md:rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] select-none ${
              showFeedback
                ? isRightAnswer
                  ? `border-${option.baseColor}-400 bg-gradient-to-br from-${option.baseColor}-50 to-${option.baseColor}-100 text-${option.baseColor}-900 shadow-lg shadow-${option.baseColor}-200/50 dark:border-${option.baseColor}-500 dark:from-${option.baseColor}-900/30 dark:to-${option.baseColor}-800/30 dark:text-${option.baseColor}-100 dark:shadow-${option.baseColor}-900/20`
                  : isSelected && !isRightAnswer
                  ? "border-red-400 bg-gradient-to-br from-red-50 to-red-100 text-red-900 shadow-lg shadow-red-200/50 dark:border-red-500 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-100 dark:shadow-red-900/20"
                  : isSelected
                  ? "border-gray-300 bg-gray-100 text-gray-700 shadow-lg dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
                : isSelected
                ? `border-transparent bg-gradient-to-br ${option.gradient.light} text-white shadow-lg dark:${option.gradient.dark}`
                : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/70 dark:hover:border-gray-600"
            }`}
          >
            {/* Animated icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="mb-2 md:mb-3"
            >
              <option.icon
                className={`w-6 h-6 md:w-8 md:h-8 ${
                  showFeedback
                    ? isRightAnswer
                      ? `text-${option.baseColor}-600 dark:text-${option.baseColor}-300`
                      : isSelected && !isRightAnswer
                      ? "text-red-600 dark:text-red-300"
                      : isSelected
                      ? "text-gray-600 dark:text-gray-400"
                      : "text-gray-500 dark:text-gray-400"
                    : isSelected
                    ? "text-white"
                    : `text-gray-600 dark:text-gray-300 group-hover:text-${option.baseColor}-600 dark:group-hover:text-${option.baseColor}-400`
                }`}
              />
            </motion.div>

            {/* Label with consistent sizing */}
            <motion.span
              className={`text-lg md:text-xl font-bold tracking-wide ${
                showFeedback
                  ? isRightAnswer
                    ? `text-${option.baseColor}-900 dark:text-${option.baseColor}-100`
                    : isSelected && !isRightAnswer
                    ? "text-red-900 dark:text-red-100"
                    : isSelected
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-600 dark:text-gray-400"
                  : isSelected
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {option.label}
            </motion.span>

            {/* Result indicators */}
            <AnimatePresence>
              {showFeedback && isRightAnswer && (
                <motion.div
                  variants={correctVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10 bg-${option.baseColor}-500 rounded-full flex items-center justify-center shadow-lg dark:bg-${option.baseColor}-400`}
                >
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </motion.div>
              )}
              {showFeedback && isSelected && !isRightAnswer && (
                <motion.div
                  variants={correctVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg dark:bg-red-400"
                >
                  <XCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle glow for selected correct answers */}
            {showFeedback && isRightAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                className="absolute inset-0 rounded-lg md:rounded-2xl pointer-events-none"
                style={{
                  boxShadow: `0 0 40px 5px rgba(16, 185, 129, 0.5)`,
                }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );

  // Helper function to render short answer input
  const renderShortAnswerInput = () => {
    const [localAnswer, setLocalAnswer] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    // Reset local state when question changes
    React.useEffect(() => {
      setLocalAnswer(currentAnswer || "");
      setSubmitted(currentAnswer !== undefined && currentAnswer !== null);
    }, [currentQuestion, currentAnswer]);

    const handleSubmit = () => {
      handleAnswer(localAnswer);
      setSubmitted(true);
    };

    return (
      <motion.div
        className="space-y-3 md:space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.div className="relative">
          {/* Main Input Field */}
          <motion.textarea
            whileFocus={{
              scale: 1.01,
              y: -2,
              boxShadow: "0 4px 20px -2px rgba(59, 130, 246, 0.3)",
            }}
            rows={4}
            type="text"
            value={localAnswer}
            onChange={(e) => {
              if (!showResults) {
                setLocalAnswer(e.target.value);
                setSubmitted(false);
              }
            }}
            placeholder={showResults ? "" : "Type your answer here..."}
            readOnly={showResults || submitted}
            className={`w-full p-3 text-sm md:text-base rounded-lg md:rounded-xl border-2 transition-all duration-300 focus:outline-none select-none ${
              showResults || submitted
                ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg shadow-blue-200/50 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-50"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800/70 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
            }`}
          />

          {/* Submit Button */}
          {!showResults && !submitted && (
            <motion.div
              className="mt-3 md:mt-4 flex justify-end"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!localAnswer.trim()}
                className={`px-4 py-2 md:px-6 md:py-2 rounded-lg md:rounded-xl font-medium transition-all ${
                  localAnswer.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                Submit Answer
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  const renderFillInBlanksInput = () => {
    const [localAnswer, setLocalAnswer] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    // Reset local state when question changes
    React.useEffect(() => {
      setLocalAnswer(currentAnswer || "");
      setSubmitted(currentAnswer !== undefined && currentAnswer !== null);
    }, [currentQuestion, currentAnswer]);

    const handleSubmit = () => {
      handleAnswer(localAnswer);
      setSubmitted(true);
    };

    return (
      <motion.div
        className="space-y-3 md:space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.div className="relative">
          {/* Main Input Field */}
          <motion.input
            whileFocus={{
              scale: 1.01,
              y: -2,
              boxShadow: "0 4px 20px -2px rgba(59, 130, 246, 0.3)",
            }}
            type="text"
            value={localAnswer}
            onChange={(e) => {
              if (!showResults) {
                setLocalAnswer(e.target.value);
                setSubmitted(false);
              }
            }}
            placeholder={showResults ? "" : "Type your answer here..."}
            readOnly={showResults || submitted}
            className={`w-full p-3 text-sm md:text-base rounded-lg md:rounded-xl border-2 transition-all duration-300 focus:outline-none select-none 
                bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-800/70 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
            `}
          />

          {/* Submit Button */}
          {!showResults && !submitted && (
            <motion.div
              className="mt-3 md:mt-4 flex justify-end"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!localAnswer.trim()}
                className={`px-4 py-2 md:px-6 md:py-2 rounded-lg md:rounded-xl font-medium transition-all ${
                  localAnswer.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                Submit Answer
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  // Helper function to render question content based on type
  const renderQuestionContent = () => {
    switch (question.question_type) {
      case "mcq":
        return renderMCQOptions();
      case "true_false":
        return renderTrueFalseOptions();
      case "fill_in_the_blanks":
        return renderFillInBlanksInput();
      case "short_answer":
        return renderShortAnswerInput();
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={currentQuestion}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rounded-xl h-[70vh] md:h-fit md:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 bg-white  md:shadow-xl md:border border-gray-100 dark:bg-zinc-900 dark:border-gray-700 dark:shadow-2xl transition-colors duration-300 select-none"
      style={{
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="flex flex-col  gap-4 md:gap-6 lg:gap-8">
        {/* Main Question Content */}
        <div className="flex-1">
          {/* Question Header */}
          <motion.div
            className="flex flex-col items-start mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex max-w-4xl items-center justify-between">
              <motion.div
                className="flex items-center space-x-2 md:space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
                  variants={pulseVariants}
                  animate="pulse"
                >
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </motion.div>
                <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Question {currentQuestion + 1}
                </span>

                {/* Question Type Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className={`flex items-center space-x-1 md:space-x-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full border text-xs md:text-sm ${questionTypeInfo.bgColor} ${questionTypeInfo.textColor} ${questionTypeInfo.borderColor}`}
                        >
                          <questionTypeInfo.icon className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-semibold uppercase tracking-wide">
                          {questionTypeInfo.label}
                          </span>
                        </motion.div>
                        </motion.div>

                        <motion.div
                        className="flex space-x-1 md:space-x-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        >
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleBookmark}
                          className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 ${
                          bookmarkedQuestions.includes(currentQuestion)
                            ? "text-yellow-500 bg-yellow-100 shadow-lg shadow-yellow-200/50 dark:bg-yellow-900/30 dark:shadow-yellow-900/20"
                            : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:text-yellow-400 dark:hover:bg-yellow-900/20"
                          }`}
                        >
                          <Bookmark
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill={
                            bookmarkedQuestions.includes(currentQuestion)
                            ? "currentColor"
                            : "none"
                          }
                          />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleFlag}
                          className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 ${
                          flaggedQuestions.includes(currentQuestion)
                            ? "text-red-500 bg-red-100 shadow-lg shadow-red-200/50 dark:bg-red-900/30 dark:shadow-red-900/20"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                          }`}
                        >
                          <Flag
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill={
                            flaggedQuestions.includes(currentQuestion)
                            ? "currentColor"
                            : "none"
                          }
                          />
                        </motion.button>
                        </motion.div>
                      </div>
                      <motion.h3
                        className="text-lg md:text-xl mt-2 text-gray-600 dark:text-white leading-relaxed select-none"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {quizData.questions[currentQuestion].question_text.charAt(0).toUpperCase() +
                        quizData.questions[currentQuestion].question_text.slice(1)}
                      </motion.h3>
                      </motion.div>

                      {/* Question Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {renderQuestionContent()}
          </motion.div>
        </div>

        {/* Explanation Sidebar */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full mt-6 lg:mt-0"
          >
            <div className="sticky top-4">
              <motion.div
                className="p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-500"
                layout
              >
                <motion.div
                  className="flex items-center mb-2 md:mb-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mr-2 md:mr-3"
                  >
                    <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                  </motion.div>
                  <h4 className="text-base md:text-lg font-bold text-amber-800 dark:text-amber-200">
                    Explanation
                  </h4>
                </motion.div>

                {/* User's Answer (if answered) */}
                {currentAnswer !== undefined &&
                  currentAnswer !== null &&
                  !isCorrect && (
                    <motion.div
                      className={`mb-3 md:mb-4 p-3 md:p-4 rounded-md md:rounded-lg border ${
                        isCorrect
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
                          : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="flex items-center mb-1 md:mb-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400 mr-2" />
                          ) : (
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 dark:text-red-400 mr-2" />
                          )}
                        </motion.div>
                        <span
                          className={`text-xs md:text-sm font-semibold ${
                            isCorrect
                              ? "text-green-800 dark:text-green-200"
                              : "text-red-800 dark:text-red-200"
                          }`}
                        >
                          Your Answer:
                        </span>
                      </div>
                      <p
                        className={`text-xs md:text-sm font-medium ${
                          isCorrect
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {question.question_type === "mcq" ||
                        question.question_type === "true_false"
                          ? question.options[currentAnswer] ||
                            currentAnswer?.toString()
                          : currentAnswer}
                      </p>
                    </motion.div>
                  )}

                {/* Correct Answer */}
                <motion.div
                  className="mb-3 md:mb-4 p-3 md:p-4 rounded-md md:rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: currentAnswer !== undefined ? 0.25 : 0.15,
                  }}
                >
                  <div className="flex items-center mb-1 md:mb-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: currentAnswer !== undefined ? 0.3 : 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400 mr-2" />
                    </motion.div>
                    <span className="text-xs md:text-sm font-semibold text-green-800 dark:text-green-200">
                      Correct Answer:
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-green-700 dark:text-green-300 font-medium">
                    {question.question_type === "mcq" ||
                    question.question_type === "true_false"
                      ? question.options[question.correct_answer] ||
                        question.correct_answer?.toString()
                      : question.correct_answer}
                  </p>
                </motion.div>

                {/* Explanation Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    {quizData.questions[currentQuestion].explanation || (
                      <span className="italic text-gray-500 dark:text-gray-400">
                        No explanation provided for this question.
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Time Spent (if available in quiz data) */}
              {quizData.time_spent && (
                <motion.div
                  className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700 flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500 dark:text-blue-400 mr-2 md:mr-3" />
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-blue-800 dark:text-blue-200">
                      Time Spent
                    </p>
                    <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
                      {quizData.time_spent[currentQuestion] || "Not recorded"}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizQuestionRenderer;