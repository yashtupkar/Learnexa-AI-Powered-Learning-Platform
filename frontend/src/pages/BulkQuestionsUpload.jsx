// // import React, { useState, useRef, useContext } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';
// // import { Upload, X, Plus, Trash2 } from 'lucide-react';
// // import { AppContext } from '../context/AppContext';
// // import Layout from '../components/layouts/layout';

// // const BulkQuestionUpload = () => {
// //   const [questions, setQuestions] = useState([
// //     {
// //       questionType: 'standard',
// //       questionText: '',
// //       subject: 'aptitude',
// //       category: '',
// //       options: [
// //         { identifier: 'A', text: '', isCorrect: false },
// //         { identifier: 'B', text: '', isCorrect: false },
// //         { identifier: 'C', text: '', isCorrect: false },
// //         { identifier: 'D', text: '', isCorrect: false },
// //       ],
// //       correctAnswer: '',
// //       explanation: '',
// //       diagrams: [],
// //       hasDiagram: false
// //     }
// //   ]);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');
// //     const fileInputRefs = useRef([]);
// //     const {backend_URL} = useContext(AppContext)

// //   const handleQuestionTypeChange = (index, type) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[index].questionType = type;
    
// //     // Reset fields when switching types
// //     if (type === 'reading-comprehension') {
// //       updatedQuestions[index] = {
// //         ...updatedQuestions[index],
// //         passage: '',
// //         passageTitle: '',
// //         questions: [{
// //           questionText: '',
// //           options: [
// //             { identifier: 'A', text: '', isCorrect: false },
// //             { identifier: 'B', text: '', isCorrect: false },
// //             { identifier: 'C', text: '', isCorrect: false },
// //             { identifier: 'D', text: '', isCorrect: false },
// //           ],
// //           correctAnswer: '',
// //           explanation: ''
// //         }],
// //         // Clear standard question fields
// //         questionText: '',
// //         options: [],
// //         correctAnswer: '',
// //         explanation: ''
// //       };
// //     } else {
// //       updatedQuestions[index] = {
// //         ...updatedQuestions[index],
// //         questionText: '',
// //         options: [
// //           { identifier: 'A', text: '', isCorrect: false },
// //           { identifier: 'B', text: '', isCorrect: false },
// //           { identifier: 'C', text: '', isCorrect: false },
// //           { identifier: 'D', text: '', isCorrect: false },
// //         ],
// //         correctAnswer: '',
// //         explanation: '',
// //         // Clear reading comprehension fields
// //         passage: '',
// //         passageTitle: '',
// //         questions: []
// //       };
// //     }
    
// //     setQuestions(updatedQuestions);
// //   };

// //   const handleInputChange = (index, field, value) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[index][field] = value;
// //     setQuestions(updatedQuestions);
// //   };

// //   const handleOptionChange = (qIndex, optIndex, field, value) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].options[optIndex][field] = value;
    
// //     // Update isCorrect based on correctAnswer if needed
// //     if (field === 'identifier' && updatedQuestions[qIndex].options[optIndex].isCorrect) {
// //       updatedQuestions[qIndex].correctAnswer = value;
// //     }
    
// //     setQuestions(updatedQuestions);
// //   };

// //   const handleCorrectAnswerChange = (qIndex, answer) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].correctAnswer = answer;
    
// //     // Update isCorrect flags for options
// //     updatedQuestions[qIndex].options.forEach(opt => {
// //       opt.isCorrect = opt.identifier === answer;
// //     });
    
// //     setQuestions(updatedQuestions);
// //   };

// //   const handlePassageQuestionChange = (qIndex, pqIndex, field, value) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].questions[pqIndex][field] = value;
// //     setQuestions(updatedQuestions);
// //   };

// //   const handlePassageOptionChange = (qIndex, pqIndex, optIndex, field, value) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].questions[pqIndex].options[optIndex][field] = value;
    
// //     // Update isCorrect based on correctAnswer if needed
// //     if (field === 'identifier' &&
// //         updatedQuestions[qIndex].questions[pqIndex].options[optIndex].isCorrect) {
// //       updatedQuestions[qIndex].questions[pqIndex].correctAnswer = value;
// //     }
    
// //     setQuestions(updatedQuestions);
// //   };

// //   const handlePassageCorrectAnswerChange = (qIndex, pqIndex, answer) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].questions[pqIndex].correctAnswer = answer;
    
// //     // Update isCorrect flags for options
// //     updatedQuestions[qIndex].questions[pqIndex].options.forEach(opt => {
// //       opt.isCorrect = opt.identifier === answer;
// //     });
    
// //     setQuestions(updatedQuestions);
// //   };

// //   const addQuestion = () => {
// //     setQuestions([
// //       ...questions,
// //       {
// //         questionType: 'standard',
// //         questionText: '',
// //         subject: 'aptitude',
// //         category: '',
// //         options: [
// //           { identifier: 'A', text: '', isCorrect: false },
// //           { identifier: 'B', text: '', isCorrect: false },
// //           { identifier: 'C', text: '', isCorrect: false },
// //           { identifier: 'D', text: '', isCorrect: false },
// //         ],
// //         correctAnswer: '',
// //         explanation: '',
// //         diagrams: [],
// //         hasDiagram: false
// //       }
// //     ]);
// //   };

// //   const addPassageQuestion = (qIndex) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].questions.push({
// //       questionText: '',
// //       options: [
// //         { identifier: 'A', text: '', isCorrect: false },
// //         { identifier: 'B', text: '', isCorrect: false },
// //         { identifier: 'C', text: '', isCorrect: false },
// //         { identifier: 'D', text: '', isCorrect: false },
// //       ],
// //       correctAnswer: '',
// //       explanation: ''
// //     });
// //     setQuestions(updatedQuestions);
// //   };

// //   const removeQuestion = (index) => {
// //     if (questions.length <= 1) return;
// //     const updatedQuestions = [...questions];
// //     updatedQuestions.splice(index, 1);
// //     setQuestions(updatedQuestions);
// //   };

// //   const removePassageQuestion = (qIndex, pqIndex) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].questions.splice(pqIndex, 1);
// //     setQuestions(updatedQuestions);
// //   };

// //   const handleImageUpload = async (e, qIndex) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     setIsUploading(true);
    
// //     try {
// //       const formData = new FormData();
// //       formData.append('image', file);
      
// //       // Replace with your actual image upload endpoint
// //       const response = await axios.post(`${backend_URL}/upload`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       });
      
// //       const imageUrl = response.data.url;
      
// //       const updatedQuestions = [...questions];
// //       if (!updatedQuestions[qIndex].diagrams) {
// //         updatedQuestions[qIndex].diagrams = [];
// //       }
// //       updatedQuestions[qIndex].diagrams.push({
// //         url: imageUrl,
// //         caption: ''
// //       });
// //       updatedQuestions[qIndex].hasDiagram = true;
      
// //       setQuestions(updatedQuestions);
// //       setSuccessMessage('Image uploaded successfully!');
// //       setTimeout(() => setSuccessMessage(''), 3000);
// //     } catch (error) {
// //       console.error('Image upload failed:', error);
// //       setErrorMessage('Failed to upload image');
// //       setTimeout(() => setErrorMessage(''), 3000);
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   const handleDiagramCaptionChange = (qIndex, dIndex, caption) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].diagrams[dIndex].caption = caption;
// //     setQuestions(updatedQuestions);
// //   };

// //   const removeDiagram = (qIndex, dIndex) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].diagrams.splice(dIndex, 1);
// //     updatedQuestions[qIndex].hasDiagram = updatedQuestions[qIndex].diagrams.length > 0;
// //     setQuestions(updatedQuestions);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsUploading(true);
// //     setErrorMessage('');
// //     setSuccessMessage('');
    
// //     try {
// //       // Validate questions before submission
// //       const isValid = questions.every((q, qIndex) => {
// //         if (q.questionType === 'standard') {
// //           return (
// //             q.questionText.trim() &&
// //             q.subject &&
// //             q.category.trim() &&
// //             q.options.every(opt => opt.text.trim()) &&
// //             q.correctAnswer &&
// //             q.explanation.trim()
// //           );
// //         } else if (q.questionType === 'reading-comprehension') {
// //           return (
// //             q.passage.trim() &&
// //             q.passageTitle.trim() &&
// //             q.questions.length > 0 &&
// //             q.questions.every(pq => (
// //               pq.questionText.trim() &&
// //               pq.options.every(opt => opt.text.trim()) &&
// //               pq.correctAnswer &&
// //               pq.explanation.trim()
// //             )
// //           ));
// //         }
// //         return false;
// //       });
      
// //       if (!isValid) {
// //         throw new Error('Please fill all required fields for all questions');
// //       }
      
// //       const response = await axios.post(`${backend_URL}/api/questions/bulk-upload`, questions);

      
// //       setSuccessMessage(`${response.data.questions.length} questions added successfully!`);
// //       setTimeout(() => setSuccessMessage(''), 5000);
      
// //       // Reset form after successful submission
// //       setQuestions([
// //         {
// //           questionType: 'standard',
// //           questionText: '',
// //           subject: 'aptitude',
// //           category: '',
// //           options: [
// //             { identifier: 'A', text: '', isCorrect: false },
// //             { identifier: 'B', text: '', isCorrect: false },
// //             { identifier: 'C', text: '', isCorrect: false },
// //             { identifier: 'D', text: '', isCorrect: false },
// //           ],
// //           correctAnswer: '',
// //           explanation: '',
// //           diagrams: [],
// //           hasDiagram: false
// //         }
// //       ]);
// //     } catch (error) {
// //       console.error('Failed to submit questions:', error);
// //       setErrorMessage(error.response?.data?.error || error.message || 'Failed to submit questions');
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //     return (
// //       <Layout>
// //         <div className="container mx-auto px-4 py-8">
// //           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
// //             Bulk Question Upload
// //           </h1>

// //           {successMessage && (
// //             <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
// //               {successMessage}
// //             </div>
// //           )}

// //           {errorMessage && (
// //             <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
// //               {errorMessage}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {questions.map((question, qIndex) => (
// //               <div
// //                 key={qIndex}
// //                 className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
// //               >
// //                 <div className="flex justify-between items-center mb-4">
// //                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
// //                     Question {qIndex + 1}
// //                   </h2>
// //                   {questions.length > 1 && (
// //                     <button
// //                       type="button"
// //                       onClick={() => removeQuestion(qIndex)}
// //                       className="text-red-500 hover:text-red-700"
// //                     >
// //                       <Trash2 size={20} />
// //                     </button>
// //                   )}
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                     Question Type
// //                   </label>
// //                   <div className="flex space-x-4">
// //                     <label className="inline-flex items-center">
// //                       <input
// //                         type="radio"
// //                         className="form-radio"
// //                         name={`questionType-${qIndex}`}
// //                         value="standard"
// //                         checked={question.questionType === "standard"}
// //                         onChange={() =>
// //                           handleQuestionTypeChange(qIndex, "standard")
// //                         }
// //                       />
// //                       <span className="ml-2 dark:text-white">
// //                         Standard Question
// //                       </span>
// //                     </label>
// //                     <label className="inline-flex items-center">
// //                       <input
// //                         type="radio"
// //                         className="form-radio"
// //                         name={`questionType-${qIndex}`}
// //                         value="reading-comprehension"
// //                         checked={
// //                           question.questionType === "reading-comprehension"
// //                         }
// //                         onChange={() =>
// //                           handleQuestionTypeChange(
// //                             qIndex,
// //                             "reading-comprehension"
// //                           )
// //                         }
// //                       />
// //                       <span className="ml-2 dark:text-white">
// //                         Reading Comprehension
// //                       </span>
// //                     </label>
// //                   </div>
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                     Subject
// //                   </label>
// //                   <select
// //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                     value={question.subject}
// //                     onChange={(e) =>
// //                       handleInputChange(qIndex, "subject", e.target.value)
// //                     }
// //                   >
// //                     <option value="aptitude">Aptitude</option>
// //                     <option value="logical-reasoning">Logical Reasoning</option>
// //                     <option value="verbal-reasoning">Verbal Reasoning</option>
// //                     <option value="non-verbal-reasoning">Non-Verbal Reasoning</option>
// //                     <option value="verbal-ability">Verbal Ability</option>
// //                     <option value="reading-comprehension">
// //                       Reading Comprehension
// //                     </option>
// //                   </select>
// //                 </div>

// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                     Category
// //                   </label>
// //                   <input
// //                     type="text"
// //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                     value={question.category}
// //                     onChange={(e) =>
// //                       handleInputChange(qIndex, "category", e.target.value)
// //                     }
// //                     placeholder="E.g., Number Systems, Blood Relations"
// //                     required
// //                   />
// //                 </div>

// //                 {question.questionType === "standard" ? (
// //                   <>
// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Question Text
// //                       </label>
// //                       <textarea
// //                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         rows={3}
// //                         value={question.questionText}
// //                         onChange={(e) =>
// //                           handleInputChange(
// //                             qIndex,
// //                             "questionText",
// //                             e.target.value
// //                           )
// //                         }
// //                         required
// //                       />
// //                     </div>

// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Options
// //                       </label>
// //                       {question.options.map((option, optIndex) => (
// //                         <div key={optIndex} className="flex items-center mb-2">
// //                           <input
// //                             type="text"
// //                             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                             value={option.text}
// //                             onChange={(e) =>
// //                               handleOptionChange(
// //                                 qIndex,
// //                                 optIndex,
// //                                 "text",
// //                                 e.target.value
// //                               )
// //                             }
// //                             placeholder={`Option ${option.identifier}`}
// //                             required
// //                           />
// //                           <input
// //                             type="radio"
// //                             name={`correctAnswer-${qIndex}`}
// //                             className="ml-4"
// //                             checked={option.isCorrect}
// //                             onChange={() =>
// //                               handleCorrectAnswerChange(
// //                                 qIndex,
// //                                 option.identifier
// //                               )
// //                             }
// //                           />
// //                           <span className="ml-2 dark:text-white">Correct</span>
// //                         </div>
// //                       ))}
// //                     </div>

// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Correct Answer
// //                       </label>
// //                       <select
// //                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         value={question.correctAnswer}
// //                         onChange={(e) =>
// //                           handleCorrectAnswerChange(qIndex, e.target.value)
// //                         }
// //                         required
// //                       >
// //                         <option value="">Select correct answer</option>
// //                         {question.options.map((opt) => (
// //                           <option key={opt.identifier} value={opt.identifier}>
// //                             Option {opt.identifier}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Explanation
// //                       </label>
// //                       <textarea
// //                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         rows={3}
// //                         value={question.explanation}
// //                         onChange={(e) =>
// //                           handleInputChange(
// //                             qIndex,
// //                             "explanation",
// //                             e.target.value
// //                           )
// //                         }
// //                         required
// //                       />
// //                     </div>

// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Solution (Optional)
// //                       </label>
// //                       <textarea
// //                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         rows={2}
// //                         value={question.solution || ""}
// //                         onChange={(e) =>
// //                           handleInputChange(qIndex, "solution", e.target.value)
// //                         }
// //                       />
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Passage Title
// //                       </label>
// //                       <input
// //                         type="text"
// //                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         value={question.passageTitle}
// //                         onChange={(e) =>
// //                           handleInputChange(
// //                             qIndex,
// //                             "passageTitle",
// //                             e.target.value
// //                           )
// //                         }
// //                         required
// //                       />
// //                     </div>

// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Passage
// //                       </label>
// //                       <textarea
// //                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         rows={6}
// //                         value={question.passage}
// //                         onChange={(e) =>
// //                           handleInputChange(qIndex, "passage", e.target.value)
// //                         }
// //                         required
// //                       />
// //                     </div>

// //                     <div className="mb-4">
// //                       <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                         Questions for this Passage
// //                       </label>

// //                       {question.questions.map((pq, pqIndex) => (
// //                         <div
// //                           key={pqIndex}
// //                           className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
// //                         >
// //                           <div className="flex justify-between items-center mb-2">
// //                             <h3 className="font-medium dark:text-white">
// //                               Question {pqIndex + 1}
// //                             </h3>
// //                             {question.questions.length > 1 && (
// //                               <button
// //                                 type="button"
// //                                 onClick={() =>
// //                                   removePassageQuestion(qIndex, pqIndex)
// //                                 }
// //                                 className="text-red-500 hover:text-red-700"
// //                               >
// //                                 <Trash2 size={18} />
// //                               </button>
// //                             )}
// //                           </div>

// //                           <div className="mb-3">
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
// //                               Question Text
// //                             </label>
// //                             <textarea
// //                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                               rows={2}
// //                               value={pq.questionText}
// //                               onChange={(e) =>
// //                                 handlePassageQuestionChange(
// //                                   qIndex,
// //                                   pqIndex,
// //                                   "questionText",
// //                                   e.target.value
// //                                 )
// //                               }
// //                               required
// //                             />
// //                           </div>

// //                           <div className="mb-3">
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
// //                               Options
// //                             </label>
// //                             {pq.options.map((option, optIndex) => (
// //                               <div
// //                                 key={optIndex}
// //                                 className="flex items-center mb-2"
// //                               >
// //                                 <input
// //                                   type="text"
// //                                   className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                                   value={option.text}
// //                                   onChange={(e) =>
// //                                     handlePassageOptionChange(
// //                                       qIndex,
// //                                       pqIndex,
// //                                       optIndex,
// //                                       "text",
// //                                       e.target.value
// //                                     )
// //                                   }
// //                                   placeholder={`Option ${option.identifier}`}
// //                                   required
// //                                 />
// //                                 <input
// //                                   type="radio"
// //                                   name={`passageCorrectAnswer-${qIndex}-${pqIndex}`}
// //                                   className="ml-4"
// //                                   checked={option.isCorrect}
// //                                   onChange={() =>
// //                                     handlePassageCorrectAnswerChange(
// //                                       qIndex,
// //                                       pqIndex,
// //                                       option.identifier
// //                                     )
// //                                   }
// //                                 />
// //                                 <span className="ml-2 dark:text-white">
// //                                   Correct
// //                                 </span>
// //                               </div>
// //                             ))}
// //                           </div>

// //                           <div className="mb-3">
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
// //                               Correct Answer
// //                             </label>
// //                             <select
// //                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                               value={pq.correctAnswer}
// //                               onChange={(e) =>
// //                                 handlePassageCorrectAnswerChange(
// //                                   qIndex,
// //                                   pqIndex,
// //                                   e.target.value
// //                                 )
// //                               }
// //                               required
// //                             >
// //                               <option value="">Select correct answer</option>
// //                               {pq.options.map((opt) => (
// //                                 <option
// //                                   key={opt.identifier}
// //                                   value={opt.identifier}
// //                                 >
// //                                   Option {opt.identifier}
// //                                 </option>
// //                               ))}
// //                             </select>
// //                           </div>

// //                           <div className="mb-3">
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
// //                               Explanation
// //                             </label>
// //                             <textarea
// //                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                               rows={2}
// //                               value={pq.explanation}
// //                               onChange={(e) =>
// //                                 handlePassageQuestionChange(
// //                                   qIndex,
// //                                   pqIndex,
// //                                   "explanation",
// //                                   e.target.value
// //                                 )
// //                               }
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                       ))}

// //                       <button
// //                         type="button"
// //                         onClick={() => addPassageQuestion(qIndex)}
// //                         className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
// //                       >
// //                         <Plus size={16} className="mr-1" />
// //                         Add Question to Passage
// //                       </button>
// //                     </div>
// //                   </>
// //                 )}

// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                     Diagrams/Images
// //                   </label>

// //                   {question.diagrams?.map((diagram, dIndex) => (
// //                     <div
// //                       key={dIndex}
// //                       className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
// //                     >
// //                       <div className="flex items-center mb-2">
// //                         <img
// //                           src={diagram.url}
// //                           alt="Diagram"
// //                           className="h-20 w-auto object-contain mr-3"
// //                         />
// //                         <input
// //                           type="text"
// //                           className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                           value={diagram.caption}
// //                           onChange={(e) =>
// //                             handleDiagramCaptionChange(
// //                               qIndex,
// //                               dIndex,
// //                               e.target.value
// //                             )
// //                           }
// //                           placeholder="Caption for this image"
// //                         />
// //                         <button
// //                           type="button"
// //                           onClick={() => removeDiagram(qIndex, dIndex)}
// //                           className="ml-2 text-red-500 hover:text-red-700"
// //                         >
// //                           <Trash2 size={18} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}

// //                   <div className="mt-2">
// //                     <input
// //                       type="file"
// //                       ref={(el) => (fileInputRefs.current[qIndex] = el)}
// //                       onChange={(e) => handleImageUpload(e, qIndex)}
// //                       accept="image/*"
// //                       className="hidden"
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => fileInputRefs.current[qIndex]?.click()}
// //                       disabled={isUploading}
// //                       className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
// //                     >
// //                       <Upload size={16} className="mr-2" />
// //                       {isUploading ? "Uploading..." : "Upload Image"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}

// //             <div className="flex justify-between">
// //               <button
// //                 type="button"
// //                 onClick={addQuestion}
// //                 className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //               >
// //                 <Plus size={16} className="mr-2" />
// //                 Add Another Question
// //               </button>

// //               <button
// //                 type="submit"
// //                 disabled={isUploading}
// //                 className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {isUploading ? "Submitting..." : "Submit All Questions"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </Layout>
// //     );
// // };

// // export default BulkQuestionUpload;


// import React, { useState, useRef, useContext, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Upload, X, Plus, Trash2 } from "lucide-react";
// import { AppContext } from "../context/AppContext";
// import Layout from "../components/layouts/layout";

// const BulkQuestionUpload = () => {
//   const [questions, setQuestions] = useState([
//     {
//       questionType: "standard",
//       questionText: "",
//       subject: "aptitude",
//       category: "",
//       options: [
//         { identifier: "A", text: "", isCorrect: false },
//         { identifier: "B", text: "", isCorrect: false },
//         { identifier: "C", text: "", isCorrect: false },
//         { identifier: "D", text: "", isCorrect: false },
//       ],
//       correctAnswer: "",
//       explanation: "",
//       diagrams: [],
//       hasDiagram: false,
//     },
//   ]);

//   const [isUploading, setIsUploading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadingQuestionIndex, setUploadingQuestionIndex] = useState(null);
//   const [previewUrls, setPreviewUrls] = useState({});

//   const fileInputRefs = useRef([]);
//   const { backend_URL } = useContext(AppContext);

//   // Cleanup preview URLs on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(previewUrls).forEach((url) => {
//         if (url && typeof url === "string" && url.startsWith("blob:")) {
//           URL.revokeObjectURL(url);
//         }
//       });
//     };
//   }, []);

//   const handleQuestionTypeChange = (index, type) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].questionType = type;

//     if (type === "reading-comprehension") {
//       updatedQuestions[index] = {
//         ...updatedQuestions[index],
//         passage: "",
//         passageTitle: "",
//         questions: [
//           {
//             questionText: "",
//             options: [
//               { identifier: "A", text: "", isCorrect: false },
//               { identifier: "B", text: "", isCorrect: false },
//               { identifier: "C", text: "", isCorrect: false },
//               { identifier: "D", text: "", isCorrect: false },
//             ],
//             correctAnswer: "",
//             explanation: "",
//           },
//         ],
//         questionText: "",
//         options: [],
//         correctAnswer: "",
//         explanation: "",
//       };
//     } else {
//       updatedQuestions[index] = {
//         ...updatedQuestions[index],
//         questionText: "",
//         options: [
//           { identifier: "A", text: "", isCorrect: false },
//           { identifier: "B", text: "", isCorrect: false },
//           { identifier: "C", text: "", isCorrect: false },
//           { identifier: "D", text: "", isCorrect: false },
//         ],
//         correctAnswer: "",
//         explanation: "",
//         passage: "",
//         passageTitle: "",
//         questions: [],
//       };
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (qIndex, optIndex, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options[optIndex][field] = value;

//     if (
//       field === "identifier" &&
//       updatedQuestions[qIndex].options[optIndex].isCorrect
//     ) {
//       updatedQuestions[qIndex].correctAnswer = value;
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handleCorrectAnswerChange = (qIndex, answer) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].correctAnswer = answer;

//     updatedQuestions[qIndex].options.forEach((opt) => {
//       opt.isCorrect = opt.identifier === answer;
//     });

//     setQuestions(updatedQuestions);
//   };

//   const handlePassageQuestionChange = (qIndex, pqIndex, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].questions[pqIndex][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handlePassageOptionChange = (
//     qIndex,
//     pqIndex,
//     optIndex,
//     field,
//     value
//   ) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].questions[pqIndex].options[optIndex][field] =
//       value;

//     if (
//       field === "identifier" &&
//       updatedQuestions[qIndex].questions[pqIndex].options[optIndex].isCorrect
//     ) {
//       updatedQuestions[qIndex].questions[pqIndex].correctAnswer = value;
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handlePassageCorrectAnswerChange = (qIndex, pqIndex, answer) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].questions[pqIndex].correctAnswer = answer;

//     updatedQuestions[qIndex].questions[pqIndex].options.forEach((opt) => {
//       opt.isCorrect = opt.identifier === answer;
//     });

//     setQuestions(updatedQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         questionType: "standard",
//         questionText: "",
//         subject: "aptitude",
//         category: "",
//         options: [
//           { identifier: "A", text: "", isCorrect: false },
//           { identifier: "B", text: "", isCorrect: false },
//           { identifier: "C", text: "", isCorrect: false },
//           { identifier: "D", text: "", isCorrect: false },
//         ],
//         correctAnswer: "",
//         explanation: "",
//         diagrams: [],
//         hasDiagram: false,
//       },
//     ]);
//   };

//   const addPassageQuestion = (qIndex) => {
//     const updatedQuestions = [...questions];
//     if (!updatedQuestions[qIndex].questions) {
//       updatedQuestions[qIndex].questions = [];
//     }
//     updatedQuestions[qIndex].questions.push({
//       questionText: "",
//       options: [
//         { identifier: "A", text: "", isCorrect: false },
//         { identifier: "B", text: "", isCorrect: false },
//         { identifier: "C", text: "", isCorrect: false },
//         { identifier: "D", text: "", isCorrect: false },
//       ],
//       correctAnswer: "",
//       explanation: "",
//     });
//     setQuestions(updatedQuestions);
//   };

//   const removeQuestion = (index) => {
//     if (questions.length <= 1) return;

//     // Clean up preview URL for this question
//     if (previewUrls[index]) {
//       URL.revokeObjectURL(previewUrls[index]);
//     }

//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(index, 1);
//     setQuestions(updatedQuestions);

//     // Clean up and reindex preview URLs
//     const updatedPreviewUrls = { ...previewUrls };
//     delete updatedPreviewUrls[index];

//     const reindexedPreviewUrls = {};
//     Object.keys(updatedPreviewUrls).forEach((key) => {
//       const numKey = parseInt(key);
//       if (numKey > index) {
//         reindexedPreviewUrls[numKey - 1] = updatedPreviewUrls[key];
//       } else if (numKey < index) {
//         reindexedPreviewUrls[key] = updatedPreviewUrls[key];
//       }
//     });
//     setPreviewUrls(reindexedPreviewUrls);
//   };

//   const removePassageQuestion = (qIndex, pqIndex) => {
//     const updatedQuestions = [...questions];
//     if (
//       updatedQuestions[qIndex].questions &&
//       updatedQuestions[qIndex].questions.length > pqIndex
//     ) {
//       updatedQuestions[qIndex].questions.splice(pqIndex, 1);
//       setQuestions(updatedQuestions);
//     }
//   };

//   const handleImageUpload = async (e, qIndex) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       setErrorMessage("Please select a valid image file");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     // Validate file size (max 5MB)
//     const maxSize = 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       setErrorMessage("Image file size should be less than 5MB");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     // Create preview
//     const localUrl = URL.createObjectURL(file);
//     setPreviewUrls((prev) => ({
//       ...prev,
//       [qIndex]: localUrl,
//     }));

//     // Start upload
//     setUploadingQuestionIndex(qIndex);
//     setIsUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(`${backend_URL}/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const { url } = response.data;

//       const updatedQuestions = [...questions];
//       if (!updatedQuestions[qIndex].diagrams) {
//         updatedQuestions[qIndex].diagrams = [];
//       }

//       updatedQuestions[qIndex].diagrams.push({
//         url: url,
//         caption: "",
//       });
//       updatedQuestions[qIndex].hasDiagram = true;

//       setQuestions(updatedQuestions);

//       // Clean up preview
//       URL.revokeObjectURL(localUrl);
//       setPreviewUrls((prev) => {
//         const updated = { ...prev };
//         delete updated[qIndex];
//         return updated;
//       });

//       setSuccessMessage("Image uploaded successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Image upload failed:", error);

//       // Clean up preview on error
//       URL.revokeObjectURL(localUrl);
//       setPreviewUrls((prev) => {
//         const updated = { ...prev };
//         delete updated[qIndex];
//         return updated;
//       });

//       const errorMsg =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to upload image";
//       setErrorMessage(errorMsg);
//       setTimeout(() => setErrorMessage(""), 3000);
//     } finally {
//       setIsUploading(false);
//       setUploadingQuestionIndex(null);

//       // Reset file input
//       if (fileInputRefs.current[qIndex]) {
//         fileInputRefs.current[qIndex].value = "";
//       }
//     }
//   };

//   const handleDiagramCaptionChange = (qIndex, dIndex, caption) => {
//     const updatedQuestions = [...questions];
//     if (
//       updatedQuestions[qIndex].diagrams &&
//       updatedQuestions[qIndex].diagrams[dIndex]
//     ) {
//       updatedQuestions[qIndex].diagrams[dIndex].caption = caption;
//       setQuestions(updatedQuestions);
//     }
//   };

//   const removeDiagram = (qIndex, dIndex) => {
//     const updatedQuestions = [...questions];
//     if (
//       updatedQuestions[qIndex].diagrams &&
//       updatedQuestions[qIndex].diagrams.length > dIndex
//     ) {
//       updatedQuestions[qIndex].diagrams.splice(dIndex, 1);
//       updatedQuestions[qIndex].hasDiagram =
//         updatedQuestions[qIndex].diagrams.length > 0;
//       setQuestions(updatedQuestions);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Don't allow submission if images are still uploading
//     if (Object.keys(previewUrls).length > 0) {
//       setErrorMessage("Please wait for all images to finish uploading");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     setIsUploading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       // Validate questions
//       const isValid = questions.every((q) => {
//         if (q.questionType === "standard") {
//           return (
//             q.questionText.trim() &&
//             q.subject &&
//             q.category.trim() &&
//             q.options.every((opt) => opt.text.trim()) &&
//             q.correctAnswer &&
//             q.explanation.trim()
//           );
//         } else if (q.questionType === "reading-comprehension") {
//           return (
//             q.passage &&
//             q.passage.trim() &&
//             q.passageTitle &&
//             q.passageTitle.trim() &&
//             q.questions &&
//             q.questions.length > 0 &&
//             q.questions.every(
//               (pq) =>
//                 pq.questionText.trim() &&
//                 pq.options.every((opt) => opt.text.trim()) &&
//                 pq.correctAnswer &&
//                 pq.explanation.trim()
//             )
//           );
//         }
//         return false;
//       });

//       if (!isValid) {
//         throw new Error("Please fill all required fields for all questions");
//       }

//       const response = await axios.post(
//         `${backend_URL}/api/questions/bulk-upload`,
//         questions
//       );

//       setSuccessMessage(
//         `${response.data.questions.length} questions added successfully!`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);

//       // Reset form
//       setQuestions([
//         {
//           questionType: "standard",
//           questionText: "",
//           subject: "aptitude",
//           category: "",
//           options: [
//             { identifier: "A", text: "", isCorrect: false },
//             { identifier: "B", text: "", isCorrect: false },
//             { identifier: "C", text: "", isCorrect: false },
//             { identifier: "D", text: "", isCorrect: false },
//           ],
//           correctAnswer: "",
//           explanation: "",
//           diagrams: [],
//           hasDiagram: false,
//         },
//       ]);

//       // Clean up any remaining preview URLs
//       Object.values(previewUrls).forEach((url) => {
//         if (url && typeof url === "string" && url.startsWith("blob:")) {
//           URL.revokeObjectURL(url);
//         }
//       });
//       setPreviewUrls({});
//     } catch (error) {
//       console.error("Failed to submit questions:", error);
//       setErrorMessage(
//         error.response?.data?.error ||
//           error.message ||
//           "Failed to submit questions"
//       );
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
//           Bulk Question Upload
//         </h1>

//         {successMessage && (
//           <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//             {successMessage}
//           </div>
//         )}

//         {errorMessage && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {questions.map((question, qIndex) => (
//             <div
//               key={qIndex}
//               className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                   Question {qIndex + 1}
//                 </h2>
//                 {questions.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeQuestion(qIndex)}
//                     className="text-red-500 hover:text-red-700 p-1"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 )}
//               </div>

//               {/* Question Type */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Question Type
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       className="form-radio"
//                       name={`questionType-${qIndex}`}
//                       value="standard"
//                       checked={question.questionType === "standard"}
//                       onChange={() =>
//                         handleQuestionTypeChange(qIndex, "standard")
//                       }
//                     />
//                     <span className="ml-2 dark:text-white">
//                       Standard Question
//                     </span>
//                   </label>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       className="form-radio"
//                       name={`questionType-${qIndex}`}
//                       value="reading-comprehension"
//                       checked={
//                         question.questionType === "reading-comprehension"
//                       }
//                       onChange={() =>
//                         handleQuestionTypeChange(
//                           qIndex,
//                           "reading-comprehension"
//                         )
//                       }
//                     />
//                     <span className="ml-2 dark:text-white">
//                       Reading Comprehension
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               {/* Subject */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Subject
//                 </label>
//                 <select
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   value={question.subject}
//                   onChange={(e) =>
//                     handleInputChange(qIndex, "subject", e.target.value)
//                   }
//                 >
//                   <option value="aptitude">Aptitude</option>
//                   <option value="logical-reasoning">Logical Reasoning</option>
//                   <option value="verbal-reasoning">Verbal Reasoning</option>
//                   <option value="non-verbal-reasoning">
//                     Non-Verbal Reasoning
//                   </option>
//                   <option value="verbal-ability">Verbal Ability</option>
//                   <option value="reading-comprehension">
//                     Reading Comprehension
//                   </option>
//                 </select>
//               </div>

//               {/* Category */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   value={question.category}
//                   onChange={(e) =>
//                     handleInputChange(qIndex, "category", e.target.value)
//                   }
//                   placeholder="E.g., Number Systems, Blood Relations"
//                   required
//                 />
//               </div>

//               {/* Question Content */}
//               {question.questionType === "standard" ? (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Question Text
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={3}
//                       value={question.questionText}
//                       onChange={(e) =>
//                         handleInputChange(
//                           qIndex,
//                           "questionText",
//                           e.target.value
//                         )
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Options
//                     </label>
//                     {question.options.map((option, optIndex) => (
//                       <div key={optIndex} className="flex items-center mb-2">
//                         <input
//                           type="text"
//                           className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                           value={option.text}
//                           onChange={(e) =>
//                             handleOptionChange(
//                               qIndex,
//                               optIndex,
//                               "text",
//                               e.target.value
//                             )
//                           }
//                           placeholder={`Option ${option.identifier}`}
//                           required
//                         />
//                         <input
//                           type="radio"
//                           name={`correctAnswer-${qIndex}`}
//                           className="ml-4"
//                           checked={option.isCorrect}
//                           onChange={() =>
//                             handleCorrectAnswerChange(qIndex, option.identifier)
//                           }
//                         />
//                         <span className="ml-2 dark:text-white">Correct</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Correct Answer
//                     </label>
//                     <select
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       value={question.correctAnswer}
//                       onChange={(e) =>
//                         handleCorrectAnswerChange(qIndex, e.target.value)
//                       }
//                       required
//                     >
//                       <option value="">Select correct answer</option>
//                       {question.options.map((opt) => (
//                         <option key={opt.identifier} value={opt.identifier}>
//                           Option {opt.identifier}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Explanation
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={3}
//                       value={question.explanation}
//                       onChange={(e) =>
//                         handleInputChange(qIndex, "explanation", e.target.value)
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Solution (Optional)
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={2}
//                       value={question.solution || ""}
//                       onChange={(e) =>
//                         handleInputChange(qIndex, "solution", e.target.value)
//                       }
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Passage Title
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       value={question.passageTitle || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           qIndex,
//                           "passageTitle",
//                           e.target.value
//                         )
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Passage
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={6}
//                       value={question.passage || ""}
//                       onChange={(e) =>
//                         handleInputChange(qIndex, "passage", e.target.value)
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Questions for this Passage
//                     </label>

//                     {question.questions &&
//                       question.questions.map((pq, pqIndex) => (
//                         <div
//                           key={pqIndex}
//                           className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
//                         >
//                           <div className="flex justify-between items-center mb-2">
//                             <h3 className="font-medium dark:text-white">
//                               Question {pqIndex + 1}
//                             </h3>
//                             {question.questions.length > 1 && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   removePassageQuestion(qIndex, pqIndex)
//                                 }
//                                 className="text-red-500 hover:text-red-700 p-1"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             )}
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Question Text
//                             </label>
//                             <textarea
//                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               rows={2}
//                               value={pq.questionText}
//                               onChange={(e) =>
//                                 handlePassageQuestionChange(
//                                   qIndex,
//                                   pqIndex,
//                                   "questionText",
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             />
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Options
//                             </label>
//                             {pq.options.map((option, optIndex) => (
//                               <div
//                                 key={optIndex}
//                                 className="flex items-center mb-2"
//                               >
//                                 <input
//                                   type="text"
//                                   className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                   value={option.text}
//                                   onChange={(e) =>
//                                     handlePassageOptionChange(
//                                       qIndex,
//                                       pqIndex,
//                                       optIndex,
//                                       "text",
//                                       e.target.value
//                                     )
//                                   }
//                                   placeholder={`Option ${option.identifier}`}
//                                   required
//                                 />
//                                 <input
//                                   type="radio"
//                                   name={`passageCorrectAnswer-${qIndex}-${pqIndex}`}
//                                   className="ml-4"
//                                   checked={option.isCorrect}
//                                   onChange={() =>
//                                     handlePassageCorrectAnswerChange(
//                                       qIndex,
//                                       pqIndex,
//                                       option.identifier
//                                     )
//                                   }
//                                 />
//                                 <span className="ml-2 dark:text-white">
//                                   Correct
//                                 </span>
//                               </div>
//                             ))}
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Correct Answer
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               value={pq.correctAnswer}
//                               onChange={(e) =>
//                                 handlePassageCorrectAnswerChange(
//                                   qIndex,
//                                   pqIndex,
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             >
//                               <option value="">Select correct answer</option>
//                               {pq.options.map((opt) => (
//                                 <option
//                                   key={opt.identifier}
//                                   value={opt.identifier}
//                                 >
//                                   Option {opt.identifier}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Explanation
//                             </label>
//                             <textarea
//                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               rows={2}
//                               value={pq.explanation}
//                               onChange={(e) =>
//                                 handlePassageQuestionChange(
//                                   qIndex,
//                                   pqIndex,
//                                   "explanation",
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             />
//                           </div>
//                         </div>
//                       ))}

//                     <button
//                       type="button"
//                       onClick={() => addPassageQuestion(qIndex)}
//                       className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//                     >
//                       <Plus size={16} className="mr-1" />
//                       Add Question to Passage
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Image Upload Section */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Diagrams/Images
//                 </label>

//                 {/* Preview while uploading */}
//                 {previewUrls[qIndex] && (
//                   <div className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
//                     <div className="flex items-center">
//                       <img
//                         src={previewUrls[qIndex]}
//                         alt="Preview"
//                         className="h-20 w-auto object-contain mr-3 rounded"
//                       />
//                       <div className="flex-1">
//                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                           Preview - Uploading...
//                         </p>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Uploaded diagrams */}
//                 {question.diagrams &&
//                   question.diagrams.length > 0 &&
//                   question.diagrams.map((diagram, dIndex) => (
//                     <div
//                       key={dIndex}
//                       className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20"
//                     >
//                       <div className="flex items-start mb-2">
//                         <img
//                           src={diagram.url}
//                           alt="Diagram"
//                           className="h-20 w-auto object-contain mr-3 rounded"
//                         />
//                         <div className="flex-1">
//                           <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                             value={diagram.caption || ""}
//                             onChange={(e) =>
//                               handleDiagramCaptionChange(
//                                 qIndex,
//                                 dIndex,
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Caption for this image"
//                           />
//                           <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//                             ✓ Successfully uploaded
//                           </p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeDiagram(qIndex, dIndex)}
//                           className="ml-2 text-red-500 hover:text-red-700 p-1"
//                           title="Remove image"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                 {/* Upload button */}
//                 <div className="mt-2">
//                   <input
//                     type="file"
//                     ref={(el) => (fileInputRefs.current[qIndex] = el)}
//                     onChange={(e) => handleImageUpload(e, qIndex)}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => fileInputRefs.current[qIndex]?.click()}
//                     disabled={uploadingQuestionIndex === qIndex}
//                     className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Upload size={16} className="mr-2" />
//                     {uploadingQuestionIndex === qIndex ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
//                         Uploading...
//                       </>
//                     ) : (
//                       "Upload Image"
//                     )}
//                   </button>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Form Actions */}
//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               onClick={addQuestion}
//               className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Another Question
//             </button>

//             <button
//               type="submit"
//               disabled={isUploading || Object.keys(previewUrls).length > 0}
//               className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isUploading ? "Submitting..." : "Submit All Questions"}
//             </button>
//           </div>

//           {/* Upload status indicator */}
//           {Object.keys(previewUrls).length > 0 && (
//             <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-md">
//               <p className="text-sm text-yellow-800 dark:text-yellow-200">
//                 ⏳ Please wait for all images to finish uploading before
//                 submitting the form.
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default BulkQuestionUpload;

// import React, { useState, useRef, useContext, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Upload, X, Plus, Trash2, Save, FileText } from "lucide-react";
// import { AppContext } from "../context/AppContext";
// import Layout from "../components/layouts/layout";

// const BulkQuestionUpload = () => {
//   // Subject-wise topics mapping with label and value
//   const subjectTopics = {
//     aptitude: [
//       { label: "Number Systems", value: "number-systems" },
//       { label: "Percentages", value: "percentages" },
//       { label: "Ratio and Proportion", value: "ratio-and-proportion" },
//       { label: "Time and Work", value: "time-and-work" },
//       { label: "Time, Speed and Distance", value: "time-speed-distance" },
//       {
//         label: "Simple Interest and Compound Interest",
//         value: "simple-compound-interest",
//       },
//       { label: "Profit and Loss", value: "profit-and-loss" },
//       { label: "Averages", value: "averages" },
//       { label: "Mixtures and Alligations", value: "mixtures-alligations" },
//       { label: "Pipes and Cisterns", value: "pipes-cisterns" },
//       { label: "Boats and Streams", value: "boats-streams" },
//       { label: "Ages", value: "ages" },
//       { label: "Calendars", value: "calendars" },
//       { label: "Clocks", value: "clocks" },
//       {
//         label: "Permutations and Combinations",
//         value: "permutations-combinations",
//       },
//       { label: "Probability", value: "probability" },
//       { label: "Geometry", value: "geometry" },
//       { label: "Mensuration", value: "mensuration" },
//       { label: "Data Interpretation", value: "data-interpretation" },
//       { label: "Algebra", value: "algebra" },
//     ],
//     "logical-reasoning": [
//       { label: "Blood Relations", value: "blood-relations" },
//       { label: "Direction Sense", value: "direction-sense" },
//       { label: "Coding-Decoding", value: "coding-decoding" },
//       { label: "Series Completion", value: "series-completion" },
//       { label: "Analogy", value: "analogy" },
//       { label: "Classification", value: "classification" },
//       { label: "Puzzles", value: "puzzles" },
//       { label: "Seating Arrangement", value: "seating-arrangement" },
//       { label: "Syllogism", value: "syllogism" },
//       { label: "Statement and Assumptions", value: "statement-assumptions" },
//       { label: "Statement and Conclusions", value: "statement-conclusions" },
//       { label: "Cause and Effect", value: "cause-effect" },
//       { label: "Courses of Action", value: "courses-action" },
//       { label: "Critical Reasoning", value: "critical-reasoning" },
//       { label: "Data Sufficiency", value: "data-sufficiency" },
//       { label: "Assertion and Reason", value: "assertion-reason" },
//       { label: "Mathematical Operations", value: "mathematical-operations" },
//       { label: "Alphabet Test", value: "alphabet-test" },
//       { label: "Number Ranking", value: "number-ranking" },
//       { label: "Inequality", value: "inequality" },
//     ],
//     "verbal-reasoning": [
//       { label: "Analogy", value: "analogy" },
//       { label: "Classification", value: "classification" },
//       { label: "Series Completion", value: "series-completion" },
//       { label: "Coding-Decoding", value: "coding-decoding" },
//       { label: "Blood Relations", value: "blood-relations" },
//       { label: "Direction Test", value: "direction-test" },
//       { label: "Logical Venn Diagrams", value: "logical-venn-diagrams" },
//       { label: "Alphabet Test", value: "alphabet-test" },
//       { label: "Sitting Arrangement", value: "sitting-arrangement" },
//       { label: "Mathematical Operations", value: "mathematical-operations" },
//       { label: "Arithmetic Reasoning", value: "arithmetic-reasoning" },
//       {
//         label: "Number, Ranking and Time Sequence",
//         value: "number-ranking-time-sequence",
//       },
//       { label: "Statements and Arguments", value: "statements-arguments" },
//       { label: "Statement and Assumptions", value: "statement-assumptions" },
//       { label: "Passage and Conclusions", value: "passage-conclusions" },
//       { label: "Cause and Effect", value: "cause-effect" },
//       { label: "Assertion and Reason", value: "assertion-reason" },
//       { label: "Course of Action", value: "course-action" },
//       { label: "Critical Reasoning", value: "critical-reasoning" },
//       { label: "Logical Deduction", value: "logical-deduction" },
//     ],
//     "non-verbal-reasoning": [
//       { label: "Series", value: "series" },
//       { label: "Analogy", value: "analogy" },
//       { label: "Classification", value: "classification" },
//       { label: "Mirror Images", value: "mirror-images" },
//       { label: "Water Images", value: "water-images" },
//       { label: "Embedded Figures", value: "embedded-figures" },
//       {
//         label: "Completion of Incomplete Pattern",
//         value: "completion-incomplete-pattern",
//       },
//       { label: "Figure Matrix", value: "figure-matrix" },
//       { label: "Paper Cutting", value: "paper-cutting" },
//       { label: "Paper Folding", value: "paper-folding" },
//       { label: "Rule Detection", value: "rule-detection" },
//       { label: "Grouping of Images", value: "grouping-images" },
//       { label: "Cubes and Dice", value: "cubes-dice" },
//       { label: "Construction of Squares", value: "construction-squares" },
//       { label: "Triangles", value: "triangles" },
//       { label: "Dot Situation", value: "dot-situation" },
//       { label: "Image Analysis", value: "image-analysis" },
//       { label: "Pattern Completion", value: "pattern-completion" },
//       {
//         label: "Figure Formation and Analysis",
//         value: "figure-formation-analysis",
//       },
//       { label: "Counting of Figures", value: "counting-figures" },
//     ],
//     "verbal-ability": [
//       { label: "Reading Comprehension", value: "reading-comprehension" },
//       { label: "Para Jumbles", value: "para-jumbles" },
//       { label: "Para Completion", value: "para-completion" },
//       { label: "Sentence Correction", value: "sentence-correction" },
//       { label: "Error Spotting", value: "error-spotting" },
//       { label: "Fill in the Blanks", value: "fill-blanks" },
//       { label: "Synonyms", value: "synonyms" },
//       { label: "Antonyms", value: "antonyms" },
//       { label: "One Word Substitution", value: "one-word-substitution" },
//       { label: "Idioms and Phrases", value: "idioms-phrases" },
//       { label: "Spelling Test", value: "spelling-test" },
//       { label: "Direct and Indirect Speech", value: "direct-indirect-speech" },
//       { label: "Active and Passive Voice", value: "active-passive-voice" },
//       { label: "Sentence Improvement", value: "sentence-improvement" },
//       { label: "Vocabulary", value: "vocabulary" },
//       { label: "Grammar", value: "grammar" },
//       { label: "Cloze Test", value: "cloze-test" },
//       { label: "Word Formation", value: "word-formation" },
//       { label: "Sentence Rearrangement", value: "sentence-rearrangement" },
//       { label: "Critical Reasoning", value: "critical-reasoning" },
//     ],
//     "reading-comprehension": [
//       { label: "Factual Passages", value: "factual-passages" },
//       { label: "Inferential Passages", value: "inferential-passages" },
//       {
//         label: "Critical Reasoning Passages",
//         value: "critical-reasoning-passages",
//       },
//       { label: "Literary Passages", value: "literary-passages" },
//       { label: "Scientific Passages", value: "scientific-passages" },
//       { label: "Historical Passages", value: "historical-passages" },
//       { label: "Economic Passages", value: "economic-passages" },
//       { label: "Political Passages", value: "political-passages" },
//       { label: "Social Issues", value: "social-issues" },
//       { label: "Technology Passages", value: "technology-passages" },
//       { label: "Environment Passages", value: "environment-passages" },
//       { label: "Biography Passages", value: "biography-passages" },
//       { label: "Philosophy Passages", value: "philosophy-passages" },
//       { label: "Current Affairs", value: "current-affairs" },
//       { label: "Business Passages", value: "business-passages" },
//       { label: "Medical Passages", value: "medical-passages" },
//       { label: "Legal Passages", value: "legal-passages" },
//       { label: "Educational Passages", value: "educational-passages" },
//       { label: "Cultural Passages", value: "cultural-passages" },
//       { label: "General Knowledge", value: "general-knowledge" },
//     ],
//   };

//   const [questions, setQuestions] = useState([
//     {
//       questionType: "standard",
//       questionText: "",
//       subject: "aptitude",
//       category: "",
//       options: [
//         { identifier: "A", text: "", isCorrect: false },
//         { identifier: "B", text: "", isCorrect: false },
//         { identifier: "C", text: "", isCorrect: false },
//         { identifier: "D", text: "", isCorrect: false },
//       ],
//       correctAnswer: "",
//       explanation: "",
//       diagrams: [],
//       hasDiagram: false,
//     },
//   ]);

//   const [isUploading, setIsUploading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadingQuestionIndex, setUploadingQuestionIndex] = useState(null);
//   const [previewUrls, setPreviewUrls] = useState({});
//   const [savedDrafts, setSavedDrafts] = useState([]);
//   const [showDrafts, setShowDrafts] = useState(false);

//   const fileInputRefs = useRef([]);
//   const { backend_URL } = useContext(AppContext);

//   // Load saved drafts on component mount
//   useEffect(() => {
//     loadSavedDrafts();
//   }, []);

//   // Auto-save every 30 seconds
//   useEffect(() => {
//     const autoSaveInterval = setInterval(() => {
//       if (hasUnsavedChanges()) {
//         saveProgress(true); // true for auto-save
//       }
//     }, 30000);

//     return () => clearInterval(autoSaveInterval);
//   }, [questions]);

//   // Cleanup preview URLs on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(previewUrls).forEach((url) => {
//         if (url && typeof url === "string" && url.startsWith("blob:")) {
//           URL.revokeObjectURL(url);
//         }
//       });
//     };
//   }, []);

//   const loadSavedDrafts = () => {
//     try {
//       const drafts = JSON.parse(
//         sessionStorage.getItem("questionDrafts") || "[]"
//       );
//       setSavedDrafts(drafts);
//     } catch (error) {
//       console.error("Failed to load saved drafts:", error);
//     }
//   };

//   const hasUnsavedChanges = () => {
//     return questions.some(
//       (q) =>
//         q.questionText.trim() ||
//         q.category.trim() ||
//         q.explanation.trim() ||
//         (q.passage && q.passage.trim()) ||
//         q.options.some((opt) => opt.text.trim())
//     );
//   };

//   const saveProgress = async (isAutoSave = false) => {
//     if (!hasUnsavedChanges()) {
//       if (!isAutoSave) {
//         setErrorMessage("No changes to save");
//         setTimeout(() => setErrorMessage(""), 3000);
//       }
//       return;
//     }

//     setIsSaving(true);

//     try {
//       const draftData = {
//         id: Date.now(),
//         timestamp: new Date().toISOString(),
//         questions: questions,
//         questionsCount: questions.length,
//         isAutoSave,
//       };

//       // Save to sessionStorage
//       const existingDrafts = JSON.parse(
//         sessionStorage.getItem("questionDrafts") || "[]"
//       );

//       // Keep only last 5 drafts
//       const updatedDrafts = [draftData, ...existingDrafts.slice(0, 4)];
//       sessionStorage.setItem("questionDrafts", JSON.stringify(updatedDrafts));

//       setSavedDrafts(updatedDrafts);

//       if (!isAutoSave) {
//         setSuccessMessage("Progress saved successfully!");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       }
//     } catch (error) {
//       console.error("Failed to save progress:", error);
//       if (!isAutoSave) {
//         setErrorMessage("Failed to save progress");
//         setTimeout(() => setErrorMessage(""), 3000);
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const loadDraft = (draft) => {
//     if (
//       window.confirm(
//         "Loading this draft will replace your current progress. Continue?"
//       )
//     ) {
//       setQuestions(draft.questions);
//       setSuccessMessage("Draft loaded successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   };

//   const deleteDraft = (draftId) => {
//     if (window.confirm("Are you sure you want to delete this draft?")) {
//       const updatedDrafts = savedDrafts.filter((draft) => draft.id !== draftId);
//       setSavedDrafts(updatedDrafts);
//       sessionStorage.setItem("questionDrafts", JSON.stringify(updatedDrafts));
//       setSuccessMessage("Draft deleted successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   };

//   const handleQuestionTypeChange = (index, type) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].questionType = type;

//     if (type === "reading-comprehension") {
//       updatedQuestions[index] = {
//         ...updatedQuestions[index],
//         passage: "",
//         passageTitle: "",
//         questions: [
//           {
//             questionText: "",
//             options: [
//               { identifier: "A", text: "", isCorrect: false },
//               { identifier: "B", text: "", isCorrect: false },
//               { identifier: "C", text: "", isCorrect: false },
//               { identifier: "D", text: "", isCorrect: false },
//             ],
//             correctAnswer: "",
//             explanation: "",
//           },
//         ],
//         questionText: "",
//         options: [],
//         correctAnswer: "",
//         explanation: "",
//       };
//     } else {
//       updatedQuestions[index] = {
//         ...updatedQuestions[index],
//         questionText: "",
//         options: [
//           { identifier: "A", text: "", isCorrect: false },
//           { identifier: "B", text: "", isCorrect: false },
//           { identifier: "C", text: "", isCorrect: false },
//           { identifier: "D", text: "", isCorrect: false },
//         ],
//         correctAnswer: "",
//         explanation: "",
//         passage: "",
//         passageTitle: "",
//         questions: [],
//       };
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (qIndex, optIndex, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options[optIndex][field] = value;

//     if (
//       field === "identifier" &&
//       updatedQuestions[qIndex].options[optIndex].isCorrect
//     ) {
//       updatedQuestions[qIndex].correctAnswer = value;
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handleCorrectAnswerChange = (qIndex, answer) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].correctAnswer = answer;

//     updatedQuestions[qIndex].options.forEach((opt) => {
//       opt.isCorrect = opt.identifier === answer;
//     });

//     setQuestions(updatedQuestions);
//   };

//   const handlePassageQuestionChange = (qIndex, pqIndex, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].questions[pqIndex][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handlePassageOptionChange = (
//     qIndex,
//     pqIndex,
//     optIndex,
//     field,
//     value
//   ) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].questions[pqIndex].options[optIndex][field] =
//       value;

//     if (
//       field === "identifier" &&
//       updatedQuestions[qIndex].questions[pqIndex].options[optIndex].isCorrect
//     ) {
//       updatedQuestions[qIndex].questions[pqIndex].correctAnswer = value;
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handlePassageCorrectAnswerChange = (qIndex, pqIndex, answer) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].questions[pqIndex].correctAnswer = answer;

//     updatedQuestions[qIndex].questions[pqIndex].options.forEach((opt) => {
//       opt.isCorrect = opt.identifier === answer;
//     });

//     setQuestions(updatedQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         questionType: "standard",
//         questionText: "",
//         subject: "aptitude",
//         category: "",
//         options: [
//           { identifier: "A", text: "", isCorrect: false },
//           { identifier: "B", text: "", isCorrect: false },
//           { identifier: "C", text: "", isCorrect: false },
//           { identifier: "D", text: "", isCorrect: false },
//         ],
//         correctAnswer: "",
//         explanation: "",
//         diagrams: [],
//         hasDiagram: false,
//       },
//     ]);
//   };

//   const addPassageQuestion = (qIndex) => {
//     const updatedQuestions = [...questions];
//     if (!updatedQuestions[qIndex].questions) {
//       updatedQuestions[qIndex].questions = [];
//     }
//     updatedQuestions[qIndex].questions.push({
//       questionText: "",
//       options: [
//         { identifier: "A", text: "", isCorrect: false },
//         { identifier: "B", text: "", isCorrect: false },
//         { identifier: "C", text: "", isCorrect: false },
//         { identifier: "D", text: "", isCorrect: false },
//       ],
//       correctAnswer: "",
//       explanation: "",
//     });
//     setQuestions(updatedQuestions);
//   };

//   const removeQuestion = (index) => {
//     if (questions.length <= 1) return;

//     // Clean up preview URL for this question
//     if (previewUrls[index]) {
//       URL.revokeObjectURL(previewUrls[index]);
//     }

//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(index, 1);
//     setQuestions(updatedQuestions);

//     // Clean up and reindex preview URLs
//     const updatedPreviewUrls = { ...previewUrls };
//     delete updatedPreviewUrls[index];

//     const reindexedPreviewUrls = {};
//     Object.keys(updatedPreviewUrls).forEach((key) => {
//       const numKey = parseInt(key);
//       if (numKey > index) {
//         reindexedPreviewUrls[numKey - 1] = updatedPreviewUrls[key];
//       } else if (numKey < index) {
//         reindexedPreviewUrls[key] = updatedPreviewUrls[key];
//       }
//     });
//     setPreviewUrls(reindexedPreviewUrls);
//   };

//   const removePassageQuestion = (qIndex, pqIndex) => {
//     const updatedQuestions = [...questions];
//     if (
//       updatedQuestions[qIndex].questions &&
//       updatedQuestions[qIndex].questions.length > pqIndex
//     ) {
//       updatedQuestions[qIndex].questions.splice(pqIndex, 1);
//       setQuestions(updatedQuestions);
//     }
//   };

//   const handleImageUpload = async (e, qIndex) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       setErrorMessage("Please select a valid image file");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     // Validate file size (max 5MB)
//     const maxSize = 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       setErrorMessage("Image file size should be less than 5MB");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     // Create preview
//     const localUrl = URL.createObjectURL(file);
//     setPreviewUrls((prev) => ({
//       ...prev,
//       [qIndex]: localUrl,
//     }));

//     // Start upload
//     setUploadingQuestionIndex(qIndex);
//     setIsUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(`${backend_URL}/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const { url } = response.data;

//       const updatedQuestions = [...questions];
//       if (!updatedQuestions[qIndex].diagrams) {
//         updatedQuestions[qIndex].diagrams = [];
//       }

//       updatedQuestions[qIndex].diagrams.push({
//         url: url,
//         caption: "",
//       });
//       updatedQuestions[qIndex].hasDiagram = true;

//       setQuestions(updatedQuestions);

//       // Clean up preview
//       URL.revokeObjectURL(localUrl);
//       setPreviewUrls((prev) => {
//         const updated = { ...prev };
//         delete updated[qIndex];
//         return updated;
//       });

//       setSuccessMessage("Image uploaded successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Image upload failed:", error);

//       // Clean up preview on error
//       URL.revokeObjectURL(localUrl);
//       setPreviewUrls((prev) => {
//         const updated = { ...prev };
//         delete updated[qIndex];
//         return updated;
//       });

//       const errorMsg =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to upload image";
//       setErrorMessage(errorMsg);
//       setTimeout(() => setErrorMessage(""), 3000);
//     } finally {
//       setIsUploading(false);
//       setUploadingQuestionIndex(null);

//       // Reset file input
//       if (fileInputRefs.current[qIndex]) {
//         fileInputRefs.current[qIndex].value = "";
//       }
//     }
//   };

//   const handleDiagramCaptionChange = (qIndex, dIndex, caption) => {
//     const updatedQuestions = [...questions];
//     if (
//       updatedQuestions[qIndex].diagrams &&
//       updatedQuestions[qIndex].diagrams[dIndex]
//     ) {
//       updatedQuestions[qIndex].diagrams[dIndex].caption = caption;
//       setQuestions(updatedQuestions);
//     }
//   };

//   const removeDiagram = (qIndex, dIndex) => {
//     const updatedQuestions = [...questions];
//     if (
//       updatedQuestions[qIndex].diagrams &&
//       updatedQuestions[qIndex].diagrams.length > dIndex
//     ) {
//       updatedQuestions[qIndex].diagrams.splice(dIndex, 1);
//       updatedQuestions[qIndex].hasDiagram =
//         updatedQuestions[qIndex].diagrams.length > 0;
//       setQuestions(updatedQuestions);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Don't allow submission if images are still uploading
//     if (Object.keys(previewUrls).length > 0) {
//       setErrorMessage("Please wait for all images to finish uploading");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     setIsUploading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       // Validate questions
//       const isValid = questions.every((q) => {
//         if (q.questionType === "standard") {
//           return (
//             q.questionText.trim() &&
//             q.subject &&
//             q.category.trim() &&
//             q.options.every((opt) => opt.text.trim()) &&
//             q.correctAnswer &&
//             q.explanation.trim()
//           );
//         } else if (q.questionType === "reading-comprehension") {
//           return (
//             q.passage &&
//             q.passage.trim() &&
//             q.passageTitle &&
//             q.passageTitle.trim() &&
//             q.questions &&
//             q.questions.length > 0 &&
//             q.questions.every(
//               (pq) =>
//                 pq.questionText.trim() &&
//                 pq.options.every((opt) => opt.text.trim()) &&
//                 pq.correctAnswer &&
//                 pq.explanation.trim()
//             )
//           );
//         }
//         return false;
//       });

//       if (!isValid) {
//         throw new Error("Please fill all required fields for all questions");
//       }

//       const response = await axios.post(
//         `${backend_URL}/api/questions/bulk-upload`,
//         questions
//       );

//       setSuccessMessage(
//         `${response.data.questions.length} questions added successfully!`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);

//       // Clear saved drafts after successful submission
//       sessionStorage.removeItem("questionDrafts");
//       setSavedDrafts([]);

//       // Reset form
//       setQuestions([
//         {
//           questionType: "standard",
//           questionText: "",
//           subject: "aptitude",
//           category: "",
//           options: [
//             { identifier: "A", text: "", isCorrect: false },
//             { identifier: "B", text: "", isCorrect: false },
//             { identifier: "C", text: "", isCorrect: false },
//             { identifier: "D", text: "", isCorrect: false },
//           ],
//           correctAnswer: "",
//           explanation: "",
//           diagrams: [],
//           hasDiagram: false,
//         },
//       ]);

//       // Clean up any remaining preview URLs
//       Object.values(previewUrls).forEach((url) => {
//         if (url && typeof url === "string" && url.startsWith("blob:")) {
//           URL.revokeObjectURL(url);
//         }
//       });
//       setPreviewUrls({});
//     } catch (error) {
//       console.error("Failed to submit questions:", error);
//       setErrorMessage(
//         error.response?.data?.error ||
//           error.message ||
//           "Failed to submit questions"
//       );
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//             Bulk Question Upload
//           </h1>

//           <div className="flex space-x-3">
//             {/* Save Progress Button */}
//             <button
//               type="button"
//               onClick={() => saveProgress(false)}
//               disabled={isSaving || !hasUnsavedChanges()}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Save size={16} className="mr-2" />
//               {isSaving ? "Saving..." : "Save Progress"}
//             </button>

//             {/* Show Drafts Button */}
//             {savedDrafts.length > 0 && (
//               <button
//                 type="button"
//                 onClick={() => setShowDrafts(!showDrafts)}
//                 className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
//               >
//                 <FileText size={16} className="mr-2" />
//                 Saved Drafts ({savedDrafts.length})
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Auto-save indicator */}
//         {hasUnsavedChanges() && (
//           <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-md">
//             <p className="text-sm text-yellow-800 dark:text-yellow-200">
//               💾 Auto-saving every 30 seconds...
//             </p>
//           </div>
//         )}

//         {/* Saved Drafts Section */}
//         {showDrafts && savedDrafts.length > 0 && (
//           <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
//               Saved Drafts
//             </h3>
//             <div className="space-y-3">
//               {savedDrafts.map((draft) => (
//                 <div
//                   key={draft.id}
//                   className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
//                 >
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-800 dark:text-white">
//                       {draft.questionsCount} question
//                       {draft.questionsCount !== 1 ? "s" : ""}
//                       {draft.isAutoSave && (
//                         <span className="text-blue-600 dark:text-blue-400">
//                           {" "}
//                           (Auto-saved)
//                         </span>
//                       )}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {new Date(draft.timestamp).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       type="button"
//                       onClick={() => loadDraft(draft)}
//                       className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
//                     >
//                       Load
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => deleteDraft(draft.id)}
//                       className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {successMessage && (
//           <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//             {successMessage}
//           </div>
//         )}

//         {errorMessage && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {questions.map((question, qIndex) => (
//             <div
//               key={qIndex}
//               className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                   Question {qIndex + 1}
//                 </h2>
//                 {questions.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeQuestion(qIndex)}
//                     className="text-red-500 hover:text-red-700 p-1"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 )}
//               </div>

//               {/* Question Type */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Question Type
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       className="form-radio"
//                       name={`questionType-${qIndex}`}
//                       value="standard"
//                       checked={question.questionType === "standard"}
//                       onChange={() =>
//                         handleQuestionTypeChange(qIndex, "standard")
//                       }
//                     />
//                     <span className="ml-2 dark:text-white">
//                       Standard Question
//                     </span>
//                   </label>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       className="form-radio"
//                       name={`questionType-${qIndex}`}
//                       value="reading-comprehension"
//                       checked={
//                         question.questionType === "reading-comprehension"
//                       }
//                       onChange={() =>
//                         handleQuestionTypeChange(
//                           qIndex,
//                           "reading-comprehension"
//                         )
//                       }
//                     />
//                     <span className="ml-2 dark:text-white">
//                       Reading Comprehension
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               {/* Subject */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Subject
//                 </label>
//                 <select
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   value={question.subject}
//                   onChange={(e) => {
//                     handleInputChange(qIndex, "subject", e.target.value);
//                     // Reset category when subject changes
//                     handleInputChange(qIndex, "category", "");
//                   }}
//                 >
//                   <option value="aptitude">Aptitude</option>
//                   <option value="logical-reasoning">Logical Reasoning</option>
//                   <option value="verbal-reasoning">Verbal Reasoning</option>
//                   <option value="non-verbal-reasoning">
//                     Non-Verbal Reasoning
//                   </option>
//                   <option value="verbal-ability">Verbal Ability</option>
//                   <option value="reading-comprehension">
//                     Reading Comprehension
//                   </option>
//                 </select>
//               </div>

//               {/* Category/Topic */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Topic/Category
//                 </label>
//                 <select
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   value={question.category}
//                   onChange={(e) =>
//                     handleInputChange(qIndex, "category", e.target.value)
//                   }
//                   required
//                 >
//                   <option value="">Select a topic</option>
//                   {subjectTopics[question.subject]?.map((topic) => (
//                     <option key={topic.value} value={topic.value}>
//                       {topic.label}
//                     </option>
//                   ))}
//                 </select>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   Choose from predefined topics for better organization
//                 </p>
//               </div>

//               {/* Question Content */}
//               {question.questionType === "standard" ? (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Question Text
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={3}
//                       value={question.questionText}
//                       onChange={(e) =>
//                         handleInputChange(
//                           qIndex,
//                           "questionText",
//                           e.target.value
//                         )
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Options
//                     </label>
//                     {question.options.map((option, optIndex) => (
//                       <div key={optIndex} className="flex items-center mb-2">
//                         <input
//                           type="text"
//                           className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                           value={option.text}
//                           onChange={(e) =>
//                             handleOptionChange(
//                               qIndex,
//                               optIndex,
//                               "text",
//                               e.target.value
//                             )
//                           }
//                           placeholder={`Option ${option.identifier}`}
//                           required
//                         />
//                         <input
//                           type="radio"
//                           name={`correctAnswer-${qIndex}`}
//                           className="ml-4"
//                           checked={option.isCorrect}
//                           onChange={() =>
//                             handleCorrectAnswerChange(qIndex, option.identifier)
//                           }
//                         />
//                         <span className="ml-2 dark:text-white">Correct</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Correct Answer
//                     </label>
//                     <select
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       value={question.correctAnswer}
//                       onChange={(e) =>
//                         handleCorrectAnswerChange(qIndex, e.target.value)
//                       }
//                       required
//                     >
//                       <option value="">Select correct answer</option>
//                       {question.options.map((opt) => (
//                         <option key={opt.identifier} value={opt.identifier}>
//                           Option {opt.identifier}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Explanation
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={3}
//                       value={question.explanation}
//                       onChange={(e) =>
//                         handleInputChange(qIndex, "explanation", e.target.value)
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Solution (Optional)
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={2}
//                       value={question.solution || ""}
//                       onChange={(e) =>
//                         handleInputChange(qIndex, "solution", e.target.value)
//                       }
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Passage Title
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       value={question.passageTitle || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           qIndex,
//                           "passageTitle",
//                           e.target.value
//                         )
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Passage
//                     </label>
//                     <textarea
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                       rows={6}
//                       value={question.passage || ""}
//                       onChange={(e) =>
//                         handleInputChange(qIndex, "passage", e.target.value)
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                       Questions for this Passage
//                     </label>

//                     {question.questions &&
//                       question.questions.map((pq, pqIndex) => (
//                         <div
//                           key={pqIndex}
//                           className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
//                         >
//                           <div className="flex justify-between items-center mb-2">
//                             <h3 className="font-medium dark:text-white">
//                               Question {pqIndex + 1}
//                             </h3>
//                             {question.questions.length > 1 && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   removePassageQuestion(qIndex, pqIndex)
//                                 }
//                                 className="text-red-500 hover:text-red-700 p-1"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             )}
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Question Text
//                             </label>
//                             <textarea
//                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               rows={2}
//                               value={pq.questionText}
//                               onChange={(e) =>
//                                 handlePassageQuestionChange(
//                                   qIndex,
//                                   pqIndex,
//                                   "questionText",
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             />
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Options
//                             </label>
//                             {pq.options.map((option, optIndex) => (
//                               <div
//                                 key={optIndex}
//                                 className="flex items-center mb-2"
//                               >
//                                 <input
//                                   type="text"
//                                   className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                   value={option.text}
//                                   onChange={(e) =>
//                                     handlePassageOptionChange(
//                                       qIndex,
//                                       pqIndex,
//                                       optIndex,
//                                       "text",
//                                       e.target.value
//                                     )
//                                   }
//                                   placeholder={`Option ${option.identifier}`}
//                                   required
//                                 />
//                                 <input
//                                   type="radio"
//                                   name={`passageCorrectAnswer-${qIndex}-${pqIndex}`}
//                                   className="ml-4"
//                                   checked={option.isCorrect}
//                                   onChange={() =>
//                                     handlePassageCorrectAnswerChange(
//                                       qIndex,
//                                       pqIndex,
//                                       option.identifier
//                                     )
//                                   }
//                                 />
//                                 <span className="ml-2 dark:text-white">
//                                   Correct
//                                 </span>
//                               </div>
//                             ))}
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Correct Answer
//                             </label>
//                             <select
//                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               value={pq.correctAnswer}
//                               onChange={(e) =>
//                                 handlePassageCorrectAnswerChange(
//                                   qIndex,
//                                   pqIndex,
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             >
//                               <option value="">Select correct answer</option>
//                               {pq.options.map((opt) => (
//                                 <option
//                                   key={opt.identifier}
//                                   value={opt.identifier}
//                                 >
//                                   Option {opt.identifier}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="mb-3">
//                             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                               Explanation
//                             </label>
//                             <textarea
//                               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                               rows={2}
//                               value={pq.explanation}
//                               onChange={(e) =>
//                                 handlePassageQuestionChange(
//                                   qIndex,
//                                   pqIndex,
//                                   "explanation",
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             />
//                           </div>
//                         </div>
//                       ))}

//                     <button
//                       type="button"
//                       onClick={() => addPassageQuestion(qIndex)}
//                       className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//                     >
//                       <Plus size={16} className="mr-1" />
//                       Add Question to Passage
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Image Upload Section */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">
//                   Diagrams/Images
//                 </label>

//                 {/* Preview while uploading */}
//                 {previewUrls[qIndex] && (
//                   <div className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
//                     <div className="flex items-center">
//                       <img
//                         src={previewUrls[qIndex]}
//                         alt="Preview"
//                         className="h-20 w-auto object-contain mr-3 rounded"
//                       />
//                       <div className="flex-1">
//                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                           Preview - Uploading...
//                         </p>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Uploaded diagrams */}
//                 {question.diagrams &&
//                   question.diagrams.length > 0 &&
//                   question.diagrams.map((diagram, dIndex) => (
//                     <div
//                       key={dIndex}
//                       className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20"
//                     >
//                       <div className="flex items-start mb-2">
//                         <img
//                           src={diagram.url}
//                           alt="Diagram"
//                           className="h-20 w-auto object-contain mr-3 rounded"
//                         />
//                         <div className="flex-1">
//                           <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                             value={diagram.caption || ""}
//                             onChange={(e) =>
//                               handleDiagramCaptionChange(
//                                 qIndex,
//                                 dIndex,
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Caption for this image"
//                           />
//                           <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//                             ✓ Successfully uploaded
//                           </p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeDiagram(qIndex, dIndex)}
//                           className="ml-2 text-red-500 hover:text-red-700 p-1"
//                           title="Remove image"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                 {/* Upload button */}
//                 <div className="mt-2">
//                   <input
//                     type="file"
//                     ref={(el) => (fileInputRefs.current[qIndex] = el)}
//                     onChange={(e) => handleImageUpload(e, qIndex)}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => fileInputRefs.current[qIndex]?.click()}
//                     disabled={uploadingQuestionIndex === qIndex}
//                     className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Upload size={16} className="mr-2" />
//                     {uploadingQuestionIndex === qIndex ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
//                         Uploading...
//                       </>
//                     ) : (
//                       "Upload Image"
//                     )}
//                   </button>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Form Actions */}
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-3">
//               <button
//                 type="button"
//                 onClick={addQuestion}
//                 className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//               >
//                 <Plus size={16} className="mr-2" />
//                 Add Another Question
//               </button>

//               <button
//                 type="button"
//                 onClick={() => saveProgress(false)}
//                 disabled={isSaving || !hasUnsavedChanges()}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Save size={16} className="mr-2" />
//                 {isSaving ? "Saving..." : "Save Progress"}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={isUploading || Object.keys(previewUrls).length > 0}
//               className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isUploading ? "Submitting..." : "Submit All Questions"}
//             </button>
//           </div>

//           {/* Upload status indicator */}
//           {Object.keys(previewUrls).length > 0 && (
//             <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-md">
//               <p className="text-sm text-yellow-800 dark:text-yellow-200">
//                 ⏳ Please wait for all images to finish uploading before
//                 submitting the form.
//               </p>
//             </div>
//           )}

//           {/* Progress indicator */}
//           {hasUnsavedChanges() && (
//             <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-400 dark:border-blue-600 rounded-md">
//               <p className="text-sm text-blue-800 dark:text-blue-200">
//                 📝 You have unsaved changes. They will be auto-saved every 30
//                 seconds.
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default BulkQuestionUpload;

import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, X, Plus, Trash2, Save, FileText, Download, Upload as UploadIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/layouts/layout";

const BulkQuestionUpload = () => {
  // Subject-wise topics mapping with label and value
const subjectTopics = {
  aptitude: [
    { label: "Number Systems", value: "number-systems" },
    { label: "Percentages", value: "percentages" },
    { label: "Problems on H.C.F and L.C.M", value: "problems-on-hcf-lcm" },
    { label: "Surds and Indices", value: "surds-and-indices" },
    { label: "Height and Distance", value: "height-and-distance" },
    { label: "Ratio and Proportion", value: "ratio-and-proportion" },
    { label: "Time and Work", value: "time-and-work" },
    { label: "Time, Speed and Distance", value: "time-speed-distance" },
    { label: "Simple Interest", value: "simple-interest" },
    { label: "Compound Interest", value: "compound-interest" },
    { label: "Profit and Loss", value: "profit-and-loss" },
    { label: "Averages", value: "averages" },
    { label: "Mixtures and Alligations", value: "mixtures-alligations" },
    { label: "Pipes and Cisterns", value: "pipes-cisterns" },
    { label: "Boats and Streams", value: "boats-streams" },
    { label: "Ages", value: "ages" },
    { label: "Calendars", value: "calendars" },
    { label: "Clocks", value: "clocks" },
    {
      label: "Permutations and Combinations",
      value: "permutations-combinations",
    },
    { label: "Probability", value: "probability" },
    { label: "Geometry", value: "geometry" },
    { label: "Mensuration", value: "mensuration" },
    { label: "Data Interpretation", value: "data-interpretation" },
    { label: "Algebra", value: "algebra" },
    { label: "Problems on Trains", value: "problems-on-trains" },
    { label: "Partnership", value: "partnership" },
    { label: "Problems on Numbers", value: "problems-on-numbers" },
    { label: "Decimal Fractions", value: "decimal-fractions" },
    { label: "Simplification", value: "simplification" },
    { label: "Square Root and Cube Root", value: "square-root-cube-root" },
    { label: "Chain Rule", value: "chain-rule" },
    { label: "Logarithm", value: "logarithm" },
    { label: "Races and Games", value: "races-and-games" },
    { label: "Stocks and Shares", value: "stocks-shares" },
    { label: "True Discount", value: "true-discount" },
    { label: "Banker's Discount", value: "bankers-discount" },
    { label: "Odd Man Out and Series", value: "odd-man-out-series" },
    { label: "Area", value: "area" },
    { label: "Volume and Surface Area", value: "volume-surface-area" },
    { label: "Numbers", value: "numbers" },
  ],

  "logical-reasoning": [
    { label: "Number Series", value: "number-series" },
    { label: "Letter and Symbol Series", value: "letter-symbol-series" },
    { label: "Verbal Classification", value: "verbal-classification" },
    { label: "Essential Part", value: "essential-part" },
    { label: "Analogies", value: "analogies" },
    { label: "Artificial Language", value: "artificial-language" },
    { label: "Matching Definitions", value: "matching-definitions" },
    { label: "Making Judgments", value: "making-judgments" },
    { label: "Verbal Reasoning", value: "verbal-reasoning" },
    { label: "Logical Problems", value: "logical-problems" },
    { label: "Logical Games", value: "logical-games" },
    { label: "Analyzing Arguments", value: "analyzing-arguments" },
    { label: "Statement and Assumption", value: "statement-assumption" },
    { label: "Course of Action", value: "course-of-action" },
    { label: "Statement and Conclusion", value: "statement-conclusion" },
    { label: "Theme Detection", value: "theme-detection" },
    { label: "Cause and Effect", value: "cause-effect" },
    { label: "Statement and Argument", value: "statement-argument" },
    { label: "Logical Deduction", value: "logical-deduction" },
  ],

  "verbal-reasoning": [
    { label: "Analogy", value: "analogy" },
    { label: "Classification", value: "classification" },
    { label: "Series Completion", value: "series-completion" },
    { label: "Coding-Decoding", value: "coding-decoding" },
    { label: "Blood Relations", value: "blood-relations" },
    { label: "Direction Sense Test", value: "direction-sense-test" },
    { label: "Logical Venn Diagrams", value: "logical-venn-diagrams" },
    { label: "Alphabet Test", value: "alphabet-test" },
    { label: "Seating Arrangement", value: "seating-arrangement" },
    { label: "Mathematical Operations", value: "mathematical-operations" },
    { label: "Arithmetic Reasoning", value: "arithmetic-reasoning" },
    {
      label: "Number, Ranking and Time Sequence",
      value: "number-ranking-time-sequence",
    },
    { label: "Statements and Arguments", value: "statements-arguments" },
    { label: "Statement and Assumption", value: "statement-assumption" },
    { label: "Passage and Conclusions", value: "passage-conclusions" },
    { label: "Cause and Effect", value: "cause-effect" },
    { label: "Assertion and Reason", value: "assertion-reason" },
    { label: "Course of Action", value: "course-of-action" },
    { label: "Critical Reasoning", value: "critical-reasoning" },
    { label: "Logical Deduction", value: "logical-deduction" },
    { label: "Logical Sequence of Words", value: "logical-sequence-words" },
    { label: "Syllogism", value: "syllogism" },
    { label: "Dice", value: "dice" },
    { label: "Cube and Cuboid", value: "cube-cuboid" },
    { label: "Character Puzzles", value: "character-puzzles" },
    { label: "Data Sufficiency", value: "data-sufficiency" },
    { label: "Verification of Truth", value: "verification-truth" },
  ],

  "non-verbal-reasoning": [
    { label: "Series", value: "series" },
    { label: "Analogy", value: "analogy" },
    { label: "Classification", value: "classification" },
    { label: "Mirror Images", value: "mirror-images" },
    { label: "Water Images", value: "water-images" },
    { label: "Embedded Figures", value: "embedded-figures" },
    {
      label: "Completion of Incomplete Pattern",
      value: "completion-incomplete-pattern",
    },
    { label: "Figure Matrix", value: "figure-matrix" },
    { label: "Paper Cutting", value: "paper-cutting" },
    { label: "Paper Folding", value: "paper-folding" },
    { label: "Rule Detection", value: "rule-detection" },
    { label: "Grouping of Images", value: "grouping-images" },
    { label: "Cubes and Dice", value: "cubes-dice" },
    { label: "Construction of Squares", value: "construction-squares" },
    { label: "Triangles", value: "triangles" },
    { label: "Dot Situation", value: "dot-situation" },
    { label: "Image Analysis", value: "image-analysis" },
    { label: "Pattern Completion", value: "pattern-completion" },
    {
      label: "Figure Formation and Analysis",
      value: "figure-formation-analysis",
    },
    { label: "Counting of Figures", value: "counting-figures" },
    { label: "Analytical Reasoning", value: "analytical-reasoning" },
    { label: "Shape Construction", value: "shape-construction" },
  ],

  "verbal-ability": [
    { label: "Reading Comprehension", value: "reading-comprehension" },
    { label: "Para Jumbles", value: "para-jumbles" },
    { label: "Articles", value: "articles" },
    { label: "Sentence Completion", value: "sentence-completion" },

    { label: "Para Completion", value: "para-completion" },
    { label: "Sentence Correction", value: "sentence-correction" },
    { label: "Error Spotting", value: "error-spotting" },
    { label: "Fill in the Blanks", value: "fill-blanks" },
    { label: "Synonyms", value: "synonyms" },
    { label: "Antonyms", value: "antonyms" },
    { label: "One Word Substitution", value: "one-word-substitution" },
    { label: "Idioms and Phrases", value: "idioms-phrases" },
    { label: "Spelling Test", value: "spelling-test" },
    { label: "Direct and Indirect Speech", value: "direct-indirect-speech" },
    { label: "Active and Passive Voice", value: "active-passive-voice" },
    { label: "Sentence Improvement", value: "sentence-improvement" },
    { label: "Vocabulary", value: "vocabulary" },
    { label: "Grammar", value: "grammar" },
    { label: "Cloze Test", value: "cloze-test" },
    { label: "Word Formation", value: "word-formation" },
    { label: "Sentence Rearrangement", value: "sentence-rearrangement" },
    { label: "Critical Reasoning", value: "critical-reasoning" },
    { label: "Spotting Errors", value: "spotting-errors" },
    { label: "Selecting Words", value: "selecting-words" },
    { label: "Sentence Formation", value: "sentence-formation" },
    { label: "Ordering of Words", value: "ordering-of-words" },
    { label: "Completing Statements", value: "statement-completion" },
    { label: "Ordering of Sentences", value: "ordering-of-sentences" },
    { label: "Paragraph Formation", value: "paragraph-formation" },
    { label: "Verbal Analogies", value: "verbal-analogies" },
  ],

  "reading-comprehension": [
    { label: "Factual Passages", value: "factual-passages" },
    { label: "Inferential Passages", value: "inferential-passages" },
    {
      label: "Critical Reasoning Passages",
      value: "critical-reasoning-passages",
    },
    { label: "Literary Passages", value: "literary-passages" },
    { label: "Scientific Passages", value: "scientific-passages" },
    { label: "Historical Passages", value: "historical-passages" },
    { label: "Economic Passages", value: "economic-passages" },
    { label: "Political Passages", value: "political-passages" },
    { label: "Social Issues", value: "social-issues" },
    { label: "Technology Passages", value: "technology-passages" },
    { label: "Environment Passages", value: "environment-passages" },
    { label: "Biography Passages", value: "biography-passages" },
    { label: "Philosophy Passages", value: "philosophy-passages" },
    { label: "Current Affairs", value: "current-affairs" },
    { label: "Business Passages", value: "business-passages" },
    { label: "Medical Passages", value: "medical-passages" },
    { label: "Legal Passages", value: "legal-passages" },
    { label: "Educational Passages", value: "educational-passages" },
    { label: "Cultural Passages", value: "cultural-passages" },
    { label: "General Knowledge", value: "general-knowledge" },
  ],
};


  const [questions, setQuestions] = useState([
    {
      questionType: "standard",
      questionText: "",
      subject: "aptitude",
      category: "",
      options: [
        { identifier: "A", text: "", isCorrect: false },
        { identifier: "B", text: "", isCorrect: false },
        { identifier: "C", text: "", isCorrect: false },
        { identifier: "D", text: "", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "",
      diagrams: [],
      hasDiagram: false,
    },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadingQuestionIndex, setUploadingQuestionIndex] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({});
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);
  
  // JSON Import states
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonInput, setJsonInput] = useState("{ \n \"questions\":  \n}");
  const [jsonError, setJsonError] = useState("");
  
  const fileInputRefs = useRef([]);
  const jsonFileInputRef = useRef(null);
  const { backend_URL } = useContext(AppContext);

  // Load saved drafts on component mount
  useEffect(() => {
    loadSavedDrafts();
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (hasUnsavedChanges()) {
        saveProgress(true); // true for auto-save
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [questions]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        if (url && typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // JSON Import Functions
  const validateQuestionStructure = (question) => {
    const requiredFields = ['questionText', 'subject', 'category', 'options', 'correctAnswer', 'explanation'];
    
    for (const field of requiredFields) {
      if (!question[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!Array.isArray(question.options) || question.options.length < 2) {
      throw new Error('Options must be an array with at least 2 items');
    }

    question.options.forEach((option, index) => {
      if (!option.identifier || !option.text) {
        throw new Error(`Option ${index + 1} missing identifier or text`);
      }
    });

    if (question.questionType === 'reading-comprehension') {
      if (!question.passage || !question.passageTitle) {
        throw new Error('Reading comprehension questions must have passage and passageTitle');
      }
      if (!question.questions || !Array.isArray(question.questions) || question.questions.length === 0) {
        throw new Error('Reading comprehension must have at least one sub-question');
      }
    }

    return true;
  };

  const normalizeQuestion = (question) => {
    const normalized = {
      questionType: question.questionType || "standard",
      questionText: question.questionText || "",
      subject: question.subject || "aptitude",
      category: question.category || "",
      options: [],
      correctAnswer: question.correctAnswer || "",
      explanation: question.explanation || "",
      diagrams: question.diagrams || [],
      hasDiagram: question.hasDiagram || false,
      solution: question.solution || "",
    };

    // Normalize options
    if (Array.isArray(question.options)) {
      normalized.options = question.options.map((opt, index) => ({
        identifier: opt.identifier || String.fromCharCode(65 + index), // A, B, C, D
        text: opt.text || "",
        isCorrect: opt.isCorrect || opt.identifier === question.correctAnswer || false
      }));
    }

    // Handle reading comprehension
    if (question.questionType === 'reading-comprehension') {
      normalized.passage = question.passage || "";
      normalized.passageTitle = question.passageTitle || "";
      normalized.questions = [];
      
      if (Array.isArray(question.questions)) {
        normalized.questions = question.questions.map(q => ({
          questionText: q.questionText || "",
          options: Array.isArray(q.options) ? q.options.map((opt, index) => ({
            identifier: opt.identifier || String.fromCharCode(65 + index),
            text: opt.text || "",
            isCorrect: opt.isCorrect || opt.identifier === q.correctAnswer || false
          })) : [],
          correctAnswer: q.correctAnswer || "",
          explanation: q.explanation || "",
        }));
      }
    }

    return normalized;
  };

  const importFromJson = () => {
    try {
      setJsonError("");
      
      if (!jsonInput.trim()) {
        throw new Error("Please enter JSON data");
      }

      let parsedData;
      try {
        parsedData = JSON.parse(jsonInput);
      } catch (parseError) {
        throw new Error(`Invalid JSON format: ${parseError.message}`);
      }

      let questionsToImport = [];
      
      // Handle different JSON structures
      if (Array.isArray(parsedData)) {
        questionsToImport = parsedData;
      } else if (parsedData.questions && Array.isArray(parsedData.questions)) {
        questionsToImport = parsedData.questions;
      } else if (parsedData.questionText) {
        // Single question object
        questionsToImport = [parsedData];
      } else {
        throw new Error("JSON must contain a 'questions' array or be an array of questions");
      }

      if (questionsToImport.length === 0) {
        throw new Error("No questions found in JSON data");
      }

      // Validate and normalize questions
      const normalizedQuestions = questionsToImport.map((question, index) => {
        try {
          validateQuestionStructure(question);
          return normalizeQuestion(question);
        } catch (error) {
          throw new Error(`Question ${index + 1}: ${error.message}`);
        }
      });

      // Ask for confirmation if replacing existing data
      if (hasUnsavedChanges()) {
        if (!window.confirm("This will replace your current questions. Continue?")) {
          return;
        }
      }

      setQuestions(normalizedQuestions);
      setShowJsonImport(false);
      setJsonInput("");
      setSuccessMessage(`Successfully imported ${normalizedQuestions.length} question(s)!`);
      setTimeout(() => setSuccessMessage(""), 5000);

    } catch (error) {
      setJsonError(error.message);
    }
  };

  const importFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setJsonError("Please select a valid JSON file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setJsonInput(e.target.result);
    };
    reader.onerror = () => {
      setJsonError("Failed to read file");
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = "";
  };

  const exportToJson = () => {
    const dataToExport = {
      exportDate: new Date().toISOString(),
      questionsCount: questions.length,
      questions: questions
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `questions-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMessage("Questions exported successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const generateSampleJson = () => {
    const sampleData = {
      questions: [
        {
          questionType: "standard",
          questionText: "What is 2 + 2?",
          subject: "aptitude",
          category: "number-systems",
          options: [
            { identifier: "A", text: "3", isCorrect: false },
            { identifier: "B", text: "4", isCorrect: true },
            { identifier: "C", text: "5", isCorrect: false },
            { identifier: "D", text: "6", isCorrect: false }
          ],
          correctAnswer: "B",
          explanation: "Basic addition: 2 + 2 = 4",
          solution: "Simply add the two numbers together."
        },
        {
          questionType: "reading-comprehension",
          passageTitle: "Climate Change",
          passage: "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, scientific evidence shows that human activities have been the main driver of climate change since the 1800s.",
          subject: "reading-comprehension",
          category: "environment-passages",
          questions: [
            {
              questionText: "What is the main driver of climate change since the 1800s?",
              options: [
                { identifier: "A", text: "Natural variations", isCorrect: false },
                { identifier: "B", text: "Human activities", isCorrect: true },
                { identifier: "C", text: "Solar radiation", isCorrect: false },
                { identifier: "D", text: "Ocean currents", isCorrect: false }
              ],
              correctAnswer: "B",
              explanation: "The passage states that human activities have been the main driver since the 1800s."
            }
          ]
        }
      ]
    };
    
    setJsonInput(JSON.stringify(sampleData, null, 2));
  };

  const loadSavedDrafts = () => {
    try {
      const drafts = JSON.parse(sessionStorage.getItem('questionDrafts') || '[]');
      setSavedDrafts(drafts);
    } catch (error) {
      console.error('Failed to load saved drafts:', error);
    }
  };

  const hasUnsavedChanges = () => {
    return questions.some(q => 
      q.questionText.trim() || 
      q.category.trim() || 
      q.explanation.trim() ||
      (q.passage && q.passage.trim()) ||
      q.options.some(opt => opt.text.trim())
    );
  };

  const saveProgress = async (isAutoSave = false) => {
    if (!hasUnsavedChanges()) {
      if (!isAutoSave) {
        setErrorMessage("No changes to save");
        setTimeout(() => setErrorMessage(""), 3000);
      }
      return;
    }

    setIsSaving(true);
    
    try {
      const draftData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        questions: questions,
        questionsCount: questions.length,
        isAutoSave
      };

      const existingDrafts = JSON.parse(sessionStorage.getItem('questionDrafts') || '[]');
      const updatedDrafts = [draftData, ...existingDrafts.slice(0, 4)];
      sessionStorage.setItem('questionDrafts', JSON.stringify(updatedDrafts));
      
      setSavedDrafts(updatedDrafts);
      
      if (!isAutoSave) {
        setSuccessMessage("Progress saved successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
      if (!isAutoSave) {
        setErrorMessage("Failed to save progress");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const loadDraft = (draft) => {
    if (window.confirm("Loading this draft will replace your current progress. Continue?")) {
      setQuestions(draft.questions);
      setSuccessMessage("Draft loaded successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const deleteDraft = (draftId) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      const updatedDrafts = savedDrafts.filter(draft => draft.id !== draftId);
      setSavedDrafts(updatedDrafts);
      sessionStorage.setItem('questionDrafts', JSON.stringify(updatedDrafts));
      setSuccessMessage("Draft deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionType = type;

    if (type === "reading-comprehension") {
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        passage: "",
        passageTitle: "",
        questions: [
          {
            questionText: "",
            options: [
              { identifier: "A", text: "", isCorrect: false },
              { identifier: "B", text: "", isCorrect: false },
              { identifier: "C", text: "", isCorrect: false },
              { identifier: "D", text: "", isCorrect: false },
            ],
            correctAnswer: "",
            explanation: "",
          },
        ],
        questionText: "",
        options: [],
        correctAnswer: "",
        explanation: "",
      };
    } else {
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        questionText: "",
        options: [
          { identifier: "A", text: "", isCorrect: false },
          { identifier: "B", text: "", isCorrect: false },
          { identifier: "C", text: "", isCorrect: false },
          { identifier: "D", text: "", isCorrect: false },
        ],
        correctAnswer: "",
        explanation: "",
        passage: "",
        passageTitle: "",
        questions: [],
      };
    }

    setQuestions(updatedQuestions);
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex][field] = value;

    if (
      field === "identifier" &&
      updatedQuestions[qIndex].options[optIndex].isCorrect
    ) {
      updatedQuestions[qIndex].correctAnswer = value;
    }

    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = answer;

    updatedQuestions[qIndex].options.forEach((opt) => {
      opt.isCorrect = opt.identifier === answer;
    });

    setQuestions(updatedQuestions);
  };

  const handlePassageQuestionChange = (qIndex, pqIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].questions[pqIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const handlePassageOptionChange = (
    qIndex,
    pqIndex,
    optIndex,
    field,
    value
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].questions[pqIndex].options[optIndex][field] =
      value;

    if (
      field === "identifier" &&
      updatedQuestions[qIndex].questions[pqIndex].options[optIndex].isCorrect
    ) {
      updatedQuestions[qIndex].questions[pqIndex].correctAnswer = value;
    }

    setQuestions(updatedQuestions);
  };

  const handlePassageCorrectAnswerChange = (qIndex, pqIndex, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].questions[pqIndex].correctAnswer = answer;

    updatedQuestions[qIndex].questions[pqIndex].options.forEach((opt) => {
      opt.isCorrect = opt.identifier === answer;
    });

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionType: "standard",
        questionText: "",
        subject: "aptitude",
        category: "",
        options: [
          { identifier: "A", text: "", isCorrect: false },
          { identifier: "B", text: "", isCorrect: false },
          { identifier: "C", text: "", isCorrect: false },
          { identifier: "D", text: "", isCorrect: false },
        ],
        correctAnswer: "",
        explanation: "",
        diagrams: [],
        hasDiagram: false,
      },
    ]);
  };

  const addPassageQuestion = (qIndex) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[qIndex].questions) {
      updatedQuestions[qIndex].questions = [];
    }
    updatedQuestions[qIndex].questions.push({
      questionText: "",
      options: [
        { identifier: "A", text: "", isCorrect: false },
        { identifier: "B", text: "", isCorrect: false },
        { identifier: "C", text: "", isCorrect: false },
        { identifier: "D", text: "", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "",
    });
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 1) return;

    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }

    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    const updatedPreviewUrls = { ...previewUrls };
    delete updatedPreviewUrls[index];

    const reindexedPreviewUrls = {};
    Object.keys(updatedPreviewUrls).forEach((key) => {
      const numKey = parseInt(key);
      if (numKey > index) {
        reindexedPreviewUrls[numKey - 1] = updatedPreviewUrls[key];
      } else if (numKey < index) {
        reindexedPreviewUrls[key] = updatedPreviewUrls[key];
      }
    });
    setPreviewUrls(reindexedPreviewUrls);
  };

  const removePassageQuestion = (qIndex, pqIndex) => {
    const updatedQuestions = [...questions];
    if (
      updatedQuestions[qIndex].questions &&
      updatedQuestions[qIndex].questions.length > pqIndex
    ) {
      updatedQuestions[qIndex].questions.splice(pqIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleImageUpload = async (e, qIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage("Image file size should be less than 5MB");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({
      ...prev,
      [qIndex]: localUrl,
    }));

    setUploadingQuestionIndex(qIndex);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${backend_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = response.data;

      const updatedQuestions = [...questions];
      if (!updatedQuestions[qIndex].diagrams) {
        updatedQuestions[qIndex].diagrams = [];
      }

      updatedQuestions[qIndex].diagrams.push({
        url: url,
        caption: "",
      });
      updatedQuestions[qIndex].hasDiagram = true;

      setQuestions(updatedQuestions);

      URL.revokeObjectURL(localUrl);
      setPreviewUrls((prev) => {
        const updated = { ...prev };
        delete updated[qIndex];
        return updated;
      });

      setSuccessMessage("Image uploaded successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Image upload failed:", error);

      URL.revokeObjectURL(localUrl);
      setPreviewUrls((prev) => {
        const updated = { ...prev };
        delete updated[qIndex];
        return updated;
      });

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to upload image";
      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsUploading(false);
      setUploadingQuestionIndex(null);

      if (fileInputRefs.current[qIndex]) {
        fileInputRefs.current[qIndex].value = "";
      }
    }
  };

  const handleDiagramCaptionChange = (qIndex, dIndex, caption) => {
    const updatedQuestions = [...questions];
    if (
      updatedQuestions[qIndex].diagrams &&
      updatedQuestions[qIndex].diagrams[dIndex]
    ) {
      updatedQuestions[qIndex].diagrams[dIndex].caption = caption;
      setQuestions(updatedQuestions);
    }
  };

  const removeDiagram = (qIndex, dIndex) => {
    const updatedQuestions = [...questions];
    if (
      updatedQuestions[qIndex].diagrams &&
      updatedQuestions[qIndex].diagrams.length > dIndex
    ) {
      updatedQuestions[qIndex].diagrams.splice(dIndex, 1);
      updatedQuestions[qIndex].hasDiagram =
        updatedQuestions[qIndex].diagrams.length > 0;
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(previewUrls).length > 0) {
      setErrorMessage("Please wait for all images to finish uploading");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const isValid = questions.every((q) => {
        if (q.questionType === "standard") {
          return (
            q.questionText.trim() &&
            q.subject &&
            q.category.trim() &&
            q.options.every((opt) => opt.text.trim()) &&
            q.correctAnswer &&
            q.explanation.trim()
          );
        } else if (q.questionType === "reading-comprehension") {
          return (
            q.passage &&
            q.passage.trim() &&
            q.passageTitle &&
            q.passageTitle.trim() &&
            q.questions &&
            q.questions.length > 0 &&
            q.questions.every(
              (pq) =>
                pq.questionText.trim() &&
                pq.options.every((opt) => opt.text.trim()) &&
                pq.correctAnswer &&
                pq.explanation.trim()
            )
          );
        }
        return false;
      });

      if (!isValid) {
        throw new Error("Please fill all required fields for all questions");
      }

      const response = await axios.post(
        `${backend_URL}/api/questions/bulk-upload`,
        questions
      );

      setSuccessMessage(
        `${response.data.questions.length} questions added successfully!`
      );
      setTimeout(() => setSuccessMessage(""), 5000);

      sessionStorage.removeItem('questionDrafts');
      setSavedDrafts([]);

      setQuestions([
        {
          questionType: "standard",
          questionText: "",
          subject: "aptitude",
          category: "",
          options: [
            { identifier: "A", text: "", isCorrect: false },
            { identifier: "B", text: "", isCorrect: false },
            { identifier: "C", text: "", isCorrect: false },
            { identifier: "D", text: "", isCorrect: false },
          ],
          correctAnswer: "",
          explanation: "",
          diagrams: [],
          hasDiagram: false,
        },
      ]);

      Object.values(previewUrls).forEach((url) => {
        if (url && typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      setPreviewUrls({});
    } catch (error) {
      console.error("Failed to submit questions:", error);
      setErrorMessage(
        error.response?.data?.error ||
          error.message ||
          "Failed to submit questions"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Bulk Question Upload
          </h1>
          
          <div className="flex space-x-3">
            {/* JSON Import/Export Buttons */}
            <button
              type="button"
              onClick={() => setShowJsonImport(!showJsonImport)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <UploadIcon size={16} className="mr-2" />
              Import JSON
            </button>

            <button
              type="button"
              onClick={exportToJson}
              disabled={!hasUnsavedChanges()}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} className="mr-2" />
              Export JSON
            </button>

            {/* Save Progress Button */}
            <button
              type="button"
              onClick={() => saveProgress(false)}
              disabled={isSaving || !hasUnsavedChanges()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} className="mr-2" />
              {isSaving ? "Saving..." : "Save Progress"}
            </button>

            {/* Show Drafts Button */}
            {savedDrafts.length > 0 && (
              <button
                type="button"
                onClick={() => setShowDrafts(!showDrafts)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <FileText size={16} className="mr-2" />
                Saved Drafts ({savedDrafts.length})
              </button>
            )}
          </div>
        </div>

        {/* JSON Import Modal */}
        {showJsonImport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Import Questions from JSON
                </h2>
                <button
                  onClick={() => {
                    setShowJsonImport(false);
                    setJsonInput("");
                    setJsonError("");
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex space-x-3 mb-4">
                  <input
                    type="file"
                    ref={jsonFileInputRef}
                    onChange={importFromFile}
                    accept=".json,application/json"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => jsonFileInputRef.current?.click()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FileText size={16} className="mr-2" />
                    Upload JSON File
                  </button>
                  
                  <button
                    type="button"
                    onClick={generateSampleJson}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <FileText size={16} className="mr-2" />
                    Generate Sample
                  </button>
                </div>

                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  JSON Data
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                  rows={15}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON data here or upload a JSON file..."
                />
                
                {jsonError && (
                  <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 rounded-md">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {jsonError}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Expected JSON Format:
                </h3>
                <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
{`{
  "questions": [
    {
      "questionType": "standard", // or "reading-comprehension"
      "questionText": "Your question text",
      "subject": "aptitude", // or other subjects
      "category": "number-systems", // topic value
      "options": [
        {"identifier": "A", "text": "Option 1", "isCorrect": false},
        {"identifier": "B", "text": "Option 2", "isCorrect": true},
        {"identifier": "C", "text": "Option 3", "isCorrect": false},
        {"identifier": "D", "text": "Option 4", "isCorrect": false}
      ],
      "correctAnswer": "B",
      "explanation": "Explanation text",
      "solution": "Optional solution" // optional field
    }
  ]
}`}
                </pre>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowJsonImport(false);
                    setJsonInput("");
                    setJsonError("");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={importFromJson}
                  disabled={!jsonInput.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import Questions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Auto-save indicator */}
        {hasUnsavedChanges() && (
          <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💾 Auto-saving every 30 seconds...
            </p>
          </div>
        )}

        {/* Saved Drafts Section */}
        {showDrafts && savedDrafts.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Saved Drafts
            </h3>
            <div className="space-y-3">
              {savedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-zinc-800 rounded border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {draft.questionsCount} question{draft.questionsCount !== 1 ? 's' : ''} 
                      {draft.isAutoSave && <span className="text-blue-600 dark:text-blue-400"> (Auto-saved)</span>}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(draft.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => loadDraft(draft)}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDraft(draft.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Question {qIndex + 1}
                </h2>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {/* Question Type */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Question Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name={`questionType-${qIndex}`}
                      value="standard"
                      checked={question.questionType === "standard"}
                      onChange={() =>
                        handleQuestionTypeChange(qIndex, "standard")
                      }
                    />
                    <span className="ml-2 dark:text-white">
                      Standard Question
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name={`questionType-${qIndex}`}
                      value="reading-comprehension"
                      checked={
                        question.questionType === "reading-comprehension"
                      }
                      onChange={() =>
                        handleQuestionTypeChange(
                          qIndex,
                          "reading-comprehension"
                        )
                      }
                    />
                    <span className="ml-2 dark:text-white">
                      Reading Comprehension
                    </span>
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={question.subject}
                  onChange={(e) => {
                    handleInputChange(qIndex, "subject", e.target.value);
                    handleInputChange(qIndex, "category", "");
                  }}
                >
                  <option value="aptitude">Aptitude</option>
                  <option value="logical-reasoning">Logical Reasoning</option>
                  <option value="verbal-reasoning">Verbal Reasoning</option>
                  <option value="non-verbal-reasoning">Non-Verbal Reasoning</option>
                  <option value="verbal-ability">Verbal Ability</option>
                  <option value="reading-comprehension">Reading Comprehension</option>
                </select>
              </div>

              {/* Category/Topic */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Topic/Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={question.category}
                  onChange={(e) =>
                    handleInputChange(qIndex, "category", e.target.value)
                  }
                  required
                >
                  <option value="">Select a topic</option>
                  {subjectTopics[question.subject]?.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Choose from predefined topics for better organization
                </p>
              </div>

              {/* Question Content */}
              {question.questionType === "standard" ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Question Text
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      value={question.questionText}
                      onChange={(e) =>
                        handleInputChange(
                          qIndex,
                          "questionText",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Options
                    </label>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={option.text}
                          onChange={(e) =>
                            handleOptionChange(
                              qIndex,
                              optIndex,
                              "text",
                              e.target.value
                            )
                          }
                          placeholder={`Option ${option.identifier}`}
                          required
                        />
                        <input
                          type="radio"
                          name={`correctAnswer-${qIndex}`}
                          className="ml-4"
                          checked={option.isCorrect}
                          onChange={() =>
                            handleCorrectAnswerChange(qIndex, option.identifier)
                          }
                        />
                        <span className="ml-2 dark:text-white">Correct</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Correct Answer
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleCorrectAnswerChange(qIndex, e.target.value)
                      }
                      required
                    >
                      <option value="">Select correct answer</option>
                      {question.options.map((opt) => (
                        <option key={opt.identifier} value={opt.identifier}>
                          Option {opt.identifier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Explanation
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      value={question.explanation}
                      onChange={(e) =>
                        handleInputChange(qIndex, "explanation", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Solution (Optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={2}
                      value={question.solution || ""}
                      onChange={(e) =>
                        handleInputChange(qIndex, "solution", e.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Passage Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={question.passageTitle || ""}
                      onChange={(e) =>
                        handleInputChange(
                          qIndex,
                          "passageTitle",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Passage
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={6}
                      value={question.passage || ""}
                      onChange={(e) =>
                        handleInputChange(qIndex, "passage", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                      Questions for this Passage
                    </label>

                    {question.questions &&
                      question.questions.map((pq, pqIndex) => (
                        <div
                          key={pqIndex}
                          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium dark:text-white">
                              Question {pqIndex + 1}
                            </h3>
                            {question.questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removePassageQuestion(qIndex, pqIndex)
                                }
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                              Explanation
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              rows={2}
                              value={pq.explanation}
                              onChange={(e) =>
                                handlePassageQuestionChange(
                                  qIndex,
                                  pqIndex,
                                  "explanation",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                      ))}

                    <button
                      type="button"
                      onClick={() => addPassageQuestion(qIndex)}
                      className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Question to Passage
                    </button>
                  </div>
                </>
              )}

              {/* Image Upload Section */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Diagrams/Images
                </label>

                {/* Preview while uploading */}
                {previewUrls[qIndex] && (
                  <div className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex items-center">
                      <img
                        src={previewUrls[qIndex]}
                        alt="Preview"
                        className="h-20 w-auto object-contain mr-3 rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Preview - Uploading...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Uploaded diagrams */}
                {question.diagrams &&
                  question.diagrams.length > 0 &&
                  question.diagrams.map((diagram, dIndex) => (
                    <div
                      key={dIndex}
                      className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20"
                    >
                      <div className="flex items-start mb-2">
                        <img
                          src={diagram.url}
                          alt="Diagram"
                          className="h-20 w-auto object-contain mr-3 rounded"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={diagram.caption || ""}
                            onChange={(e) =>
                              handleDiagramCaptionChange(
                                qIndex,
                                dIndex,
                                e.target.value
                              )
                            }
                            placeholder="Caption for this image"
                          />
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            ✓ Successfully uploaded
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDiagram(qIndex, dIndex)}
                          className="ml-2 text-red-500 hover:text-red-700 p-1"
                          title="Remove image"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                {/* Upload button */}
                <div className="mt-2">
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[qIndex] = el)}
                    onChange={(e) => handleImageUpload(e, qIndex)}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[qIndex]?.click()}
                    disabled={uploadingQuestionIndex === qIndex}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={16} className="mr-2" />
                    {uploadingQuestionIndex === qIndex ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      "Upload Image"
                    )}
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Form Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Add Another Question
              </button>

              <button
                type="button"
                onClick={() => saveProgress(false)}
                disabled={isSaving || !hasUnsavedChanges()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? "Saving..." : "Save Progress"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isUploading || Object.keys(previewUrls).length > 0}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Submitting..." : "Submit All Questions"}
            </button>
          </div>

          {/* Upload status indicator */}
          {Object.keys(previewUrls).length > 0 && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⏳ Please wait for all images to finish uploading before
                submitting the form.
              </p>
            </div>
          )}

          {/* Progress indicator */}
          {hasUnsavedChanges() && (
            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-400 dark:border-blue-600 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                📝 You have unsaved changes. They will be auto-saved every 30 seconds.
              </p>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default BulkQuestionUpload;