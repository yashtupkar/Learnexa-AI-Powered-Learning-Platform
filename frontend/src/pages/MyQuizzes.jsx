// import React, { useState, useEffect, useContext, useCallback } from "react";
// import {
//   Loader2,
//   CheckCircle,
//   Clock,
//   FileText,
//   RotateCw,
//   AlertCircle,
//   ChevronRight,
//   Plus,
//   Folder,
//   File,
//   Globe,
//   Code,
//   Landmark,
//   FlaskConical,
//   MoreVertical,
//   Star,
//   Search,
//   Filter,
//   X,
//   BarChart2,
//   Edit,
//   Share2,
//   Trash2,
//   Download,
//   Eye,
//   Copy,
//   Bookmark,
//   TrendingUp,
// } from "lucide-react";
// import Layout from "../components/layouts/layout";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const MyQuizzes = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);
//   const [quizzes, setQuizzes] = useState([]);
//   const [generatedQuizzes, setGeneratedQuizzes] = useState([]);
//   const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [showQuizActions, setShowQuizActions] = useState(null);
//   const [sortOption, setSortOption] = useState("recent");
//   const [selectedTopics, setSelectedTopics] = useState([]);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isSharing, setIsSharing] = useState(false);

//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const userId = user?._id;

//   const { backend_URL } = useContext(AppContext);

//   // Available topics for filtering
//   const availableTopics = [
//     "Geography",
//     "Programming",
//     "History",
//     "Science",
//     "Basic Calculations",
//     "General Knowledge",
//     "Mathematics",
//     "Literature",
//   ];

//   const fetchGeneratedQuizzes = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `${backend_URL}/api/quiz/get-user-generated-quiz/${userId}`
//       );
//       setGeneratedQuizzes(
//         response.data.map((item) => ({
//           ...item.quiz,
//           _id: item._id,
//           type: "generated",
//           createdAt: item.createdAt,
//           status: "generated",
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching generated quizzes:", error);
//       toast.error("Failed to load generated quizzes");
//     }
//   }, [backend_URL, userId]);

//   const fetchAttemptedQuizzes = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `${backend_URL}/api/quiz/get-user-attempted-quiz/${userId}`
//       );
//       setAttemptedQuizzes(
//         response.data.map((item) => ({
//           ...item.quiz,
//           _id: item._id,
//           type: "attempted",
//           score: item.score,
//           submittedAt: item.submittedAt,
//           status: "completed",
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching attempted quizzes:", error);
//       toast.error("Failed to load attempted quizzes");
//     }
//   }, [backend_URL, userId]);

//   // const fetchAllQuizzes = useCallback(async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `${backend_URL}/api/quiz/get-all-quizzes/${userId}`
//   //     );
//   //     setQuizzes(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching all quizzes:", error);
//   //     toast.error("Failed to load quizzes");
//   //   }
//   // }, [backend_URL, userId]);

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       await Promise.all([
       
//         fetchGeneratedQuizzes(),
//         fetchAttemptedQuizzes(),
//       ]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [ fetchGeneratedQuizzes, fetchAttemptedQuizzes]);

//   useEffect(() => {
//     if (userId) {
//       fetchData();
//     }
//   }, [userId, fetchData]);

//   const deleteQuiz = async (quizId) => {
//     setIsDeleting(true);
//     try {
//       await axios.delete(`${backend_URL}/api/quiz/delete-quiz/${quizId}`);
//       toast.success("Quiz deleted successfully");
//       fetchData();
//       setSelectedQuiz(null);
//     } catch (error) {
//       console.error("Error deleting quiz:", error);
//       toast.error("Failed to delete quiz");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const shareQuiz = async (quizId) => {
//     setIsSharing(true);
//     try {
//       const quizLink = `${window.location.origin}/quiz/${quizId}`;
//       await navigator.clipboard.writeText(quizLink);
//       toast.success("Quiz link copied to clipboard!");
//     } catch (error) {
//       console.error("Error sharing quiz:", error);
//       toast.error("Failed to share quiz");
//     } finally {
//       setIsSharing(false);
//     }
//   };

//   const toggleFavorite = async (quizId) => {
//     try {
//       await axios.put(`${backend_URL}/api/quiz/toggle-favorite/${quizId}`);
//       fetchData();
//       toast.success("Favorite status updated");
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//       toast.error("Failed to update favorite status");
//     }
//   };

//   const getFilteredQuizzes = useCallback(() => {
//     let filteredList = [];

//     switch (activeTab) {
//       case "all":
//         filteredList = [...quizzes, ...generatedQuizzes, ...attemptedQuizzes];
//         break;
//       case "completed":
//         filteredList = [...attemptedQuizzes];
//         break;
//       case "generated":
//         filteredList = [...generatedQuizzes];
//         break;
//       case "attempted":
//         filteredList = [...attemptedQuizzes];
//         break;
//       case "generated-attempted":
//         const generatedIds = new Set(generatedQuizzes.map((q) => q._id));
//         filteredList = attemptedQuizzes.filter((q) => generatedIds.has(q._id));
//         break;
//       case "favorites":
//         filteredList = [
//           ...quizzes,
//           ...generatedQuizzes,
//           ...attemptedQuizzes,
//         ].filter((q) => q.favorite);
//         break;
//       default:
//         filteredList = [...quizzes, ...generatedQuizzes, ...attemptedQuizzes];
//     }

//     // Remove duplicates by id
//     const uniqueQuizzes = filteredList.reduce((acc, current) => {
//       const x = acc.find((item) => item._id === current._id);
//       if (!x) {
//         return acc.concat([current]);
//       } else {
//         return acc;
//       }
//     }, []);

//     // Apply search filter
//     let result = uniqueQuizzes.filter((quiz) => {
//       const title = quiz.quiz_title || quiz.title || "";
//       const topic = quiz.topic || "";
//       return (
//         title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         topic.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });

//     // Apply topic filters
//     if (selectedTopics.length > 0) {
//       result = result.filter((quiz) => selectedTopics.includes(quiz.topic));
//     }

//     // Apply sorting
//     switch (sortOption) {
//       case "recent":
//         return result.sort(
//           (a, b) =>
//             new Date(b.submittedAt || b.createdAt) -
//             new Date(a.submittedAt || a.createdAt)
//         );
//       case "oldest":
//         return result.sort(
//           (a, b) =>
//             new Date(a.submittedAt || a.createdAt) -
//             new Date(b.submittedAt || b.createdAt)
//         );
//       case "high-score":
//         return result.sort((a, b) => {
//           const scoreA =
//             a.score?.percentage ||
//             (typeof a.score === "number"
//               ? Math.round((a.score / (a.questions?.length || 1)) * 100)
//               : 0);
//           const scoreB =
//             b.score?.percentage ||
//             (typeof b.score === "number"
//               ? Math.round((b.score / (b.questions?.length || 1)) * 100)
//               : 0);
//           return scoreB - scoreA;
//         });
//       case "low-score":
//         return result.sort((a, b) => {
//           const scoreA =
//             a.score?.percentage ||
//             (typeof a.score === "number"
//               ? Math.round((a.score / (a.questions?.length || 1)) * 100)
//               : 0);
//           const scoreB =
//             b.score?.percentage ||
//             (typeof b.score === "number"
//               ? Math.round((b.score / (b.questions?.length || 1)) * 100)
//               : 0);
//           return scoreA - scoreB;
//         });
//       case "a-z":
//         return result.sort((a, b) =>
//           (a.quiz_title || a.title || "").localeCompare(
//             b.quiz_title || b.title || ""
//           )
//         );
//       case "z-a":
//         return result.sort((a, b) =>
//           (b.quiz_title || b.title || "").localeCompare(
//             a.quiz_title || a.title || ""
//           )
//         );
//       case "most-questions":
//         return result.sort(
//           (a, b) => (b.questions?.length || 0) - (a.questions?.length || 0)
//         );
//       case "least-questions":
//         return result.sort(
//           (a, b) => (a.questions?.length || 0) - (b.questions?.length || 0)
//         );
//       default:
//         return result;
//     }
//   }, [
//     activeTab,
//     quizzes,
//     generatedQuizzes,
//     attemptedQuizzes,
//     searchQuery,
//     selectedTopics,
//     sortOption,
//   ]);

//   const filteredQuizzes = getFilteredQuizzes();

//   const getTopicIcon = (topic) => {
//     if (!topic) return <File className="w-5 h-5 text-white" />;

//     switch (topic.toLowerCase()) {
//       case "geography":
//         return <Globe className="w-5 h-5 text-white" />;
//       case "programming":
//         return <Code className="w-5 h-5 text-white" />;
//       case "history":
//         return <Landmark className="w-5 h-5 text-white" />;
//       case "science":
//         return <FlaskConical className="w-5 h-5 text-white" />;
//       case "basic calculations":
//         return <FileText className="w-5 h-5 text-white" />;
//       case "general knowledge":
//         return <Globe className="w-5 h-5 text-white" />;
//       case "mathematics":
//         return <TrendingUp className="w-5 h-5 text-white" />;
//       case "literature":
//         return <Bookmark className="w-5 h-5 text-white" />;
//       default:
//         return <File className="w-5 h-5 text-white" />;
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case "generating":
//         return <RotateCw className="w-4 h-4 text-blue-500 animate-spin" />;
//       case "failed":
//         return <AlertCircle className="w-4 h-4 text-red-500" />;
//       case "generated":
//         return <FileText className="w-4 h-4 text-indigo-500" />;
//       default:
//         return <FileText className="w-4 h-4 text-gray-400" />;
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case "completed":
//         return "Completed";
//       case "generating":
//         return "Generating";
//       case "failed":
//         return "Failed";
//       case "generated":
//         return "Generated";
//       default:
//         return "Not Attempted";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-50 text-green-800 dark:bg-green-600 dark:text-white";
//       case "generating":
//         return "bg-blue-50 text-blue-800 dark:bg-blue-500 dark:text-white";
//       case "failed":
//         return "bg-red-50 text-red-800 dark:bg-red-500 dark:text-white";
//       case "generated":
//         return "bg-indigo-50 text-indigo-800 dark:bg-indigo-500 dark:text-white";
//       default:
//         return "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const toggleTopicFilter = (topic) => {
//     setSelectedTopics((prev) =>
//       prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
//     );
//   };

//   const clearAllFilters = () => {
//     setSearchQuery("");
//     setSelectedTopics([]);
//     setSortOption("recent");
//     setActiveTab("all");
//   };

//   const handleQuizAction = (action, quiz) => {
//     switch (action) {
//       case "view":
//         setSelectedQuiz(quiz);
//         break;
//       case "edit":
//         navigate(`/edit-quiz/${quiz._id}`);
//         break;
//       case "share":
//         shareQuiz(quiz._id);
//         break;
//       case "delete":
//         deleteQuiz(quiz._id);
//         break;
//       case "favorite":
//         toggleFavorite(quiz._id);
//         break;
//       default:
//         break;
//     }
//     setShowQuizActions(null);
//   };

//   const startNewQuiz = () => {
//     navigate("/create-quiz");
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//             <div>
//               <motion.h1
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3"
//               >
//                 <Folder className="w-8 h-8 text-blue-500" />
//                 My Quizzes
//               </motion.h1>
//               <p className="text-gray-500 dark:text-gray-400 mt-1">
//                 View and manage all your quizzes
//               </p>
//             </div>

//             <div className="flex gap-3 w-full sm:w-auto">
//               <div className="relative flex-1 sm:w-64">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search quizzes..."
//                   className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:text-gray-400 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
//                 onClick={startNewQuiz}
//               >
//                 <Plus className="w-5 h-5" />
//                 <span className="hidden sm:inline">New Quiz</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2 px-3 py-2 border text-sm dark:text-gray-400 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter size={16} />
//                 <span className="hidden sm:inline ">Filters</span>
//               </motion.button>
//             </div>
//           </div>

//           {/* Filters Panel */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mb-6 overflow-hidden"
//               >
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-medium text-gray-900 dark:text-white">
//                       Filters
//                     </h3>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={clearAllFilters}
//                         className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//                       >
//                         Clear All
//                       </button>
//                       <button
//                         onClick={() => setShowFilters(false)}
//                         className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
//                         Sort By
//                       </h4>
//                       <div className="flex flex-col gap-2">
//                         {[
//                           {
//                             value: "recent",
//                             label: "Most Recent",
//                             icon: <Clock className="w-4 h-4" />,
//                           },
//                           {
//                             value: "oldest",
//                             label: "Oldest",
//                             icon: <Clock className="w-4 h-4" />,
//                           },
//                           {
//                             value: "high-score",
//                             label: "Highest Score",
//                             icon: <BarChart2 className="w-4 h-4" />,
//                           },
//                           {
//                             value: "low-score",
//                             label: "Lowest Score",
//                             icon: <BarChart2 className="w-4 h-4" />,
//                           },
//                           {
//                             value: "a-z",
//                             label: "A-Z",
//                             icon: <FileText className="w-4 h-4" />,
//                           },
//                           {
//                             value: "z-a",
//                             label: "Z-A",
//                             icon: <FileText className="w-4 h-4" />,
//                           },
//                           {
//                             value: "most-questions",
//                             label: "Most Questions",
//                             icon: <FileText className="w-4 h-4" />,
//                           },
//                           {
//                             value: "least-questions",
//                             label: "Least Questions",
//                             icon: <FileText className="w-4 h-4" />,
//                           },
//                         ].map((option) => (
//                           <label
//                             key={option.value}
//                             className="flex items-center gap-2 cursor-pointer"
//                           >
//                             <input
//                               type="radio"
//                               name="sort"
//                               value={option.value}
//                               checked={sortOption === option.value}
//                               onChange={() => setSortOption(option.value)}
//                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
//                             />
//                             <div className="flex items-center gap-2">
//                               {option.icon}
//                               <span className="text-sm text-gray-700 dark:text-gray-300">
//                                 {option.label}
//                               </span>
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
//                         Topics
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {availableTopics.map((topic) => (
//                           <motion.button
//                             key={topic}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => toggleTopicFilter(topic)}
//                             className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
//                               selectedTopics.includes(topic)
//                                 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
//                                 : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
//                             }`}
//                           >
//                             {getTopicIcon(topic)}
//                             {topic}
//                           </motion.button>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
//                         Quick Actions
//                       </h4>
//                       <div className="flex flex-col gap-2">
//                         <button
//                           className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                           onClick={() =>
//                             toast.promise(
//                               new Promise((resolve) =>
//                                 setTimeout(resolve, 1000)
//                               ),
//                               {
//                                 loading: "Preparing export...",
//                                 success: "Export started successfully",
//                                 error: "Export failed",
//                               }
//                             )
//                           }
//                         >
//                           <Download className="w-4 h-4" />
//                           Export All Quizzes
//                         </button>
//                         <button
//                           className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                           onClick={clearAllFilters}
//                         >
//                           <X className="w-4 h-4" />
//                           Clear Filters
//                         </button>
//                         <button
//                           className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                           onClick={() => {
//                             setActiveTab("favorites");
//                             setShowFilters(false);
//                           }}
//                         >
//                           <Star className="w-4 h-4" />
//                           View Favorites
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="mb-6">
//             <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
//               {[
//                 { id: "all", label: "All Quizzes" },
//                 { id: "completed", label: "Completed" },
//                 { id: "generated", label: "Generated" },
//                 { id: "attempted", label: "Attempted" },
//                 { id: "generated-attempted", label: "Generated & Attempted" },
//                 { id: "favorites", label: "Favorites" },
//               ].map((tab) => (
//                 <motion.button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${
//                     activeTab === tab.id
//                       ? "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-100"
//                       : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   {tab.id === "favorites" && <Star className="w-4 h-4" />}
//                   {tab.label}
//                 </motion.button>
//               ))}
//             </div>
//           </div>

//           {isLoading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="grid place-items-center py-20"
//             >
//               <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//             </motion.div>
//           ) : filteredQuizzes.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
//             >
//               <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                 No quizzes found
//               </h3>
//               <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
//                 {searchQuery || selectedTopics.length > 0
//                   ? "No quizzes match your filters. Try adjusting your search."
//                   : activeTab === "all"
//                   ? "You don't have any quizzes yet. Create your first one!"
//                   : `You don't have any ${activeTab} quizzes.`}
//               </p>
//               <div className="mt-6 flex justify-center gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
//                   onClick={startNewQuiz}
//                 >
//                   <Plus className="w-5 h-5" />
//                   <span>Create Quiz</span>
//                 </motion.button>
//                 {(searchQuery || selectedTopics.length > 0) && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                     onClick={clearAllFilters}
//                   >
//                     <X className="w-5 h-5" />
//                     <span>Clear Filters</span>
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           ) : (
//             <>
//               <div className="mb-4 flex justify-between items-center">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Showing {filteredQuizzes.length}{" "}
//                   {filteredQuizzes.length === 1 ? "quiz" : "quizzes"}
//                 </p>
//                 {(searchQuery || selectedTopics.length > 0) && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
//                   >
//                     <X className="w-4 h-4" />
//                     Clear filters
//                   </button>
//                 )}
//               </div>

//               <motion.div
//                 layout
//                 className="grid grid-cols-1 md:grid-cols-2  gap-5"
//               >
//                 <AnimatePresence>
//                   {filteredQuizzes.map((quiz) => (
//                     <motion.div
//                       key={quiz._id}
//                       layout
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ duration: 0.2 }}
//                       className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800  hover:shadow-md transition-shadow relative group"
//                     >
//                       <div className="p-5">
//                         <div className="flex justify-between items-start mb-3">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`p-2 rounded-lg ${getStatusColor(
//                                 quiz.status || "unknown"
//                               )}`}
//                             >
//                               {getTopicIcon(quiz.topic)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium capitalize max-w-[400px] text-gray-900 dark:text-white truncate">
//                                 {quiz.quiz_title || quiz.title}
//                               </h3>
//                               <p className="text-xs capitalize text-gray-500 dark:text-gray-400 truncate">
//                                 {quiz.topic || "No topic specified"}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <button
//                               onClick={() => handleQuizAction("favorite", quiz)}
//                               className={`p-1 rounded-full ${
//                                 quiz.favorite
//                                   ? "text-yellow-400 hover:text-yellow-500"
//                                   : "text-gray-400 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400"
//                               }`}
//                             >
//                               <Star
//                                 className={`w-5 h-5 ${
//                                   quiz.favorite ? "fill-current" : ""
//                                 }`}
//                               />
//                             </button>
//                             <div className="relative">
//                               <button
//                                 onClick={() =>
//                                   setShowQuizActions(
//                                     showQuizActions === quiz._id
//                                       ? null
//                                       : quiz._id
//                                   )
//                                 }
//                                 className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//                               >
//                                 <MoreVertical className="w-5 h-5" />
//                               </button>

//                               {showQuizActions === quiz._id && (
//                                 <motion.div
//                                   initial={{ opacity: 0, y: -10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   exit={{ opacity: 0, y: -10 }}
//                                   className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700 shadow-lg  focus:outline-none"
//                                 >
//                                   <div className="py-1">
//                                     <button
//                                       onClick={() =>
//                                         handleQuizAction("view", quiz)
//                                       }
//                                       className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                                     >
//                                       <Eye className="w-4 h-4" />
//                                       View Details
//                                     </button>
//                                     {quiz.type === "generated" && (
//                                       <button
//                                         onClick={() =>
//                                           handleQuizAction("edit", quiz)
//                                         }
//                                         className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                                       >
//                                         <Edit className="w-4 h-4" />
//                                         Edit
//                                       </button>
//                                     )}
//                                     <button
//                                       onClick={() =>
//                                         handleQuizAction("share", quiz)
//                                       }
//                                       className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                                     >
//                                       <Share2 className="w-4 h-4" />
//                                       Share
//                                     </button>
//                                     <button
//                                       onClick={() =>
//                                         handleQuizAction("delete", quiz)
//                                       }
//                                       className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                                     >
//                                       <Trash2 className="w-4 h-4" />
//                                       Delete
//                                     </button>
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
//                           <div className="flex items-center gap-2">
//                             <span
//                               className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
//                                 quiz.status || "unknown"
//                               )}`}
//                             >
//                               {getStatusText(quiz.status || "unknown")}
//                             </span>
//                             {quiz.status === "completed" && quiz.score && (
//                               <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
//                                 <BarChart2 className="w-3 h-3" />
//                                 {typeof quiz.score === "object"
//                                   ? `${quiz.score.percentage}%`
//                                   : `${Math.round(
//                                       (quiz.score /
//                                         (quiz.questions?.length || 1)) *
//                                         100
//                                     )}%`}
//                               </span>
//                             )}
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {formatDate(quiz.submittedAt || quiz.createdAt)}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-700/30 flex justify-between items-center">
//                         <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                           <FileText className="w-4 h-4" />
//                           {quiz.questions?.length || 0} questions
//                         </div>
//                         <motion.button
//                           whileHover={{ x: 2 }}
//                           className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 text-sm font-medium"
//                           onClick={() => setSelectedQuiz(quiz)}
//                         >
//                           View Details
//                           <ChevronRight className="w-4 h-4" />
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Quiz Detail Modal */}
//       <AnimatePresence>
//         {selectedQuiz && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setSelectedQuiz(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {selectedQuiz.quiz_title || selectedQuiz.title}
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-400">
//                       {selectedQuiz.topic || "No topic specified"}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setSelectedQuiz(null)}
//                     className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
//                     <h3 className="font-medium text-gray-900 dark:text-white mb-2">
//                       Quiz Details
//                     </h3>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 dark:text-gray-400">
//                           Status:
//                         </span>
//                         <span
//                           className={`${getStatusColor(
//                             selectedQuiz.status || "unknown"
//                           )} px-2 py-1 rounded-full text-xs`}
//                         >
//                           {getStatusText(selectedQuiz.status || "unknown")}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 dark:text-gray-400">
//                           Questions:
//                         </span>
//                         <span className="text-gray-900 dark:text-white">
//                           {selectedQuiz.questions?.length || 0}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 dark:text-gray-400">
//                           Created:
//                         </span>
//                         <span className="text-gray-900 dark:text-white">
//                           {formatDate(selectedQuiz.createdAt)}
//                         </span>
//                       </div>
//                       {selectedQuiz.submittedAt && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-500 dark:text-gray-400">
//                             Attempted:
//                           </span>
//                           <span className="text-gray-900 dark:text-white">
//                             {formatDate(selectedQuiz.submittedAt)}
//                           </span>
//                         </div>
//                       )}
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 dark:text-gray-400">
//                           Type:
//                         </span>
//                         <span className="text-gray-900 dark:text-white capitalize">
//                           {selectedQuiz.question_type || "MCQ"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {(selectedQuiz.score || selectedQuiz.difficultyLevel) && (
//                     <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
//                       <h3 className="font-medium text-gray-900 dark:text-white mb-2">
//                         Results
//                       </h3>
//                       <div className="space-y-2">
//                         {selectedQuiz.score && (
//                           <>
//                             <div className="flex justify-between">
//                               <span className="text-gray-500 dark:text-gray-400">
//                                 Score:
//                               </span>
//                               <span className="text-gray-900 dark:text-white">
//                                 {typeof selectedQuiz.score === "object"
//                                   ? `${selectedQuiz.score.correct}/${selectedQuiz.score.totalQuestions}`
//                                   : `${selectedQuiz.score}/${
//                                       selectedQuiz.questions?.length || 0
//                                     }`}
//                               </span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-500 dark:text-gray-400">
//                                 Percentage:
//                               </span>
//                               <span className="text-gray-900 dark:text-white">
//                                 {typeof selectedQuiz.score === "object"
//                                   ? `${selectedQuiz.score.percentage}%`
//                                   : `${Math.round(
//                                       (selectedQuiz.score /
//                                         (selectedQuiz.questions?.length || 1)) *
//                                         100
//                                     )}%`}
//                               </span>
//                             </div>
//                           </>
//                         )}
//                         <div className="flex justify-between">
//                           <span className="text-gray-500 dark:text-gray-400">
//                             Difficulty:
//                           </span>
//                           <span className="text-gray-900 dark:text-white capitalize">
//                             {selectedQuiz.difficultyLevel || "unknown"}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-500 dark:text-gray-400">
//                             Grade Level:
//                           </span>
//                           <span className="text-gray-900 dark:text-white capitalize">
//                             {selectedQuiz.grade || "unknown"}
//                           </span>
//                         </div>
//                         {selectedQuiz.quiz_timer && (
//                           <div className="flex justify-between">
//                             <span className="text-gray-500 dark:text-gray-400">
//                               Time Limit:
//                             </span>
//                             <span className="text-gray-900 dark:text-white">
//                               {selectedQuiz.quiz_timer} minutes
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleQuizAction("share", selectedQuiz)}
//                     disabled={isSharing}
//                     className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-70"
//                   >
//                     {isSharing ? (
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                     ) : (
//                       <>
//                         <Share2 className="w-5 h-5" />
//                         Share
//                       </>
//                     )}
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(
//                         JSON.stringify(selectedQuiz, null, 2)
//                       );
//                       toast.success("Quiz data copied to clipboard!");
//                     }}
//                     className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <Copy className="w-5 h-5" />
//                     Export
//                   </button>
//                   {selectedQuiz.type === "generated" && (
//                     <button
//                       onClick={() => handleQuizAction("edit", selectedQuiz)}
//                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <Edit className="w-5 h-5" />
//                       Edit
//                     </button>
//                   )}
//                 </div>

//                 {selectedQuiz.type === "generated" && (
//                   <div className="mt-6">
//                     <h3 className="font-medium text-gray-900 dark:text-white mb-3">
//                       Quiz Preview
//                     </h3>
//                     <div className="space-y-4">
//                       {selectedQuiz.questions
//                         ?.slice(0, 3)
//                         .map((question, index) => (
//                           <div
//                             key={index}
//                             className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg"
//                           >
//                             <p className="font-medium text-gray-900 dark:text-white mb-2">
//                               {index + 1}. {question.question}
//                             </p>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                               {question.options.map((option, optIndex) => (
//                                 <div
//                                   key={optIndex}
//                                   className={`p-2 rounded ${
//                                     optIndex === question.correctAnswer
//                                       ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
//                                       : "bg-gray-100 dark:bg-gray-700"
//                                   }`}
//                                 >
//                                   {String.fromCharCode(65 + optIndex)}. {option}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       {selectedQuiz.questions?.length > 3 && (
//                         <p className="text-center text-gray-500 dark:text-gray-400">
//                           + {selectedQuiz.questions.length - 3} more questions
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Layout>
//   );
// };

// export default MyQuizzes;
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Loader2,
  CheckCircle,
  Clock,
  FileText,
  RotateCw,
  AlertCircle,
  ChevronRight,
  Plus,
  Folder,
  File,
  Globe,
  Code,
  Landmark,
  FlaskConical,
  MoreVertical,
  Star,
  Search,
  Filter,
  X,
  BarChart2,
  Edit,
  Share2,
  Trash2,
  Download,
  Eye,
  Copy,
  Bookmark,
  TrendingUp,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Confetti from "react-confetti";

const MyQuizzes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [generatedQuizzes, setGeneratedQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizActions, setShowQuizActions] = useState(null);
  const [sortOption, setSortOption] = useState("recent");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const { backend_URL } = useContext(AppContext);

  // Available topics for filtering
  const availableTopics = [
    "Geography",
    "Programming",
    "History",
    "Science",
    "Basic Calculations",
    "General Knowledge",
    "Mathematics",
    "Literature",
  ];

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

  const fetchGeneratedQuizzes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backend_URL}/api/quiz/get-user-generated-quiz/${userId}`
      );
      setGeneratedQuizzes(
        response.data.map((item) => ({
          ...item.quiz,
          _id: item._id,
          type: "generated",
          createdAt: item.createdAt,
          status: "generated",
        }))
      );
    } catch (error) {
      console.error("Error fetching generated quizzes:", error);
      toast.error("Failed to load generated quizzes");
    }
  }, [backend_URL, userId]);

  const fetchAttemptedQuizzes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backend_URL}/api/quiz/get-user-attempted-quiz/${userId}`
      );
      setAttemptedQuizzes(
        response.data.map((item) => ({
          ...item.quiz,
          _id: item._id,
          type: "attempted",
          score: item.score,
          submittedAt: item.submittedAt,
          status: "completed",
        }))
      );
    } catch (error) {
      console.error("Error fetching attempted quizzes:", error);
      toast.error("Failed to load attempted quizzes");
    }
  }, [backend_URL, userId]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchGeneratedQuizzes(), fetchAttemptedQuizzes()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchGeneratedQuizzes, fetchAttemptedQuizzes]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  const deleteQuiz = async (quizId) => {
    setIsDeleting(true);
    try {
      await axios.delete(`${backend_URL}/api/quiz/delete-quiz/${quizId}`);
      toast.success("Quiz deleted successfully");
      fetchData();
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    } finally {
      setIsDeleting(false);
    }
  };

  const shareQuiz = async (quizId) => {
    setIsSharing(true);
    try {
      const quizLink = `${window.location.origin}/quiz/${quizId}`;
      await navigator.clipboard.writeText(quizLink);
      toast.success("Quiz link copied to clipboard!");
    } catch (error) {
      console.error("Error sharing quiz:", error);
      toast.error("Failed to share quiz");
    } finally {
      setIsSharing(false);
    }
  };

  const toggleFavorite = async (quizId) => {
    try {
      await axios.put(`${backend_URL}/api/quiz/toggle-favorite/${quizId}`);
      fetchData();
      toast.success("Favorite status updated");
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorite status");
    }
  };

  const getFilteredQuizzes = useCallback(() => {
    let filteredList = [];

    switch (activeTab) {
      case "all":
        filteredList = [...quizzes, ...generatedQuizzes, ...attemptedQuizzes];
        break;
      case "completed":
        filteredList = [...attemptedQuizzes];
        break;
      case "generated":
        filteredList = [...generatedQuizzes];
        break;
      case "attempted":
        filteredList = [...attemptedQuizzes];
        break;
      case "generated-attempted":
        const generatedIds = new Set(generatedQuizzes.map((q) => q._id));
        filteredList = attemptedQuizzes.filter((q) => generatedIds.has(q._id));
        break;
      case "favorites":
        filteredList = [
          ...quizzes,
          ...generatedQuizzes,
          ...attemptedQuizzes,
        ].filter((q) => q.favorite);
        break;
      default:
        filteredList = [...quizzes, ...generatedQuizzes, ...attemptedQuizzes];
    }

    // Remove duplicates by id
    const uniqueQuizzes = filteredList.reduce((acc, current) => {
      const x = acc.find((item) => item._id === current._id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    // Apply search filter
    let result = uniqueQuizzes.filter((quiz) => {
      const title = quiz.quiz_title || quiz.title || "";
      const topic = quiz.topic || "";
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Apply topic filters
    if (selectedTopics.length > 0) {
      result = result.filter((quiz) => selectedTopics.includes(quiz.topic));
    }

    // Apply sorting
    switch (sortOption) {
      case "recent":
        return result.sort(
          (a, b) =>
            new Date(b.submittedAt || b.createdAt) -
            new Date(a.submittedAt || a.createdAt)
        );
      case "oldest":
        return result.sort(
          (a, b) =>
            new Date(a.submittedAt || a.createdAt) -
            new Date(b.submittedAt || b.createdAt)
        );
      case "high-score":
        return result.sort((a, b) => {
          const scoreA =
            a.score?.percentage ||
            (typeof a.score === "number"
              ? Math.round((a.score / (a.questions?.length || 1)) * 100)
              : 0);
          const scoreB =
            b.score?.percentage ||
            (typeof b.score === "number"
              ? Math.round((b.score / (b.questions?.length || 1)) * 100)
              : 0);
          return scoreB - scoreA;
        });
      case "low-score":
        return result.sort((a, b) => {
          const scoreA =
            a.score?.percentage ||
            (typeof a.score === "number"
              ? Math.round((a.score / (a.questions?.length || 1)) * 100)
              : 0);
          const scoreB =
            b.score?.percentage ||
            (typeof b.score === "number"
              ? Math.round((b.score / (b.questions?.length || 1)) * 100)
              : 0);
          return scoreA - scoreB;
        });
      case "a-z":
        return result.sort((a, b) =>
          (a.quiz_title || a.title || "").localeCompare(
            b.quiz_title || b.title || ""
          )
        );
      case "z-a":
        return result.sort((a, b) =>
          (b.quiz_title || b.title || "").localeCompare(
            a.quiz_title || a.title || ""
          )
        );
      case "most-questions":
        return result.sort(
          (a, b) => (b.questions?.length || 0) - (a.questions?.length || 0)
        );
      case "least-questions":
        return result.sort(
          (a, b) => (a.questions?.length || 0) - (b.questions?.length || 0)
        );
      default:
        return result;
    }
  }, [
    activeTab,
    quizzes,
    generatedQuizzes,
    attemptedQuizzes,
    searchQuery,
    selectedTopics,
    sortOption,
  ]);

  const filteredQuizzes = getFilteredQuizzes();

  const getTopicIcon = (topic) => {
    if (!topic) return <File className="w-5 h-5 text-white" />;

    switch (topic.toLowerCase()) {
      case "geography":
        return <Globe className="w-5 h-5 text-white" />;
      case "programming":
        return <Code className="w-5 h-5 text-white" />;
      case "history":
        return <Landmark className="w-5 h-5 text-white" />;
      case "science":
        return <FlaskConical className="w-5 h-5 text-white" />;
      case "basic calculations":
        return <FileText className="w-5 h-5 text-white" />;
      case "general knowledge":
        return <Globe className="w-5 h-5 text-white" />;
      case "mathematics":
        return <TrendingUp className="w-5 h-5 text-white" />;
      case "literature":
        return <Bookmark className="w-5 h-5 text-white" />;
      default:
        return <File className="w-5 h-5 text-white" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "generating":
        return <RotateCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "generated":
        return <FileText className="w-4 h-4 text-indigo-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "generating":
        return "Generating";
      case "failed":
        return "Failed";
      case "generated":
        return "Generated";
      default:
        return "Not Attempted";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white  ";
      case "generating":
        return "bg-blue-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      case "generated":
        return "bg-indigo-500 text-white";
      default:
        return "bg-gray-100 text-white";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const toggleTopicFilter = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTopics([]);
    setSortOption("recent");
    setActiveTab("all");
  };

  const handleQuizAction = (action, quiz) => {
    switch (action) {
      case "view":
        setSelectedQuiz(quiz);
        break;
      case "edit":
        navigate(`/edit-quiz/${quiz._id}`);
        break;
      case "share":
        shareQuiz(quiz._id);
        break;
      case "delete":
        deleteQuiz(quiz._id);
        break;
      case "favorite":
        toggleFavorite(quiz._id);
        break;
      default:
        break;
    }
    setShowQuizActions(null);
  };

  const startNewQuiz = () => {
    navigate("/create-quiz");
  };

  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <Folder className="w-8 h-8 text-purple-500" />
                My Quizzes
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                View and manage all your quizzes
              </p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
                onClick={startNewQuiz}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Quiz</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 border text-sm dark:text-gray-300 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Filters
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Sort By
                      </h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { value: "recent", label: "Most Recent" },
                          { value: "oldest", label: "Oldest" },
                          { value: "high-score", label: "Highest Score" },
                          { value: "low-score", label: "Lowest Score" },
                          { value: "a-z", label: "A-Z" },
                          { value: "z-a", label: "Z-A" },
                          { value: "most-questions", label: "Most Questions" },
                          {
                            value: "least-questions",
                            label: "Least Questions",
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="sort"
                              value={option.value}
                              checked={sortOption === option.value}
                              onChange={() => setSortOption(option.value)}
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {availableTopics.map((topic) => (
                          <motion.button
                            key={topic}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleTopicFilter(topic)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1 ${
                              selectedTopics.includes(topic)
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {getTopicIcon(topic)}
                            {topic}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Quick Actions
                      </h4>
                      <div className="flex flex-col gap-2">
                        <button
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          onClick={() =>
                            toast.promise(
                              new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                              ),
                              {
                                loading: "Preparing export...",
                                success: "Export started successfully",
                                error: "Export failed",
                              }
                            )
                          }
                        >
                          <Download className="w-4 h-4" />
                          Export All Quizzes
                        </button>
                        <button
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          onClick={clearAllFilters}
                        >
                          <X className="w-4 h-4" />
                          Clear Filters
                        </button>
                        <button
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          onClick={() => {
                            setActiveTab("favorites");
                            setShowFilters(false);
                          }}
                        >
                          <Star className="w-4 h-4" />
                          View Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: "all", label: "All Quizzes" },
                { id: "completed", label: "Completed" },
                { id: "generated", label: "Generated" },
                { id: "attempted", label: "Attempted" },
                { id: "generated-attempted", label: "Generated & Attempted" },
                { id: "favorites", label: "Favorites" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 dark:from-purple-900/30 dark:to-indigo-900/30 dark:text-purple-300"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {tab.id === "favorites" && <Star className="w-4 h-4" />}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid place-items-center py-20"
            >
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </motion.div>
          ) : filteredQuizzes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
            >
              <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No quizzes found
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {searchQuery || selectedTopics.length > 0
                  ? "No quizzes match your filters. Try adjusting your search."
                  : activeTab === "all"
                  ? "You don't have any quizzes yet. Create your first one!"
                  : `You don't have any ${activeTab} quizzes.`}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
                  onClick={startNewQuiz}
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Quiz</span>
                </motion.button>
                {(searchQuery || selectedTopics.length > 0) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={clearAllFilters}
                  >
                    <X className="w-5 h-5" />
                    <span>Clear Filters</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {filteredQuizzes.length}{" "}
                  {filteredQuizzes.length === 1 ? "quiz" : "quizzes"}
                </p>
                {(searchQuery || selectedTopics.length > 0) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2  gap-5"
              >
                <AnimatePresence>
                  {filteredQuizzes.map((quiz) => (
                    <motion.div
                      key={quiz._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow relative group"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${getStatusColor(
                                quiz.status || "unknown"
                              )}`}
                            >
                              {getTopicIcon(quiz.topic)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium capitalize max-w-[400px] text-gray-900 dark:text-white truncate">
                                {quiz.quiz_title || quiz.title}
                              </h3>
                              <p className="text-xs capitalize text-gray-500 dark:text-gray-400 truncate">
                                {quiz.topic || "No topic specified"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleQuizAction("favorite", quiz)}
                              className={`p-1 rounded-full ${
                                quiz.favorite
                                  ? "text-yellow-400 hover:text-yellow-500"
                                  : "text-gray-400 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400"
                              }`}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  quiz.favorite ? "fill-current" : ""
                                }`}
                              />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setShowQuizActions(
                                    showQuizActions === quiz._id
                                      ? null
                                      : quiz._id
                                  )
                                }
                                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                <MoreVertical className="w-5 h-5" />
                              </button>

                              {showQuizActions === quiz._id && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg focus:outline-none"
                                >
                                  <div className="py-1">
                                    <button
                                      onClick={() =>
                                        handleQuizAction("view", quiz)
                                      }
                                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                    >
                                      <Eye className="w-4 h-4" />
                                      View Details
                                    </button>
                                    {quiz.type === "generated" && (
                                      <button
                                        onClick={() =>
                                          handleQuizAction("edit", quiz)
                                        }
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                      >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                      </button>
                                    )}
                                    <button
                                      onClick={() =>
                                        handleQuizAction("share", quiz)
                                      }
                                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                    >
                                      <Share2 className="w-4 h-4" />
                                      Share
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleQuizAction("delete", quiz)
                                      }
                                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                quiz.status || "unknown"
                              )}`}
                            >
                              {getStatusText(quiz.status || "unknown")}
                            </span>
                            {quiz.status === "completed" && quiz.score && (
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
                                <BarChart2 className="w-3 h-3" />
                                {typeof quiz.score === "object"
                                  ? `${quiz.score.percentage}%`
                                  : `${Math.round(
                                      (quiz.score /
                                        (quiz.questions?.length || 1)) *
                                        100
                                    )}%`}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(quiz.submittedAt || quiz.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-700/30 flex justify-between items-center rounded-b-xl">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {quiz.questions?.length || 0} questions
                        </div>
                        <motion.button
                          whileHover={{ x: 2 }}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 flex items-center gap-1 text-sm font-medium"
                          onClick={() => setSelectedQuiz(quiz)}
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Quiz Detail Modal */}
      <AnimatePresence>
        {selectedQuiz && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedQuiz(null)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedQuiz.quiz_title || selectedQuiz.title}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {selectedQuiz.topic || "No topic specified"}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedQuiz(null)}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        Quiz Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Status:
                          </span>
                          <span
                            className={`${getStatusColor(
                              selectedQuiz.status || "unknown"
                            )} px-2 py-1 rounded-full text-xs`}
                          >
                            {getStatusText(selectedQuiz.status || "unknown")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Questions:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedQuiz.questions?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Created:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {formatDate(selectedQuiz.createdAt)}
                          </span>
                        </div>
                        {selectedQuiz.submittedAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              Attempted:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {formatDate(selectedQuiz.submittedAt)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Type:
                          </span>
                          <span className="text-gray-900 dark:text-white capitalize">
                            {selectedQuiz.question_type || "MCQ"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {(selectedQuiz.score || selectedQuiz.difficultyLevel) && (
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Results
                        </h3>
                        <div className="space-y-2">
                          {selectedQuiz.score && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Score:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {typeof selectedQuiz.score === "object"
                                    ? `${selectedQuiz.score.correct}/${selectedQuiz.score.totalQuestions}`
                                    : `${selectedQuiz.score}/${
                                        selectedQuiz.questions?.length || 0
                                      }`}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Percentage:
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  {typeof selectedQuiz.score === "object"
                                    ? `${selectedQuiz.score.percentage}%`
                                    : `${Math.round(
                                        (selectedQuiz.score /
                                          (selectedQuiz.questions?.length ||
                                            1)) *
                                          100
                                      )}%`}
                                </span>
                              </div>
                            </>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              Difficulty:
                            </span>
                            <span className="text-gray-900 dark:text-white capitalize">
                              {selectedQuiz.difficultyLevel || "unknown"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              Grade Level:
                            </span>
                            <span className="text-gray-900 dark:text-white capitalize">
                              {selectedQuiz.grade || "unknown"}
                            </span>
                          </div>
                          {selectedQuiz.quiz_timer && (
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Time Limit:
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                {selectedQuiz.quiz_timer} minutes
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleQuizAction("share", selectedQuiz)}
                      disabled={isSharing}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-70"
                    >
                      {isSharing ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Share2 className="w-5 h-5" />
                          Share
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          JSON.stringify(selectedQuiz, null, 2)
                        );
                        toast.success("Quiz data copied to clipboard!");
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                      Export
                    </button>
                    {selectedQuiz.type === "generated" && (
                      <button
                        onClick={() => handleQuizAction("edit", selectedQuiz)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                        Edit
                      </button>
                    )}
                  </div>

                  {selectedQuiz.type === "generated" && (
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Quiz Preview
                      </h3>
                      <div className="space-y-4">
                        {selectedQuiz.questions
                          ?.slice(0, 3)
                          .map((question, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg"
                            >
                              <p className="font-medium text-gray-900 dark:text-white mb-2">
                                {index + 1}. {question.question}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-2 rounded ${
                                      optIndex === question.correctAnswer
                                        ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-gray-100 dark:bg-gray-700"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optIndex)}.{" "}
                                    {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        {selectedQuiz.questions?.length > 3 && (
                          <p className="text-center text-gray-500 dark:text-gray-400">
                            + {selectedQuiz.questions.length - 3} more questions
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default MyQuizzes;