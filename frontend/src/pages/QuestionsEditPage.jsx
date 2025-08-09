// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Save, X, Plus, Trash2 } from "lucide-react";
// import Layout from "../components/layouts/layout";
// import { AppContext } from "../context/AppContext";

// const QuestionEditPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { backend_URL } = useContext(AppContext);
//   const { subject, topic } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setLoading(true);
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

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index] = {
//       ...updatedQuestions[index],
//       [field]: value,
//     };
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (questionIndex, optionIndex, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex] = {
//       ...updatedQuestions[questionIndex].options[optionIndex],
//       [field]: value,
//     };
//     setQuestions(updatedQuestions);
//   };

//   const toggleCorrectOption = (questionIndex, optionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.forEach((opt, idx) => {
//       opt.isCorrect = idx === optionIndex;
//     });
//     setQuestions(updatedQuestions);
//   };

//   const addNewOption = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     const newOptionId = String.fromCharCode(
//       65 + updatedQuestions[questionIndex].options.length
//     );
//     updatedQuestions[questionIndex].options.push({
//       identifier: newOptionId,
//       text: "",
//       isCorrect: false,
//     });
//     setQuestions(updatedQuestions);
//   };

//   const removeOption = (questionIndex, optionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.splice(optionIndex, 1);
//     updatedQuestions[questionIndex].options.forEach((opt, idx) => {
//       opt.identifier = String.fromCharCode(65 + idx);
//     });
//     setQuestions(updatedQuestions);
//   };

//   const addNewQuestion = () => {
//     const newQuestion = {
//       _id: `new-${Date.now()}`,
//       questionText: "",
//       subject: subject,
//       category: topic.replace(/-/g, " "),
//       options: [
//         { identifier: "A", text: "", isCorrect: false },
//         { identifier: "B", text: "", isCorrect: false },
//         { identifier: "C", text: "", isCorrect: false },
//         { identifier: "D", text: "", isCorrect: false },
//       ],
//       explanation: "",
//       solution: "",
//       diagrams: [],
//       hasDiagram: false,
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const removeQuestion = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(questionIndex, 1);
//     setQuestions(updatedQuestions);
//   };

//   const saveChanges = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Validate questions before saving
//       const validQuestions = questions.filter((q) => {
//         const hasCorrectAnswer = q.options.some((opt) => opt.isCorrect);
//         const hasQuestionText = q.questionText.trim() !== "";
//         const hasValidOptions = q.options.every(
//           (opt) => opt.text.trim() !== ""
//         );
//         return hasCorrectAnswer && hasQuestionText && hasValidOptions;
//       });

//       if (validQuestions.length === 0) {
//         setError("Please add at least one valid question with correct answers");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.put(
//         `${backend_URL}/api/indiabix/questions/${subject}/${topic}/edit`,
//         { questions: validQuestions }
//       );

//       if (response.data.success) {
//         navigate(`/${subject}/${topic}`); // Redirect back to view mode
//       } else {
//         setError(response.data.message || "Failed to save questions");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelEditing = () => {
//     navigate(`/${subject}/${topic}`); // Redirect back to view mode
//   };

//   if (loading && questions.length === 0) {
//     return (
//       <Layout>
//         <div className="flex justify-center dark:bg-black items-center h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-screen text-red-500">
//           <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg max-w-md">
//             <h3 className="text-lg font-bold mb-2">Error</h3>
//             <p>{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container w-full px-4 py-8 max-w-3xl">
//         <h1 className="text-3xl capitalize text-center mb-8 text-blue-600 dark:text-blue-400">
//           Editing:{" "}
//           <span className="text-gray-600 dark:text-white">{subject}</span> -{" "}
//           {topic.replace(/-/g, " ")}
//         </h1>

//         <div className="flex gap-2 mb-6">
//           <button
//             onClick={saveChanges}
//             disabled={loading}
//             className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
//           >
//             <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
//           </button>
//           <button
//             onClick={cancelEditing}
//             className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//           >
//             <X size={18} /> Cancel
//           </button>
//           <button
//             onClick={addNewQuestion}
//             className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             <Plus size={18} /> Add Question
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
//             {error}
//           </div>
//         )}

//         {questions.map((question, index) => (
//           <div
//             key={question._id}
//             className="mb-8 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900/50 relative"
//           >
//             <button
//               onClick={() => removeQuestion(index)}
//               className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400"
//               title="Delete question"
//             >
//               <Trash2 size={18} />
//             </button>

//             <div className="flex items-start mb-4">
//               <span className="text-lg font-semibold mr-2 text-gray-800 dark:text-zinc-200">
//                 {index + 1}.
//               </span>
//               <textarea
//                 value={question.questionText}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "questionText", e.target.value)
//                 }
//                 className="flex-1 text-lg text-gray-800 dark:text-zinc-200 bg-gray-50 dark:bg-zinc-700 p-2 rounded border border-gray-300 dark:border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
//                 placeholder="Enter question text..."
//                 rows={3}
//               />
//             </div>

//             <div className="space-y-3 mb-6">
//               {question.options.map((option, optIndex) => (
//                 <div
//                   key={option.identifier}
//                   className="p-3 border rounded-md flex items-center bg-gray-50 dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
//                 >
//                   <button
//                     onClick={() => toggleCorrectOption(index, optIndex)}
//                     className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full font-medium text-sm cursor-pointer
//                       ${
//                         option.isCorrect
//                           ? "bg-green-500 dark:bg-green-600 text-white"
//                           : "bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400 dark:hover:bg-zinc-500"
//                       }`}
//                   >
//                     {option.identifier}
//                   </button>

//                   <div className="flex-1 flex items-center gap-2">
//                     <input
//                       type="text"
//                       value={option.text}
//                       onChange={(e) =>
//                         handleOptionChange(
//                           index,
//                           optIndex,
//                           "text",
//                           e.target.value
//                         )
//                       }
//                       className="flex-1 bg-transparent border-b border-gray-300 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none p-1"
//                       placeholder="Enter option text..."
//                     />
//                     {question.options.length > 2 && (
//                       <button
//                         onClick={() => removeOption(index, optIndex)}
//                         className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
//                         title="Remove option"
//                       >
//                         <X size={16} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {question.options.length < 6 && (
//                 <button
//                   onClick={() => addNewOption(index)}
//                   className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 p-2 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-md w-full justify-center"
//                 >
//                   <Plus size={16} /> Add Option
//                 </button>
//               )}
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block font-medium text-gray-700 dark:text-zinc-300 mb-2">
//                   Explanation:
//                 </label>
//                 <textarea
//                   value={question.explanation || ""}
//                   onChange={(e) =>
//                     handleQuestionChange(index, "explanation", e.target.value)
//                   }
//                   className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md bg-gray-50 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
//                   placeholder="Enter explanation..."
//                   rows={3}
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700 dark:text-zinc-300 mb-2">
//                   Solution (Optional):
//                 </label>
//                 <textarea
//                   value={question.solution || ""}
//                   onChange={(e) =>
//                     handleQuestionChange(index, "solution", e.target.value)
//                   }
//                   className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md bg-gray-50 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
//                   placeholder="Enter detailed solution..."
//                   rows={2}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// };

// export default QuestionEditPage;
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Save,
  X,
  Plus,
  Trash2,
  Edit,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const QuestionEditPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [savingStates, setSavingStates] = useState({}); // Track saving state per question
  const { backend_URL } = useContext(AppContext);
  const { subject, topic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backend_URL}/api/questions/questions/${subject}/${topic}`
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

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const toggleCorrectOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.forEach((opt, idx) => {
      opt.isCorrect = idx === optionIndex;
    });
    setQuestions(updatedQuestions);
  };

  const addNewOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    const newOptionId = String.fromCharCode(
      65 + updatedQuestions[questionIndex].options.length
    );
    updatedQuestions[questionIndex].options.push({
      identifier: newOptionId,
      text: "",
      isCorrect: false,
    });
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    updatedQuestions[questionIndex].options.forEach((opt, idx) => {
      opt.identifier = String.fromCharCode(65 + idx);
    });
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    const newQuestion = {
      _id: `new-${Date.now()}`,
      questionText: "",
      subject: subject,
      category: topic.replace(/-/g, " "),
      options: [
        { identifier: "A", text: "", isCorrect: false },
        { identifier: "B", text: "", isCorrect: false },
        { identifier: "C", text: "", isCorrect: false },
        { identifier: "D", text: "", isCorrect: false },
      ],
      explanation: "",
      solution: "",
      diagrams: [],
      hasDiagram: false,
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestion(questions.length); // Expand the new question
  };

  const removeQuestion = async (questionIndex) => {
    const questionId = questions[questionIndex]._id;

    // If it's a newly created question (not saved to DB yet)
    if (questionId.startsWith("new-")) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(questionIndex, 1);
      setQuestions(updatedQuestions);
      if (expandedQuestion === questionIndex) {
        setExpandedQuestion(null);
      } else if (expandedQuestion > questionIndex) {
        setExpandedQuestion(expandedQuestion - 1);
      }
      return;
    }

    try {
      setSavingStates((prev) => ({ ...prev, [questionId]: true }));
      await axios.delete(`${backend_URL}/api/questions/update-question/${questionId}`);

      const updatedQuestions = [...questions];
      updatedQuestions.splice(questionIndex, 1);
      setQuestions(updatedQuestions);

      if (expandedQuestion === questionIndex) {
        setExpandedQuestion(null);
      } else if (expandedQuestion > questionIndex) {
        setExpandedQuestion(expandedQuestion - 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSavingStates((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const toggleExpandQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const moveQuestionUp = (index) => {
    if (index === 0) return;
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index - 1];
    updatedQuestions[index - 1] = temp;
    setQuestions(updatedQuestions);
    if (expandedQuestion === index) {
      setExpandedQuestion(index - 1);
    } else if (expandedQuestion === index - 1) {
      setExpandedQuestion(index);
    }
  };

  const moveQuestionDown = (index) => {
    if (index === questions.length - 1) return;
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index + 1];
    updatedQuestions[index + 1] = temp;
    setQuestions(updatedQuestions);
    if (expandedQuestion === index) {
      setExpandedQuestion(index + 1);
    } else if (expandedQuestion === index + 1) {
      setExpandedQuestion(index);
    }
  };

  const saveQuestion = async (questionIndex) => {
    const question = questions[questionIndex];
    const questionId = question._id;

    // Validate the question
    const hasCorrectAnswer = question.options.some((opt) => opt.isCorrect);
    const hasQuestionText = question.questionText.trim() !== "";
    const hasValidOptions = question.options.every(
      (opt) => opt.text.trim() !== ""
    );

    if (!hasQuestionText) {
      setError("Question text cannot be empty");
      return;
    }
    if (!hasCorrectAnswer) {
      setError("Please select a correct answer");
      return;
    }
    if (!hasValidOptions) {
      setError("Option text cannot be empty");
      return;
    }

    try {
      setSavingStates((prev) => ({ ...prev, [questionId]: true }));
      setError(null);

      // Prepare the update data
      const updateData = {
        questionText: question.questionText,
        options: question.options,
        explanation: question.explanation,
        solution: question.solution,
        subject: question.subject,
        category: question.category,
      };

      let response;

      if (questionId.startsWith("new-")) {
        // Create new question
        response = await axios.post(
          `${backend_URL}/api/questions/questions`,
          updateData
        );

        // Update the local state with the saved question (which will have a real _id)
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = response.data.question;
        setQuestions(updatedQuestions);
      } else {
        // Update existing question
        response = await axios.put(
          `${backend_URL}/api/questions/update-question/${questionId}`,
          updateData
          );
          toast.success("Question Updated successfully!")
      }

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setSavingStates((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const saveAllQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Save each question individually
      for (let i = 0; i < questions.length; i++) {
        await saveQuestion(i);
      }

      // After all saves are complete, refresh the data
      const response = await axios.get(
        `${backend_URL}/api/questions/update-question/${subject}/${topic}`
      );
      setQuestions(response.data.questions || []);

      navigate(`/${subject}/${topic}`); // Redirect back to view mode
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelEditing = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost."
      )
    ) {
      navigate(`/${subject}/${topic}`); // Redirect back to view mode
    }
  };

  if (loading && questions.length === 0) {
    return (
      <Layout>
        <div className="flex justify-center dark:bg-black items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-red-500">
          <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-2">Error</h3>
            <p className="whitespace-pre-line">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container w-full px-4 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl capitalize text-center mb-8 text-blue-600 dark:text-blue-400">
          Editing:{" "}
          <span className="text-gray-600 dark:text-white">{subject}</span> -{" "}
          {topic.replace(/-/g, " ")}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={saveAllQuestions}
            disabled={loading}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            <Save size={18} /> {loading ? "Saving..." : "Save All Changes"}
          </button>
          <button
            onClick={cancelEditing}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <X size={18} /> Cancel
          </button>
          <button
            onClick={addNewQuestion}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus size={18} /> Add Question
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg whitespace-pre-line">
            {error}
          </div>
        )}

        {questions.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No questions found. Click "Add Question" to create one.
          </div>
        )}

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800 dark:text-zinc-200">
                    {index + 1}.
                  </span>
                  <button
                    onClick={() => toggleExpandQuestion(index)}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => moveQuestionUp(index)}
                    disabled={index === 0}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30"
                  >
                    <ChevronUp size={18} />
                  </button>
                  <button
                    onClick={() => moveQuestionDown(index)}
                    disabled={index === questions.length - 1}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30"
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {question.options.some((opt) => opt.isCorrect) ? (
                    <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                      Has Correct Answer
                    </span>
                  ) : (
                    <span className="text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 px-2 py-1 rounded">
                      Missing Correct Answer
                    </span>
                  )}
                  <button
                    onClick={() => removeQuestion(index)}
                    disabled={savingStates[question._id]}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 disabled:opacity-50"
                    title="Delete question"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => saveQuestion(index)}
                    disabled={savingStates[question._id]}
                    className="text-green-500 hover:text-green-700 dark:hover:text-green-400 p-1 disabled:opacity-50"
                    title="Save question"
                  >
                    {savingStates[question._id] ? (
                      <span className="inline-block h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <Save size={18} />
                    )}
                  </button>
                </div>
              </div>

              {expandedQuestion === index && (
                <div className="p-6">
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Question Text:
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "questionText",
                          e.target.value
                        )
                      }
                      className="w-full text-gray-800 dark:text-zinc-200 bg-gray-50 dark:bg-zinc-700 p-3 rounded border border-gray-300 dark:border-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Enter question text..."
                      rows={3}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Options:
                    </label>
                    <div className="space-y-3">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={option.identifier}
                          className="p-3 border rounded-md flex items-center bg-gray-50 dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
                        >
                          <button
                            onClick={() => toggleCorrectOption(index, optIndex)}
                            className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full font-medium text-sm cursor-pointer
                              ${
                                option.isCorrect
                                  ? "bg-green-500 dark:bg-green-600 text-white"
                                  : "bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400 dark:hover:bg-zinc-500"
                              }`}
                          >
                            {option.identifier}
                          </button>

                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) =>
                                handleOptionChange(
                                  index,
                                  optIndex,
                                  "text",
                                  e.target.value
                                )
                              }
                              className="flex-1 bg-transparent border-b border-gray-300 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none p-1"
                              placeholder="Enter option text..."
                            />
                            {question.options.length > 2 && (
                              <button
                                onClick={() => removeOption(index, optIndex)}
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                                title="Remove option"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      {question.options.length < 6 && (
                        <button
                          onClick={() => addNewOption(index)}
                          className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 p-2 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-md w-full justify-center"
                        >
                          <Plus size={16} /> Add Option
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-zinc-300 mb-2">
                        Explanation:
                      </label>
                      <textarea
                        value={question.explanation || ""}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "explanation",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md bg-gray-50 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Enter explanation..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 dark:text-zinc-300 mb-2">
                        Solution (Optional):
                      </label>
                      <textarea
                        value={question.solution || ""}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "solution",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md bg-gray-50 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Enter detailed solution..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default QuestionEditPage;