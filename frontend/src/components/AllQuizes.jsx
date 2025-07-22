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
  // Programming Languages
  javascript:
    "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  python: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  java: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg",
  "c++": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  "c#": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  php: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
  ruby: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg",
  go: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  rust: "https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg",
  swift: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  kotlin: "https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg",

  // Web Development
  html: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg",
  css: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg",
  react: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
  vue: "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg",
  angular:
    "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
  nodejs:
    "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg",
  "web development":
    "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg",
  frontend: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  backend: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",

  // Data & Analytics
  database: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg",
  sql: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  "data science":
    "https://images.pexels.com/photos/7947687/pexels-photo-7947687.jpeg",
  "machine learning":
    "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg",
  "artificial intelligence":
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  analytics: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  "big data":
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  visualization:
    "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",

  // Mathematics
  mathematics:
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
  algebra: "https://images.pexels.com/photos/6238108/pexels-photo-6238108.jpeg",
  geometry:
    "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
  calculus:
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
  statistics:
    "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  permutation:
    "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg",
  probability:
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",

  // Sciences
  physics: "https://images.pexels.com/photos/8092/pexels-photo.jpg",
  chemistry:
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
  biology: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg",
  astronomy: "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg",
  medicine:
    "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
  anatomy: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",
  psychology:
    "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg",
  neuroscience:
    "https://images.pexels.com/photos/8553873/pexels-photo-8553873.jpeg",

  // Languages
  english: "https://images.pexels.com/photos/4050316/pexels-photo-4050316.jpeg",
  spanish: "https://images.pexels.com/photos/3740390/pexels-photo-3740390.jpeg",
  french: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg",
  german: "https://images.pexels.com/photos/3849168/pexels-photo-3849168.jpeg",
  chinese: "https://images.pexels.com/photos/8993561/pexels-photo-8993561.jpeg",
  japanese: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  linguistics:
    "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg",

  // Business & Finance
  business: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
  finance: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg",
  marketing: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
  economics:
    "https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg",
  accounting:
    "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg",
  management:
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  entrepreneurship:
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",

  // Arts & Creative
  art: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg",
  music: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg",
  photography: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
  design: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  "graphic design":
    "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  writing: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg",
  literature:
    "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg",
  poetry: "https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg",

  // Technology
  "cyber security":
    "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  networking:
    "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg",
  "cloud computing":
    "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  devops: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
  blockchain:
    "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
  cryptocurrency:
    "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
  iot: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  robotics:
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",

  // Social Sciences
  history:
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  geography: "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg",
  sociology:
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
  anthropology:
    "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg",
  philosophy:
    "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg",
  politics:
    "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
  law: "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg",

  // Data Structures & Algorithms
  array: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  "linked list":
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  "binary tree":
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
  graph: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
  "hash table":
    "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  sorting: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg",
  searching: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  algorithms:
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",

  // Tools & Utilities
  calendar: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg",
  productivity:
    "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  organization:
    "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg",
  planning:
    "https://images.pexels.com/photos/1428171/pexels-photo-1428171.jpeg",

  // Gaming & Entertainment
  gaming: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
  "game development":
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  animation: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  "3d modeling":
    "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",

  // Health & Fitness
  health:
    "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
  fitness: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
  nutrition:
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  wellness:
    "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg",

  // Environment & Nature
  environment:
    "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  ecology: "https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg",
  sustainability:
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
  "climate change":
    "https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-60013.jpeg",

  // General Categories
  "general knowledge":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
  education: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg",
  research:
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  science: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg",
  technology:
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  engineering:
    "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",

  // Default fallback
  default: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
};




const ITEMS_PER_PAGE = 12;

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

    // Check for specific matches first (exact keyword detection)
    if (lowerTopic.includes("javascript") || lowerTopic.includes("js"))
      return TOPIC_IMAGES.javascript;
    if (lowerTopic.includes("python") || lowerTopic.includes("py"))
      return TOPIC_IMAGES.python;
    if (lowerTopic.includes("java") && !lowerTopic.includes("javascript"))
      return TOPIC_IMAGES.java;
    if (lowerTopic.includes("c++") || lowerTopic.includes("cpp"))
      return TOPIC_IMAGES["c++"];
    if (lowerTopic.includes("c#") || lowerTopic.includes("csharp"))
      return TOPIC_IMAGES["c#"];
    if (lowerTopic.includes("php")) return TOPIC_IMAGES.php;
    if (lowerTopic.includes("ruby")) return TOPIC_IMAGES.ruby;
    if (lowerTopic.includes("golang") || lowerTopic.includes(" go "))
      return TOPIC_IMAGES.go;
    if (lowerTopic.includes("rust")) return TOPIC_IMAGES.rust;
    if (lowerTopic.includes("swift")) return TOPIC_IMAGES.swift;
    if (lowerTopic.includes("kotlin")) return TOPIC_IMAGES.kotlin;

    // Web Development
    if (lowerTopic.includes("html")) return TOPIC_IMAGES.html;
    if (lowerTopic.includes("css")) return TOPIC_IMAGES.css;
    if (lowerTopic.includes("react")) return TOPIC_IMAGES.react;
    if (lowerTopic.includes("vue")) return TOPIC_IMAGES.vue;
    if (lowerTopic.includes("angular")) return TOPIC_IMAGES.angular;
    if (lowerTopic.includes("nodejs") || lowerTopic.includes("node.js"))
      return TOPIC_IMAGES.nodejs;
    if (lowerTopic.includes("frontend") || lowerTopic.includes("front-end"))
      return TOPIC_IMAGES.frontend;
    if (lowerTopic.includes("backend") || lowerTopic.includes("back-end"))
      return TOPIC_IMAGES.backend;
    if (lowerTopic.includes("web dev")) return TOPIC_IMAGES["web development"];

    // Data & Analytics
    if (lowerTopic.includes("database") || lowerTopic.includes("db"))
      return TOPIC_IMAGES.database;
    if (lowerTopic.includes("sql")) return TOPIC_IMAGES.sql;
    if (lowerTopic.includes("data science") || lowerTopic.includes("ds"))
      return TOPIC_IMAGES["data science"];
    if (lowerTopic.includes("machine learning") || lowerTopic.includes("ml"))
      return TOPIC_IMAGES["machine learning"];
    if (
      lowerTopic.includes("artificial intelligence") ||
      lowerTopic.includes("ai")
    )
      return TOPIC_IMAGES["artificial intelligence"];
    if (lowerTopic.includes("analytics")) return TOPIC_IMAGES.analytics;
    if (lowerTopic.includes("big data")) return TOPIC_IMAGES["big data"];
    if (lowerTopic.includes("visualization")) return TOPIC_IMAGES.visualization;

    // Mathematics
    if (
      lowerTopic.includes("mathematics") ||
      lowerTopic.includes("math") ||
      lowerTopic.includes("maths")
    )
      return TOPIC_IMAGES.mathematics;
    if (lowerTopic.includes("algebra")) return TOPIC_IMAGES.algebra;
    if (lowerTopic.includes("geometry")) return TOPIC_IMAGES.geometry;
    if (lowerTopic.includes("calculus")) return TOPIC_IMAGES.calculus;
    if (lowerTopic.includes("statistics") || lowerTopic.includes("stats"))
      return TOPIC_IMAGES.statistics;
    if (lowerTopic.includes("permutation")) return TOPIC_IMAGES.permutation;
    if (lowerTopic.includes("probability")) return TOPIC_IMAGES.probability;

    // Sciences
    if (lowerTopic.includes("physics")) return TOPIC_IMAGES.physics;
    if (lowerTopic.includes("chemistry")) return TOPIC_IMAGES.chemistry;
    if (lowerTopic.includes("biology")) return TOPIC_IMAGES.biology;
    if (lowerTopic.includes("astronomy")) return TOPIC_IMAGES.astronomy;
    if (lowerTopic.includes("medicine")) return TOPIC_IMAGES.medicine;
    if (lowerTopic.includes("anatomy")) return TOPIC_IMAGES.anatomy;
    if (lowerTopic.includes("psychology")) return TOPIC_IMAGES.psychology;
    if (lowerTopic.includes("neuroscience")) return TOPIC_IMAGES.neuroscience;

    // Languages
    if (lowerTopic.includes("english")) return TOPIC_IMAGES.english;
    if (lowerTopic.includes("spanish")) return TOPIC_IMAGES.spanish;
    if (lowerTopic.includes("french")) return TOPIC_IMAGES.french;
    if (lowerTopic.includes("german")) return TOPIC_IMAGES.german;
    if (lowerTopic.includes("chinese")) return TOPIC_IMAGES.chinese;
    if (lowerTopic.includes("japanese")) return TOPIC_IMAGES.japanese;
    if (lowerTopic.includes("linguistics")) return TOPIC_IMAGES.linguistics;

    // Business & Finance
    if (lowerTopic.includes("business")) return TOPIC_IMAGES.business;
    if (lowerTopic.includes("finance")) return TOPIC_IMAGES.finance;
    if (lowerTopic.includes("marketing")) return TOPIC_IMAGES.marketing;
    if (lowerTopic.includes("economics")) return TOPIC_IMAGES.economics;
    if (lowerTopic.includes("accounting")) return TOPIC_IMAGES.accounting;
    if (lowerTopic.includes("management")) return TOPIC_IMAGES.management;
    if (lowerTopic.includes("entrepreneurship"))
      return TOPIC_IMAGES.entrepreneurship;

    // Arts & Creative
    if (lowerTopic.includes("art") && !lowerTopic.includes("artificial"))
      return TOPIC_IMAGES.art;
    if (lowerTopic.includes("music")) return TOPIC_IMAGES.music;
    if (lowerTopic.includes("photography")) return TOPIC_IMAGES.photography;
    if (lowerTopic.includes("design")) return TOPIC_IMAGES.design;
    if (lowerTopic.includes("graphic design"))
      return TOPIC_IMAGES["graphic design"];
    if (lowerTopic.includes("writing")) return TOPIC_IMAGES.writing;
    if (lowerTopic.includes("literature")) return TOPIC_IMAGES.literature;
    if (lowerTopic.includes("poetry")) return TOPIC_IMAGES.poetry;

    // Technology
    if (
      lowerTopic.includes("cyber security") ||
      lowerTopic.includes("cybersecurity")
    )
      return TOPIC_IMAGES["cyber security"];
    if (lowerTopic.includes("networking")) return TOPIC_IMAGES.networking;
    if (lowerTopic.includes("cloud")) return TOPIC_IMAGES["cloud computing"];
    if (lowerTopic.includes("devops")) return TOPIC_IMAGES.devops;
    if (lowerTopic.includes("blockchain")) return TOPIC_IMAGES.blockchain;
    if (lowerTopic.includes("cryptocurrency") || lowerTopic.includes("crypto"))
      return TOPIC_IMAGES.cryptocurrency;
    if (lowerTopic.includes("iot")) return TOPIC_IMAGES.iot;
    if (lowerTopic.includes("robotics")) return TOPIC_IMAGES.robotics;

    // Social Sciences
    if (lowerTopic.includes("history")) return TOPIC_IMAGES.history;
    if (lowerTopic.includes("geography")) return TOPIC_IMAGES.geography;
    if (lowerTopic.includes("sociology")) return TOPIC_IMAGES.sociology;
    if (lowerTopic.includes("anthropology")) return TOPIC_IMAGES.anthropology;
    if (lowerTopic.includes("philosophy")) return TOPIC_IMAGES.philosophy;
    if (lowerTopic.includes("politics")) return TOPIC_IMAGES.politics;
    if (lowerTopic.includes("law")) return TOPIC_IMAGES.law;

    // Data Structures & Algorithms
    if (lowerTopic.includes("array")) return TOPIC_IMAGES.array;
    if (lowerTopic.includes("linked list")) return TOPIC_IMAGES["linked list"];
    if (lowerTopic.includes("binary tree") || lowerTopic.includes("tree"))
      return TOPIC_IMAGES["binary tree"];
    if (lowerTopic.includes("graph")) return TOPIC_IMAGES.graph;
    if (lowerTopic.includes("hash") || lowerTopic.includes("hashmap"))
      return TOPIC_IMAGES["hash table"];
    if (lowerTopic.includes("sorting")) return TOPIC_IMAGES.sorting;
    if (lowerTopic.includes("searching")) return TOPIC_IMAGES.searching;
    if (lowerTopic.includes("algorithm")) return TOPIC_IMAGES.algorithms;

    // Tools & Utilities
    if (lowerTopic.includes("calendar") || lowerTopic.includes("calander"))
      return TOPIC_IMAGES.calendar;
    if (lowerTopic.includes("productivity")) return TOPIC_IMAGES.productivity;
    if (lowerTopic.includes("organization")) return TOPIC_IMAGES.organization;
    if (lowerTopic.includes("planning")) return TOPIC_IMAGES.planning;

    // Gaming & Entertainment
    if (lowerTopic.includes("gaming") || lowerTopic.includes("games"))
      return TOPIC_IMAGES.gaming;
    if (lowerTopic.includes("game dev"))
      return TOPIC_IMAGES["game development"];
    if (lowerTopic.includes("animation")) return TOPIC_IMAGES.animation;
    if (lowerTopic.includes("3d")) return TOPIC_IMAGES["3d modeling"];

    // Health & Fitness
    if (lowerTopic.includes("health")) return TOPIC_IMAGES.health;
    if (lowerTopic.includes("fitness")) return TOPIC_IMAGES.fitness;
    if (lowerTopic.includes("nutrition")) return TOPIC_IMAGES.nutrition;
    if (lowerTopic.includes("wellness")) return TOPIC_IMAGES.wellness;

    // Environment & Nature
    if (lowerTopic.includes("environment")) return TOPIC_IMAGES.environment;
    if (lowerTopic.includes("ecology")) return TOPIC_IMAGES.ecology;
    if (lowerTopic.includes("sustainability"))
      return TOPIC_IMAGES.sustainability;
    if (lowerTopic.includes("climate")) return TOPIC_IMAGES["climate change"];

    // General Categories
    if (lowerTopic.includes("general knowledge"))
      return TOPIC_IMAGES["general knowledge"];
    if (lowerTopic.includes("education")) return TOPIC_IMAGES.education;
    if (lowerTopic.includes("research")) return TOPIC_IMAGES.research;
    if (lowerTopic.includes("science")) return TOPIC_IMAGES.science;
    if (lowerTopic.includes("technology")) return TOPIC_IMAGES.technology;
    if (lowerTopic.includes("engineering")) return TOPIC_IMAGES.engineering;

    return TOPIC_IMAGES.default;
  };

  // const getTopicImage = (topic) => {
  //   if (!topic) return TOPIC_IMAGES.default;

  //   const lowerTopic = topic.toLowerCase();

  //   // Check for specific matches first
  //   if (lowerTopic.includes("javascript")) return TOPIC_IMAGES.javascript;
  //   if (lowerTopic.includes("permutation")) return TOPIC_IMAGES.permutation;
  //   if (lowerTopic.includes("calendar") || lowerTopic.includes("calander"))
  //     return TOPIC_IMAGES.calendar;
  //   if (lowerTopic.includes("database")) return TOPIC_IMAGES.database;
  //   if (lowerTopic.includes("array")) return TOPIC_IMAGES.array;
  //   if (lowerTopic.includes("general knowledge"))
  //     return TOPIC_IMAGES["general knowledge"];
  //   if (lowerTopic.includes("english")) return TOPIC_IMAGES.english;
  //   if (lowerTopic.includes("c++")) return TOPIC_IMAGES["c++"];
  //   if (lowerTopic.includes("html")) return TOPIC_IMAGES.html;
  //   if (lowerTopic.includes("css")) return TOPIC_IMAGES.css;

  //   return TOPIC_IMAGES.default;
  // };

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

  const handlePageChange = async (newPage) => {
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
  <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
    {/* Header */}
    <div className="flex flex-col items-center justify-center mt-6 sm:mt-10">
      <div className="text-center max-w-4xl">
        <div className="mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 dark:text-white">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Discover & Master
            </span>
            <br />
            Interactive Quizzes
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover community-created quizzes crafted by users like you. Join
            our growing collection of knowledge-sharing enthusiasts.
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
            placeholder="Search Quizzes..."
            className="w-full p-4 sm:p-5 md:p-6 pl-12 sm:pl-14 text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 shadow-lg sm:shadow-2xl dark:text-white transition-all"
          />
          <Search
            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          {paginationData.totalItems} quiz
          {paginationData.totalItems !== 1 ? "es" : ""} available
        </p>
      </div>
    </div>

    {paginationData.currentQuizzes.length > 0 ? (
      <>
        {/* Quiz Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
                  className="group relative bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg border border-gray-100 dark:border-zinc-700 cursor-pointer overflow-hidden"
                  onClick={handleCardClick}
                >
                  {/* Image Header with Overlay */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
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
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
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
                  <div className="p-4 sm:p-5">
                    {/* Date */}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(quizWithDefaults.createdAt)}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 line-clamp-2">
                      {quizWithDefaults.quiz_title}
                    </h2>

                    {/* Grade */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex w-fit capitalize bg-gray-100 dark:bg-gray-800 items-center text-xs text-gray-500 dark:text-white py-1 px-2 rounded">
                        <BookOpen size={12} className="mr-1" />
                        {quizWithDefaults.grade} Level
                      </div>
                      {quizWithDefaults.question_type && (
                        <div className="flex uppercase w-fit bg-gray-100 dark:bg-gray-800 items-center text-xs text-gray-500 dark:text-white py-1 px-2 rounded">
                          <BarChart2 size={12} className="mr-1" />
                          {quizWithDefaults.question_type}
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex mt-3 sm:mt-4 justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={quizWithDefaults.created_by?.name || "Unknown"}
                          size={24}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {quizWithDefaults.created_by?.name || "Unknown"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex bg-green-500 dark:bg-green-900/50 items-center text-xs text-white dark:text-green-500 py-1 px-2 rounded dark:border border-green-500">
                          <Clock size={12} className="mr-1" />
                          {quizWithDefaults.quiz_timer === 0
                            ? "No Timer"
                            : quizWithDefaults.quiz_timer + "min"}
                        </div>
                        <div className="flex bg-purple-500 dark:bg-purple-900/50 items-center text-xs text-white dark:text-purple-500 py-1 px-2 rounded dark:border border-purple-500">
                          Q.{quizWithDefaults.questions.length}
                        </div>
                      </div>
                    </div>

                    {/* Hover Action Indicator */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 bg-green-600 text-white border border-green-500 px-2 py-1 rounded shadow-md text-xs sm:text-sm">
                        Start
                        <Play size={14} />
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Results info */}
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Showing {paginationData.startIndex + 1}-
              {Math.min(paginationData.endIndex, paginationData.totalItems)} of{" "}
              {paginationData.totalItems} quizzes
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={paginationData.isFirstPage}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <FiChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Previous</span>
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
                    className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
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
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="hidden sm:inline">Next</span>
                <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="text-center py-8 sm:py-12">
        <div className="max-w-md mx-auto">
          <FiSearch className="mx-auto text-3xl sm:text-4xl text-gray-400 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1 sm:mb-2">
            No quizzes found
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {searchQuery.trim()
              ? `No quizzes match your search for "${searchQuery}". Try a different search term.`
              : "There are currently no quizzes available. Please check back later."}
          </p>
          {searchQuery.trim() && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 sm:mt-4 px-3 sm:px-4 py-1 sm:py-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm sm:text-base"
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
