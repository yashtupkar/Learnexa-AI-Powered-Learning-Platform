import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StreakModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  // Sample streak data
  const streakData = {
    currentStreak: 0,
    longestStreak: 0,
    streakFreezes: 1,
    weekStreak: [false, false, false, false, false, false, false], // M-Sun
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
          className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden w-full max-w-xl"
        >
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-5 right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-4">
              <div className="relative">
                <svg
                  class="w-20 h-20 mx-auto mb-2 text-primary-500"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    fill="#FD6050"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
                    fill="#BC3C85"
                  ></path>
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    stroke="#07296F"
                    stroke-width="0.585938"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Streak
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep learning daily to build your streak!
              </p>
            </div>

            <div className="mb-6 mx-6">
              <div className="flex justify-between mb-3">
                {(() => {
                  const today = new Date();
                  const days = [];
                  for (let i = 0; i < 7; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - today.getDay() + i);
                    days.push({
                      day: ["S", "M", "T", "W", "T", "F", "S"][date.getDay()],
                      fullDate: date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }),
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
                        </div>
                        <div className="w-2 h-2 bg-gray-800 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full mt-1 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 mx-auto mb-1"
                          width="48"
                          height="49"
                          viewBox="0 0 48 49"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M38.4375 13.9844C33.375 20.5 23.4844 13.9844 29.2969 1.51562C12.7594 5.11563 8 21.0156 7.6875 28.5156C5.8125 28.4406 4.28125 26.3594 3.75 25.3281C3.75 33.3438 7.96875 47.875 24.4688 47.875C40.7344 47.875 44.3906 34.4219 44.7188 27.5312C43.6312 28.9562 41.8594 30.0625 39.8438 30.3438C43.875 24.0625 40.6875 16.9375 38.4375 13.9844Z"
                            fill="#F1F5F9"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.4688 47.875C27.2418 47.875 29.6483 47.484 31.7344 46.8011C17.8594 42.9531 4.29527 17.9233 29.2969 1.51563C29.2385 1.64076 29.3521 1.3917 29.2969 1.51563C12.7594 5.11563 8 21.0156 7.6875 28.5156C5.8125 28.4406 4.28125 26.3594 3.75 25.3281C3.75 33.3438 7.96875 47.875 24.4688 47.875Z"
                            fill="#CBD5E1"
                          ></path>
                          <path
                            d="M38.4375 13.9844C33.375 20.5 23.4844 13.9844 29.2969 1.51562C12.7594 5.11563 8 21.0156 7.6875 28.5156C5.8125 28.4406 4.28125 26.3594 3.75 25.3281C3.75 33.3438 7.96875 47.875 24.4688 47.875C40.7344 47.875 44.3906 34.4219 44.7188 27.5312C43.6312 28.9562 41.8594 30.0625 39.8438 30.3438C43.875 24.0625 40.6875 16.9375 38.4375 13.9844Z"
                            stroke="#94A3B8"
                            strokeWidth="1.40625"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {dayInfo.day}
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <svg
                  class="w-10 h-10 mx-auto mb-2 text-primary-500"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    fill="#FD6050"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
                    fill="#BC3C85"
                  ></path>
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    stroke="#07296F"
                    stroke-width="0.585938"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span className="text-md text-gray-500 dark:text-gray-300">
                  Current streak
                </span>
                <span className="text-2xl dark:text-white font-medium">
                  {streakData.currentStreak} days
                </span>
              </div>

              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <svg
                  class="w-10 h-10 mx-auto mb-2 text-primary-500"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    fill="#FD6050"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
                    fill="#BC3C85"
                  ></path>
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    stroke="#07296F"
                    stroke-width="0.585938"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span className="text-md text-gray-500 dark:text-gray-300">
                  Longest streak
                </span>
                <span className="text-2xl dark:text-white font-medium">
                  {streakData.longestStreak} days
                </span>
              </div>

              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <svg
                  class="w-10 h-10 mx-auto mb-2"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    fill="#A0E9FF"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
                    fill="#70D4FF"
                  ></path>
                  <path
                    d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
                    stroke="#4682B4"
                    stroke-width="0.585938"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span className="text-md text-gray-500 dark:text-gray-300">
                  Streak freezes
                </span>
                <span className="text-2xl dark:text-white font-medium">
                  {streakData.streakFreezes}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/study")}
                className="w-full cursor-pointer py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                <span>Start Studying</span>
              </motion.button>

              <button
                onClick={() => navigate("/leaderboard")}
                className="w-full text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                View Leaderboard
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>Complete a lesson or quiz each day to maintain your streak!</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StreakModal;
