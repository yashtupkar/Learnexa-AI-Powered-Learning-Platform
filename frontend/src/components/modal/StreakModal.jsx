
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Lottie from "lottie-react";
import fire from "../../assets/Fire.json";

const StreakModal = ({ isOpen, onClose }) => {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    streakFreezes: 1,
    activeDates: [],
    streakHistory: [],
  });

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);

  const fetchStreakData = async () => {
    try {
      const response = await axios.post(
        `${backend_URL}/api/user/track-activity`,
        { id: user._id },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setStreakData({
        currentStreak: response.data.currentStreak || 0,
        longestStreak: response.data.longestStreak || 0,
        streakFreezes: 0, // You might want to get this from the backend too
        activeDates: response.data.activeDates || [],
        streakHistory: response.data.streakHistory || [],
      });
    } catch (error) {
      console.error("Error fetching streak data:", error);
    }
  };

  useEffect(() => {
    if (isOpen && user?._id) {
      fetchStreakData();
    }
  }, [isOpen, user?._id]);

  if (!isOpen) return null;

  // Check if today is active
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];
  const isTodayActive = streakData.activeDates.some(
    (date) => new Date(date).toISOString().split("T")[0] === todayFormatted
  );

  // Get week streak data (last 7 days including today)
  const getWeekStreak = () => {
    const weekStreak = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateFormatted = date.toISOString().split("T")[0];
      const isActive = streakData.activeDates.some(
        (activeDate) =>
          new Date(activeDate).toISOString().split("T")[0] === dateFormatted
      );
      
      weekStreak.push(isActive);
    }
    return weekStreak;
  };

  const weekStreak = getWeekStreak();

 
 const FlameIcon = ({ active, size = "default", isToday = false }) => {
   const sizes = {
     default: {
       width: "20",
       height: "21",
       className: "w-8 h-8 sm:w-10 sm:h-10",
     },
     large: {
       width: "48",
       height: "49",
       className: "w-16 h-16 sm:w-20 sm:h-20",
     },
   };
   const { width, height, className } = sizes[size];

   // If it's today and not active, show simple gray flame
   if (isToday && !active) {
     return (
       <svg
         className={`${className} mx-auto text-gray-300 dark:text-gray-600`}
         width={width}
         height={height}
         viewBox={`0 0 ${width} ${height}`}
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
           fill="#F1F5F9"
         />
         <path
           fillRule="evenodd"
           clipRule="evenodd"
           d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
           fill="#CBD5E1"
         />
         <path
           d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
           stroke="#94A3B8"
           strokeWidth="0.585938"
           strokeLinejoin="round"
         />
       </svg>
     );
   }

   // Otherwise show the regular active/inactive flames
   return (
     <>
       {!active ? (
         <svg
           className="w-8 h-8 mx-auto mb-1"
           width="21"
           height="21"
           viewBox="0 0 21 21"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M16.1809 6.41016C14.0715 9.125 9.95044 6.41016 12.3723 1.21484C5.48169 2.71484 3.49862 9.33984 3.36841 12.4648C2.58716 12.4336 1.94914 11.5664 1.72778 11.1367C1.72778 14.4766 3.4856 20.5312 10.3606 20.5312C17.1379 20.5312 18.6614 14.9258 18.7981 12.0547C18.345 12.6484 17.6067 13.1094 16.7668 13.2266C18.4465 10.6094 17.1184 7.64062 16.1809 6.41016Z"
             fill="#F1F5F9"
           ></path>
           <path
             fillRule="evenodd"
             clipRule="evenodd"
             d="M10.3606 20.5312C11.516 20.5312 12.5188 20.3683 13.3879 20.0838C7.60669 18.4804 1.95498 8.05133 12.3723 1.2148C12.348 1.26694 12.3953 1.16317 12.3723 1.2148C5.48169 2.7148 3.49862 9.33981 3.36841 12.4648C2.58716 12.4336 1.94914 11.5664 1.72778 11.1367C1.72778 14.4765 3.4856 20.5312 10.3606 20.5312Z"
             fill="#CBD5E1"
           ></path>
           <path
             d="M5.22682 6.41016C6.5908 4.10566 8.83486 1.9849 12.3723 1.21484C9.95044 6.41016 14.0715 9.125 16.1809 6.41016C17.1184 7.64062 18.4465 10.6094 16.7668 13.2266C17.6067 13.1094 18.345 12.6484 18.7981 12.0547C18.7231 13.6289 18.2313 16.025 16.6852 17.8686M5.22682 6.41016L16.6852 17.8686M5.22682 6.41016C4.94391 6.88816 4.69885 7.37407 4.48798 7.85746M16.6852 17.8686C16.3618 18.2542 15.9923 18.6156 15.5708 18.9403M15.5708 18.9403C14.3322 19.8945 12.6448 20.5312 10.3606 20.5312C3.4856 20.5312 1.72778 14.4766 1.72778 11.1367C1.94914 11.5664 2.58716 12.4336 3.36841 12.4648C3.41791 11.2769 3.73516 9.58317 4.48798 7.85746M15.5708 18.9403L4.48798 7.85746"
             stroke="#94A3B8"
             strokeWidth="0.585938"
             strokeLinejoin="round"
           ></path>
           <path
             d="M16.7866 18.2813L4.88213 6.41699C4.59922 6.89499 4.57855 6.9228 4.36768 7.40619L15.9835 18.999C16.4049 18.6743 16.4632 18.6669 16.7866 18.2813Z"
             fill="white"
           ></path>
         </svg>
       ) : (
         <svg
           className={`${className} mx-auto ${
             active ? "text-primary-500" : "text-gray-300 dark:text-gray-600"
           }`}
           width={width}
           height={height}
           viewBox={`0 0 ${width} ${height}`}
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           {/* Main flame body with gradient */}
           <path
             d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
             fill={active ? "url(#flameGradient)" : "#F1F5F9"}
           />

           {/* Inner flame with more intense colors */}
           <path
             fillRule="evenodd"
             clipRule="evenodd"
             d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
             fill={active ? "url(#innerFlame)" : "#CBD5E1"}
           />

           {/* Flame outline */}
           <path
             d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
             stroke={active ? "#FF8C00" : "#94A3B8"}
             strokeWidth="0.585938"
             strokeLinejoin="round"
           />

           {active && (
             <defs>
               {/* Gradient for main flame */}
               <linearGradient
                 id="flameGradient"
                 x1="10"
                 y1="1"
                 x2="10"
                 y2="20"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop stopColor="#FF4500" />
                 <stop offset="0.5" stopColor="#FF8C00" />
                 <stop offset="1" stopColor="#FFD700" />
               </linearGradient>

               {/* Gradient for inner flame */}
               <linearGradient
                 id="innerFlame"
                 x1="10"
                 y1="1"
                 x2="10"
                 y2="20"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop stopColor="#FF0000" />
                 <stop offset="0.7" stopColor="#FF4500" />
                 <stop offset="1" stopColor="#FF8C00" />
               </linearGradient>
             </defs>
           )}
         </svg>
       )}
     </>
   );
 };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            delay: 0.1,
          }}
          className="relative bg-white dark:bg-gradient-to-l dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden w-full max-w-xl"
        >
          <div className="relative p-4 sm:p-6">
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 sm:top-5 sm:right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center ">
              <div className="relative">
                <Lottie
                  animationData={fire}
                  loop
                  className="w-20 h-22 sm:w-26 sm:h-28 md:w-48 md:h-30 transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                Your Streak
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {isTodayActive
                  ? "Great job today! Keep it up!"
                  : "Complete a lesson today to keep your streak!"}
              </p>
            </div>

            <div className="mb-4 sm:mb-6 mx-2 sm:mx-6">
              <div className="flex justify-between mb-3">
                {(() => {
                  const days = [];
                  for (let i = 0; i < 7; i++) {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    days.push({
                      day: ["S", "M", "T", "W", "T", "F", "S"][date.getDay()],
                      fullDate: date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }),
                      isActive: weekStreak[i],
                    });
                  }
                  return days.map((dayInfo, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative group"
                    >
                      <div className="absolute bottom-full mb-2 hidden group-hover:block">
                        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          {dayInfo.fullDate}
                          {dayInfo.isActive
                            ? "✅"
                            : dayInfo.isToday
                            ? "Today"
                            : "❌"}
                        </div>
                        <div className="w-2 h-2 bg-gray-800 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mt-1 flex items-center justify-center">
                        <FlameIcon
                          active={dayInfo.isActive}
                          isToday={index === 6} // Today is the last item in the array
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {dayInfo.day}
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div className="mb-4 sm:mb-6 grid grid-cols-2 items-center sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <FlameIcon active={streakData.currentStreak > 0} />
                <span className="text-sm sm:text-md text-gray-500 dark:text-gray-300">
                  Current streak
                </span>
                <span className="text-xl sm:text-2xl dark:text-white font-medium">
                  {streakData.currentStreak} day
                  {streakData.currentStreak !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <FlameIcon active={streakData.longestStreak > 0} />
                <span className="text-sm sm:text-md text-gray-500 dark:text-gray-300">
                  Longest streak
                </span>
                <span className="text-xl sm:text-2xl dark:text-white font-medium">
                  {streakData.longestStreak} day
                  {streakData.longestStreak !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="sm:flex hidden flex-col items-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    fill="#A0E9FF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
                    fill="#70D4FF"
                  />
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    stroke="#4682B4"
                    strokeWidth="0.585938"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm sm:text-md text-gray-500 dark:text-gray-300">
                  Streak freezes
                </span>
                <span className="text-xl sm:text-2xl dark:text-white font-medium">
                  {streakData.streakFreezes}
                </span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  navigate("/streak");
                }}
                className="w-full cursor-pointer py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                <span>View Leaderboard</span>
              </motion.button>
            </div>

            <div className="mt-4 sm:mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>Complete a lesson or quiz each day to maintain your streak!</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StreakModal;