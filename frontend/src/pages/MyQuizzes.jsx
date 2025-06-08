
import React, { useState, useEffect, useContext } from "react";
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
} from "lucide-react";
import Layout from "../components/layouts/layout";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const MyQuizzes = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizData, setQuizData] = useState(null);

  const { backend_URL } = useContext(AppContext);
  const quizId = "683f133a5319bf3d8a6210f0";
  const fetchQuiz = async () => {
    try {
      const response = await axios.get(backend_URL + `/api/quiz/get-quiz-by-id/${quizId}`)
      setQuizData(response.data);
      
    }catch(err){
      console.log(err);
    }
  }
  console.log(quizData);
  useEffect(() => {
    fetchQuiz();
  }, [])
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const fetchQuizzes = () => {
      setTimeout(() => {
        setQuizzes([
          {
            id: 1,
            title: "World Capitals",
            topic: "Geography",
            status: "completed",
            questions: 20,
            date: "2023-10-15",
            score: 85,
            favorite: true,
          },
          {
            id: 2,
            title: "React Fundamentals",
            topic: "Programming",
            status: "completed",
            questions: 15,
            date: "2023-10-10",
            score: 92,
            favorite: false,
          },
          {
            id: 3,
            title: "Ancient Civilizations",
            topic: "History",
            status: "generating",
            questions: 10,
            date: "2023-10-18",
            favorite: true,
          },
          {
            id: 4,
            title: "Organic Chemistry Basics",
            topic: "Science",
            status: "failed",
            questions: 12,
            date: "2023-10-17",
            favorite: false,
          },
          {
            id: 5,
            title: "European History",
            topic: "History",
            status: "completed",
            questions: 18,
            date: "2023-09-28",
            score: 78,
            favorite: false,
          },
          {
            id: 6,
            title: "JavaScript ES6+",
            topic: "Programming",
            status: "completed",
            questions: 25,
            date: "2023-10-05",
            score: 95,
            favorite: true,
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesTab = activeTab === "all" || quiz.status === activeTab;
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTopicIcon = (topic) => {
    switch (topic.toLowerCase()) {
      case "geography":
        return <Globe className="w-5 h-5 text-blue-500" />;
      case "programming":
        return <Code className="w-5 h-5 text-purple-500" />;
      case "history":
        return <Landmark className="w-5 h-5 text-amber-500" />;
      case "science":
        return <FlaskConical className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
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
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "generating":
        return "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "failed":
        return "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const toggleFavorite = (id) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === id ? { ...quiz, favorite: !quiz.favorite } : quiz
      )
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50  dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Folder className="w-8 h-8 text-blue-500" />
                My Quizzes
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                View and manage all your quizzes
              </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Quiz</span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex space-x-1 overflow-x-auto pb-2">
              {["all", "completed", "generating", "failed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {tab === "all" ? "All Quizzes" : getStatusText(tab)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid place-items-center py-20">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No quizzes found
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {searchQuery
                  ? "No quizzes match your search. Try a different term."
                  : activeTab === "all"
                  ? "You don't have any quizzes yet. Create your first one!"
                  : `You don't have any ${getStatusText(
                      activeTab
                    ).toLowerCase()} quizzes.`}
              </p>
              <button className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
                <Plus className="w-5 h-5" />
                <span>Create Quiz</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${getStatusColor(
                            quiz.status
                          )}`}
                        >
                          {getTopicIcon(quiz.topic)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {quiz.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {quiz.topic}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(quiz.id)}
                        className="text-gray-400 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            quiz.favorite
                              ? "fill-yellow-400 text-yellow-400"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            quiz.status
                          )}`}
                        >
                          {getStatusText(quiz.status)}
                        </span>
                        {quiz.status === "completed" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {quiz.score}% Score
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {quiz.date}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-700/30 flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {quiz.questions} questions
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyQuizzes;