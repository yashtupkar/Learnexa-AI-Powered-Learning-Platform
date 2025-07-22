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
  X,
} from "lucide-react";
import Layout from "../components/layouts/layout";
import waveAnimation from "../assets/waveCartoon.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import AllQuizes from "../components/AllQuizes";
import CurrentAffairs from "../components/CurrentAffairsSlider";
import CurrentAffairsSlider from "../components/CurrentAffairsSlider";
import FriendsImage from "../assets/referal.png";
import { useModal } from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import UpgradeBanner from "../components/banners/UpgradeBanner";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import fire from "../assets/Fire.json";

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
  const [streakData, setStreakData] = useState(null);

  const navigate = useNavigate();
  const { backend_URL } = useContext(AppContext);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const fetchStreakData = async () => {
    try {
      const response = await axios.post(
        `${backend_URL}/api/user/track-activity`,
        { id: user._id }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setStreakData(response.data);

    } catch (error) {
      console.error("Error fetching streak data:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchStreakData();
    }
  }, [ user?._id]);

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




  const renderStreakComponent = () => {
    if (!streakData || streakData.currentStreak === 0) {
      return (
        <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 dark:hover:bg-orange-900/30 cursor-pointer group">
          <Lottie
            animationData={fire}
            loop
            className="w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110"
          />

          <div
            onClick={handleOpenStreakModal}
            className="flex flex-col gap-1 sm:gap-2"
          >
            <h1 className="text-base sm:text-lg text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              Start your streak
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
              Take daily quizzes to build your knowledge
            </p>
          </div>
        </div>
      );
    }

    // For streaks greater than 0
    const streakMessage =
      streakData.currentStreak >= 20
        ? "Wow! You're on fire! Keep going!"
        : streakData.currentStreak >= 10
        ? "Great job! You're building a strong habit!"
        : "Keep it up! Don't break your streak!";

    return (
      <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 dark:hover:bg-orange-900/30 cursor-pointer group">
        <div className="relative">
          <Lottie
            animationData={fire}
            loop
            className="w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110"
          />
        
        </div>
        <div
          onClick={handleOpenStreakModal}
          className="flex flex-col gap-1 sm:gap-2"
        >
          <h1 className="text-base sm:text-lg text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {streakData.currentStreak}-day streak!
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
            {streakMessage}
          </p>
        </div>
      </div>
    );
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
      user: user
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
      <div className="min-h-screen p-2 sm:p-3 md:p-6 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-row w-full gap-4 sm:gap-8 items-center mb-4 md:mb-10 animate-fadeIn">
              <div className="relative group">
                <Lottie
                  animationData={waveAnimation}
                  loop
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-58 md:h-58 transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute -bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
                    Ready to quiz?
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-left pt-4 sm:pt-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl mb-1 sm:mb-4 dark:text-white relative inline-block">
                  <span className="relative">
                    <span>Hi,</span> <span>{user?.name}</span>
                  </span>
                </h1>
                <p className="dark:text-white text-base sm:text-lg mb-2 sm:mb-4">
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

            <div className="w-full md:w-2/5 mb-6 h-fit flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4 items-center md:border-l-2 border-gray-200 dark:border-zinc-800 px-2 sm:px-4">
              {renderStreakComponent()}
              <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer group">
                <img
                  src={FriendsImage}
                  alt="Friends"
                  className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform"
                />
                <div
                  onClick={handleOpenInviteModal}
                  className="flex flex-col gap-1 sm:gap-2"
                >
                  <h1 className="text-base sm:text-lg  text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              {["overview", "quizzes"].map((tab) => (
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
                      className="group cursor-pointer bg-blue-50 dark:bg-blue-900/20 sm:bg-white sm:dark:bg-zinc-900 shadow-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 sm:shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-blue-50 sm:dark:hover:bg-blue-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-blue-500 rounded-md sm:rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base sm:text-xl text-blue-600 dark:text-blue-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-blue-600 sm:dark:group-hover:text-blue-400 transition-colors">
                            Generate Quiz
                          </p>
                          <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Create AI-powered quizzes
                          </h3>
                        </div>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-blue-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
                        Click to generate new quiz
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-blue-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>

                    {/* Current Affairs Card */}
                    <div
                      onClick={() => navigate("/current-affairs")}
                      className="group cursor-pointer bg-green-50 dark:bg-green-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-green-50 sm:dark:hover:bg-green-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-green-500 rounded-md sm:rounded-lg  sm:scale-100 sm:rotate-0 sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5  sm:animate-none sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base sm:text-xl text-green-600 dark:text-green-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-green-600 sm:dark:group-hover:text-green-400 transition-colors">
                            Current Affairs
                          </p>
                          <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Stay updated with news
                          </h3>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full mt-1 sm:mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            Updated daily
                          </span>
                        </div>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-green-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
                        Daily current affairs quiz
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-green-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>

                    {/* StudyTube Card */}
                    <div
                      onClick={() => navigate("/study-tube")}
                      className="group cursor-pointer bg-red-50 dark:bg-red-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-red-50 sm:dark:hover:bg-red-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-red-500 rounded-md sm:rounded-lg  sm:scale-100 sm:rotate-0 sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5  sm:animate-none sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base sm:text-xl text-red-600 dark:text-red-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-red-600 sm:dark:group-hover:text-red-400 transition-colors">
                            StudyTube
                          </p>
                          <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Distraction-free learning
                          </h3>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full mt-1 sm:mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            Beta feature
                          </span>
                        </div>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
                        Focus mode YouTube
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-red-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>

                    {/* Interview Prep Card */}
                    <div
                      onClick={() => navigate("/interview")}
                      className="group cursor-pointer bg-amber-50 dark:bg-amber-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-amber-50 sm:dark:hover:bg-amber-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-amber-500 rounded-md sm:rounded-lg  sm:scale-100 sm:rotate-0 sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5  sm:animate-none sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base sm:text-xl text-amber-600 dark:text-amber-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-amber-600 sm:dark:group-hover:text-amber-400 transition-colors">
                            Interview Prep
                          </p>
                          <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
                            Practice interviews
                          </h3>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full mt-1 sm:mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            AI powered
                          </span>
                        </div>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-amber-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
                        AI interview simulator
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-amber-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </div>
                  </div>

                  <CurrentAffairsSlider />
                  <UpgradeBanner />
                  <AllQuizes />
                  {/* 
                  Charts and Recent Activity
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
                  </div> */}

                  {/* Recent Quizzes */}
                  {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
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
                  </div> */}
                </div>
              )}

              {activeTab === "quizzes" && (
                <>
                  <AllQuizes />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
