import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
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
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import { StreakUpdate } from "../../utils/streakService";
import { Helmet } from "react-helmet-async";

const ReadingComprehensionPage = () => {
  const questionsContainerRef = useRef(null);
  const [passageData, setPassageData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const { backend_URL } = useContext(AppContext);
  const { subject, topic, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const response = await axios.get(
          `${backend_URL}/api/questions/reading-comprehension/${id}`
        );
          setPassageData(response.data.rc);
          console.log(response.data.rc)
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchPassage();
  }, [backend_URL, id]);

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

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  const renderSmart = (text) => {
    if (!text) return null;
    const normalized = text.replace(/\\n/g, "\n");
    return <div className="whitespace-pre-line">{normalized}</div>;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const scrollToTop = () => {
    questionsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
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

  if (!passageData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-bold mb-2">No Passage Found</h3>
          <p className="text-gray-600 dark:text-zinc-300">
            The requested reading comprehension passage could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{passageData.passageTitle} | Learnexa</title>
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
                <div className="flex items-center mb-2">
                  <button
                    onClick={() => navigate(-1)}
                    className="mr-3 p-1 rounded-full hover:bg-gray-200 bg-gray-100 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h1 className="text-2xl md:text-3xl text-center capitalize text-gray-800 dark:text-white">
                    <span className="text-blue-500">
                      {passageData.passageTitle}
                    </span>
                  </h1>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 ml-10">
                  <a
                    href="/dashboard"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Dashboard
                  </a>{" "}
                  <ChevronsRight className="mx-1 text-green-500 w-4 h-4" />{" "}
                  <a
                    href={`/verbal-ability`}
                    className="capitalize hover:text-blue-500 transition-colors"
                  >
                    Verbal Ability
                  </a>
                  <ChevronsRight className="mx-1 text-green-500 w-4 h-4" />{" "}
                  <a
                    href={`/verbal-ability/reading-comprehension`}
                    className="capitalize hover:text-blue-500 transition-colors"
                  >
                    Reading Comprehension
                  </a>
                  <ChevronsRight className="mx-1 text-green-500 w-4 h-4" />{" "}
                  <a
                    href={`/verbal-ability/reading-comprehension`}
                    className="capitalize hover:text-blue-500 transition-colors"
                  >
                    {passageData.passageTitle}
                  </a>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={toggleLike}
                  className={`p-2 rounded-full ${
                    liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                  } transition-colors`}
                >
                  <Heart size={20} fill={liked ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={toggleSave}
                  className={`p-2 rounded-full ${
                    saved
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-blue-500"
                  } transition-colors`}
                >
                  <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => setFullScreen(!fullScreen)}
                  className="p-2 cursor-pointer rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {fullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>

            {/* Passage Content */}
            <div className="mb-8 p-4 md:p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
              <div className="prose dark:prose-invert md:text-lg text-gray-700 dark:text-white max-w-none">
                <h1 className="font-semibold ">Passage:</h1>
                {renderSmart(passageData.passage)}
              </div>
              <button
                onClick={() => copyToClipboard(passageData.passage)}
                className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"
              >
                <Clipboard size={16} className="mr-1" />
                Copy Passage
              </button>
            </div>

            {/* Questions List */}
            {passageData.questions.map((question, index) => {
              const questionId = question._id || index;
              const isSubmitted = submitted[questionId];
              const selectedOption = selectedOptions[questionId];
              const isExplanationVisible = showExplanations[questionId];

              return (
                <div
                  key={questionId}
                  className="md:mb-6 mb-1 p-3 md:p-5 bg-white dark:bg-zinc-900 md:rounded-xl md:shadow-sm md:hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-zinc-800"
                >
                  {/* Question Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start">
                      <span className="text-sm font-semibold bg-gradient-to-br from-indigo-600 to-indigo-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                        {index + 1}
                      </span>
                      <p className="text-gray-800 dark:text-zinc-200 flex-1">
                        {question.questionText}
                      </p>
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
                      Copy Question
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
          </div>
        </div>

        {/* Desktop Sidebar (Workspace) - Hidden on small screens */}
        <div className="lg:w-80 xl:w-96 bg-white dark:bg-zinc-900 border-l border-gray-100 dark:border-zinc-700 p-5 hidden lg:block">
          <div className="sticky top-5 space-y-6">
            {/* Workspace */}
            <div className="bg-gray-50 dark:bg-zinc-700/30 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Reading Notes
                </h2>
                <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  <RefreshCw size={16} />
                </button>
              </div>

              <textarea
                className="w-full h-64 p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 font-mono text-sm"
                placeholder="Take notes about the passage here..."
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

            {/* Quick Actions */}
            <div className="bg-gray-50 dark:bg-zinc-700/30 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToTop()}
                  className="w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-gray-300 transition-colors flex items-center"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Top
                </button>
                <button
                  onClick={() => navigate(`/${subject}/${topic}`)}
                  className="w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-gray-300 transition-colors flex items-center"
                >
                  <BookOpen size={16} className="mr-2" />
                  More {topic} Passages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadingComprehensionPage;
