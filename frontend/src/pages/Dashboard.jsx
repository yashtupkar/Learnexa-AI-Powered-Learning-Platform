import React, { useState, useEffect } from "react";
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
  BarChart2,
  Trophy,
  TrendingUp,
  Users,
  Bookmark,
  Calendar,
  PieChart,
  Award,
  Bell,
  Settings,
  Play,
  Sparkle,
  Sparkles,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import waveAnimation from "../assets/waveCartoon.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import AllQuizes from "../components/AllQuizes";
import CurrentAffairs from "../components/CurrentAffairsSlider";
import CurrentAffairsSlider from "../components/CurrentAffairsSlider";
import FriendsImage from "../assets/referal.png";
import UpgradePopup from "../components/modal/UpgradeModal";
import InviteModal from "../components/modal/InviteModal";
import StreakModal from "../components/modal/StreakModal";
import GenerateModal from "../components/modal/GenerateModal";
import { useModal } from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import UpgradeBanner from "../components/banners/UpgradeBanner";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const { openModal, closeModal, MODAL_TYPES } = useModal();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Mock data
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        // Quiz data
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
        ]);

        // Stats data
        setStats({
          totalQuizzes: 24,
          completed: 18,
          averageScore: 82,
          improvement: 12,
          topics: [
            { name: "Geography", count: 6 },
            { name: "History", count: 5 },
            { name: "Science", count: 4 },
            { name: "Programming", count: 9 },
          ],
        });

        // Recent activity
        setRecentActivity([
          {
            id: 1,
            action: "completed",
            quizTitle: "World Capitals",
            date: "2023-10-15T14:30:00Z",
            score: 85,
          },
          {
            id: 2,
            action: "created",
            quizTitle: "Ancient Civilizations",
            date: "2023-10-14T09:15:00Z",
          },
          {
            id: 3,
            action: "shared",
            quizTitle: "React Fundamentals",
            date: "2023-10-12T16:45:00Z",
            with: "Study Group",
          },
          {
            id: 4,
            action: "improved",
            quizTitle: "JavaScript ES6+",
            date: "2023-10-10T11:20:00Z",
            improvement: "+15%",
          },
        ]);

        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleOpenInviteModal = () => {
    openModal(MODAL_TYPES.INVITE, {
      isOpen: true,
      onClose: () => setShowInviteModal(false),
      referralCode: "FRIEND2023",
    });
  };
  const handleOpenStreakModal = () => {
    openModal(MODAL_TYPES.STREAK, {
      isOpen: true,
      onClose: () => setShowStreakModal(false),
    });
  };
  const handleOpenGenerateModal = () => {
    openModal(MODAL_TYPES.GENERATE, {
      isOpen: true,
      onClose: () => setShowGenerateModal(false),
    });
  };

  return (
    <Layout>
      <div className="min-h-screen p-3 md:p-6 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-row w-full gap-4 sm:gap-8 items-center mb-4 md:mb-10 animate-fadeIn">
              <div className="relative group">
                <Lottie
                  animationData={waveAnimation}
                  loop
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-58 md:h-58 transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute -bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
                    Ready to quiz?
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-left pt-4 sm:pt-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl mb-2 sm:mb-4 dark:text-white relative inline-block">
                  <span className="relative">
                    <span>Hi,</span> <span>{user?.name}</span>
                  </span>
                </h1>
                <p className="dark:text-white text-base sm:text-lg mb-3 sm:mb-4">
                  Welcome to{" "}
                  <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Learnexa
                  </span>
                </p>
                <button className="px-4 sm:px-6 py-1 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base">
                  Let's Get Started
                </button>
              </div>
            </div>

            <div className="w-full md:w-2/5 mb-6 h-fit flex flex-col sm:flex-row md:flex-col gap-4 items-center md:border-l-2 border-gray-200 dark:border-zinc-800 px-2 sm:px-4">
              <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 dark:hover:bg-orange-900/30 cursor-pointer group">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 group-hover:rotate-12 transition-transform"
                  width="48"
                  height="49"
                  viewBox="0 0 48 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="flameGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" style={{ stopColor: "#FF4D4D" }} />
                      <stop offset="50%" style={{ stopColor: "#FF9900" }} />
                      <stop offset="100%" style={{ stopColor: "#FFCC00" }} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M38.4375 13.9844C33.375 20.5 23.4844 13.9844 29.2969 1.51562C12.7594 5.11563 8 21.0156 7.6875 28.5156C5.8125 28.4406 4.28125 26.3594 3.75 25.3281C3.75 33.3438 7.96875 47.875 24.4688 47.875C40.7344 47.875 44.3906 34.4219 44.7188 27.5312C43.6312 28.9562 41.8594 30.0625 39.8438 30.3438C43.875 24.0625 40.6875 16.9375 38.4375 13.9844Z"
                    fill="url(#flameGradient)"
                    filter="url(#glow)"
                    className="group-hover:animate-pulse"
                  ></path>
                  <path
                    d="M38.4375 13.9844C33.375 20.5 23.4844 13.9844 29.2969 1.51562C12.7594 5.11563 8 21.0156 7.6875 28.5156C5.8125 28.4406 4.28125 26.3594 3.75 25.3281C3.75 33.3438 7.96875 47.875 24.4688 47.875C40.7344 47.875 44.3906 34.4219 44.7188 27.5312C43.6312 28.9562 41.8594 30.0625 39.8438 30.3438C43.875 24.0625 40.6875 16.9375 38.4375 13.9844Z"
                    stroke="#FF6B00"
                    strokeWidth="1.40625"
                    strokeLinejoin="round"
                    opacity="0.6"
                  ></path>
                </svg>
                <div
                  onClick={handleOpenStreakModal}
                  className="flex flex-col gap-1 sm:gap-2"
                >
                  <h1 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    Start your streak
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
                    Take daily quizzes to build your knowledge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer group">
                <img
                  src={FriendsImage}
                  alt="Friends"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform"
                />
                <div
                  onClick={handleOpenInviteModal}
                  className="flex flex-col gap-1 sm:gap-2"
                >
                  <h1 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Invite your friends
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                    Learning together is double the progress and double the fun!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 overflow-x-auto pb-2">
              {["overview", "quizzes", "analytics", "goals"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {/* <UpgradePopup isOpen={true}/> */}
          {/* <InviteModal isOpen={true}/> */}
          {/* <StreakModal isOpen={true}/> */}
          {/* <GenerateModal isOpen={true}/> */}
          {isLoading ? (
            <div className="grid place-items-center py-20">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <h1 className="text-gray-600 text-xl sm:text-2xl ml-2 dark:text-gray-300">
                    Quick Links
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {/* Generate Quiz Card */}
                    <div
                      onClick={handleOpenGenerateModal}
                      className="group bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-blue-500 rounded-md sm:rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                          </div>
                          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Generate Quiz
                          </p>
                          <h3 className="text-xs sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Create AI-powered quizzes
                          </h3>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-xs text-blue-500 mt-2 sm:mt-3 flex items-center group-hover:font-medium">
                        Click to generate new quiz
                        <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>

                    {/* Current Affairs Card */}
                    <div
                      onClick={() => navigate("/current-affairs")}
                      className="group bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-green-50 dark:hover:bg-green-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-green-500 rounded-md sm:rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                          </div>
                          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            Current Affairs
                          </p>
                          <h3 className="text-xs sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Stay updated with news
                          </h3>
                          <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Updated daily
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        </div>
                      </div>
                      <p className="text-xs text-green-500 mt-2 sm:mt-3 flex items-center group-hover:font-medium">
                        Daily current affairs quiz
                        <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>

                    {/* StudyTube Card */}
                    <div
                      onClick={() => navigate("/study-tube")}
                      className="group bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-red-50 dark:hover:bg-red-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-red-500 rounded-md sm:rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                          </div>
                          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            StudyTube
                          </p>
                          <h3 className="text-xs sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Distraction-free learning
                          </h3>
                          <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Beta feature
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        </div>
                      </div>
                      <p className="text-xs text-red-500 mt-2 sm:mt-3 flex items-center group-hover:font-medium">
                        Focus mode YouTube
                        <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>

                    {/* Interview Prep Card */}
                    <div
                      onClick={() => navigate("/interview")}
                      className="group bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:bg-amber-50 dark:hover:bg-amber-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-amber-500 rounded-md sm:rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                          </div>
                          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            Interview Prep
                          </p>
                          <h3 className="text-xs sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Practice interviews
                          </h3>
                          <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            AI powered
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                        </div>
                      </div>
                      <p className="text-xs text-amber-500 mt-2 sm:mt-3 flex items-center group-hover:font-medium">
                        AI interview simulator
                        <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>
                  </div>
                  <UpgradeBanner />
                  <CurrentAffairsSlider />

                  <AllQuizes />

                  {/* Charts and Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Performance Trend
                        </h3>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          View All
                        </button>
                      </div>
                      <div className="h-64 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center justify-center">
                        <BarChart2 className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        <p className="ml-3 text-gray-400 dark:text-gray-500">
                          Performance chart will appear here
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Recent Activity
                        </h3>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          View All
                        </button>
                      </div>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3"
                          >
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                              {activity.action === "completed" && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              {activity.action === "created" && (
                                <Plus className="w-4 h-4 text-blue-500" />
                              )}
                              {activity.action === "shared" && (
                                <Users className="w-4 h-4 text-purple-500" />
                              )}
                              {activity.action === "improved" && (
                                <TrendingUp className="w-4 h-4 text-amber-500" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {activity.action === "completed" &&
                                  `Completed "${activity.quizTitle}"`}
                                {activity.action === "created" &&
                                  `Created "${activity.quizTitle}"`}
                                {activity.action === "shared" &&
                                  `Shared "${activity.quizTitle}" with ${activity.with}`}
                                {activity.action === "improved" &&
                                  `Improved score on "${activity.quizTitle}" by ${activity.improvement}`}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatDateTime(activity.date)}
                                {activity.score &&
                                  ` • Score: ${activity.score}%`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Quizzes */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Recent Quizzes
                      </h3>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        View All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredQuizzes.slice(0, 4).map((quiz) => (
                        <div
                          key={quiz.id}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${getStatusColor(
                                  quiz.status
                                )}`}
                              >
                                {getTopicIcon(quiz.topic)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {quiz.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {quiz.topic} • {formatDate(quiz.date)}
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
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "quizzes" && (
                <>
                  <AllQuizes />
                </>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                        Score Distribution
                      </h3>
                      <div className="h-64 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center justify-center">
                        <PieChart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        <p className="ml-3 text-gray-400 dark:text-gray-500">
                          Score distribution chart will appear here
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                        Topic Mastery
                      </h3>
                      <div className="space-y-4">
                        {stats.topics.map((topic) => (
                          <div key={topic.name} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {topic.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {topic.count} quizzes
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (topic.count / stats.totalQuizzes) * 200
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Performance Over Time
                    </h3>
                    <div className="h-80 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center justify-center">
                      <BarChart2 className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                      <p className="ml-3 text-gray-400 dark:text-gray-500">
                        Performance over time chart will appear here
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Achievements
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-center">
                        <Award className="w-8 h-8 mx-auto text-amber-500" />
                        <p className="text-sm font-medium mt-2 dark:text-white">
                          Fast Learner
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Complete 5 quizzes
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-center">
                        <Trophy className="w-8 h-8 mx-auto text-blue-500" />
                        <p className="text-sm font-medium mt-2 dark:text-white">
                          High Scorer
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Score 90%+ on 3 quizzes
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-center">
                        <TrendingUp className="w-8 h-8 mx-auto text-green-500" />
                        <p className="text-sm font-medium mt-2 dark:text-white">
                          Improver
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Improve by 10%+
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-center">
                        <Globe className="w-8 h-8 mx-auto text-purple-500" />
                        <p className="text-sm font-medium mt-2 dark:text-white">
                          Explorer
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          3 different topics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "goals" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Learning Goals
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium dark:text-white">
                              Complete 30 quizzes
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Current: {stats.completed} of 30
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-blue-100 dark:border-blue-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {Math.round((stats.completed / 30) * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(stats.completed / 30) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium dark:text-white">
                              Achieve 85% average score
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Current: {stats.averageScore}%
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-green-100 dark:border-green-900 flex items-center justify-center">
                            <span
                              className={`text-sm font-medium ${
                                stats.averageScore >= 85
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {stats.averageScore >= 85
                                ? "Achieved!"
                                : stats.averageScore + "%"}
                            </span>
                          </div>
                        </div>
                        {stats.averageScore < 85 && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${(stats.averageScore / 85) * 100}%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium dark:text-white">
                              Explore 5 topics
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Current: {stats.topics.length} of 5
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-purple-100 dark:border-purple-900 flex items-center justify-center">
                            <span
                              className={`text-sm font-medium ${
                                stats.topics.length >= 5
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {stats.topics.length >= 5
                                ? "Achieved!"
                                : stats.topics.length + "/5"}
                            </span>
                          </div>
                        </div>
                        {stats.topics.length < 5 && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{
                                width: `${(stats.topics.length / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Create New Goal
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Goal Type
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Complete quizzes</option>
                          <option>Achieve score</option>
                          <option>Explore topics</option>
                          <option>Time spent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Target
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. 10 quizzes, 85% score"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Deadline (optional)
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="date"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
                        Set Goal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
