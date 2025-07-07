import React, { useState, useEffect, useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiClock,
  FiSearch,
  FiBookOpen,
  FiArrowRight,
  FiBarChart2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import QuizOpenModal from "./modal/QuizOpenModal";
import { BarChart2, BookOpen, Calendar, Clock, Play, Search, Users } from "lucide-react";
import Avatar from "boring-avatars";

const TOPIC_IMAGES = {
  javascript:
    "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", // Code on screen
  permutation:
    "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg", // Math board
  calendar: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg", // Calendar
  database: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg", // Server room
  array: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg", // Data representation
  "general knowledge":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg", // Books and globe
  english: "https://images.pexels.com/photos/4050316/pexels-photo-4050316.jpeg", // English learning
  "c++": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", // Code editor
  html: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg", // Web dev screen
  css: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg", // Web styling
  default: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", // Abstract tech
};

const ITEMS_PER_PAGE = 12; // Number of quizzes per page

const AllQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { backend_URL } = useContext(AppContext);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (Array.isArray(quizzes)) {
      const filtered = quizzes.filter((quiz) => {
        if (!quiz) return false;

        const searchLower = searchQuery.toLowerCase().trim();
        const quizTitle = quiz.quiz_title ? quiz.quiz_title.toLowerCase() : "";
        const quizTopic = quiz.topic ? quiz.topic.toLowerCase() : "";
        const quizGrade = quiz.grade ? quiz.grade.toLowerCase() : "";

        return (
          quizTitle.includes(searchLower) ||
          quizTopic.includes(searchLower) ||
          quizGrade.includes(searchLower)
        );
      });
      setFilteredQuizzes(filtered);
      setCurrentPage(1); // Reset to first page when search changes
    } else {
      setFilteredQuizzes([]);
    }
  }, [searchQuery, quizzes]);

  // Calculate pagination data
  const paginationData = useMemo(() => {
    const totalItems = filteredQuizzes.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentQuizzes = filteredQuizzes.slice(startIndex, endIndex);

    return {
      totalItems,
      totalPages,
      currentQuizzes,
      startIndex,
      endIndex,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages,
    };
  }, [filteredQuizzes, currentPage]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${backend_URL}/api/quiz/get-all-quizzes`
      );

      // Handle both array response and object with quizzes array
      const quizzesData = Array.isArray(response.data)
        ? response.data
        : response.data.quizzes || [];
      console.log(quizzesData)

      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error fetching quizzes:", {
        error: error.message,
        response: error.response?.data,
      });
      setError("Failed to load quizzes. Please try again later.");
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  const getTopicImage = (topic) => {
    if (!topic) return TOPIC_IMAGES.default;

    const lowerTopic = topic.toLowerCase();

    // Check for specific matches first
    if (lowerTopic.includes("javascript")) return TOPIC_IMAGES.javascript;
    if (lowerTopic.includes("permutation")) return TOPIC_IMAGES.permutation;
    if (lowerTopic.includes("calendar") || lowerTopic.includes("calander"))
      return TOPIC_IMAGES.calendar;
    if (lowerTopic.includes("database")) return TOPIC_IMAGES.database;
    if (lowerTopic.includes("array")) return TOPIC_IMAGES.array;
    if (lowerTopic.includes("general knowledge"))
      return TOPIC_IMAGES["general knowledge"];
    if (lowerTopic.includes("english")) return TOPIC_IMAGES.english;
    if (lowerTopic.includes("c++")) return TOPIC_IMAGES["c++"];
    if (lowerTopic.includes("html")) return TOPIC_IMAGES.html;
    if (lowerTopic.includes("css")) return TOPIC_IMAGES.css;

    return TOPIC_IMAGES.default;
  };

  const difficultyColor = (grade) => {
    if (!grade) return "bg-gray-100 text-gray-800";

    switch (grade.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
      case "expert":
        return "bg-red-100 text-red-800";
      case "placements":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const topicColor = (topic) => {
    if (!topic) return "bg-gray-100 text-gray-800";

    const lowerTopic = topic.toLowerCase();
    const colors = {
      javascript: "bg-purple-100 text-purple-800",
      permutation: "bg-indigo-100 text-indigo-800",
      calander: "bg-amber-100 text-amber-800",
      database: "bg-teal-100 text-teal-800",
      array: "bg-pink-100 text-pink-800",
      "general knowledge": "bg-blue-100 text-blue-800",
      english: "bg-red-100 text-red-800",
      "c++": "bg-cyan-100 text-cyan-800",
      html: "bg-orange-100 text-orange-800",
      css: "bg-emerald-100 text-emerald-800",
    };

    // Find matching color by checking if topic includes any keyword
    for (const [key, color] of Object.entries(colors)) {
      if (lowerTopic.includes(key)) {
        return color;
      }
    }

    return "bg-gray-100 text-gray-800";
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginationData.totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  const generatePageNumbers = () => {
    const { totalPages } = paginationData;
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination for large number of pages
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Oops!</p>
          <p>{error}</p>
          <button
            onClick={fetchQuizzes}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
     
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="text-center max-w-4xl">
          <div className="mb-4">
            <h1 className="text-6xl font-bold mb-6 dark:text-white">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Descover & Master
              </span>
              <br />
              Interactive Quizes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover community-created quizzes crafted by users like you.
              Join our growing collection of knowledge-sharing enthusiasts.
            </p>
          </div>

          <div className="relative w-full max-w-2xl mx-auto mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Quizes..."
              className="w-full p-6 pl-14 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 shadow-2xl dark:text-white transition-all"
            />
            <Search className="absolute left-5 top-7 text-gray-400" size={24} />
          </div>
          <p className="text-gray-600 m-4 dark:text-gray-400 mt-1">
            {paginationData.totalItems} quiz
            {paginationData.totalItems !== 1 ? "es" : ""} available
          </p>
        </div>
      </div>

      {paginationData.currentQuizzes.length > 0 ? (
        <>
          {/* Quiz Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8">
            {paginationData.currentQuizzes
              .slice()
              .reverse()
              .map((quiz, index) => {
                const quizWithDefaults = {
                  quiz_title: "Untitled Quiz",
                  topic: "General",
                  grade: "Beginner",
                  quiz_timer: 0,
                  questions: [],
                  rating: 4.5,
                  completions: 0,
                  tags: [],
                  ...quiz,
                };

                const handleCardClick = () => {
                  setSelectedQuiz(quizWithDefaults);
                  setIsModalOpen(true);
                };

                return (
                  <motion.div
                    key={quiz._id || `${currentPage}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg border border-gray-100 dark:border-zinc-700 cursor-pointer overflow-hidden"
                    onClick={handleCardClick}
                  >
                    {/* Image Header with Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getTopicImage(quizWithDefaults.topic)}
                        alt={quizWithDefaults.topic}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = TOPIC_IMAGES.default;
                          e.target.className =
                            "w-full h-full object-cover bg-gray-200 dark:bg-zinc-700";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Source/Difficulty Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-md capitalize font-medium ${
                            quizWithDefaults.difficultyLevel === "beginner"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : quizWithDefaults.difficultyLevel ===
                                "intermediate"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {quizWithDefaults.difficultyLevel || "Medium"}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                      {/* Date */}
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(quizWithDefaults.createdAt)}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl truncate font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
                        {quizWithDefaults.quiz_title}
                      </h2>

                      {/* Grade */}
                      <div className="flex items-center gap-2">
                        <div className="flex w-fit capitalize bg-amber-500 dark:bg-amber-900/50 items-center text-xs text-white dark:text-amber-400 py-1 px-2 rounded dark:border border-amber-500">
                          <BookOpen size={14} className="mr-1" />
                          {quizWithDefaults.grade} Level
                        </div>
                        {quizWithDefaults.question_type && (
                          <div className="flex uppercase w-fit  bg-fuchsia-500 dark:bg-fuchsia-900/50 items-center text-xs text-white dark:text-fuchsia-400 py-1 px-2 rounded dark:border border-fuchsia-500">
                            <BarChart2 size={14} className="mr-1" />
                            {quizWithDefaults.question_type}
                          </div>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex mt-4 justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar
                            name={
                              quizWithDefaults.created_by?.name || "Unknown"
                            }
                            size={30}
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {quizWithDefaults.created_by?.name || "Unknown"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex bg-green-500 dark:bg-green-900/50  items-center text-xs text-white dark:text-green-500 py-1 px-2 rounded dark:border border-green-500 ">
                            <Clock size={14} className="mr-1" />
                            {quizWithDefaults.quiz_timer === 0
                              ? "No Timer"
                              : quizWithDefaults.quiz_timer + "min"}
                          </div>
                          <div className="flex bg-purple-500 dark:bg-purple-900/50  items-center text-xs text-white dark:text-purple-500 py-1 px-2 rounded dark:border border-purple-500">
                            Q.
                            {quizWithDefaults.questions.length}
                          </div>
                          <div className="flex bg-blue-500 dark:bg-blue-900/50  items-center text-xs text-white dark:text-blue-500 py-1 px-2 rounded dark:border border-blue-500">
                            <Users size={14} className="mr-1" />
                            {quizWithDefaults.attempts?.length}
                          </div>
                        </div>
                      </div>

                      {/* Hover Action Indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1 bg-green-600 text-white border border-green-500  px-2 py-1 rounded shadow-md">
                          Start
                          <Play size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Accent Bar */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                );
              })}
          </div>

          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Results info */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {paginationData.startIndex + 1}-
                {Math.min(paginationData.endIndex, paginationData.totalItems)}{" "}
                of {paginationData.totalItems} quizzes
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={paginationData.isFirstPage}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {generatePageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      disabled={typeof page !== "number"}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        page === currentPage
                          ? "text-blue-600 bg-blue-50 border border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                          : typeof page === "number"
                          ? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          : "text-gray-400 cursor-default"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={paginationData.isLastPage}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No quizzes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery.trim()
                ? `No quizzes match your search for "${searchQuery}". Try a different search term.`
                : "There are currently no quizzes available. Please check back later."}
            </p>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      <QuizOpenModal
        quiz={selectedQuiz}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedQuiz(null);
        }}
      />
    </div>
  );
};

export default AllQuizes;

// import React, { useState, useEffect, useContext, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiClock,
//   FiSearch,
//   FiBookOpen,
//   FiArrowRight,
//   FiBarChart2,
//   FiStar,
//   FiChevronLeft,
//   FiChevronRight,
//   FiChevronDown,
//   FiChevronUp,
//   FiGrid,
//   FiList,
// } from "react-icons/fi";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import QuizOpenModal from "./modal/QuizOpenModal";
// import { Users } from "lucide-react";

// const TOPIC_IMAGES = {
//   javascript:
//     "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", // Code on screen
//   permutation:
//     "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg", // Math board
//   calendar: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg", // Calendar
//   database: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg", // Server room
//   array: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg", // Data representation
//   "general knowledge":
//     "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg", // Books and globe
//   english: "https://images.pexels.com/photos/4050316/pexels-photo-4050316.jpeg", // English learning
//   "c++": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", // Code editor
//   html: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg", // Web dev screen
//   css: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg", // Web styling
//   default: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", // Abstract tech
// };

// const ITEMS_PER_PAGE = 6; // Reduced per category for better organization

// const AllQuizes = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filteredQuizzes, setFilteredQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState("category"); // 'category' or 'all'
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [categoryPages, setCategoryPages] = useState({});

//   const { backend_URL } = useContext(AppContext);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   useEffect(() => {
//     if (Array.isArray(quizzes)) {
//       const filtered = quizzes.filter((quiz) => {
//         if (!quiz) return false;

//         const searchLower = searchQuery.toLowerCase().trim();
//         const quizTitle = quiz.quiz_title ? quiz.quiz_title.toLowerCase() : "";
//         const quizTopic = quiz.topic ? quiz.topic.toLowerCase() : "";
//         const quizGrade = quiz.grade ? quiz.grade.toLowerCase() : "";

//         return (
//           quizTitle.includes(searchLower) ||
//           quizTopic.includes(searchLower) ||
//           quizGrade.includes(searchLower)
//         );
//       });
//       setFilteredQuizzes(filtered);
//       // Reset category pages when search changes
//       setCategoryPages({});
//     } else {
//       setFilteredQuizzes([]);
//     }
//   }, [searchQuery, quizzes]);

//   // Group quizzes by category
//   const categorizedQuizzes = useMemo(() => {
//     const categories = {};

//     filteredQuizzes.forEach((quiz) => {
//       const topic = quiz.topic || "Other";
//       const normalizedTopic =
//         topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();

//       if (!categories[normalizedTopic]) {
//         categories[normalizedTopic] = [];
//       }
//       categories[normalizedTopic].push(quiz);
//     });

//     // Sort categories by quiz count (descending) and then alphabetically
//     const sortedCategories = Object.keys(categories).sort((a, b) => {
//       const countDiff = categories[b].length - categories[a].length;
//       return countDiff !== 0 ? countDiff : a.localeCompare(b);
//     });

//     const result = {};
//     sortedCategories.forEach((category) => {
//       result[category] = categories[category];
//     });

//     return result;
//   }, [filteredQuizzes]);

//   const fetchQuizzes = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(
//         `${backend_URL}/api/quiz/get-all-quizzes`
//       );

//       // Handle both array response and object with quizzes array
//       const quizzesData = Array.isArray(response.data)
//         ? response.data
//         : response.data.quizzes || [];

//       setQuizzes(quizzesData);

//       // Auto-expand categories with quizzes (limit to first 3 categories)
//       const categories = {};
//       quizzesData.slice(0, 50).forEach((quiz) => {
//         // Check first 50 quizzes for initial categories
//         const topic = quiz.topic || "Other";
//         const normalizedTopic =
//           topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();
//         categories[normalizedTopic] = true;
//       });

//       const topCategories = Object.keys(categories).slice(0, 3);
//       const initialExpanded = {};
//       topCategories.forEach((category) => {
//         initialExpanded[category] = true;
//       });
//       setExpandedCategories(initialExpanded);
//     } catch (error) {
//       console.error("Error fetching quizzes:", {
//         error: error.message,
//         response: error.response?.data,
//       });
//       setError("Failed to load quizzes. Please try again later.");
//       setQuizzes([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTopicImage = (topic) => {
//     if (!topic) return TOPIC_IMAGES.default;

//     const lowerTopic = topic.toLowerCase();

//     // Check for specific matches first
//     if (lowerTopic.includes("javascript")) return TOPIC_IMAGES.javascript;
//     if (lowerTopic.includes("permutation")) return TOPIC_IMAGES.permutation;
//     if (lowerTopic.includes("calendar") || lowerTopic.includes("calander"))
//       return TOPIC_IMAGES.calendar;
//     if (lowerTopic.includes("database")) return TOPIC_IMAGES.database;
//     if (lowerTopic.includes("array")) return TOPIC_IMAGES.array;
//     if (lowerTopic.includes("general knowledge"))
//       return TOPIC_IMAGES["general knowledge"];
//     if (lowerTopic.includes("english")) return TOPIC_IMAGES.english;
//     if (lowerTopic.includes("c++")) return TOPIC_IMAGES["c++"];
//     if (lowerTopic.includes("html")) return TOPIC_IMAGES.html;
//     if (lowerTopic.includes("css")) return TOPIC_IMAGES.css;

//     return TOPIC_IMAGES.default;
//   };

//   const difficultyColor = (grade) => {
//     if (!grade) return "bg-gray-100 text-gray-800";

//     switch (grade.toLowerCase()) {
//       case "beginner":
//         return "bg-green-100 text-green-800";
//       case "intermediate":
//         return "bg-yellow-100 text-yellow-800";
//       case "advanced":
//       case "expert":
//         return "bg-red-100 text-red-800";
//       case "placements":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const topicColor = (topic) => {
//     if (!topic) return "bg-gray-100 text-gray-800";

//     const lowerTopic = topic.toLowerCase();
//     const colors = {
//       javascript: "bg-purple-100 text-purple-800",
//       permutation: "bg-indigo-100 text-indigo-800",
//       calander: "bg-amber-100 text-amber-800",
//       database: "bg-teal-100 text-teal-800",
//       array: "bg-pink-100 text-pink-800",
//       "general knowledge": "bg-blue-100 text-blue-800",
//       english: "bg-red-100 text-red-800",
//       "c++": "bg-cyan-100 text-cyan-800",
//       html: "bg-orange-100 text-orange-800",
//       css: "bg-emerald-100 text-emerald-800",
//     };

//     // Find matching color by checking if topic includes any keyword
//     for (const [key, color] of Object.entries(colors)) {
//       if (lowerTopic.includes(key)) {
//         return color;
//       }
//     }

//     return "bg-gray-100 text-gray-800";
//   };

//   const toggleCategory = (category) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   const handleCategoryPageChange = (category, newPage) => {
//     setCategoryPages((prev) => ({
//       ...prev,
//       [category]: newPage,
//     }));
//   };

//   const getPaginatedQuizzes = (quizzes, category) => {
//     const currentPage = categoryPages[category] || 1;
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const totalPages = Math.ceil(quizzes.length / ITEMS_PER_PAGE);

//     return {
//       quizzes: quizzes.slice(startIndex, endIndex),
//       currentPage,
//       totalPages,
//       isFirstPage: currentPage === 1,
//       isLastPage: currentPage === totalPages,
//       totalItems: quizzes.length,
//     };
//   };

//   const renderQuizCard = (quiz, index) => {
//     const quizWithDefaults = {
//       quiz_title: "Untitled Quiz",
//       topic: "General",
//       grade: "Beginner",
//       quiz_timer: 0,
//       questions: [],
//       rating: 4.5,
//       completions: 0,
//       tags: [],
//       ...quiz,
//     };

//     const handleCardClick = () => {
//       setSelectedQuiz(quizWithDefaults);
//       setIsModalOpen(true);
//     };

//     return (
//       <motion.div
//         key={quiz._id || index}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: index * 0.1 }}
//         whileHover={{ y: -4 }}
//         className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
//         onClick={handleCardClick}
//       >
//         {/* Image Header */}
//         <div className="relative h-32 overflow-hidden">
//           <img
//             src={getTopicImage(quizWithDefaults.topic)}
//             alt={quizWithDefaults.topic}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//             onError={(e) => {
//               e.target.src = TOPIC_IMAGES.default;
//             }}
//           />
//           <div className="absolute inset-0 bg-black/8 group-hover:bg-opacity-30 transition-all duration-300" />

//           {/* Rating overlay */}
//           <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
//             <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//             <span className="text-xs font-medium text-gray-900 dark:text-white">
//               {quizWithDefaults.rating}
//             </span>
//           </div>
//         </div>

//         {/* Compact Header */}
//         <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//           <div className="flex items-start justify-between mb-3">
//             <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 flex-1 pr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//               {quizWithDefaults.quiz_title}
//             </h3>
//           </div>

//           <div className="flex items-center gap-2">
//             <span
//               className={`text-xs px-2 py-1 rounded-md font-medium ${difficultyColor(
//                 quizWithDefaults.grade
//               )}`}
//             >
//               {quizWithDefaults.grade}
//             </span>
//           </div>
//         </div>

//         {/* Compact Stats */}
//         <div className="p-4">
//           <div className="grid grid-cols-3 gap-3 text-center">
//             <div>
//               <div className="text-lg font-bold text-gray-900 dark:text-white">
//                 {quizWithDefaults.questions.length}
//               </div>
//               <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
//                 <FiBookOpen className="w-3 h-3" />
//                 Questions
//               </div>
//             </div>

//             {quizWithDefaults.quiz_timer > 0 && (
//               <div>
//                 <div className="text-lg font-bold text-gray-900 dark:text-white">
//                   {quizWithDefaults.quiz_timer}
//                 </div>
//                 <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
//                   <FiClock className="w-3 h-3" />
//                   Minutes
//                 </div>
//               </div>
//             )}

//             <div>
//               <div className="text-lg font-bold text-gray-900 dark:text-white">
//                 {quizWithDefaults.completions?.toLocaleString() || "0"}
//               </div>
//               <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
//                 <Users className="w-3 h-3" />
//                 Taken
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Hover Indicator */}
//         <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

//         {/* Click Indicator */}
//         <div className="absolute top-36 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="bg-blue-500 text-white p-1 rounded-full">
//             <FiArrowRight className="w-3 h-3" />
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-red-500 text-center">
//           <p className="text-xl font-semibold mb-2">Oops!</p>
//           <p>{error}</p>
//           <button
//             onClick={fetchQuizzes}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//             Available Quizzes
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             {filteredQuizzes.length} quiz
//             {filteredQuizzes.length !== 1 ? "es" : ""} in{" "}
//             {Object.keys(categorizedQuizzes).length} categories
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//           {/* View Mode Toggle */}
//           <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//             <button
//               onClick={() => setViewMode("category")}
//               className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                 viewMode === "category"
//                   ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//               }`}
//             >
//               <FiList className="w-4 h-4" />
//               By Category
//             </button>
//             <button
//               onClick={() => setViewMode("all")}
//               className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                 viewMode === "all"
//                   ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//               }`}
//             >
//               <FiGrid className="w-4 h-4" />
//               All Quizzes
//             </button>
//           </div>

//           {/* Search */}
//           <div className="relative w-full sm:w-96">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by title, topic or difficulty..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {Object.keys(categorizedQuizzes).length > 0 ? (
//         <div className="space-y-8">
//           {viewMode === "category" ? (
//             // Category View
//             Object.entries(categorizedQuizzes).map(([category, quizzes]) => {
//               const paginationData = getPaginatedQuizzes(quizzes, category);
//               const isExpanded = expandedCategories[category];

//               return (
//                 <div
//                   key={category}
//                   className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6"
//                 >
//                   {/* Category Header */}
//                   <div
//                     className="flex items-center justify-between cursor-pointer mb-6"
//                     onClick={() => toggleCategory(category)}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <img
//                           src={getTopicImage(category)}
//                           alt={category}
//                           className="w-16 h-16 rounded-lg object-cover"
//                           onError={(e) => {
//                             e.target.src = TOPIC_IMAGES.default;
//                           }}
//                         />
//                         <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
//                       </div>
//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                           {category}
//                         </h2>
//                         <p className="text-gray-600 dark:text-gray-400">
//                           {quizzes.length} quiz
//                           {quizzes.length !== 1 ? "es" : ""}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`text-sm px-3 py-1 rounded-full font-medium ${topicColor(
//                           category
//                         )}`}
//                       >
//                         {quizzes.length}
//                       </span>
//                       {isExpanded ? (
//                         <FiChevronUp className="w-5 h-5 text-gray-500" />
//                       ) : (
//                         <FiChevronDown className="w-5 h-5 text-gray-500" />
//                       )}
//                     </div>
//                   </div>

//                   {/* Category Content */}
//                   <AnimatePresence>
//                     {isExpanded && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         {/* Quiz Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                           {paginationData.quizzes.map((quiz, index) =>
//                             renderQuizCard(quiz, index)
//                           )}
//                         </div>

//                         {/* Category Pagination */}
//                         {paginationData.totalPages > 1 && (
//                           <div className="flex items-center justify-between">
//                             <div className="text-sm text-gray-600 dark:text-gray-400">
//                               Showing{" "}
//                               {(paginationData.currentPage - 1) *
//                                 ITEMS_PER_PAGE +
//                                 1}
//                               -
//                               {Math.min(
//                                 paginationData.currentPage * ITEMS_PER_PAGE,
//                                 paginationData.totalItems
//                               )}{" "}
//                               of {paginationData.totalItems}
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() =>
//                                   handleCategoryPageChange(
//                                     category,
//                                     paginationData.currentPage - 1
//                                   )
//                                 }
//                                 disabled={paginationData.isFirstPage}
//                                 className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                               >
//                                 <FiChevronLeft className="w-4 h-4" />
//                                 Previous
//                               </button>
//                               <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 {paginationData.currentPage} of{" "}
//                                 {paginationData.totalPages}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   handleCategoryPageChange(
//                                     category,
//                                     paginationData.currentPage + 1
//                                   )
//                                 }
//                                 disabled={paginationData.isLastPage}
//                                 className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                               >
//                                 Next
//                                 <FiChevronRight className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })
//           ) : (
//             // All Quizzes View (original grid)
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {filteredQuizzes.map((quiz, index) =>
//                 renderQuizCard(quiz, index)
//               )}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="max-w-md mx-auto">
//             <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               No quizzes found
//             </h3>
//             <p className="text-gray-600 dark:text-gray-400">
//               {searchQuery.trim()
//                 ? `No quizzes match your search for "${searchQuery}". Try a different search term.`
//                 : "There are currently no quizzes available. Please check back later."}
//             </p>
//             {searchQuery.trim() && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       <QuizOpenModal
//         quiz={selectedQuiz}
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedQuiz(null);
//         }}
//       />
//     </div>
//   );
// };

// export default AllQuizes;
