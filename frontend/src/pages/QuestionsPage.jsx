import { useState, useEffect, useContext, useRef } from "react";
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
  ImageIcon,
  Folder,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import toast from "react-hot-toast";
import { StreakUpdate } from "../../utils/streakService";
import { Helmet } from "react-helmet-async";
import { IoFolderOpen } from "react-icons/io5";
import GlobalLoader from "../components/GlobalLoader";

const QuestionsPage = () => {
  const questionsContainerRef = useRef(null);
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
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [topicSortBy, setTopicSortBy] = useState('alphabetical'); // 'alphabetical' or 'difficulty'

  const { backend_URL } = useContext(AppContext);
  const { subject, topic } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
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

  useEffect(() => {
    const fetchTopics = async () => {
      setTopicsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${backend_URL}/api/questions/topics`,
          { subject }
        );
        const formattedTopics = response.data.topics.map((topic) => ({
          title: formatTopicName(topic),
          link: `/${subject}/${topic}`,
          difficulty: getTopicDifficulty(topic),
        }));
        setTopics(formattedTopics);
        setTopicsLoading(false);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        setError("Failed to load topics. Please try again later.");
        setTopicsLoading(false);
      } 
    };

    if (subject) {
      fetchTopics();
    }
  }, [subject, backend_URL]);

  // Format topic name from "blood-relation" to "Blood Relation"
  const formatTopicName = (topic) => {
    return topic
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Determine topic difficulty (can be enhanced with actual difficulty data from API)
  const getTopicDifficulty = (topic) => {
    // This is a placeholder implementation
    // In a real application, this could be based on data from the API
    const difficultyMap = {
      "probability": "Hard",
      "permutation-and-combination": "Hard",
      "time-and-work": "Medium",
      "percentage": "Easy",
      "profit-and-loss": "Medium",
      "simple-interest": "Easy",
      "compound-interest": "Medium",
      "problems-on-train": "Hard",
    };
    
    return difficultyMap[topic] || "Medium";
  };
  
  // Sort topics based on selected sort method
  const getSortedTopics = () => {
    if (!topics.length) return [];
    
    const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    
    if (topicSortBy === 'alphabetical') {
      return [...topics].sort((a, b) => a.title.localeCompare(b.title));
    } else if (topicSortBy === 'difficulty') {
      return [...topics].sort((a, b) => {
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
    }
    
    return topics;
  };
 
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

 const goToFirstPage = () => {
   setCurrentPage(1);
   scrollToTop();
 };

 const goToLastPage = () => {
   setCurrentPage(totalPages);
   scrollToTop();
 };

 const goToNextPage = () => {
   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   scrollToTop();
 };

 const goToPrevPage = () => {
   setCurrentPage((prev) => Math.max(prev - 1, 1));
   scrollToTop();
 };

 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
   scrollToTop();
 };

 // Add scroll function
 const scrollToTop = () => {
   questionsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
 };

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
      <GlobalLoader/>
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
      <Helmet>
        <title>{subject}| Learnexa</title>
      </Helmet>
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
          ref={questionsContainerRef}
        >
          <div className="max-w-4xl mx-auto">
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
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-y-1 sm:space-y-0">
                  <div className="flex items-center flex-wrap gap-x-1">
                    <a
                      href="/dashboard"
                      className="hover:text-blue-500 transition-colors whitespace-nowrap"
                    >
                      Dashboard
                    </a>
                    <ChevronsRight className="text-green-500 w-4 h-4 flex-shrink-0" />
                    <a
                      href={`/${subject}`}
                      className="capitalize hover:text-blue-500 transition-colors whitespace-nowrap"
                    >
                      {subject.replace(/-/g, " ")}
                    </a>
                    <ChevronsRight className="text-green-500 w-4 h-4 flex-shrink-0" />
                    <a
                      href={`/${subject}/${topic}`}
                      className="capitalize hover:text-blue-500 transition-colors whitespace-nowrap"
                    >
                      {topic.replace(/-/g, " ")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2">
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
                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-zinc-200 mb-3">
                          {question.questionText}
                        </p>
                      </div>
                    </div>

                    <div className="md:flex hidden space-x-2">
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

                  {/* Display Diagrams if they exist */}
                  {question.diagrams && question.diagrams.length > 0 && (
                    <div className="mt-4 space-y-3 mb-2 md:mb-4">
                      {question.diagrams.map((diagram, diagramIndex) => (
                        <div
                          key={diagramIndex}
                          className=" dark:bg-white rounded-lg p-4 border border-gray-200 dark:border-zinc-700"
                        >
                          <div className="flex flex-col items-center">
                            <img
                              src={diagram.url}
                              alt={
                                diagram.caption || `Diagram ${diagramIndex + 1}`
                              }
                              className="max-w-full h-auto max-h-80 object-contain rounded-lg  mb-2"
                              style={{ maxHeight: "320px" }}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "block";
                              }}
                            />
                            <div className="hidden text-red-500 dark:text-red-400 text-sm p-2 border border-red-200 dark:border-red-800 rounded bg-red-50 dark:bg-red-900/20">
                              Failed to load image
                            </div>
                            {diagram.caption && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2 italic">
                                {diagram.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Display single diagram for backward compatibility */}
                  {question.diagram && (
                    <div className="mt-4 mb-2 md:mb-4">
                      <div className=" dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
                        <div className="flex flex-col items-center">
                          <img
                            src={question.diagram}
                            alt="Question diagram"
                            className="max-w-full h-auto max-h-80 object-contain rounded-lg shadow-sm"
                            style={{ maxHeight: "320px" }}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                          <div className="hidden text-red-500 dark:text-red-400 text-sm p-2 border border-red-200 dark:border-red-800 rounded bg-red-50 dark:bg-red-900/20">
                            Failed to load image
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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

                    <div className="flex items-center space-x-2">
                      {/* Image indicator */}
                      {(question.diagrams && question.diagrams.length > 0) ||
                      question.diagram ? (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <ImageIcon size={14} className="mr-1" />
                          {question.diagrams
                            ? `${question.diagrams.length} image${
                                question.diagrams.length > 1 ? "s" : ""
                              }`
                            : "1 image"}
                        </div>
                      ) : null}

                      <button
                        onClick={() => copyToClipboard(question.questionText)}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"
                      >
                        <Clipboard size={16} className="mr-1" />
                        Copy
                      </button>
                    </div>
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

                      {/* Show solution if available */}
                      {question.solution && (
                        <div className="mt-4 pt-4 border-t border-yellow-300 dark:border-yellow-700">
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                            Detailed Solution:
                          </h4>
                          <div className="text-gray-700 dark:text-yellow-100">
                            {renderSmart(question.solution)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mobile Actions */}
                  <div className="md:hidden flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => toggleLike(questionId)}
                        className={`flex items-center text-sm ${
                          isLiked
                            ? "text-red-500"
                            : "text-gray-500 hover:text-red-500"
                        } transition-colors`}
                      >
                        <Heart
                          size={16}
                          fill={isLiked ? "currentColor" : "none"}
                          className="mr-1"
                        />
                        Like
                      </button>
                      <button
                        onClick={() => toggleSave(questionId)}
                        className={`flex items-center text-sm ${
                          isSaved
                            ? "text-blue-500"
                            : "text-gray-500 hover:text-blue-500"
                        } transition-colors`}
                      >
                        <Bookmark
                          size={16}
                          fill={isSaved ? "currentColor" : "none"}
                          className="mr-1"
                        />
                        Save
                      </button>
                    </div>
                  </div>
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
                  Copy
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 dark:bg-zinc-700/30 rounded-xl p-4">
              <div className="mb-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                    <IoFolderOpen size={20} className="mr-2 text-yellow-500" />
                    Quick Links
                  </h2>
                </div>
              </div>
              <div className="space-y-2">
                {topicsLoading ? (
                  <div className="py-4 space-y-2">
                    <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                    <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                    <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                  </div>
                ) : topics.length > 0 ? (
                  <>
                    {getSortedTopics().slice(0, 5).map((topic) => (
                      <a
                        key={topic.title}
                        href={topic.link}
                        className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <IoFolderOpen size={16} className="mr-2 text-yellow-500" />

                        <span>{topic.title}</span>
                      </a>
                    ))}
                    {topics.length > 5 && (
                      <a
                        href={`/${subject}`}
                        className="block text-center px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View all {topics.length} topics
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No topics available for this subject.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionsPage;