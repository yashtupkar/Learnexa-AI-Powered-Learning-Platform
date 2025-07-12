// import React, { useState, useEffect, useContext } from "react";
// import Layout from "../components/layouts/layout";
// import { AppContext } from "../context/AppContext";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QuestionsPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [submitted, setSubmitted] = useState({});
//   const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { backend_URL } = useContext(AppContext);
//     const { subject, topic } = useParams();

//   // Sample data - in a real app, you would fetch this from an API
// useEffect(() => {
//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get(
//         `${backend_URL}/api/indiabix/questions/${subject}/${topic}`
//       );
//       setQuestions(response.data.questions);
//       console.log(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       setLoading(false);
//     }
//   };

//   fetchQuestions();
// }, [backend_URL, subject, topic]);

//   const questionsPerPage = 5;
//   const totalPages = Math.ceil(questions.length / questionsPerPage);
//   const indexOfLastQuestion = currentPage * questionsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
//   const currentQuestions = Array.isArray(questions)
//     ? questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
//     : [];

//   const handleOptionSelect = (questionIndex, optionLetter) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [questionIndex + indexOfFirstQuestion]: optionLetter,
//     });
//   };

//   const handleSubmit = (questionIndex) => {
//     setSubmitted({
//       ...submitted,
//       [questionIndex + indexOfFirstQuestion]: true,
//     });
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         Error: {error}
//       </div>
//     );

//     return (
//       <Layout>
//     <div className="container mx-auto px-4 py-8 max-w-3xl">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
//         MCQ Quiz
//       </h1>

//       {currentQuestions.map((question, index) => (
//         <div key={index} className="mb-10 p-6 bg-white rounded-lg shadow-md">
//           <div className="flex items-start mb-4">
//             <span className="text-lg font-semibold mr-2">
//               {index + indexOfFirstQuestion + 1}.
//             </span>
//             <p className="text-lg">{question.text}</p>
//           </div>

//           <div className="space-y-3 mb-6">
//             {question.options.map((option) => {
//               const isSelected =
//                 selectedOptions[index + indexOfFirstQuestion] === option.letter;
//               const isSubmitted = submitted[index + indexOfFirstQuestion];
//               const isCorrect = option.letter === question.correctAnswer;

//               let optionClasses =
//                 "p-3 border rounded-md flex items-center cursor-pointer transition-colors";

//               if (isSubmitted) {
//                 if (isSelected && !isCorrect) {
//                   optionClasses += " bg-red-100 border-red-400";
//                 } else if (isCorrect) {
//                   optionClasses += " bg-green-100 border-green-400";
//                 } else {
//                   optionClasses += " opacity-50 cursor-not-allowed";
//                 }
//               } else if (isSelected) {
//                 optionClasses += " bg-blue-50 border-blue-400";
//               } else {
//                 optionClasses += " hover:bg-gray-50";
//               }

//               return (
//                 <div
//                   key={option.letter}
//                   className={optionClasses}
//                   onClick={() =>
//                     !isSubmitted && handleOptionSelect(index, option.letter)
//                   }
//                 >
//                   <span
//                     className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full
//                     ${
//                       isSubmitted && isCorrect
//                         ? "bg-green-500 text-white"
//                         : isSubmitted && isSelected
//                         ? "bg-red-500 text-white"
//                         : isSelected
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200"
//                     }`}
//                   >
//                     {option.letter}
//                   </span>
//                   <span>{option.text}</span>
//                 </div>
//               );
//             })}
//           </div>

//           <button
//             onClick={() => handleSubmit(index)}
//             disabled={
//               !selectedOptions[index + indexOfFirstQuestion] ||
//               submitted[index + indexOfFirstQuestion]
//             }
//             className={`px-4 py-2 rounded-md text-white
//               ${
//                 !selectedOptions[index + indexOfFirstQuestion] ||
//                 submitted[index + indexOfFirstQuestion]
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//           >
//             {submitted[index + indexOfFirstQuestion]
//               ? "Submitted"
//               : "Submit Answer"}
//           </button>

//           {submitted[index + indexOfFirstQuestion] && (
//             <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//               <h3 className="font-semibold text-yellow-800 mb-2">
//                 Explanation:
//               </h3>
//               <p className="text-gray-700">{question.explanation}</p>
//             </div>
//           )}
//         </div>
//       ))}

//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8">
//           <nav className="inline-flex rounded-md shadow">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//               (number) => (
//                 <button
//                   key={number}
//                   onClick={() => paginate(number)}
//                   className={`px-4 py-2 border ${
//                     currentPage === number
//                       ? "bg-blue-500 text-white border-blue-500"
//                       : "bg-white border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {number}
//                 </button>
//               )
//             )}
//           </nav>
//         </div>
//       )}
//     </div></Layout>
//   );
// };

// export default QuestionsPage;
// import React, { useState, useEffect, useContext } from "react";
// import Layout from "../components/layouts/layout";
// import { AppContext } from "../context/AppContext";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QuestionsPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [submitted, setSubmitted] = useState({});
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
//       setTimeout(() => {
//         setSubmitted({
//           ...submitted,
//           [questionId]: true,
//         });
//       }, 300); // Small delay for better UX
//     }
//   };

//   const handleSubmit = (questionId) => {
//     setSubmitted({
//       ...submitted,
//       [questionId]: true,
//     });
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
//       <div className="flex justify-center items-center h-screen">
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
//       <div className="container mx-auto px-4 py-8 max-w-3xl">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
//           {topic.replace(/-/g, " ").toUpperCase()} Quiz
//         </h1>

//         {currentQuestions.map((question, index) => {
//           const questionId = question._id;
//           const isSubmitted = submitted[questionId];
//           const selectedOption = selectedOptions[questionId];

//           return (
//             <div
//               key={questionId}
//               className="mb-10 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900/50 transition-colors duration-200"
//             >
//               <div className="flex items-start mb-4">
//                 <span className="text-lg font-semibold mr-2 text-gray-800 dark:text-zinc-200">
//                   {index + indexOfFirstQuestion + 1}.
//                 </span>
//                 <p className="text-lg text-gray-800 dark:text-zinc-200">
//                   {question.questionText}
//                 </p>
//               </div>

//               <div className="space-y-3 mb-6">
//                 {question.options.map((option) => {
//                   const isSelected = selectedOption === option.identifier;
//                   const isCorrect = option.isCorrect;

//                   let optionClasses =
//                     "p-3 border rounded-md flex items-center transition-colors duration-200";
//                   let textClasses = "text-gray-800 dark:text-zinc-200";

//                   if (isSubmitted) {
//                     if (isSelected && !isCorrect) {
//                       optionClasses +=
//                         " bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700";
//                       textClasses = "text-red-800 dark:text-red-300";
//                     } else if (isCorrect) {
//                       optionClasses +=
//                         " bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700";
//                       textClasses = "text-green-800 dark:text-green-300";
//                     } else {
//                       optionClasses +=
//                         " opacity-70 border-gray-300 dark:border-zinc-600";
//                     }
//                   } else if (isSelected) {
//                     optionClasses +=
//                       " bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600";
//                   } else {
//                     optionClasses +=
//                       " hover:bg-gray-50 dark:hover:bg-zinc-700/50 border-gray-300 dark:border-zinc-600 cursor-pointer";
//                   }

//                   return (
//                     <div
//                       key={option.identifier}
//                       className={optionClasses}
//                       onClick={() =>
//                         !isSubmitted &&
//                         handleOptionSelect(
//                           questionId,
//                           option.identifier,
//                           option.isCorrect
//                         )
//                       }
//                     >
//                       <span
//                         className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full transition-colors duration-200
//                         ${
//                           isSubmitted && isCorrect
//                             ? "bg-green-500 dark:bg-green-600 text-white"
//                             : isSubmitted && isSelected
//                             ? "bg-red-500 dark:bg-red-600 text-white"
//                             : isSelected
//                             ? "bg-blue-500 dark:bg-blue-600 text-white"
//                             : "bg-gray-200 dark:bg-zinc-600"
//                         }`}
//                       >
//                         {option.identifier}
//                       </span>
//                       <span className={textClasses}>{option.text}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {!isSubmitted && selectedOption && (
//                 <button
//                   onClick={() => handleSubmit(questionId)}
//                   className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white transition-colors duration-200"
//                 >
//                   Submit Answer
//                 </button>
//               )}

//               {isSubmitted && question.explanation && (
//                 <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded">
//                   <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
//                     Explanation:
//                   </h3>
//                   <p className="text-gray-700 dark:text-yellow-100">
//                     {question.explanation}
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {totalPages > 1 && (
//           <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
//             <div className="text-sm text-gray-700 dark:text-zinc-300">
//               Questions {indexOfFirstQuestion + 1}-
//               {Math.min(indexOfLastQuestion, questions.length)} of{" "}
//               {questions.length}
//             </div>

//             <nav className="flex items-center gap-1">
//               <button
//                 onClick={goToFirstPage}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//               >
//                 «
//               </button>
//               <button
//                 onClick={goToPrevPage}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//               >
//                 ‹
//               </button>

//               {getVisiblePages().map((number) => (
//                 <button
//                   key={number}
//                   onClick={() => paginate(number)}
//                   className={`px-3 py-1 rounded-md border transition-colors duration-200 ${
//                     currentPage === number
//                       ? "bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700"
//                       : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
//                   }`}
//                 >
//                   {number}
//                 </button>
//               ))}

//               <button
//                 onClick={goToNextPage}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//               >
//                 ›
//               </button>
//               <button
//                 onClick={goToLastPage}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
//               >
//                 »
//               </button>
//             </nav>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default QuestionsPage;

import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layouts/layout";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BookAIcon, BookCopy, BookOpen, ChevronDownIcon, ChevronsRight, Notebook } from "lucide-react";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

    // Auto-submit if the selected option is correct
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
      // For wrong answer, disable options but don't auto-show explanation
      setSubmitted({
        ...submitted,
        [questionId]: true,
      });
    }
  };

  const toggleExplanation = (questionId) => {
    setShowExplanations({
      ...showExplanations,
      [questionId]: !showExplanations[questionId],
    });
  };


  const renderSmart = (text) => {
    if (!text) return null;
    // First replace literal \n with real newlines
    const normalized = text.replace(/\\n/g, '\n');
    return (
      <div style={{ whiteSpace: 'pre-line' }}>
        {normalized}
      </div>
    );
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
      <div className="flex  gap-4">
        <div className="container w-full px-4 py-8 max-w-3xl ">
          <h1 className="text-3xl capitalize  text-center mb-8 text-blue-600 dark:text-blue-400">
            <span className=" text-gray-600 dark:text-white">{subject}</span> ::{" "}
            {topic.replace(/-/g, " ")}
          </h1>
          <div className="flex items-center bg-gray-100 dark:bg-zinc-800 dark:text-white my-4 rounded-sm p-4 ">
            <h1 className="capitalize flex gap-2 items-center">
              <a href="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</a>{" "}
              <ChevronsRight className="text-green-500" />{" "}
              <a href={`/${subject}`} className="hover:text-blue-500 transition-colors">{subject}</a>
              <ChevronsRight className="text-green-500" />{" "}
              <a href={`/${subject}/${topic}`} className="hover:text-blue-500 transition-colors">{topic}</a>
            </h1>
          </div>
          

          {currentQuestions.map((question, index) => {
            const questionId = question._id;
            const isSubmitted = submitted[questionId];
            const selectedOption = selectedOptions[questionId];
            const isExplanationVisible = showExplanations[questionId];

            return (
              <div
                key={questionId}
                className="mb-4 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900/50 transition-colors duration-200"
              >
                <div className="flex items-start mb-4">
                  <span className="text-lg font-semibold mr-2 text-gray-800 dark:text-zinc-200">
                    {index + indexOfFirstQuestion + 1}.
                  </span>
                  <p className="text-lg text-gray-800 dark:text-zinc-200">
                    {question.questionText}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {question.options.map((option) => {
                    const isSelected = selectedOption === option.identifier;
                    const isCorrect = option.isCorrect;
                    const isWrongSelected = isSelected && !isCorrect;

                    let optionClasses =
                      "p-3 border rounded-md flex items-center transition-colors duration-200";
                    let textClasses = "text-gray-800 dark:text-zinc-200";

                    if (isSelected && isCorrect) {
                      // Show success state only for correct selected answer
                      optionClasses +=
                        " bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700";
                      textClasses = "text-green-800 dark:text-green-300";
                    } else if (isWrongSelected) {
                      // Only disable the wrong selected option
                      optionClasses +=
                        " bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700 pointer-events-none";
                      textClasses = "text-red-800 dark:text-red-300";
                    } else if (isSelected) {
                      // Currently selected option
                      optionClasses +=
                        " bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600";
                    } else {
                      // All other options remain clickable
                      optionClasses +=
                        " hover:bg-gray-50 dark:hover:bg-zinc-700/50 border-gray-300 dark:border-zinc-600 cursor-pointer";
                    }

                    return (
                      <div
                        key={option.identifier}
                        className={optionClasses}
                        onClick={() => {
                          // Allow selection of new options even after wrong answer
                          if (!isWrongSelected) {
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
                      </div>
                    );
                  })}
                </div>

                {/* Always visible Show Explanation button */}
                <button
                  onClick={() => toggleExplanation(questionId)}
                  className={`p-2 cursor-pointer  rounded-md transition-colors duration-200 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 hover:bg-gray-300 dark:hover:bg-zinc-600`}
                >
                  {isExplanationVisible ? (
                    <Notebook size={18} />
                  ) : (
                    <BookOpen size={18} />
                  )}
                </button>

                {isExplanationVisible && question.explanation && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded">
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      Explanation:
                    </h3>
                    <div className="text-gray-700 dark:text-yellow-100">
                      {renderSmart(question.explanation)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <div className="text-sm text-gray-700 dark:text-zinc-300">
                Questions {indexOfFirstQuestion + 1}-
                {Math.min(indexOfLastQuestion, questions.length)} of{" "}
                {questions.length}
              </div>

              <nav className="flex items-center gap-1">
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                  «
                </button>
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                  ‹
                </button>

                {getVisiblePages().map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md border transition-colors duration-200 ${
                      currentPage === number
                        ? "bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700"
                        : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                  ›
                </button>
                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                  »
                </button>
              </nav>
            </div>
          )}
        </div>
        <div className="w-1/3 h-[85vh] mt-10 sticky top-10 shadow-lg rounded-xl bg-white dark:bg-zinc-800 p-6 overflow-y-auto">
          <div className=" dark:bg-zinc-800 mb-4 ">
            <h2 className="text-xl  text-gray-600 dark:text-zinc-200 mb-2">
              Quick Links
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="flex items-center cursor-pointer">
                  <h3 className="text-md font-medium text-gray-700 dark:text-zinc-300">
                    Aptitude
                  </h3>
                  <ChevronDownIcon className="w-5 h-5 ml-2 transform dark:text-gray-300 group-open:rotate-180 transition-transform duration-200" />
                </summary>

                <ul className="mt-4 space-y-2 pl-4">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Problems On Train
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <BookCopy className="w-4 h-4 mr-2" />
                      Probability
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <BookAIcon className="w-4 h-4 mr-2" />
                      Permutation and Combination
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <Notebook className="w-4 h-4 mr-2" />
                      Simple Interest
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
          <hr className="text-gray-200 dark:text-zinc-700" />
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl  text-gray-600 dark:text-zinc-200">
                Problem Solving Workspace
              </h2>
              <button
                className="p-2 text-sm bg-red-100 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50"
                onClick={() => {
                  // Clear workspace
                  const workspace =
                    document.getElementById("keyboard-workspace");
                  if (workspace) workspace.value = "";
                }}
              >
                Clear
              </button>
            </div>

            {/* Keyboard Workspace */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Solution Approach
              </h3>
              <textarea
                id="keyboard-workspace"
                className="w-full h-[calc(70vh-180px)] p-3 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 font-mono text-sm"
                placeholder="Type your solution approach here..."
                spellCheck="false"
              />
            </div>
          </div>
        </div>{" "}
      </div>
    </Layout>
  );
};

export default QuestionsPage;
