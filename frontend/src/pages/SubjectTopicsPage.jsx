import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Layout from "../components/layouts/layout";
import {
  ChevronsRight,
  Search,
  Bookmark,
  ArrowRight,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const SubjectTopicsPage = () => {
  const { subject } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedTopics, setSavedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Color palette for topic cards
  const colorPalette = [
    "bg-gradient-to-br from-purple-500 to-purple-700",
    "bg-gradient-to-br from-blue-500 to-blue-700",
    "bg-gradient-to-br from-green-500 to-green-700",
    "bg-gradient-to-br from-red-500 to-red-700",
    "bg-gradient-to-br from-yellow-500 to-yellow-600",
    "bg-gradient-to-br from-indigo-500 to-indigo-700",
    "bg-gradient-to-br from-pink-500 to-pink-700",
    "bg-gradient-to-br from-teal-500 to-teal-700",
    "bg-gradient-to-br from-orange-500 to-orange-700",
    "bg-gradient-to-br from-cyan-500 to-cyan-700",
    "bg-gradient-to-br from-lime-500 to-lime-700",
    "bg-gradient-to-br from-amber-500 to-amber-700",
  ];

  // Define topics for different subjects
  const subjectTopics = {
    aptitude: [
      {
        title: "Permutation & Combination",
        description: "Arrangements and selections of objects",
        link: "/aptitude/permutation-and-combination",
        difficulty: "Medium",
      },
      {
        title: "Probability",
        description: "Likelihood of events occurring",
        link: "/aptitude/probability",
        difficulty: "Medium",
      },
      {
        title: "Problems on trains",
        description: "Time and distance problem on trains",
        link: "/aptitude/problems-on-trains",
        difficulty: "Easy",
      },
      {
        title: "Time and Distance",
        description: "Equations and algebraic expressions",
        link: "/aptitude/time-and-distance",
        difficulty: "Easy",
      },
      {
        title: "Time and Work",
        description: "Work rate and efficiency calculations",
        link: "/aptitude/time-and-work",
        difficulty: "Medium",
      },
      {
        title: "Simple Interest",
        description: "Basic interest calculations",
        link: "/aptitude/simple-interest",
        difficulty: "Easy",
      },
      {
        title: "Problems on ages",
        description: "Age-related word problems",
        link: "/aptitude/problems-on-ages",
        difficulty: "Easy",
      },
      {
        title: "Profit and Loss",
        description: "Business mathematics fundamentals",
        link: "/aptitude/profit-and-loss",
        difficulty: "Medium",
      },
      {
        title: "Number Series",
        description: "Pattern recognition in number sequences",
        link: "/aptitude/number-series",
        difficulty: "Medium",
      },
      {
        title: "Data Interpretation",
        description: "Analyzing charts and graphs",
        link: "/aptitude/data-interpretation",
        difficulty: "Hard",
      },
    ],
    "logical-reasoning": [
      {
        title: "Letter and Symbol Series",
        description: "Solve complex Letter and Symbol Series",
        link: "/logical-reasoning/letter-and-symbol-series",
      },
      {
        title: "Deductive Reasoning",
        description: "Draw conclusions from given information",
        link: "/questions/deductive-reasoning",
        difficulty: "Medium",
      },
      {
        title: "Pattern Recognition",
        description: "Identify patterns in sequences",
        link: "/questions/pattern-recognition",
        difficulty: "Medium",
      },
    ],
    "verbal-reasoning": [
      {
        title: "Blood Relations",
        description: "Analyze family relationships",
        link: "/verbal-reasoning/blood-relation-test",
        difficulty: "Easy",
      },
      {
        title: "Direction Sense",
        description: "Solve direction-based problems",
        link: "/verbal-reasoning/direction-sense",
        difficulty: "Medium",
      },
      {
        title: "Coding-Decoding",
        description: "Decipher coded messages",
        link: "/verbal-reasoning/coding-decoding",
        difficulty: "Medium",
      },
    ],
    "verbal-ability": [
      {
        title: "Vocabulary",
        description: "Word meanings and usage",
        link: "/questions/vocabulary",
        difficulty: "Easy",
      },
      {
        title: "Grammar",
        description: "Rules of language structure",
        link: "/questions/grammar",
        difficulty: "Medium",
      },
      {
        title: "Reading Comprehension",
        description: "Understand and analyze passages",
        link: "/questions/reading-comprehension",
        difficulty: "Hard",
      },
    ],
  };

  // Toggle saved topic
  const toggleSavedTopic = (topicTitle) => {
    setSavedTopics((prev) =>
      prev.includes(topicTitle)
        ? prev.filter((title) => title !== topicTitle)
        : [...prev, topicTitle]
    );
  };

  // Get the topics for the current subject or default to aptitude
  const topics = (subjectTopics[subject] || subjectTopics.aptitude)
    .map((topic, index) => ({
      ...topic,
      color: colorPalette[index % colorPalette.length],
      isSaved: savedTopics.includes(topic.title),
    }))
    .filter(
      (topic) =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const DifficultyBadge = ({ level }) => {
    const colors = {
      Easy: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Hard: "bg-red-100 text-red-800",
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[level]}`}>
        {level}
      </span>
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>{subject} | Learnexa</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl  text-gray-800 dark:text-white capitalize">
                {subject || "Aptitude"} Topics
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Master these topics to ace your exams
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search topics..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="/dashboard"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronsRight className="w-4 h-4 text-green-500 mx-1" />
                    <a
                      href={`/${subject}`}
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white capitalize"
                    >
                      {subject}
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Topics Grid */}
          {isLoading ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={loadingVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-40 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {topics.length > 0 ? (
                topics.map((topic, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className="relative rounded-xl overflow-hidden shadow-md transition-all duration-200"
                  >
                    {/* Save Button
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSavedTopic(topic.title);
                      }}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full ${
                        topic.isSaved
                          ? "text-yellow-400"
                          : "text-white/70 hover:text-white"
                      } transition-colors`}
                    >
                      <Bookmark
                        size={20}
                        fill={topic.isSaved ? "currentColor" : "none"}
                      />
                    </button> */}

                    <a
                      href={topic.link}
                      className={`block h-full ${topic.color} text-white`}
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-semibold">
                            {topic.title}
                          </h2>
                        </div>

                        <p className="opacity-90 mb-4 flex-1">
                          {topic.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm">
                            Start practicing
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                    <Search size={80} className="mx-auto opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    No topics found
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SubjectTopicsPage;