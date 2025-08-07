

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
  FiGrid,
  FiList,
} from "react-icons/fi";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import QuizOpenModal from "./modal/QuizOpenModal";
import {
  BarChart2,
  BookOpen,
  Calendar,
  Clock,
  File,
  Play,
  Search,
  Users,
} from "lucide-react";
import Avatar from "boring-avatars";
import TOPIC_IMAGES  from "../../utils/quizImages"; // Assuming you have a separate file for topic images
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortOption, setSortOption] = useState("newest"); // 'newest', 'oldest', 'popular'
const navigate = useNavigate();
  const { backend_URL } = useContext(AppContext);

  const {user} = useSelector((state => state.auth));

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (Array.isArray(quizzes)) {
      let filtered = quizzes.filter((quiz) => {
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

      // Apply sorting
      filtered = sortQuizzes(filtered);

      setFilteredQuizzes(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    } else {
      setFilteredQuizzes([]);
    }
  }, [searchQuery, quizzes, sortOption]);




  const TOPIC_MAPPINGS = [
    // Programming Languages
    { keywords: ["javascript"], image: "javascript" },
    { keywords: ["python", "py"], image: "python" },
    { keywords: ["java"], image: "java", exclude: ["javascript"] },
    { keywords: ["c++", "cpp"], image: "c++" },
    { keywords: ["c#", "csharp"], image: "c#" },
    { keywords: ["php"], image: "php" },
    { keywords: ["ruby"], image: "ruby" },
    { keywords: ["golang", " go "], image: "go" },
    { keywords: ["rust"], image: "rust" },
    { keywords: ["swift"], image: "swift" },
    { keywords: ["kotlin"], image: "kotlin" },

    // Web Development
    { keywords: ["html"], image: "html" },
    { keywords: ["css"], image: "css" },
    { keywords: ["react", "react.js"], image: "react" },
    { keywords: ["vue"], image: "vue" },
    { keywords: ["angular"], image: "angular" },
    { keywords: ["nodejs", "node.js"], image: "nodejs" },
    { keywords: ["frontend", "front-end"], image: "frontend" },
    { keywords: ["backend", "back-end"], image: "backend" },
    { keywords: ["web dev"], image: "web development" },

    // Data & Analytics
    { keywords: [ "mongodb", "database"], image: "mongodb" },
    { keywords: ["sql"], image: "sql" },
    { keywords: ["data science", "ds"], image: "data science" },
    { keywords: ["machine learning", "ml"], image: "machine learning" },
    {
      keywords: ["artificial intelligence", "ai"],
      image: "artificial intelligence",
    },
    { keywords: ["analytics"], image: "analytics" },
    { keywords: ["big data"], image: "big data" },
    { keywords: ["visualization"], image: "visualization" },

    // Mathematics
    { keywords: ["algebra"], image: "algebra" },
    { keywords: ["geometry"], image: "geometry" },
    { keywords: ["calculus"], image: "calculus" },
    { keywords: ["statistics", "stats"], image: "statistics" },
    { keywords: ["permutation"], image: "permutation" },
    { keywords: ["probability"], image: "probability" },
    { keywords: ["math", "maths", "calculation", "algebra"], image: "algebra" },

    // Sciences
    { keywords: ["physics"], image: "physics" },
    { keywords: ["chemistry"], image: "chemistry" },
    { keywords: ["biology"], image: "biology" },

    // Languages
    { keywords: ["english", "english grammer"], image: "english" },

    // Technology
    { keywords: ["cyber security", "cybersecurity"], image: "cyber security" },
    { keywords: ["networking"], image: "networking" },
    { keywords: ["cloud"], image: "cloud computing" },
    { keywords: ["devops"], image: "devops" },
    { keywords: ["blockchain"], image: "blockchain" },
    { keywords: ["cryptocurrency", "crypto"], image: "cryptocurrency" },
    { keywords: ["iot"], image: "iot" },
    { keywords: ["robotics"], image: "robotics" },

    // Social Sciences
    { keywords: ["history", "wars", "challenges"], image: "history" },

    // Data Structures & Algorithms
    { keywords: ["array"], image: "array" },
    { keywords: ["linked list"], image: "linked list" },
    { keywords: ["binary tree", "tree"], image: "binary tree" },
    { keywords: ["graph"], image: "graph" },
    { keywords: ["hash", "hashmap"], image: "hash table" },
    { keywords: ["sorting"], image: "sorting" },
    { keywords: ["searching"], image: "searching" },
    { keywords: ["algorithm"], image: "algorithms" },

    // Tools & Utilities
    { keywords: ["calendar", "calander"], image: "calendar" },

    // Reasoning
    { keywords: ["blood relation"], image: "blood relation" },
    { keywords: ["direction"], image: "direction" },
    { keywords: ["aptitude", "quantitive ability"], image: "aptitude" },

    { keywords: ["coding decoding"], image: "coding decoding" },
    { keywords: ["current affairs"], image: "ai" },

    { keywords: ["reasoning"], image: "reasoning" },

    // General Categories
    { keywords: ["general knowledge"], image: "general knowledge" },
    { keywords: ["science"], image: "science" },
    { keywords: ["technology"], image: "technology" },
    { keywords: ["engineering"], image: "engineering" },
  ];

  const getTopicImage = (quiz_title) => {
    if (!quiz_title) return TOPIC_IMAGES.default;

    const lowerTopic = quiz_title.toLowerCase();

    for (const mapping of TOPIC_MAPPINGS) {
      const hasKeyword = mapping.keywords.some((keyword) =>
        lowerTopic.includes(keyword)
      );
      const hasExclusion = mapping.exclude?.some((exclude) =>
        lowerTopic.includes(exclude)
      );

      if (hasKeyword && !hasExclusion) {
        return TOPIC_IMAGES[mapping.image];
      }
    }

    return TOPIC_IMAGES.default;
  };

  const sortQuizzes = (quizzes) => {
    switch (sortOption) {
      case "newest":
        return [...quizzes].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...quizzes].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "popular":
        return [...quizzes].sort(
          (a, b) => (b.completions || 0) - (a.completions || 0)
        );
      default:
        return quizzes;
    }
  };

  const paginationData = useMemo(() => {
    const totalItems = filteredQuizzes.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentQuizzes = filteredQuizzes.slice(startIndex, endIndex);

    return {
      totalItems,
      totalPages,
      currentQuizzes,
      startIndex,
      endIndex,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages || totalPages === 0,
    };
  }, [filteredQuizzes, currentPage, itemsPerPage]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${backend_URL}/api/quiz/get-all-quizzes`
      );
      const quizzesData = Array.isArray(response.data)
        ? response.data
        : response.data.quizzes || [];
      setQuizzes(quizzesData);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setError("Failed to load quizzes. Please try again later.");
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const generatePageNumbers = () => {
    const { totalPages } = paginationData;
    const pages = [];
    const maxVisiblePages = 5;
    const ellipsis = "...";

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Determine range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the start or end
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(ellipsis);
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push(ellipsis);
      }

      // Always show last page
      if (totalPages > 1) {
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
    <div className="container mx-auto px-4 py-6">
      {/* Header and Controls */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          All Quizzes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Browse through our collection of interactive quizzes
        </p>

        {/* Search and Filter Bar */}
        <div className="flex flex-col justify-between md:flex-row gap-4 mb-6">
          <div className="relative flex-grow max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quizzes..."
              className="block w-full text-sm dark:text-white pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white text-sm dark:bg-zinc-800 border border-gray-300 w-fit dark:border-zinc-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>

            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-white text-sm dark:bg-zinc-800 border border-gray-300 w-fit dark:border-zinc-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={6}>6 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
            </select>

            <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {paginationData.startIndex + 1}-
          {Math.min(paginationData.endIndex, paginationData.totalItems)} of{" "}
          {paginationData.totalItems} quizzes
        </p>
      </div>

      {/* Quiz Display */}
      {paginationData.currentQuizzes.length > 0 ? (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {paginationData.currentQuizzes.map((quiz, index) => {
                const quizWithDefaults = {
                  quiz_title: "Untitled Quiz",
                  topic: "General",
                  grade: "Beginner",
                  quiz_timer: 0,
                  questions: [],
                  rating: 4.5,
                  completions: 0,
                  tags: [],
                  attempts: [],
                  ...quiz,
                };

                // Check if current user has attempted this quiz
                const userAttempt = quizWithDefaults.attempts?.find(
                  (attempt) => attempt.user === user?._id
                );
                const hasAttempted = !!userAttempt;
                const latestScore = userAttempt?.scores?.[userAttempt?.scores.length - 1]?.percentage || 0;
                const scoreColor =
                  latestScore >= 70
                    ? "bg-green-500"
                    : latestScore >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500";

                const handleCardClick = async () => {
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
                    className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-zinc-700 cursor-pointer overflow-hidden transition-all duration-200 h-full" // Added h-full and flex-col
                  >
                    {/* Image Header with Score Badge */}
                    <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
                      {" "}
                      {/* Added flex-shrink-0 */}
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
                      {/* Score Badge (only if attempted) */}
                      {hasAttempted && (
                        <div
                          className={`absolute top-4 right-4 ${scoreColor} text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-800`}
                        >
                          <span className="font-bold text-sm">
                            {latestScore}%
                          </span>
                        </div>
                      )}
                      {/* Difficulty Badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
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

                        {/* Attempted Badge */}
                        {hasAttempted && (
                          <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Attempted
                          </span>
                        )}
                      </div>
                      <div className="absolute flex flex-col items-end gap-2 bottom-4 right-4 ">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                          }}
                          className={`flex w-fit items-center gap-1 ${
                            hasAttempted
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white px-3 py-1.5 rounded shadow-md text-sm font-medium transition-colors`}
                        >
                          {hasAttempted ? "Retake" : "Start"}
                          <Play size={14} className="ml-1" />
                        </button>
                        {hasAttempted && (
                          <button
                            onClick={(e) => {
                              navigate(`/quiz-result/${quizWithDefaults._id}`);
                            }}
                            className={`flex items-center gap-1 
                             
                                bg-blue-500 hover:bg-blue-600
                            text-white px-3 py-1.5 rounded shadow-md text-sm font-medium transition-colors`}
                          >
                            View Result
                            <File size={14} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content Area - now uses flex-grow for consistent height */}
                    <div className="p-5 flex flex-col flex-grow">
                      {" "}
                      {/* Added flex-grow */}
                      {/* Title and Description with fixed height */}
                      <div className="mb-3 min-h-[72px]">
                        {" "}
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(quizWithDefaults.createdAt)}
                        </div>
                        {/* Fixed min-height */}
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1">
                          {quizWithDefaults.quiz_title}
                        </h2>
                      </div>
                      {/* Metadata - now at bottom of card */}
                      <div className="mt-auto">
                        {" "}
                        {/* Pushes content to bottom */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <BookOpen size={12} className="mr-1" />
                            {quizWithDefaults.grade} Level
                          </div>
                          {quizWithDefaults.question_type && (
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <BarChart2 size={12} className="mr-1" />
                              {quizWithDefaults.question_type}
                            </div>
                          )}
                        </div>
                        {/* Stats and Author */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-700">
                          <div className="flex items-center gap-2">
                            {quizWithDefaults.created_by?.avatar ? (
                              <img
                                src={quizWithDefaults.created_by.avatar}
                                alt={
                                  quizWithDefaults.created_by.name || "Unknown"
                                }
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <Avatar
                                name={
                                  quizWithDefaults.created_by?.name || "Unknown"
                                }
                                size={24}
                              />
                            )}

                            <span className="text-xs text-gray-600 dark:text-gray-300">
                              {quizWithDefaults.created_by?.name || "Unknown"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                              <Clock size={12} className="mr-1" />
                              {quizWithDefaults.quiz_timer || 0} min
                            </div>
                            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              {quizWithDefaults.questions.length} Qs
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Accent Bar */}
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginationData.currentQuizzes.map((quiz, index) => {
                const quizWithDefaults = {
                  quiz_title: "Untitled Quiz",
                  topic: "General",
                  grade: "Beginner",
                  quiz_timer: 0,
                  questions: [],
                  rating: 4.5,
                  completions: 0,
                  tags: [],
                  attempts: [],
                  ...quiz,
                };

                // Check if current user has attempted this quiz
                const userAttempt = quizWithDefaults.attempts?.find(
                  (attempt) => attempt.user === user?._id
                );
                const hasAttempted = !!userAttempt;
              const latestScore =
                userAttempt?.scores?.[userAttempt.scores.length - 1]
                  ?.percentage || 0;

              const scoreColor =
                latestScore >= 70
                  ? "bg-green-500"
                  : latestScore >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500";


                return (
                  <motion.div
                    key={quiz._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col sm:flex-row bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer overflow-hidden h-full"
                  >
                    {/* Image Section */}
                    <div className="relative w-full sm:w-2/5 h-40 sm:h-auto">
                      <img
                        src={getTopicImage(quizWithDefaults.topic)}
                        alt={quizWithDefaults.topic}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = TOPIC_IMAGES.default;
                          e.target.className =
                            "w-full h-full object-cover bg-gray-200 dark:bg-gray-700";
                        }}
                      />

                      {/* Score Badge */}
                      {hasAttempted && (
                        <div
                          className={`absolute top-3 right-3 ${scoreColor} text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md border-2 border-white dark:border-gray-800`}
                        >
                          <span className="font-bold text-xs">
                            {latestScore}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col p-4 w-full sm:w-3/5">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(quizWithDefaults.createdAt)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
                            {quizWithDefaults.quiz_title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                            {quizWithDefaults.description ||
                              "No description available"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end pl-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-md capitalize font-medium ${difficultyColor(
                              quizWithDefaults.grade
                            )}`}
                          >
                            {quizWithDefaults.grade}
                          </span>
                          {hasAttempted && (
                            <span className="text-xs px-2 py-1 mt-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Attempted
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {quizWithDefaults.created_by?.avatar ? (
                              <img
                                src={quizWithDefaults.created_by.avatar}
                                alt={
                                  quizWithDefaults.created_by.name || "Unknown"
                                }
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <Avatar
                                name={
                                  quizWithDefaults.created_by?.name || "Unknown"
                                }
                                size={24}
                              />
                            )}
                            <span className="text-xs text-gray-600 dark:text-gray-300">
                              {quizWithDefaults.created_by?.name || "Unknown"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                              <Clock size={12} className="mr-1" />
                              {quizWithDefaults.quiz_timer || 0} min
                            </div>
                            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                            <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              {quizWithDefaults.questions.length} Qs
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Action Button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuiz(quizWithDefaults);
                            setIsModalOpen(true);
                          }}
                          className={`flex items-center gap-1 ${
                            hasAttempted
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white px-2 py-1 rounded-md shadow text-xs font-medium transition-colors`}
                        >
                          {hasAttempted ? "Retake" : "Start"}
                          <Play size={12} className="ml-0.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {paginationData.startIndex + 1}-
                {Math.min(paginationData.endIndex, paginationData.totalItems)}{" "}
                of {paginationData.totalItems} quizzes
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={paginationData.isFirstPage}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft size={16} />
                </button>

                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    disabled={typeof page !== "number"}
                    className={`px-3 py-1 text-sm rounded-md ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : typeof page === "number"
                        ? "border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "cursor-default"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={paginationData.isLastPage}
                  className="px-3 py-1 border border-gray-300 dark:text-white dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No quizzes found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery.trim()
              ? `No quizzes match your search for "${searchQuery}"`
              : "There are currently no quizzes available"}
          </p>
          {searchQuery.trim() && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
            >
              Clear search
            </button>
          )}
        </div>
      )}

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

export default AllQuizzes;