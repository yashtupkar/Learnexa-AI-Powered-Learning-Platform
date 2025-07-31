// import React, { useState, useEffect, useContext } from "react";
// import {
//   Loader2,
//   CheckCircle,
//   Clock,
//   FileText,
//   RotateCw,
//   AlertCircle,
//   ChevronRight,
//   Plus,
//   Folder,
//   File,
//   Globe,
//   Code,
//   Landmark,
//   FlaskConical,
//   MoreVertical,
//   Star,
//   Search,
//   BarChart2,
//   Trophy,
//   TrendingUp,
//   Users,
//   Bookmark,
//   Calendar,
//   PieChart,
//   Award,
//   Bell,
//   Settings,
//   Play,
//   Sparkle,
//   Sparkles,
//   X,
// } from "lucide-react";
// import Layout from "../components/layouts/layout";
// import waveAnimation from "../assets/waveCartoon.json";
// import Lottie from "lottie-react";
// import { useSelector } from "react-redux";
// import AllQuizes from "../components/AllQuizes";
// import CurrentAffairs from "../components/CurrentAffairsSlider";
// import CurrentAffairsSlider from "../components/CurrentAffairsSlider";
// import FriendsImage from "../assets/referal.png";
// import { useModal } from "../hooks/useModal";
// import { useNavigate } from "react-router-dom";
// import UpgradeBanner from "../components/banners/UpgradeBanner";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import fire from "../assets/Fire.json";
// import AvatarUploadPopup from "../components/modal/AvatarUploadModal";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(true);

//   const [quizzes, setQuizzes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [stats, setStats] = useState(null);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const { openModal, closeModal, MODAL_TYPES } = useModal();
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [showStreakModal, setShowStreakModal] = useState(false);
//   const [showGenerateModal, setShowGenerateModal] = useState(false);
//   const [streakData, setStreakData] = useState(null);

//   const navigate = useNavigate();
//   const { backend_URL } = useContext(AppContext);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const fetchStreakData = async () => {
//     try {
//       const response = await axios.post(
//         `${backend_URL}/api/user/track-activity`,
//         { id: user._id }, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
//       setStreakData(response.data);

//     } catch (error) {
//       console.error("Error fetching streak data:", error);
//     }
//   };

//   useEffect(() => {
//     if (user?._id) {
//       fetchStreakData();
//     }
//   }, [ user?._id]);

//   // Mock data
//   useEffect(() => {
//     const fetchData = () => {
//       setTimeout(() => {
//         // Quiz data
//         setQuizzes([
//           {
//             id: 1,
//             title: "World Capitals",
//             topic: "Geography",
//             status: "completed",
//             questions: 20,
//             date: "2023-10-15",
//             score: 85,
//             favorite: true,
//           },
//           {
//             id: 2,
//             title: "React Fundamentals",
//             topic: "Programming",
//             status: "completed",
//             questions: 15,
//             date: "2023-10-10",
//             score: 92,
//             favorite: false,
//           },
//           {
//             id: 3,
//             title: "Ancient Civilizations",
//             topic: "History",
//             status: "generating",
//             questions: 10,
//             date: "2023-10-18",
//             favorite: true,
//           },
//           {
//             id: 4,
//             title: "Organic Chemistry Basics",
//             topic: "Science",
//             status: "failed",
//             questions: 12,
//             date: "2023-10-17",
//             favorite: false,
//           },
//         ]);

//         // Stats data
//         setStats({
//           totalQuizzes: 24,
//           completed: 18,
//           averageScore: 82,
//           improvement: 12,
//           topics: [
//             { name: "Geography", count: 6 },
//             { name: "History", count: 5 },
//             { name: "Science", count: 4 },
//             { name: "Programming", count: 9 },
//           ],
//         });

//         // Recent activity
//         setRecentActivity([
//           {
//             id: 1,
//             action: "completed",
//             quizTitle: "World Capitals",
//             date: "2023-10-15T14:30:00Z",
//             score: 85,
//           },
//           {
//             id: 2,
//             action: "created",
//             quizTitle: "Ancient Civilizations",
//             date: "2023-10-14T09:15:00Z",
//           },
//           {
//             id: 3,
//             action: "shared",
//             quizTitle: "React Fundamentals",
//             date: "2023-10-12T16:45:00Z",
//             with: "Study Group",
//           },
//           {
//             id: 4,
//             action: "improved",
//             quizTitle: "JavaScript ES6+",
//             date: "2023-10-10T11:20:00Z",
//             improvement: "+15%",
//           },
//         ]);

//         setIsLoading(false);
//       }, 1000);
//     };

//     fetchData();
//   }, []);




//   const renderStreakComponent = () => {
//     if (!streakData || streakData.currentStreak === 0) {
//       return (
//         <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 dark:hover:bg-orange-900/30 cursor-pointer group">
//           <Lottie
//             animationData={fire}
//             loop
//             className="w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110"
//           />

//           <div
//             onClick={handleOpenStreakModal}
//             className="flex flex-col gap-1 sm:gap-2"
//           >
//             <h1 className="text-base sm:text-lg text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
//               Start your streak
//             </h1>
//             <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
//               Take daily quizzes to build your knowledge
//             </p>
//           </div>
//         </div>
//       );
//     }

//     // For streaks greater than 0
//     const streakMessage =
//       streakData.currentStreak >= 20
//         ? "Wow! You're on fire! Keep going!"
//         : streakData.currentStreak >= 10
//         ? "Great job! You're building a strong habit!"
//         : "Keep it up! Don't break your streak!";

//     return (
//       <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 dark:hover:bg-orange-900/30 cursor-pointer group">
//         <div className="relative">
//           <Lottie
//             animationData={fire}
//             loop
//             className="w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110"
//           />
        
//         </div>
//         <div
//           onClick={handleOpenStreakModal}
//           className="flex flex-col gap-1 sm:gap-2"
//         >
//           <h1 className="text-base sm:text-lg text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
//             {streakData.currentStreak}-day streak!
//           </h1>
//           <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
//             {streakMessage}
//           </p>
//         </div>
//       </div>
//     );
//   };


//   const handleOpenInviteModal = () => {
//     openModal(MODAL_TYPES.INVITE, {
//       isOpen: true,
//       onClose: () => setShowInviteModal(false),
//       referralCode: "FRIEND2023",
//     });
//   };
//   const handleOpenStreakModal = () => {
//     openModal(MODAL_TYPES.STREAK, {
//       isOpen: true,
//       onClose: () => setShowStreakModal(false),
//       user: user
//     });
//   };
//   const handleOpenGenerateModal = () => {
 
//     openModal(MODAL_TYPES.GENERATE, {
//       isOpen: true,
//       onClose: () => setShowGenerateModal(false),
      
//     });
//   };



//   return (
//     <Layout>
//       {!user?.avatar && (
//         <AvatarUploadPopup
//           isOpen={isAvatarPopupOpen}
//           onClose={() => setIsAvatarPopupOpen(false)}
//         />
//       )}
//       <div className="min-h-screen p-2 sm:p-3 md:p-6 bg-gray-50 dark:bg-black">
//         <div className="max-w-7xl mx-auto ">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="flex flex-row w-full gap-4 sm:gap-8 items-center mb-4 md:mb-10 animate-fadeIn">
//               <div className="relative group">
//                 <Lottie
//                   animationData={waveAnimation}
//                   loop
//                   className="w-32 h-32 sm:w-48 sm:h-48 md:w-58 md:h-58 transition-all duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute -bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
//                   <span className="text-sm bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
//                     Ready to quiz?
//                   </span>
//                 </div>
//               </div>

//               <div className="text-center sm:text-left pt-4 sm:pt-10">
//                 <h1 className="text-2xl sm:text-3xl md:text-5xl mb-1 sm:mb-4 dark:text-white relative inline-block">
//                   <span className="relative">
//                     <span>Hi,</span> <span>{user?.name}</span>
//                   </span>
//                 </h1>
//                 <p className="dark:text-white text-base sm:text-lg mb-2 sm:mb-4">
//                   Welcome to{" "}
//                   <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
//                     Learnexa
//                   </span>
//                 </p>
//                 <button className="px-4 sm:px-6 py-1 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base">
//                   Let's Get Started
//                 </button>
//               </div>
//             </div>

//             <div className="w-full md:w-2/5 mb-6 h-fit flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4 items-center md:border-l-2 border-gray-200 dark:border-zinc-800 px-2 sm:px-4">
//               {renderStreakComponent()}
//               <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer group">
//                 <img
//                   src={FriendsImage}
//                   alt="Friends"
//                   className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform"
//                 />
//                 <div
//                   onClick={handleOpenInviteModal}
//                   className="flex flex-col gap-1 sm:gap-2"
//                 >
//                   <h1 className="text-base sm:text-lg  text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                     Invite your friends
//                   </h1>
//                   <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 font-light group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
//                     Learning together is double the progress and double the fun!
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Navigation */}
//           <div className="mb-8">
//             <div className="flex space-x-1 overflow-x-auto pb-2">
//               {["overview", "quizzes"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors capitalize ${
//                     activeTab === tab
//                       ? "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-100"
//                       : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {isLoading ? (
//             <div className="grid place-items-center py-20">
//               <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//             </div>
//           ) : (
//             <>
//               {activeTab === "overview" && (
//                 <div className="space-y-6">
//                   {/* Stats Cards */}
//                   <h1 className="text-gray-600 text-xl sm:text-2xl ml-2 dark:text-gray-300">
//                     Quick Links
//                   </h1>
//                   <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
//                     {/* Generate Quiz Card */}
//                     <div
//                       onClick={handleOpenGenerateModal}
//                       className="group cursor-pointer bg-blue-50 dark:bg-blue-900/20 sm:bg-white sm:dark:bg-zinc-900 shadow-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 sm:shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-blue-50 sm:dark:hover:bg-blue-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="flex items-center justify-between relative">
//                         <div>
//                           <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-blue-500 rounded-md sm:rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
//                             <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 sm:group-hover:animate-pulse" />
//                           </div>
//                           <p className="text-base sm:text-xl text-blue-600 dark:text-blue-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-blue-600 sm:dark:group-hover:text-blue-400 transition-colors">
//                             Generate Quiz
//                           </p>
//                           <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
//                             Create AI-powered quizzes
//                           </h3>
//                         </div>
//                         <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
//                         </div>
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-blue-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
//                         Click to generate new quiz
//                         <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           →
//                         </span>
//                       </p>
//                       <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-blue-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
//                     </div>

//                     {/* Current Affairs Card */}
//                     <div
//                       onClick={() => navigate("/current-affairs")}
//                       className="group cursor-pointer bg-green-50 dark:bg-green-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-green-50 sm:dark:hover:bg-green-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="flex items-center justify-between relative">
//                         <div>
//                           <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-green-500 rounded-md sm:rounded-lg  sm:scale-100 sm:rotate-0 sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
//                             <Globe className="w-4 h-4 sm:w-5 sm:h-5  sm:animate-none sm:group-hover:animate-pulse" />
//                           </div>
//                           <p className="text-base sm:text-xl text-green-600 dark:text-green-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-green-600 sm:dark:group-hover:text-green-400 transition-colors">
//                             Current Affairs
//                           </p>
//                           <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
//                             Stay updated with news
//                           </h3>
//                           <span className="hidden sm:inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full mt-1 sm:mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                             Updated daily
//                           </span>
//                         </div>
//                         <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                         </div>
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-green-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
//                         Daily current affairs quiz
//                         <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           →
//                         </span>
//                       </p>
//                       <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-green-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
//                     </div>

//                     {/* StudyTube Card */}
//                     <div
//                       onClick={() => navigate("/study-tube")}
//                       className="group cursor-pointer bg-red-50 dark:bg-red-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-red-50 sm:dark:hover:bg-red-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="flex items-center justify-between relative">
//                         <div>
//                           <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-red-500 rounded-md sm:rounded-lg  sm:scale-100 sm:rotate-0 sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
//                             <Play className="w-4 h-4 sm:w-5 sm:h-5  sm:animate-none sm:group-hover:animate-pulse" />
//                           </div>
//                           <p className="text-base sm:text-xl text-red-600 dark:text-red-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-red-600 sm:dark:group-hover:text-red-400 transition-colors">
//                             StudyTube
//                           </p>
//                           <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
//                             Distraction-free learning
//                           </h3>
//                           <span className="hidden sm:inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full mt-1 sm:mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                             Beta feature
//                           </span>
//                         </div>
//                         <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//                         </div>
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-red-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
//                         Focus mode YouTube
//                         <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           →
//                         </span>
//                       </p>
//                       <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-red-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
//                     </div>

//                     {/* Interview Prep Card */}
//                     <div
//                       onClick={() => navigate("/interview")}
//                       className="group cursor-pointer bg-amber-50 dark:bg-amber-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-amber-50 sm:dark:hover:bg-amber-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="flex items-center justify-between relative">
//                         <div>
//                           <div className="p-2 sm:p-3 w-fit my-1 sm:my-2 text-white bg-amber-500 rounded-md sm:rounded-lg  sm:scale-100 sm:rotate-0 sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
//                             <Users className="w-4 h-4 sm:w-5 sm:h-5  sm:animate-none sm:group-hover:animate-pulse" />
//                           </div>
//                           <p className="text-base sm:text-xl text-amber-600 dark:text-amber-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-amber-600 sm:dark:group-hover:text-amber-400 transition-colors">
//                             Interview Prep
//                           </p>
//                           <h3 className="text-[10px] sm:text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
//                             Practice interviews
//                           </h3>
//                           <span className="hidden sm:inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.6rem] xs:text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full mt-1 sm:mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                             AI powered
//                           </span>
//                         </div>
//                         <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
//                         </div>
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-amber-500 font-medium sm:font-normal mt-2 sm:mt-3 flex items-center sm:group-hover:font-medium">
//                         AI interview simulator
//                         <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
//                           →
//                         </span>
//                       </p>
//                       <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-amber-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
//                     </div>
//                   </div>

//                   <CurrentAffairsSlider />
//                   <UpgradeBanner />
//                   <AllQuizes />
//                   {/* 
//                   Charts and Recent Activity
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//                     <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="font-medium text-gray-900 dark:text-white">
//                           Performance Trend
//                         </h3>
//                         <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
//                           View All
//                         </button>
//                       </div>
//                       <div className="h-64 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center justify-center">
//                         <BarChart2 className="w-12 h-12 text-gray-300 dark:text-gray-600" />
//                         <p className="ml-3 text-gray-400 dark:text-gray-500">
//                           Performance chart will appear here
//                         </p>
//                       </div>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="font-medium text-gray-900 dark:text-white">
//                           Recent Activity
//                         </h3>
//                         <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
//                           View All
//                         </button>
//                       </div>
//                       <div className="space-y-4">
//                         {recentActivity.map((activity) => (
//                           <div
//                             key={activity.id}
//                             className="flex items-start gap-3"
//                           >
//                             <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
//                               {activity.action === "completed" && (
//                                 <CheckCircle className="w-4 h-4 text-green-500" />
//                               )}
//                               {activity.action === "created" && (
//                                 <Plus className="w-4 h-4 text-blue-500" />
//                               )}
//                               {activity.action === "shared" && (
//                                 <Users className="w-4 h-4 text-purple-500" />
//                               )}
//                               {activity.action === "improved" && (
//                                 <TrendingUp className="w-4 h-4 text-amber-500" />
//                               )}
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-900 dark:text-white">
//                                 {activity.action === "completed" &&
//                                   `Completed "${activity.quizTitle}"`}
//                                 {activity.action === "created" &&
//                                   `Created "${activity.quizTitle}"`}
//                                 {activity.action === "shared" &&
//                                   `Shared "${activity.quizTitle}" with ${activity.with}`}
//                                 {activity.action === "improved" &&
//                                   `Improved score on "${activity.quizTitle}" by ${activity.improvement}`}
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                                 {formatDateTime(activity.date)}
//                                 {activity.score &&
//                                   ` • Score: ${activity.score}%`}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div> */}

//                   {/* Recent Quizzes */}
//                   {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-medium text-gray-900 dark:text-white">
//                         Recent Quizzes
//                       </h3>
//                       <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
//                         View All
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {filteredQuizzes.slice(0, 4).map((quiz) => (
//                         <div
//                           key={quiz.id}
//                           className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex items-center gap-3">
//                               <div
//                                 className={`p-2 rounded-lg ${getStatusColor(
//                                   quiz.status
//                                 )}`}
//                               >
//                                 {getTopicIcon(quiz.topic)}
//                               </div>
//                               <div>
//                                 <h4 className="font-medium text-gray-900 dark:text-white">
//                                   {quiz.title}
//                                 </h4>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                                   {quiz.topic} • {formatDate(quiz.date)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               onClick={() => toggleFavorite(quiz.id)}
//                               className="text-gray-400 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400"
//                             >
//                               <Star
//                                 className={`w-5 h-5 ${
//                                   quiz.favorite
//                                     ? "fill-yellow-400 text-yellow-400"
//                                     : ""
//                                 }`}
//                               />
//                             </button>
//                           </div>
//                           <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
//                             <span
//                               className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
//                                 quiz.status
//                               )}`}
//                             >
//                               {getStatusText(quiz.status)}
//                             </span>
//                             {quiz.status === "completed" && (
//                               <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
//                                 {quiz.score}% Score
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div> */}
//                 </div>
//               )}

//               {activeTab === "quizzes" && (
//                 <>
//                   <AllQuizes />
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
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
  BookOpen,
  Lightbulb,
  Notebook,
  Target,
  ClipboardList,
  Shield,
  BadgeCheck,
  Clock4,
  Clock3,
  Clock1,
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
import AvatarUploadPopup from "../components/modal/AvatarUploadModal";
import StudyTimerModal from "../components/modal/StudytimerModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const { openModal, closeModal, MODAL_TYPES } = useModal();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [streakData, setStreakData] = useState(null);
  const [studyTime, setStudyTime] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [activeGoals, setActiveGoals] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);

  const navigate = useNavigate();
  const { backend_URL } = useContext(AppContext);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Mock daily challenge data
  useEffect(() => {
    setDailyChallenge({
      id: "dc001",
      title: "History Master Challenge",
      description: "Complete 3 history quizzes with 80%+ score",
      reward: 50,
      progress: 1,
      target: 3,
      expiresIn: "12:34:56",
    });
  }, []);

  // Mock study goals data
  useEffect(() => {
    setActiveGoals([
      {
        id: 1,
        title: "Complete 10 quizzes",
        progress: 6,
        target: 10,
        deadline: "2023-11-30",
        reward: 100,
      },
      {
        id: 2,
        title: "Study 5 hours this week",
        progress: 2.5,
        target: 5,
        deadline: "2023-11-05",
        reward: 50,
      },
    ]);
  }, []);

  const fetchStreakData = async () => {
    try {
      const response = await axios.post(
        `${backend_URL}/api/user/track-activity`,
        { id: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
  }, [user?._id]);

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
            className="w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110 "
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
            className="w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-16"
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
      user: user,
    });
  };

  const handleOpenGenerateModal = () => {
    openModal(MODAL_TYPES.GENERATE, {
      isOpen: true,
      onClose: () => setShowGenerateModal(false),
    });
  };

  const startStudyTimer = () => {
    setShowTimer(true);

    // In a real app, you would start an actual timer here
  };

  const handleCompleteChallenge = (challengeId) => {
    // In a real app, this would call an API to mark challenge as complete
    toast.success("Challenge completed! Points added to your account.");
    setDailyChallenge(null);
  };

  

  return (
    <Layout>
      {!user?.avatar && (
        <AvatarUploadPopup
          isOpen={isAvatarPopupOpen}
          onClose={() => setIsAvatarPopupOpen(false)}
        />
      )}
     
      <div className="min-h-screen p-2 sm:p-3 md:p-6 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-row w-full gap-4 sm:gap-8 items-center mb-4 md:mb-10 animate-fadeIn">
              <div className="relative group">
                <Lottie
                  animationData={waveAnimation}
                  loop
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-58 md:h-58 transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute -bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm bg-blue-100  rounded-full px-3 py-1">
                    Ready to quiz?
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-left pt-4 sm:pt-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl mb-1 sm:mb-4 dark:text-white relative inline-block">
                  <span className="relative">
                    <span>Hi,</span> <span>{user?.name}</span>
                    {user?.isPremium && (
                      <span className="ml-2 text-xs sm:text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full">
                        PREMIUM
                      </span>
                    )}
                  </span>
                </h1>
                <p className="dark:text-white text-base sm:text-lg mb-2 sm:mb-4">
                  Welcome to{" "}
                  <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Learnexa
                  </span>
                </p>
                <div className="flex gap-2">
                  <button className="px-4 sm:px-6 py-1 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base">
                    Let's Get Started
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 mb-6 h-fit flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4 items-center md:border-l-2 border-gray-200 dark:border-zinc-800 px-2 sm:px-4">
              {renderStreakComponent()}
              <div className="flex items-center gap-4 w-full sm:w-1/2 md:w-full rounded-xl p-3 sm:p-4 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer group">
                <div className="w-12 h-12 relative sm:w-24 sm:h-16  flex items-center justify-center ">
                  <img
                    src={FriendsImage}
                    alt="Friends"
                    className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform"
                  />
                  <span className="absolute -top-2 -right-2 bg-blue-500 hidden group-hover:flex text-white text-xs font-bold rounded-full w-6 h-6 items-center justify-center">
                    <Plus size={16} className="font-bold" />
                  </span>
                </div>

                <div
                  onClick={handleOpenInviteModal}
                  className="flex flex-col gap-1 sm:gap-2"
                >
                  <h1 className="text-base sm:text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              {["overview", "quizzes", "goals", "progress"].map((tab) => (
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    {/* Generate Quiz Card */}
                    <div
                      onClick={handleOpenGenerateModal}
                      className="group cursor-pointer bg-blue-50 dark:bg-blue-900/20 sm:bg-white sm:dark:bg-zinc-900 shadow-sm rounded-xl p-4 sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-blue-50 sm:dark:hover:bg-blue-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between relative">
                        <div>
                          <div className="p-2.5 w-fit mb-2 text-white bg-blue-500 rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Sparkles className="w-4 h-4 sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base font-medium text-blue-600 dark:text-blue-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-blue-600 sm:dark:group-hover:text-blue-400 transition-colors">
                            Generate Quiz
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            AI-powered quizzes
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 mt-1.5 text-blue-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-blue-500 mt-3 flex items-center font-medium">
                        Click to generate
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>

                    {/* Current Affairs Card */}
                    <div
                      onClick={() => navigate("/current-affairs")}
                      className="group cursor-pointer bg-green-50 dark:bg-green-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-xl p-4 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-green-50 sm:dark:hover:bg-green-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between relative">
                        <div>
                          <div className="p-2.5 w-fit mb-2 text-white bg-green-500 rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Globe className="w-4 h-4 sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base font-medium text-green-600 dark:text-green-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-green-600 sm:dark:group-hover:text-green-400 transition-colors">
                            Current Affairs
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Daily news updates
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 mt-1.5 text-green-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-green-500 mt-3 flex items-center font-medium">
                        Daily quiz
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>

                    {/* StudyTube Card */}
                    <div
                      onClick={() => navigate("/study-tube")}
                      className="group cursor-pointer bg-red-50 dark:bg-red-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-xl p-4 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-red-50 sm:dark:hover:bg-red-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between relative">
                        <div>
                          <div className="p-2.5 w-fit mb-2 text-white bg-red-500 rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Play className="w-4 h-4 sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base font-medium text-red-600 dark:text-red-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-red-600 sm:dark:group-hover:text-red-400 transition-colors">
                            StudyTube
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Focused learning
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 mt-1.5 text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-red-500 mt-3 flex items-center font-medium">
                        YouTube focus
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>

                    {/* Interview Prep Card */}
                    <div
                      onClick={() => navigate("/interview")}
                      className="group cursor-pointer bg-amber-50 dark:bg-amber-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-xl p-4 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-amber-50 sm:dark:hover:bg-amber-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between relative">
                        <div>
                          <div className="p-2.5 w-fit mb-2 text-white bg-amber-500 rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <Users className="w-4 h-4 sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base font-medium text-amber-600 dark:text-amber-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-amber-600 sm:dark:group-hover:text-amber-400 transition-colors">
                            Interview Prep
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            AI simulations
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 mt-1.5 text-amber-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-amber-500 mt-3 flex items-center font-medium">
                        Practice interviews
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>

                    {/* Practice Arena Card */}
                    <div
                      onClick={() => navigate("/practice-arena")}
                      className="group cursor-pointer bg-purple-50 dark:bg-purple-900/20 sm:bg-white sm:dark:bg-zinc-900 rounded-xl p-4 shadow-sm sm:hover:shadow-md sm:hover:-translate-y-1 sm:hover:bg-purple-50 sm:dark:hover:bg-purple-900/20 relative overflow-hidden border border-gray-100 dark:border-zinc-800 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between relative">
                        <div>
                          <div className="p-2.5 w-fit mb-2 text-white bg-purple-500 rounded-lg sm:group-hover:scale-110 sm:group-hover:rotate-3 transition-transform">
                            <BookOpen className="w-4 h-4 sm:group-hover:animate-pulse" />
                          </div>
                          <p className="text-base font-medium text-purple-600 dark:text-purple-400 sm:text-gray-700 sm:dark:text-gray-200 sm:group-hover:text-purple-600 sm:dark:group-hover:text-purple-400 transition-colors">
                            Practice Arena
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Top questions
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 mt-1.5 text-purple-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-purple-500 mt-3 flex items-center font-medium">
                        MCQs practice
                        <span className="ml-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </p>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-100 sm:scale-x-0 sm:group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>
                  </div>

                

                 

                  <CurrentAffairsSlider />
                  <UpgradeBanner />
                  <AllQuizes />
                </div>
              )}

              {activeTab === "quizzes" && (
                <>
                  <AllQuizes />
                </>
              )}

              {activeTab === "goals" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg sm:text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      Set Your Study Goals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                          </div>
                          <h3 className="font-medium dark:text-white">
                            Quizzes Completed
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Set a target for number of quizzes to complete
                        </p>
                        <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                          Set Goal →
                        </button>
                      </div>

                      <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Clock4 className="w-5 h-5 text-green-500" />
                          </div>
                          <h3 className="font-medium dark:text-white">
                            Study Time
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Set weekly study time targets
                        </p>
                        <button className="text-sm text-green-500 hover:text-green-600 dark:hover:text-green-400">
                          Set Goal →
                        </button>
                      </div>

                      <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Award className="w-5 h-5 text-purple-500" />
                          </div>
                          <h3 className="font-medium dark:text-white">
                            Score Improvement
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Improve your average quiz score
                        </p>
                        <button className="text-sm text-purple-500 hover:text-purple-600 dark:hover:text-purple-400">
                          Set Goal →
                        </button>
                      </div>

                      <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <ClipboardList className="w-5 h-5 text-amber-500" />
                          </div>
                          <h3 className="font-medium dark:text-white">
                            Topics Mastered
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Master specific topics by target date
                        </p>
                        <button className="text-sm text-amber-500 hover:text-amber-600 dark:hover:text-amber-400">
                          Set Goal →
                        </button>
                      </div>

                      <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:border-red-500 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Shield className="w-5 h-5 text-red-500" />
                          </div>
                          <h3 className="font-medium dark:text-white">
                            Streak Challenge
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Maintain a daily study streak
                        </p>
                        <button className="text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400">
                          Set Goal →
                        </button>
                      </div>

                      <div className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <BadgeCheck className="w-5 h-5 text-emerald-500" />
                          </div>
                          <h3 className="font-medium dark:text-white">
                            Certification Prep
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Prepare for specific certification exams
                        </p>
                        <button className="text-sm text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                          Set Goal →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg sm:text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                      <Notebook className="w-5 h-5 text-green-500" />
                      Active Goals
                    </h2>
                    <div className="space-y-4">
                      {/* {activeGoals.length > 0 ? (
                        activeGoals.map((goal) => (
                          <StudyGoalWidget
                            key={goal.id}
                            title={goal.title}
                            progress={goal.progress}
                            target={goal.target}
                            deadline={goal.deadline}
                            reward={goal.reward}
                            showActions={true}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Lightbulb className="w-12 h-12 mx-auto text-gray-300 dark:text-zinc-700 mb-3" />
                          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                            No active goals yet
                          </h3>
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            Set your first goal to stay motivated and track
                            progress
                          </p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "progress" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        Study Statistics
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Total Study Time
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {Math.floor(studyTime / 60)}h {studyTime % 60}m
                            </span>
                          </div>
                          {/* <ProgressBar
                            progress={studyTime}
                            target={1000}
                            color="bg-blue-500"
                            showPercentage={false}
                          /> */}
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Quizzes Completed
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {stats?.completed || 0}/{stats?.totalQuizzes || 0}
                            </span>
                          </div>
                          {/* <ProgressBar
                            progress={stats?.completed || 0}
                            target={stats?.totalQuizzes || 1}
                            color="bg-green-500"
                          /> */}
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Average Score
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {stats?.averageScore || 0}%
                            </span>
                          </div>
                          {/* <ProgressBar
                            progress={stats?.averageScore || 0}
                            target={100}
                            color="bg-purple-500"
                          /> */}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-amber-500" />
                        Topic Distribution
                      </h2>
                      <div className="h-64 flex items-center justify-center">
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                          {/* This would be a pie chart in a real app */}
                          <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-green-500 transform rotate-90"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-purple-500 transform rotate-180"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-amber-500 transform rotate-270"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-2xl font-bold dark:text-white">
                                {stats?.topics?.length || 0}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Topics
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {stats?.topics?.map((topic, index) => (
                          <div key={index} className="flex items-center">
                            <span
                              className={`w-3 h-3 rounded-full mr-2 ${
                                index === 0
                                  ? "bg-blue-500"
                                  : index === 1
                                  ? "bg-green-500"
                                  : index === 2
                                  ? "bg-purple-500"
                                  : "bg-amber-500"
                              }`}
                            ></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {topic.name}
                            </span>
                            <span className="ml-auto text-sm font-medium text-gray-900 dark:text-white">
                              {topic.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-red-500" />
                      Study Activity
                    </h2>
                    <div className="h-64 bg-gray-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart2 className="w-12 h-12 mx-auto text-gray-300 dark:text-zinc-700" />
                        <p className="mt-2 text-gray-400 dark:text-gray-500">
                          Weekly study activity chart will appear here
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Achievements
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {/* Achievement Badges */}
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                          <Trophy className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-sm font-medium dark:text-white">
                          Quiz Novice
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Complete 5 quizzes
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                          <Clock className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-sm font-medium dark:text-white">
                          Time Keeper
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Study 10 hours
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                          <Star className="w-8 h-8 text-purple-500 fill-purple-500" />
                        </div>
                        <p className="text-sm font-medium dark:text-white">
                          High Scorer
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Score 90%+
                        </p>
                      </div>
                      <div className="text-center opacity-40">
                        <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-2">
                          <Sparkles className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium dark:text-white">
                          Streak Master
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          7-day streak
                        </p>
                      </div>
                      <div className="text-center opacity-40">
                        <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-2">
                          <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium dark:text-white">
                          Book Worm
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Read 10 articles
                        </p>
                      </div>
                      <div className="text-center opacity-40">
                        <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-2">
                          <Globe className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium dark:text-white">
                          Worldly Wise
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Master Geography
                        </p>
                      </div>
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