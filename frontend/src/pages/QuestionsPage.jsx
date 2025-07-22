// import React, { useState, useEffect, useContext } from "react";
// import Layout from "../components/layouts/layout";
// import { AppContext } from "../context/AppContext";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { BookAIcon, BookCopy, BookOpen, ChevronDownIcon, ChevronsRight, Notebook } from "lucide-react";

// const QuestionsPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [submitted, setSubmitted] = useState({});
//   const [showExplanations, setShowExplanations] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { backend_URL } = useContext(AppContext);
//   const { subject, topic } = useParams();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${backend_URL}/api/indiabix/questions/${subject}/${topic}`
//         );
//         setQuestions(response.data.questions || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [backend_URL, subject, topic]);

//   const questionsPerPage = 5;
//   const totalPages = Math.ceil(questions.length / questionsPerPage);
//   const indexOfLastQuestion = currentPage * questionsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//   const currentQuestions = questions.slice(
//     indexOfFirstQuestion,
//     indexOfLastQuestion
//   );

//   const handleOptionSelect = (questionId, optionIdentifier, isCorrect) => {
//     const newSelectedOptions = {
//       ...selectedOptions,
//       [questionId]: optionIdentifier,
//     };
//     setSelectedOptions(newSelectedOptions);

//     // Auto-submit if the selected option is correct
//     if (isCorrect) {
//       setSubmitted({
//         ...submitted,
//         [questionId]: true,
//       });
//       setShowExplanations({
//         ...showExplanations,
//         [questionId]: true,
//       });
//     } else {
//       // For wrong answer, disable options but don't auto-show explanation
//       setSubmitted({
//         ...submitted,
//         [questionId]: true,
//       });
//     }
//   };

//   const toggleExplanation = (questionId) => {
//     setShowExplanations({
//       ...showExplanations,
//       [questionId]: !showExplanations[questionId],
//     });
//   };


//   const renderSmart = (text) => {
//     if (!text) return null;
//     // First replace literal \n with real newlines
//     const normalized = text.replace(/\\n/g, '\n');
//     return (
//       <div style={{ whiteSpace: 'pre-line' }}>
//         {normalized}
//       </div>
//     );
//   };

//   const goToFirstPage = () => setCurrentPage(1);
//   const goToLastPage = () => setCurrentPage(totalPages);
//   const goToNextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const getVisiblePages = () => {
//     const visiblePages = [];
//     const maxVisible = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         visiblePages.push(i);
//       }
//     } else {
//       let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
//       let end = Math.min(start + maxVisible - 1, totalPages);

//       if (end - start + 1 < maxVisible) {
//         start = Math.max(end - maxVisible + 1, 1);
//       }

//       for (let i = start; i <= end; i++) {
//         visiblePages.push(i);
//       }
//     }

//     return visiblePages;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center dark:bg-black items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg max-w-md">
//           <h3 className="text-lg font-bold mb-2">Error</h3>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-md text-center">
//           <h3 className="text-lg font-bold mb-2">No Questions Found</h3>
//           <p className="text-gray-600 dark:text-zinc-300">
//             No questions available for this topic.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="container w-full  px-4 py-8 max-w-3xl">
//           <h1 className="text-2xl md:text-3xl capitalize  text-center mb-8 text-blue-600 dark:text-blue-400">
//             <span className=" text-gray-600 dark:text-white">{subject}</span> ::{" "}
//             {topic.replace(/-/g, " ")}
//           </h1>
//           <div className="flex items-center bg-gray-100 dark:bg-zinc-800 dark:text-white my-4 rounded-sm p-4 ">
//             <h1 className="capitalize text-sm flex gap-2 items-center">
//               <a
//                 href="/dashboard"
//                 className="hover:text-blue-500 transition-colors"
//               >
//                 Dashboard
//               </a>{" "}
//               <ChevronsRight className="text-green-500" />{" "}
//               <a
//                 href={`/${subject}`}
//                 className="hover:text-blue-500 transition-colors"
//               >
//                 {subject}
//               </a>
//               <ChevronsRight className="text-green-500" />{" "}
//               <a
//                 href={`/${subject}/${topic}`}
//                 className="hover:text-blue-500 transition-colors"
//               >
//                 {topic}
//               </a>
//             </h1>
//           </div>

//           {currentQuestions.map((question, index) => {
//             const questionId = question._id;
//             const isSubmitted = submitted[questionId];
//             const selectedOption = selectedOptions[questionId];
//             const isExplanationVisible = showExplanations[questionId];

//             return (
//               <div
//                 key={questionId}
//                 className="mb-4 p-4 md:p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900/50 transition-colors duration-200"
//               >
//                 <div className="flex items-start mb-4">
//                   <span className="text-sm md:text-lg font-semibold mr-2 text-gray-800 dark:text-zinc-200">
//                     {index + indexOfFirstQuestion + 1}.
//                   </span>
//                   <p className="text-sm md:text-lg text-gray-800 dark:text-zinc-200">
//                     {question.questionText}
//                   </p>
//                 </div>

//                 <div className="space-y-3 mb-6">
//                   {question.options.map((option) => {
//                     const isSelected = selectedOption === option.identifier;
//                     const isCorrect = option.isCorrect;
//                     const isWrongSelected = isSelected && !isCorrect;

//                     let optionClasses =
//                       "p-2 md:p-3 border rounded-md flex items-center transition-colors duration-200";
//                     let textClasses =
//                       "text-sm md:text-lg text-gray-800 dark:text-zinc-200";

//                     if (isSelected && isCorrect) {
//                       // Show success state only for correct selected answer
//                       optionClasses +=
//                         " bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700";
//                       textClasses = "text-green-800 dark:text-green-300";
//                     } else if (isWrongSelected) {
//                       // Only disable the wrong selected option
//                       optionClasses +=
//                         " bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700 pointer-events-none";
//                       textClasses = "text-red-800 dark:text-red-300";
//                     } else if (isSelected) {
//                       // Currently selected option
//                       optionClasses +=
//                         " bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600";
//                     } else {
//                       // All other options remain clickable
//                       optionClasses +=
//                         " hover:bg-gray-50 dark:hover:bg-zinc-700/50 border-gray-300 dark:border-zinc-600 cursor-pointer";
//                     }

//                     return (
//                       <div
//                         key={option.identifier}
//                         className={optionClasses}
//                         onClick={() => {
//                           // Allow selection of new options even after wrong answer
//                           if (!isWrongSelected) {
//                             handleOptionSelect(
//                               questionId,
//                               option.identifier,
//                               option.isCorrect
//                             );
//                           }
//                         }}
//                       >
//                         <span
//                           className={`text-sm md:text-lg inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full transition-colors duration-200
//                         ${
//                           isSelected && isCorrect
//                             ? "bg-green-500 dark:bg-green-600 text-white"
//                             : isWrongSelected
//                             ? "bg-red-500 dark:bg-red-600 text-white"
//                             : isSelected
//                             ? "bg-blue-500 dark:bg-blue-600 text-white"
//                             : "bg-gray-200 dark:bg-zinc-600"
//                         }`}
//                         >
//                           {option.identifier}
//                         </span>
//                         <span className={textClasses}>{option.text}</span>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Always visible Show Explanation button */}
//                 <button
//                   onClick={() => toggleExplanation(questionId)}
//                   className={`p-2 cursor-pointer  rounded-md transition-colors duration-200 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 hover:bg-gray-300 dark:hover:bg-zinc-600`}
//                 >
//                   {isExplanationVisible ? (
//                     <Notebook size={18} />
//                   ) : (
//                     <BookOpen size={18} />
//                   )}
//                 </button>

//                 {isExplanationVisible && question.explanation && (
//                   <div className="mt-4 text-sm md:text-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded">
//                     <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
//                       Explanation:
//                     </h3>
//                     <div className="text-gray-700 dark:text-yellow-100">
//                       {renderSmart(question.explanation)}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {totalPages > 1 && (
//             <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
//               <div className="text-sm text-gray-700 dark:text-zinc-300">
//                 Questions {indexOfFirstQuestion + 1}-
//                 {Math.min(indexOfLastQuestion, questions.length)} of{" "}
//                 {questions.length}
//               </div>

//               <nav className="flex items-center gap-1">
//                 <button
//                   onClick={goToFirstPage}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//                 >
//                   «
//                 </button>
//                 <button
//                   onClick={goToPrevPage}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//                 >
//                   ‹
//                 </button>

//                 {getVisiblePages().map((number) => (
//                   <button
//                     key={number}
//                     onClick={() => paginate(number)}
//                     className={`px-3 py-1 rounded-md border transition-colors duration-200 ${
//                       currentPage === number
//                         ? "bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700"
//                         : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
//                     }`}
//                   >
//                     {number}
//                   </button>
//                 ))}

//                 <button
//                   onClick={goToNextPage}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//                 >
//                   ›
//                 </button>
//                 <button
//                   onClick={goToLastPage}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//                 >
//                   »
//                 </button>
//               </nav>
//             </div>
//           )}
//         </div>
//         <div className="w-1/2 hidden lg:block h-[85vh] mt-10 sticky top-10 shadow-lg rounded-xl bg-white dark:bg-zinc-800 p-6 overflow-y-auto">
//           <div className=" dark:bg-zinc-800 mb-4 ">
//             <h2 className="text-xl  text-gray-600 dark:text-zinc-200 mb-2">
//               Quick Links
//             </h2>
//             <div className="space-y-4">
//               <details className="group">
//                 <summary className="flex items-center cursor-pointer">
//                   <h3 className="text-md font-medium text-gray-700 dark:text-zinc-300">
//                     Aptitude
//                   </h3>
//                   <ChevronDownIcon className="w-5 h-5 ml-2 transform dark:text-gray-300 group-open:rotate-180 transition-transform duration-200" />
//                 </summary>

//                 <ul className="mt-4 space-y-2 pl-4">
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//                     >
//                       <BookOpen className="w-4 h-4 mr-2" />
//                       Problems On Train
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//                     >
//                       <BookCopy className="w-4 h-4 mr-2" />
//                       Probability
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//                     >
//                       <BookAIcon className="w-4 h-4 mr-2" />
//                       Permutation and Combination
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//                     >
//                       <Notebook className="w-4 h-4 mr-2" />
//                       Simple Interest
//                     </a>
//                   </li>
//                 </ul>
//               </details>
//             </div>
//           </div>
//           <hr className="text-gray-200 dark:text-zinc-700" />
//           <div className="mt-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl  text-gray-600 dark:text-zinc-200">
//                 Problem Solving Workspace
//               </h2>
//               <button
//                 className="p-2 text-sm bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50"
//                 onClick={() => {
//                   // Clear workspace
//                   const workspace =
//                     document.getElementById("keyboard-workspace");
//                   if (workspace) workspace.value = "";
//                 }}
//               >
//                 Clear
//               </button>
//             </div>

//             {/* Keyboard Workspace */}
//             <div className="mb-4">
//               <h3 className="font-medium text-gray-700 dark:text-zinc-300 mb-2">
//                 Solution Approach
//               </h3>
//               <textarea
//                 id="keyboard-workspace"
//                 className="w-full h-[calc(70vh-180px)] p-3 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 font-mono text-sm"
//                 placeholder="Type your solution approach here..."
//                 spellCheck="false"
//               />
//             </div>
//           </div>
//         </div>{" "}
//       </div>
//     </Layout>
//   );
// };

// export default QuestionsPage;
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Heart,
  MessageSquare,
  Bookmark,
  Check,
  X,
  Clipboard,
  Maximize,
  Minimize,
  Sun,
  Moon,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import toast from "react-hot-toast";
import { StreakUpdate } from "../../utils/streakService";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedQuestions, setLikedQuestions] = useState({});
  const [savedQuestions, setSavedQuestions] = useState({});
  const [fullScreen, setFullScreen] = useState(false);
  const { backend_URL } = useContext(AppContext);
  const { subject, topic } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${backend_URL}/api/indiabix/questions/${subject}/${topic}`
        );
        setQuestions(response.data.questions || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [backend_URL, subject, topic]);

 
  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handleOptionSelect = (questionId, optionIdentifier, isCorrect) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [questionId]: optionIdentifier,
    };
    setSelectedOptions(newSelectedOptions);

    if (isCorrect) {
      setSubmitted({
        ...submitted,
        [questionId]: true,
      });
      setShowExplanations({
        ...showExplanations,
        [questionId]: true,
      });
    } else {
      setSubmitted({
        ...submitted,
        [questionId]: true,
      });
    }
  };

  const toggleExplanation = (questionId) => {
    StreakUpdate("Questions Solved");
    setShowExplanations({
      ...showExplanations,
      [questionId]: !showExplanations[questionId],
    });
  };

  const toggleLike = (questionId) => {
    setLikedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleSave = (questionId) => {
    setSavedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const renderSmart = (text) => {
    if (!text) return null;
    const normalized = text.replace(/\\n/g, "\n");
    return <div className="whitespace-pre-line">{normalized}</div>;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
      let end = Math.min(start + maxVisible - 1, totalPages);

      if (end - start + 1 < maxVisible) {
        start = Math.max(end - maxVisible + 1, 1);
      }

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  if (loading) {
    return (
      <div className="flex justify-center dark:bg-black items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg max-w-md">
          <h3 className="text-lg font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-bold mb-2">No Questions Found</h3>
          <p className="text-gray-600 dark:text-zinc-300">
            No questions available for this topic.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div
        className={`flex flex-col lg:flex-row gap-4 ${
          fullScreen ? "fixed inset-0 z-50 bg-white dark:bg-black" : ""
        }`}
      >
        {/* Main Content Area */}
        <div
          className={`flex-1 ${
            fullScreen ? "overflow-auto md:p-4" : "md:p-4 lg:p-8"
          }`}
        >
          <div className="max-w-4xl  mx-auto">
            {/* Header */}
            <div className="flex p-4 md:p-0 justify-between items-center mb-2 md:mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-center capitalize text-gray-800 dark:text-white">
                  <span className="text-gray-600 dark:text-white">
                    {subject}
                  </span>{" "}
                  <span className="text-blue-500">
                    :: {topic.replace(/-/g, " ")}
                  </span>
                </h1>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <a
                    href="/dashboard"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Dashboard
                  </a>{" "}
                  <ChevronsRight className="mx-1 text-green-500 w-4 h-4" />{" "}
                  <a
                    href={`/${subject}`}
                    className="capitalize hover:text-blue-500 transition-colors"
                  >
                    {subject}
                  </a>
                  <ChevronsRight className="mx-1 text-green-500 w-4 h-4" />{" "}
                  <a
                    href={`/${subject}/${topic}`}
                    className="capitalize hover:text-blue-500 transition-colors"
                  >
                    {topic}
                  </a>
                </div>
              </div>

              <div className=" hidden md:flex items-center space-x-2">
                <button
                  onClick={() => setFullScreen(!fullScreen)}
                  className="p-2 cursor-pointer rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {fullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>

            {/* Questions List */}
            {currentQuestions.map((question, index) => {
              const questionId = question._id;
              const isSubmitted = submitted[questionId];
              const selectedOption = selectedOptions[questionId];
              const isExplanationVisible = showExplanations[questionId];
              const isLiked = likedQuestions[questionId];
              const isSaved = savedQuestions[questionId];

              return (
                <div
                  key={questionId}
                  className="md:mb-6 mb-1 p-3 md:p-5 bg-white dark:bg-zinc-900 md:rounded-xl md:shadow-sm md:hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-zinc-800"
                >
                  {/* Question Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start">
                      <span className="text-sm font-semibold bg-gradient-to-br from-indigo-600 to-indigo-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                        {index + indexOfFirstQuestion + 1}
                      </span>
                      <p className="text-gray-800 dark:text-zinc-200 flex-1">
                        {question.questionText}
                      </p>
                    </div>
                    <div className="md:flex hidden  space-x-2">
                      <button
                        onClick={() => toggleLike(questionId)}
                        className={`p-1.5 rounded-full ${
                          isLiked
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        } transition-colors`}
                      >
                        <Heart
                          size={18}
                          fill={isLiked ? "currentColor" : "none"}
                        />
                      </button>
                      <button
                        onClick={() => toggleSave(questionId)}
                        className={`p-1.5 rounded-full ${
                          isSaved
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-blue-500"
                        } transition-colors`}
                      >
                        <Bookmark
                          size={18}
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-4">
                    {question.options.map((option) => {
                      const isSelected = selectedOption === option.identifier;
                      const isCorrect = option.isCorrect;
                      const isWrongSelected = isSelected && !isCorrect;

                      let optionClasses =
                        "p-3 rounded-lg flex items-center transition-all duration-200 cursor-pointer";
                      let textClasses = "text-gray-800 dark:text-zinc-200";

                      if (isSelected && isCorrect) {
                        optionClasses +=
                          " bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800";
                        textClasses = "text-green-700 dark:text-green-300";
                      } else if (isWrongSelected) {
                        optionClasses +=
                          " bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800";
                        textClasses = "text-red-700 dark:text-red-300";
                      } else if (isSelected) {
                        optionClasses +=
                          " bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800";
                      } else if (!isSubmitted) {
                        optionClasses +=
                          " hover:bg-gray-50 dark:hover:bg-zinc-700/50 border border-gray-200 dark:border-zinc-700";
                      } else {
                        optionClasses +=
                          " border border-gray-200 dark:border-zinc-700 opacity-80";
                      }

                      return (
                        <div
                          key={option.identifier}
                          className={optionClasses}
                          onClick={() => {
                            if (!isSubmitted || !isSelected) {
                              handleOptionSelect(
                                questionId,
                                option.identifier,
                                option.isCorrect
                              );
                            }
                          }}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full transition-colors duration-200
                              ${
                                isSelected && isCorrect
                                  ? "bg-green-500 dark:bg-green-600 text-white"
                                  : isWrongSelected
                                  ? "bg-red-500 dark:bg-red-600 text-white"
                                  : isSelected
                                  ? "bg-blue-500 dark:bg-blue-600 text-white"
                                  : "bg-gray-200 dark:bg-zinc-600"
                              }`}
                          >
                            {option.identifier}
                          </span>
                          <span className={textClasses}>{option.text}</span>
                          {isSelected && (
                            <span className="ml-auto">
                              {isCorrect ? (
                                <Check size={18} className="text-green-500" />
                              ) : (
                                <X size={18} className="text-red-500" />
                              )}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Question Footer */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => toggleExplanation(questionId)}
                      className={`flex items-center text-sm ${
                        isExplanationVisible
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
                    >
                      {isExplanationVisible ? (
                        <>
                          <ChevronUp size={16} className="mr-1" />
                          Hide Explanation
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="mr-1" />
                          Show Explanation
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => copyToClipboard(question.questionText)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <Clipboard size={16} className="mr-1" />
                      Copies
                    </button>
                  </div>

                  {/* Explanation */}
                  {isExplanationVisible && question.explanation && (
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-lg">
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                        <MessageSquare size={16} className="mr-2" />
                        Explanation
                      </h3>
                      <div className="text-gray-700 dark:text-yellow-100">
                        {renderSmart(question.explanation)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-4 md:mb-0 gap-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {indexOfFirstQuestion + 1}-
                  {Math.min(indexOfLastQuestion, questions.length)} of{" "}
                  {questions.length}
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronsLeft size={16} />
                  </button>
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown size={16} className="transform rotate-90" />
                  </button>

                  {getVisiblePages().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 text-xs rounded-lg border transition-colors ${
                        currentPage === number
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown size={16} className="transform -rotate-90" />
                  </button>
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronsRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Sidebar (Workspace) - Hidden on small screens */}
        <div className="lg:w-80 xl:w-96 bg-white dark:bg-zinc-900 border-l border-gray-100 dark:border-zinc-700 p-5 hidden lg:block">
          <div className="sticky top-5 space-y-6">
            {/* Workspace */}
            <div className="bg-gray-50 dark:bg-zinc-700/30 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Problem Solving Workspace
                </h2>
                <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  <RefreshCw size={16} />
                </button>
              </div>

              <textarea
                className="w-full h-64 p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 font-mono text-sm"
                placeholder="Type your solution approach here..."
                spellCheck="false"
              />

              <div className="mt-3 flex space-x-2">
                <button className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-400 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Save Notes
                </button>
                <button className="px-3 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm">
                  Copies
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 dark:bg-zinc-700/30 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Quick Links
              </h2>
              <div className="space-y-2">
                {[
                  "Problems on Train",
                  "Probability",
                  "Permutation and Combination",
                  "Simple Interest",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionsPage;