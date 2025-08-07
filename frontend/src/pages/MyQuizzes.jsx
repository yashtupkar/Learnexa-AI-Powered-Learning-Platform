
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
  BookOpen,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Confetti from "react-confetti";
import { Helmet } from "react-helmet-async";
import TOPIC_IMAGES from "../../utils/quizImages";

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
    { keywords: ["mongodb", "database"], image: "mongodb" },
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

  const getTopicImage = (quizTitle) => {
    if (!quizTitle) return TOPIC_IMAGES.default;

    const lowerTopic = quizTitle.toLowerCase();

    for (const mapping of TOPIC_MAPPINGS) {
      const hasKeyword = mapping.keywords.some((keyword) =>
        lowerTopic.includes(keyword)
      );
      const hasExclusion = mapping.exclude?.some((exclude) =>
        lowerTopic.includes(exclude)
      );

      if (hasKeyword && !hasExclusion) {
        return TOPIC_IMAGES[mapping.image] || TOPIC_IMAGES.default;
      }
    }

    return TOPIC_IMAGES.default;
  };

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
      <Helmet>
        <title>My Quizzes | Learnexa</title>
      </Helmet>
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl  dark:text-white  flex items-center gap-3">
                <Folder className="w-8 h-8 dark:text-white" />
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
        
            </div>
          </motion.div>

     
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: "all", label: "All Quizzes" },
                { id: "completed", label: "Completed" },
                { id: "generated", label: "Generated" },

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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredQuizzes.map((quiz, index) => {
                  const quizWithDefaults = {
                    quiz_title:
                      quiz.quiz_title || quiz.title || "Untitled Quiz",
                    topic: quiz.topic || "General",
                    grade: quiz.grade || "Beginner",
                    quiz_timer: quiz.quiz_timer || 0,
                    questions: quiz.questions || [],
                    difficultyLevel: quiz.difficultyLevel || "Medium",
                    createdAt:
                      quiz.createdAt ||
                      quiz.submittedAt ||
                      new Date().toISOString(),
                    ...quiz,
                  };

                  // Check if quiz has been attempted
                  const hasAttempted = quiz.status === "completed";
                  const latestScore =
                    typeof quiz.score === "object"
                      ? quiz.score.percentage
                      : quiz.questions?.length
                      ? Math.round((quiz.score / quiz.questions.length) * 100)
                      : 0;
                  const scoreColor =
                    latestScore >= 70
                      ? "bg-green-500"
                      : latestScore >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500";

                  const handleCardClick = () => {
                    setSelectedQuiz(quizWithDefaults);
                  };

                  return (
                    <motion.div
                      key={quiz._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-zinc-700 cursor-pointer overflow-hidden transition-all duration-200 h-full"
                    >
                      {/* Image Header with Score Badge */}
                      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={getTopicImage(quizWithDefaults.topic)}
                          alt={quizWithDefaults.topic}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=Quiz";
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
                              quizWithDefaults.difficultyLevel?.toLowerCase() ===
                              "beginner"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : quizWithDefaults.difficultyLevel?.toLowerCase() ===
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

                        <div className="absolute flex flex-col items-end gap-2 bottom-4 right-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (quiz.type === "generated") {
                                navigate(`/quiz/${quiz._id}`);
                              } else {
                                navigate(`/quiz/${quiz.quizId || quiz._id}`);
                              }
                            }}
                            className={`flex w-fit items-center gap-1 ${
                              hasAttempted
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-500 hover:bg-green-600"
                            } text-white px-3 py-1.5 rounded shadow-md text-sm font-medium transition-colors`}
                          >
                            {hasAttempted ? "Retake" : "Start"}
                            <ChevronRight size={14} className="ml-1" />
                          </button>
                          {hasAttempted && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/quiz-result/${quiz._id}`);
                              }}
                              className={`flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded shadow-md text-sm font-medium transition-colors`}
                            >
                              View Result
                              <FileText size={14} className="ml-1" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-3 min-h-[72px]">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {formatDate(quizWithDefaults.createdAt)}
                          </div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1">
                            {quizWithDefaults.quiz_title}
                          </h2>
                        </div>

                        {/* Metadata */}
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <BookOpen size={12} className="mr-1" />
                              {quizWithDefaults.grade} Level
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <BarChart2 size={12} className="mr-1" />
                              {quiz.question_type || "MCQ"}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-700">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                                <FileText size={12} className="mr-1" />
                                {quizWithDefaults.questions.length} Qs
                              </div>
                              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                              <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                                <Clock size={12} className="mr-1" />
                                {quizWithDefaults.quiz_timer || 0} min
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuizAction("favorite", quiz);
                                }}
                                className={`p-1 rounded-full ${
                                  quiz.favorite
                                    ? "text-yellow-400 hover:text-yellow-500"
                                    : "text-gray-400 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400"
                                }`}
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    quiz.favorite ? "fill-current" : ""
                                  }`}
                                />
                              </button>
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