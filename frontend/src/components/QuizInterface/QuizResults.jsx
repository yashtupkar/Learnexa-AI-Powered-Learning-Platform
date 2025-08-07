// import { useState, useEffect, useContext } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useTransform,
//   animate,
// } from "framer-motion";
// import Confetti from "react-confetti";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   Hash,
//   RefreshCw,
//   Home,
//   Share2,
//   Award,
//   Trophy,
//   TrendingUp,
//   Star,
//   Download,
//   ChevronDown,
//   Target,
// } from "lucide-react";
// import { AppContext } from "../../context/AppContext";
// import { useParams, useNavigate } from "react-router-dom";
// import logo from "../../assets/learnexa-logo.png";


// // --- Animated Score Component ---
// const AnimatedScore = ({ value }) => {
//   const count = useMotionValue(0);
//   const rounded = useTransform(count, (latest) => Math.round(latest));

//   useEffect(() => {
//     const controls = animate(count, value, {
//       duration: 1.5,
//       delay: 0.5,
//       ease: "easeInOut",
//     });
//     return controls.stop;
//   }, [value]);

//   return <motion.span>{rounded}</motion.span>;
// };

// // --- Main Results Component ---
// const QuizResults = () => {
//   // The data fetching logic remains the same
//   const [resultData, setResultData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [confettiShown, setConfettiShown] = useState(false);
//   const [showCertificate, setShowCertificate] = useState(false);
//   const [isReviewOpen, setIsReviewOpen] = useState(false);

//   const { backend_URL } = useContext(AppContext);
//   const { quizId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // This entire data fetching and transformation logic remains unchanged.
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
//         if (!response.ok)
//           throw new Error(`Failed to fetch: ${response.status}`);
//         const rawData = await response.json();

//         const latestScoreData = rawData.attempt.latestScore;
//         const totalQuestions = latestScoreData.totalQuestions;
//         const correctAnswers = latestScoreData.correct;
//         let unattemptedCount = 0;
//         latestScoreData.questions.forEach((q) => {
//           if (q.selectedOption === null || q.selectedOption === undefined)
//             unattemptedCount++;
//         });
//         const wrongAnswers = totalQuestions - correctAnswers - unattemptedCount;

//         const formattedData = {
//           userName: rawData.attempt.user.name,
//           quizName: rawData.quiz,
//           score: correctAnswers,
//           totalQuestions,
//           percentage: latestScoreData.percentage,
//           correctAnswers,
//           wrongAnswers,
//           unattempted: unattemptedCount,
//           timeSpent: latestScoreData.timeSpent,
//           attempts: rawData.attempt.totalAttempts,
//           questions: latestScoreData.questions.map((q) => ({
//             question_text: q.questionText,
//             user_answer: q.selectedOption,
//             correct_answer: q.correctOption,
//             is_correct: q.isCorrect,
//             explanation: q.explanation || null,
//           })),
//         };
//         setResultData(formattedData);

//         if (formattedData.percentage >= 90) {
//           setConfettiShown(true);
//           const timer = setTimeout(() => setConfettiShown(false), 6000);
//           return () => clearTimeout(timer);
//         }
//         if (formattedData.percentage >= 60) {
//           setShowCertificate(true);
//         }
//       } catch (error) {
//         console.error("Error processing quiz result:", error);
//         setResultData(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchResult();
//   }, [quizId, backend_URL]);

//   // Loading and Error states remain the same.
//   // ...

//   // Helper function to get performance details
//   const getPerformanceLevel = (percentage) => {
//     if (percentage === 100)
//       return {
//         level: "Perfect Score!",
//         textColor: "text-amber-500",
//         icon: Trophy,
//         message: "Absolutely flawless. A true master!",
//       };
//     if (percentage >= 90)
//       return {
//         level: "Excellent!",
//         textColor: "text-teal-500",
//         icon: Award,
//         message: "Outstanding performance. You're brilliant!",
//       };
//     if (percentage >= 75)
//       return {
//         level: "Great Job!",
//         textColor: "text-sky-500",
//         icon: Star,
//         message: "Amazing work. You're doing fantastic!",
//       };
//     if (percentage >= 60)
//       return {
//         level: "Well Done!",
//         textColor: "text-indigo-500",
//         icon: CheckCircle,
//         message: "You passed! Keep up the momentum!",
//       };
//     return {
//       level: "Keep Practicing",
//       textColor: "text-red-500",
//       icon: TrendingUp,
//       message: "Every mistake is a chance to learn. Review and try again.",
//     };
//   };

//   // Guard clauses for loading and error states...
//   if (isLoading || !resultData) {
//     // Return your existing loading/error component
//     return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;
//   }

//   const performance = getPerformanceLevel(resultData.percentage);

//   return (
//     <>
//       {confettiShown && <Confetti recycle={false} numberOfPieces={400} />}
//       <CertificateModal
//         isOpen={showCertificate}
//         onClose={() => setShowCertificate(false)}
//         resultData={resultData}
//         performance={performance}
//       />

//       <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 flex items-center justify-center transition-colors duration-300">
//         <main className="w-full max-w-3xl mx-auto space-y-8">
//           {/* Hero Section */}
//           <motion.section
//             className="text-center relative"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               visible: { transition: { staggerChildren: 0.1 } },
//             }}
//           >
//             <div
//               className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 ${performance.textColor}/10 dark:${performance.textColor}/5 rounded-full blur-3xl -z-0`}
//             ></div>

//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               className="flex items-center justify-center gap-3"
//             >
//               <performance.icon
//                 className={`w-8 h-8 ${performance.textColor}`}
//               />
//               <h1
//                 className={`text-2xl md:text-4xl font-bold ${performance.textColor}`}
//               >
//                 {performance.level}
//               </h1>
//             </motion.div>

//             <motion.p
//               className="text-7xl md:text-9xl font-bold my-4 text-gray-900 dark:text-white"
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//             >
//               <AnimatedScore value={resultData.percentage} />%
//             </motion.p>

//             <motion.p
//               className="text-sm sm:text-lg md:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto"
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//             >
//               {performance.message}
//             </motion.p>
//           </motion.section>

//           {/* Stats Section */}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="p-3 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4"
//           >
//             {[
//               {
//                 icon: CheckCircle,
//                 value: resultData.correctAnswers,
//                 label: "Correct",
//                 color: "from-green-400 to-emerald-500",
//                 bgColor:
//                   "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
//               },
//               {
//                 icon: XCircle,
//                 value: resultData.wrongAnswers,
//                 label: "Wrong",
//                 color: "from-red-400 to-pink-500",
//                 bgColor:
//                   "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
//               },
//               {
//                 icon: Target,
//                 value: `#${resultData.attempts}`,
//                 label: "Attempt",
//                 color: "from-gray-400 to-slate-500",
//                 bgColor:
//                   "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800",
//               },
//               {
//                 icon: Clock,
//                 value: `${Math.floor(resultData.timeSpent / 60)}:${(
//                   resultData.timeSpent % 60
//                 )
//                   .toString()
//                   .padStart(2, "0")}`,
//                 label: "Time",
//                 color: "from-purple-400 to-indigo-500",
//                 bgColor:
//                   "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
//               },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + index * 0.1 }}
//                 className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-2 md:p-4 border
//                     dark:border-gray-700/50 border-gray-200"
//                    flex flex-col items-center space-x-3`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div
//                     className={` rounded-full bg-gradient-to-r ${stat.color} `}
//                   >
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
//                     {stat.label}
//                   </div>
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {stat.value}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Review Accordion Section */}
//           <div className="text-center">
//             <motion.button
//               onClick={() => setIsReviewOpen(!isReviewOpen)}
//               className="px-8 text-sm md:text-base cursor-pointer py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-all duration-300 flex items-center gap-2 mx-auto"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {isReviewOpen ? "Hide" : "Review Your Answers"}
//               <motion.div animate={{ rotate: isReviewOpen ? 180 : 0 }}>
//                 <ChevronDown size={20} />
//               </motion.div>
//             </motion.button>
//           </div>

//           <AnimatePresence>
//             {isReviewOpen && (
//               <motion.section
//                 key="review-panel"
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className="space-y-3 overflow-hidden"
//               >
//                 {resultData.questions.map((q, index) => (
//                   <div
//                     key={index}
//                     className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div
//                         className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
//                           q.is_correct ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       ></div>
//                       <div>
//                         <p className="font-semibold text-gray-800 dark:text-gray-200">
//                           Q{index + 1}: {q.question_text}
//                         </p>
//                         <p
//                           className={`text-sm mt-2 font-medium ${
//                             q.is_correct
//                               ? "text-gray-600 dark:text-gray-400"
//                               : "text-red-500"
//                           }`}
//                         >
//                           Your answer:{" "}
//                           <span className="font-semibold">
//                             {q.user_answer || "Not Answered"}
//                           </span>
//                         </p>
//                         {!q.is_correct && (
//                           <p className="text-sm mt-1 font-medium text-green-600 dark:text-green-500">
//                             Correct answer:{" "}
//                             <span className="font-semibold">
//                               {q.correct_answer}
//                             </span>
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </motion.section>
//             )}
//           </AnimatePresence>

//           {/* Footer Actions */}
//           <motion.footer
//             className="flex items-center flex-wrap justify-center gap-4 pt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//           >
//             <button
//               onClick={() => {
//                 navigate(`/quiz/${quizId}`);
//                 setShowCertificate(false);
//               }}
//               className="flex items-center cursor-pointer gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
//             >
//               <RefreshCw size={16} /> Retake
//             </button>
//             <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
//             <button
//               onClick={() => setShowCertificate(true)}
//               className="flex items-center gap-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
//             >
//               <Share2 size={16} /> Certificate
//             </button>
//             <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="flex items-center cursor-pointer gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
//             >
//               <Home size={16} /> Dashboard
//             </button>
//           </motion.footer>
//         </main>
//       </div>
//     </>
//   );
// };

// // Redesigned Certificate Modal
// const CertificateModal = ({ isOpen, onClose, resultData, performance }) => {
//   if (!isOpen) return null;
//   const issueDate = new Date().toLocaleString("en-IN", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: "Asia/Kolkata",
//   });

//    return (
//      <AnimatePresence>
//        <div
//          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//          onClick={onClose}
//        >
//          <motion.div
//            initial={{ scale: 0.9, opacity: 0 }}
//            animate={{ scale: 1, opacity: 1 }}
//            exit={{ scale: 0.9, opacity: 0 }}
//            transition={{ duration: 0.3, ease: "easeOut" }}
//            // REMOVED: h-[50vh] md:h-auto. Height is now determined by content.
//            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl shadow-2xl relative overflow-hidden"
//            onClick={(e) => e.stopPropagation()}
//          >
//            <div
//              className={`h-2 w-full bg-gradient-to-r ${
//                performance.textColor === "text-amber-500"
//                  ? "from-amber-400 to-amber-600"
//                  : "from-teal-400 to-teal-600"
//              }`}
//            ></div>
//            {/* UPDATED: Padding is now responsive */}
//            <div className="p-4 sm:p-6 md:p-8 text-center">
//              <motion.div
//                initial={{ scale: 0 }}
//                animate={{ scale: 1 }}
//                transition={{ delay: 0.2, type: "spring" }}
//                className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
//              >
//                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
//                  {/* Ensure the logo prop is passed to the component */}
//                  {logo && (
//                    <img
//                      src={logo}
//                      alt="Learnexa"
//                      className="w-full h-full object-contain"
//                    />
//                  )}
//                </div>
//              </motion.div>
//              {/* UPDATED: Font size is now responsive */}
//              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-4">
//                Certificate of Completion
//              </h2>
//              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
//                This is to certify that
//              </p>
//              {/* UPDATED: Font size is now responsive */}
//              <p className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white my-3 sm:my-4">
//                {resultData.userName}
//              </p>
//              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
//                has successfully completed the quiz
//              </p>
//              {/* UPDATED: Font size is now responsive */}
//              <p className="font-semibold text-base sm:text-lg text-gray-700 dark:text-gray-100 mt-1">
//                {resultData.quizName}
//              </p>
//              {/* UPDATED: Margin is now responsive */}
//              <div className="my-4 md:my-6 py-2 px-4 inline-block bg-gray-100 dark:bg-gray-700 rounded-full">
//                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                  SCORE:{" "}
//                </span>
//                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
//                  {resultData.percentage}%
//                </span>
//              </div>
//              <p className="text-xs text-gray-400 dark:text-gray-500">
//                Issued on: {issueDate}
//              </p>
//            </div>
//            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
//              <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-semibold">
//                <Download size={16} /> Download
//              </button>
//            </div>
//          </motion.div>
//        </div>
//      </AnimatePresence>
//    );
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
  Sparkles,
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
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confettiShown, setConfettiShown] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { backend_URL } = useContext(AppContext);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleShare = () => {
    const shareText = `I scored ${resultData.percentage}% on "${resultData.quizName}" quiz on Learnexa!`;
    if (navigator.share) {
      navigator
        .share({
          title: "My Quiz Results",
          text: shareText,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage === 100)
      return {
        level: "Perfect Score!",
        textColor: "text-amber-500",
        bgColor: "bg-amber-500/10",
        icon: Trophy,
        message: "Absolutely flawless. A true master!",
        gradient: "from-amber-400 to-yellow-500",
        badgeColor: "bg-gradient-to-r from-amber-400 to-yellow-500",
      };
    if (percentage >= 90)
      return {
        level: "Excellent!",
        textColor: "text-teal-500",
        bgColor: "bg-teal-500/10",
        icon: Award,
        message: "Outstanding performance. You're brilliant!",
        gradient: "from-teal-400 to-emerald-500",
        badgeColor: "bg-gradient-to-r from-teal-400 to-emerald-500",
      };
    if (percentage >= 75)
      return {
        level: "Great Job!",
        textColor: "text-sky-500",
        bgColor: "bg-sky-500/10",
        icon: Star,
        message: "Amazing work. You're doing fantastic!",
        gradient: "from-sky-400 to-blue-500",
        badgeColor: "bg-gradient-to-r from-sky-400 to-blue-500",
      };
    if (percentage >= 60)
      return {
        level: "Well Done!",
        textColor: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
        icon: CheckCircle,
        message: "You passed! Keep up the momentum!",
        gradient: "from-indigo-400 to-violet-500",
        badgeColor: "bg-gradient-to-r from-indigo-400 to-violet-500",
      };
    return {
      level: "Keep Practicing",
      textColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
      icon: TrendingUp,
      message: "Every mistake is a chance to learn. Review and try again.",
      gradient: "from-rose-400 to-pink-500",
      badgeColor: "bg-gradient-to-r from-rose-400 to-pink-500",
    };
  };

  if (isLoading || !resultData) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;
  }

  const performance = getPerformanceLevel(resultData.percentage);

  return (
    <>
      {confettiShown && (
        <Confetti
          recycle={false}
          numberOfPieces={400}
          gravity={0.1}
          colors={["#f59e0b", "#10b981", "#3b82f6", "#6366f1", "#ec4899"]}
        />
      )}
   
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 flex items-center justify-center transition-colors duration-300">
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
              className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 ${performance.bgColor} rounded-full blur-3xl -z-0`}
            ></div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center justify-center gap-3"
            >
              <div className={`p-2 rounded-lg ${performance.bgColor}`}>
                <performance.icon
                  className={`w-6 h-6 ${performance.textColor}`}
                />
              </div>
              <h1
                className={`text-2xl md:text-4xl font-bold ${performance.textColor}`}
              >
                {performance.level}
              </h1>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative inline-block my-6"
            >
              <div
                className={`absolute inset-0 rounded-full blur-md ${performance.bgColor} -z-10`}
              ></div>
              <p className="text-7xl md:text-9xl font-bold my-4 text-gray-900 dark:text-white bg-clip-text">
                <AnimatedScore value={resultData.percentage} />%
              </p>
              {resultData.percentage >= 90 && (
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-amber-400" />
                </motion.div>
              )}
            </motion.div>

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
                hoverColor:
                  "hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30",
              },
              {
                icon: XCircle,
                value: resultData.wrongAnswers,
                label: "Wrong",
                color: "from-red-400 to-pink-500",
                bgColor:
                  "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
                hoverColor:
                  "hover:from-red-100 hover:to-pink-100 dark:hover:from-red-800/30 dark:hover:to-pink-800/30",
              },
              {
                icon: Target,
                value: `#${resultData.attempts}`,
                label: "Attempt",
                color: "from-gray-400 to-slate-500",
                bgColor:
                  "from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800",
                hoverColor:
                  "hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-700 dark:hover:to-slate-700",
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
                hoverColor:
                  "hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${stat.bgColor} ${stat.hoverColor} rounded-xl p-2 md:p-4 border 
                  dark:border-gray-700/50 border-gray-200 flex flex-col items-center space-x-3 transition-all duration-300 cursor-default`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-1.5 rounded-full bg-gradient-to-r ${stat.color} shadow-md`}
                  >
                    <stat.icon className="w-4 h-4 text-white" />
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

          {/* Performance Badge */}
  

          {/* Review Accordion Section */}
          <div className="text-center">
            <motion.button
              onClick={() => setIsReviewOpen(!isReviewOpen)}
              className={`px-8 text-sm md:text-base cursor-pointer py-3 ${performance.badgeColor} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isReviewOpen ? "Hide Review" : "Review Your Answers"}
              <motion.div
                animate={{ rotate: isReviewOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          q.is_correct ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div className="w-full">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          Q{index + 1}: {q.question_text}
                        </p>
                        <div className="mt-3 space-y-2">
                          <div
                            className={`flex items-center gap-2 p-2 rounded ${
                              q.is_correct
                                ? "bg-green-50 dark:bg-green-900/20"
                                : "bg-red-50 dark:bg-red-900/20"
                            }`}
                          >
                            <span
                              className={`text-sm font-medium ${
                                q.is_correct
                                  ? "text-gray-600 dark:text-gray-400"
                                  : "text-red-500"
                              }`}
                            >
                              Your answer:
                            </span>
                            <span className="font-semibold">
                              {q.user_answer || "Not Answered"}
                            </span>
                          </div>
                          {!q.is_correct && (
                            <div className="flex items-center gap-2 p-2 rounded bg-green-50 dark:bg-green-900/20">
                              <span className="text-sm font-medium text-green-600 dark:text-green-500">
                                Correct answer:
                              </span>
                              <span className="font-semibold">
                                {q.correct_answer}
                              </span>
                            </div>
                          )}
                        </div>
                        {q.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                            <p className="font-medium text-blue-600 dark:text-blue-400">
                              Explanation:
                            </p>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
            <motion.button
              onClick={() => {
                navigate(`/quiz/${quizId}`);
                setShowCertificate(false);
              }}
              className="flex items-center cursor-pointer gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} /> Retake
            </motion.button>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <motion.button
              onClick={handleShare}
              className="flex items-center gap-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} /> Share
              {copied && (
                <motion.span
                  className="absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  Copied!
                </motion.span>
              )}
            </motion.button>
          
       
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <motion.button
              onClick={() => navigate("/dashboard")}
              className="flex items-center cursor-pointer gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={16} /> Dashboard
            </motion.button>
          </motion.footer>
        </main>
      </div>
    </>
  );
};



export default QuizResults;