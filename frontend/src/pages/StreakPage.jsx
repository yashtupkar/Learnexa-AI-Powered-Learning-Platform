// // import React from "react";
// // import { useState, useEffect } from "react";
// // import Layout from "../components/layouts/layout";

// // // SVG Icons
// // const FireIcon = ({ active }) => (
// //   <svg
// //     width="20"
// //     height="20"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     xmlns="http://www.w3.org/2000/svg"
// //   >
// //     <path
// //       d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z"
// //       fill={active ? "currentColor" : "none"}
// //       stroke="currentColor"
// //       strokeWidth="2"
// //     />
// //     <path
// //       d="M12 8C10 6 8 7 8 10C8 13 10.5 14 12 16C13.5 14 16 13 16 10C16 7 14 6 12 8Z"
// //       fill={active ? "#fff" : "none"}
// //       stroke={active ? "none" : "currentColor"}
// //       strokeWidth="1"
// //     />
// //   </svg>
// // );

// // const TrophyIcon = () => (
// //   <svg
// //     width="20"
// //     height="20"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     xmlns="http://www.w3.org/2000/svg"
// //   >
// //     <path
// //       d="M19 5H5C3.89543 5 3 5.89543 3 7V8C3 10.2091 4.79086 12 7 12H17C19.2091 12 21 10.2091 21 8V7C21 5.89543 20.1046 5 19 5Z"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //     <path
// //       d="M7 12V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V12"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //     <path
// //       d="M12 16V12"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </svg>
// // );

// // const CalendarIcon = () => (
// //   <svg
// //     width="20"
// //     height="20"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     xmlns="http://www.w3.org/2000/svg"
// //   >
// //     <rect
// //       x="3"
// //       y="4"
// //       width="18"
// //       height="18"
// //       rx="2"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //     />
// //     <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
// //     <path
// //       d="M8 3V6"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //     />
// //     <path
// //       d="M16 3V6"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //     />
// //   </svg>
// // );

// // const StreakMap = () => {
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [streaks, setStreaks] = useState([]);
// //   const [stats, setStats] = useState({
// //     currentStreak: 0,
// //     longestStreak: 0,
// //     totalDays: 0,
// //     monthlyCompletion: 0,
// //   });

// //   // Mock data - replace with your actual data fetching logic
// //   useEffect(() => {
// //     // Generate mock streaks for the current month
// //     const daysInMonth = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth() + 1,
// //       0
// //     ).getDate();

// //     const mockStreaks = Array.from({ length: daysInMonth }, (_, i) => {
// //       const day = i + 1;
// //       // Randomly mark some days as active (for demo)
// //       const isActive = Math.random() > 0.6;
// //       return {
// //         date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
// //         active: isActive,
// //       };
// //     });

// //     // Calculate stats
// //     const activeDays = mockStreaks.filter((day) => day.active).length;
// //     setStreaks(mockStreaks);
// //     setStats({
// //       currentStreak: Math.floor(Math.random() * 10) + 1,
// //       longestStreak: Math.floor(Math.random() * 20) + 5,
// //       totalDays: activeDays,
// //       monthlyCompletion: Math.round((activeDays / daysInMonth) * 100),
// //     });
// //   }, [currentDate]);

// //   const changeMonth = (offset) => {
// //     setCurrentDate(
// //       new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
// //     );
// //   };

// //   const getDayName = (date) => {
// //     return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
// //   };

// //   return (
// //     <Layout>
// //     <div className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-2xl font-bold flex items-center gap-2">
// //           <CalendarIcon />
// //           <span>
// //             {currentDate.toLocaleDateString("en-US", {
// //               month: "long",
// //               year: "numeric",
// //             })}
// //           </span>
// //         </h1>
// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => changeMonth(-1)}
// //             className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
// //           >
// //             &lt;
// //           </button>
// //           <button
// //             onClick={() => changeMonth(1)}
// //             className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
// //           >
// //             &gt;
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Overview */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //         <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
// //           <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
// //             Current Streak
// //           </div>
// //           <div className="text-2xl font-bold flex items-center gap-2">
// //             <FireIcon
// //               active={stats.currentStreak > 0}
// //               className="text-orange-500"
// //             />
// //             {stats.currentStreak} days
// //           </div>
// //         </div>
// //         <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
// //           <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
// //             Longest Streak
// //           </div>
// //           <div className="text-2xl font-bold flex items-center gap-2">
// //             <TrophyIcon className="text-amber-500" />
// //             {stats.longestStreak} days
// //           </div>
// //         </div>
// //         <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
// //           <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
// //             Total Days
// //           </div>
// //           <div className="text-2xl font-bold">{stats.totalDays}</div>
// //         </div>
// //         <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
// //           <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
// //             Monthly Completion
// //           </div>
// //           <div className="text-2xl font-bold">{stats.monthlyCompletion}%</div>
// //         </div>
// //       </div>

// //       {/* Streak Grid */}
// //       <div className="mb-8">
// //         <div className="grid grid-cols-7 gap-2 mb-2">
// //           {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
// //             <div
// //               key={i}
// //               className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium"
// //             >
// //               {day}
// //             </div>
// //           ))}
// //         </div>
// //         <div className="grid grid-cols-7 gap-2">
// //           {Array.from({
// //             length: new Date(
// //               currentDate.getFullYear(),
// //               currentDate.getMonth(),
// //               1
// //             ).getDay(),
// //           }).map((_, i) => (
// //             <div key={`empty-start-${i}`} className="h-8"></div>
// //           ))}
// //           {streaks.map((streak, i) => (
// //             <div
// //               key={i}
// //               className={`h-8 rounded-md flex items-center justify-center relative group ${
// //                 streak.active
// //                   ? "bg-green-500 dark:bg-green-600 text-white"
// //                   : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
// //               }`}
// //             >
// //               <span className="text-xs">{streak.date.getDate()}</span>
// //               <div className="absolute bottom-full mb-2 hidden group-hover:block bg-zinc-800 dark:bg-zinc-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
// //                 {streak.date.toLocaleDateString("en-US", {
// //                   weekday: "long",
// //                   month: "long",
// //                   day: "numeric",
// //                 })}
// //                 {streak.active && (
// //                   <span className="block text-green-400">
// //                     ✓ Activity recorded
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Badges Section */}
// //       <div>
// //         <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //           <TrophyIcon />
// //           <span>Your Achievements</span>
// //         </h2>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
// //           {[
// //             { name: "5-Day Streak", earned: stats.longestStreak >= 5 },
// //             { name: "Early Bird", earned: true },
// //             { name: "Week Warrior", earned: stats.totalDays >= 7 },
// //             { name: "Perfect Month", earned: stats.monthlyCompletion === 100 },
// //             { name: "Consistency", earned: stats.currentStreak >= 3 },
// //           ].map((badge, i) => (
// //             <div
// //               key={i}
// //               className={`p-3 rounded-lg border flex flex-col items-center ${
// //                 badge.earned
// //                   ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
// //                   : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
// //               }`}
// //             >
// //               <div
// //                 className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
// //                   badge.earned
// //                     ? "bg-amber-500 text-white"
// //                     : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
// //                 }`}
// //               >
// //                 {badge.earned ? "✓" : "?"}
// //               </div>
// //               <span
// //                 className={`text-sm text-center ${
// //                   badge.earned ? "font-medium" : "text-zinc-400"
// //                 }`}
// //               >
// //                 {badge.name}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Motivational Quote */}
// //       <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg italic">
// //         "Consistency is the key to mastery. You've completed {stats.totalDays}{" "}
// //         days this month - keep going!"
// //       </div>
// //     </div></Layout>
// //   );
// // };

// // export default StreakMap;
// import React from "react";
// import { useState, useEffect } from "react";
// import Layout from "../components/layouts/layout";
// import { Trophy } from "lucide-react";

// // SVG Icons
// const FireIcon = ({ active, size = 20 }) => (
//   <svg
//     class="w-8 h-8 mb-2 text-primary-500"
//     width="20"
//     height="21"
//     viewBox="0 0 20 21"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
//       fill="#FD6050"
//     ></path>
//     <path
//       fill-rule="evenodd"
//       clip-rule="evenodd"
//       d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
//       fill="#BC3C85"
//     ></path>
//     <path
//       d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
//       stroke="#07296F"
//       stroke-width="0.585938"
//       stroke-linejoin="round"
//     ></path>
//   </svg>
// );

// const TrophyIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M19 5H5C3.89543 5 3 5.89543 3 7V8C3 10.2091 4.79086 12 7 12H17C19.2091 12 21 10.2091 21 8V7C21 5.89543 20.1046 5 19 5Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M7 12V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V12"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 16V12"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       x="3"
//       y="4"
//       width="18"
//       height="18"
//       rx="2"
//       stroke="currentColor"
//       strokeWidth="2"
//     />
//     <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
//     <path
//       d="M8 3V6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//     <path
//       d="M16 3V6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </svg>
// );

// // Mock user data for leaderboard
// const mockUsers = [
//   { id: 1, name: "Alex Johnson", currentStreak: 42, avatar: "AJ" },
//   { id: 2, name: "Sam Wilson", currentStreak: 35, avatar: "SW" },
//   { id: 3, name: "Taylor Swift", currentStreak: 28, avatar: "TS" },
//   { id: 4, name: "Jordan Lee", currentStreak: 21, avatar: "JL" },
//   { id: 5, name: "Casey Smith", currentStreak: 18, avatar: "CS" },
//   { id: 6, name: "Riley Kim", currentStreak: 15, avatar: "RK" },
//   { id: 7, name: "Morgan Drew", currentStreak: 12, avatar: "MD" },
//   { id: 8, name: "You", currentStreak: 8, avatar: "YO", isCurrentUser: true },
//   { id: 9, name: "Jamie Fox", currentStreak: 5, avatar: "JF" },
//   { id: 10, name: "Pat Davis", currentStreak: 3, avatar: "PD" },
// ];

// const motivationalQuotes = [
//   "The flame that burns Twice as bright burns half as long.",
//   "Keep the fire alive! Consistency is key to mastery.",
//   "Every great fire begins with a single spark. You're that spark!",
//   "Your streak is proof of your dedication. Keep going!",
//   "The longer the streak, the brighter the flame. Shine on!",
//   "Success is the sum of small efforts repeated daily.",
//   "Don't break the chain! Keep your streak alive.",
// ];

// const StreakMap = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [streaks, setStreaks] = useState([]);
//   const [stats, setStats] = useState({
//     currentStreak: 8,
//     longestStreak: 15,
//     totalDays: 12,
//     monthlyCompletion: 40,
//   });
//   const [currentQuote] = useState(
//     motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
//   );

//   // Mock data - replace with your actual data fetching logic
//   useEffect(() => {
//     // Generate mock streaks for the current month
//     const daysInMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     ).getDate();

//     const mockStreaks = Array.from({ length: daysInMonth }, (_, i) => {
//       const day = i + 1;
//       // Randomly mark some days as active (for demo)
//       const isActive = Math.random() > 0.6;
//       return {
//         date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
//         active: isActive,
//       };
//     });

//     setStreaks(mockStreaks);
//   }, [currentDate]);

//   const changeMonth = (offset) => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
//     );
//   };

//   const getDayName = (date) => {
//     return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
//   };

//   return (
//     <Layout>
//       <div className="bg-white dark:bg-black text-zinc-800 dark:text-zinc-200 p-6 ">
//         {/* Hero Section with Big Flame and Current Streak */}
//         <div className="flex flex-col items-center mb-10 text-center">
//           <div className="relative">
//             <svg
//               className="mx-auto mb-2 text-primary-500 w-8 h-8 sm:w-20 sm:h-20 group-hover:rotate-12 transition-transform"
//               width="20"
//               height="21"
//               viewBox="0 0 20 21"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {/* Flame SVG paths */}
//               <path
//                 d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
//                 fill="#FD6050"
//               ></path>
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
//                 fill="#BC3C85"
//               ></path>
//               <path
//                 d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
//                 stroke="#07296F"
//                 strokeWidth="0.585938"
//                 strokeLinejoin="round"
//               ></path>
//             </svg>
//             <span className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  text-xs sm:text-xl">
//               8
//             </span>
//           </div>

//           <h1 className="text-3xl font-bold mb-2">Current Streak</h1>
//           <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
//             {currentQuote}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className="w-2/3">
//             {" "}
//             {/* Personal Stats Section */}
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//               <FireIcon />
//               <span>Streak Map</span>
//             </h2>
//             <div className=" dark:bg-zinc-900 rounded-xl p-4">
//               <div className="flex justify-between  items-center mb-6">
//                 <h1 className="text-2xl font-bold flex items-center gap-2">
//                   <CalendarIcon />
//                   <span>
//                     {currentDate.toLocaleDateString("en-US", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </h1>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => changeMonth(-1)}
//                     className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
//                   >
//                     &lt;
//                   </button>
//                   <button
//                     onClick={() => changeMonth(1)}
//                     className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
//                   >
//                     &gt;
//                   </button>
//                 </div>
//               </div>
//               {/* Stats Overview */}
//               <div className="grid grid-cols-2  gap-4 mb-8">
//                 <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
//                   <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
//                     Current Streak
//                   </div>
//                   <div className="text-2xl font-bold flex items-center gap-2">
//                     <FireIcon
//                       active={stats.currentStreak > 0}
//                       className="text-orange-500"
//                     />
//                     {stats.currentStreak} days
//                   </div>
//                 </div>
//                 <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
//                   <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
//                     Longest Streak
//                   </div>
//                   <div className="text-2xl font-bold flex items-center gap-2">
//                     <FireIcon />
//                     {stats.longestStreak} days
//                   </div>
//                 </div>
//               </div>
//               {/* Streak Grid */}
//               <div className="mb-8">
//                 <div className="grid grid-cols-7 gap-2 mb-2">
//                   {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
//                     <div
//                       key={i}
//                       className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium"
//                     >
//                       {day}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-7 gap-2">
//                   {Array.from({
//                     length: new Date(
//                       currentDate.getFullYear(),
//                       currentDate.getMonth(),
//                       1
//                     ).getDay(),
//                   }).map((_, i) => (
//                     <div key={`empty-start-${i}`} className="h-8"></div>
//                   ))}
//                   {streaks.map((streak, i) => (
//                     <div
//                       key={i}
//                       className={`h-8 rounded-md flex items-center justify-center relative group ${
//                         streak.active
//                           ? "bg-green-500 dark:bg-green-600 text-white"
//                           : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
//                       }`}
//                     >
//                       <span className="text-xs">{streak.date.getDate()}</span>
//                       <div className="absolute bottom-full mb-2 hidden group-hover:block bg-zinc-800 dark:bg-zinc-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
//                         {streak.date.toLocaleDateString("en-US", {
//                           weekday: "long",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                         {streak.active && (
//                           <span className="block text-green-400">
//                             ✓ Activity recorded
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mb-10 w-2/4">
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//               <FireIcon/>
//               <span>Leaderboard</span>
//             </h2>
//             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-zinc-200 dark:border-zinc-700">
//                     <th className="p-4 text-left font-medium">Rank</th>
//                     <th className="p-4 text-left font-medium">User</th>
//                     <th className="p-4 text-right font-medium">
//                       Current Streak
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mockUsers.map((user, index) => (
//                     <tr
//                       key={user.id}
//                       className={`
//               ${
//                 user.isCurrentUser
//                   ? "bg-orange-100 dark:bg-orange-900/30 font-medium"
//                   : "border-b border-zinc-200 dark:border-zinc-700"
//               }
//             `}
//                     >
//                       <td className="p-4">
//                         {index < 3 ? (
//                           <span className="text-amber-500 font-bold">
//                             {index + 1}
//                           </span>
//                         ) : (
//                           index + 1
//                         )}
//                       </td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center">
//                             {user.avatar}
//                           </div>
//                           <span>{user.name}</span>
//                         </div>
//                       </td>
//                       <td className="p-4 ">
//                         <div className="flex items-center   justify-end gap-2">
//                           <FireIcon active={user.currentStreak > 0} />
//                           <span>{user.currentStreak} days</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         {/* Badges Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <Trophy />
//             <span>Your Achievements</span>
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//             {[
//               { name: "5-Day Streak", earned: stats.longestStreak >= 5 },
//               { name: "Early Bird", earned: true },
//               { name: "Week Warrior", earned: stats.totalDays >= 7 },
//               {
//                 name: "Perfect Month",
//                 earned: stats.monthlyCompletion === 100,
//               },
//               { name: "Consistency", earned: stats.currentStreak >= 3 },
//             ].map((badge, i) => (
//               <div
//                 key={i}
//                 className={`p-3 rounded-lg border flex flex-col items-center ${
//                   badge.earned
//                     ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
//                     : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
//                 }`}
//               >
//                 <div
//                   className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
//                     badge.earned
//                       ? "bg-amber-500 text-white"
//                       : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
//                   }`}
//                 >
//                   {badge.earned ? "✓" : "?"}
//                 </div>
//                 <span
//                   className={`text-sm text-center ${
//                     badge.earned ? "font-medium" : "text-zinc-400"
//                   }`}
//                 >
//                   {badge.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default StreakMap;


// import React, { useContext } from "react";
// import { useState, useEffect } from "react";
// import Layout from "../components/layouts/layout";
// import { Trophy } from "lucide-react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import Avatar from "boring-avatars";
// import { useSelector } from "react-redux";
// import Lottie from "lottie-react";
// import fire from "../assets/Fire.json";

// // SVG Icons
// const FireIcon = ({ active, size = 20 }) => (
//   <svg
//     className="w-8 h-8 mb-2 text-primary-500"
//     width={size}
//     height={size + 1}
//     viewBox="0 0 20 21"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
//       fill="#FD6050"
//     ></path>
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
//       fill="#BC3C85"
//     ></path>
//     <path
//       d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
//       stroke="#07296F"
//       strokeWidth="0.585938"
//       strokeLinejoin="round"
//     ></path>
//   </svg>
// );

// const backend_URL = import.meta.env.VITE_BACKEND_URL;

// const CalendarIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect
//       x="3"
//       y="4"
//       width="18"
//       height="18"
//       rx="2"
//       stroke="currentColor"
//       strokeWidth="2"
//     />
//     <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
//     <path
//       d="M8 3V6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//     <path
//       d="M16 3V6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </svg>
// );


// const mockUsers = [
//   { id: 1, name: "Alex Johnson", currentStreak: 42, avatar: "AJ" },
//   { id: 2, name: "Sam Wilson", currentStreak: 35, avatar: "SW" },
//   { id: 3, name: "Taylor Swift", currentStreak: 28, avatar: "TS" },
//   { id: 4, name: "Jordan Lee", currentStreak: 21, avatar: "JL" },
//   { id: 5, name: "Casey Smith", currentStreak: 18, avatar: "CS" },
//   { id: 6, name: "Riley Kim", currentStreak: 15, avatar: "RK" },
//   { id: 7, name: "Morgan Drew", currentStreak: 12, avatar: "MD" },
//   { id: 8, name: "You", currentStreak: 8, avatar: "YO", isCurrentUser: true },
//   { id: 9, name: "Jamie Fox", currentStreak: 5, avatar: "JF" },
//   { id: 10, name: "Pat Davis", currentStreak: 3, avatar: "PD" },
// ];

// const motivationalQuotes = [
//   "The flame that burns Twice as bright burns half as long.",
//   "Keep the fire alive! Consistency is key to mastery.",
//   "Every great fire begins with a single spark. You're that spark!",
//   "Your streak is proof of your dedication. Keep going!",
//   "The longer the streak, the brighter the flame. Shine on!",
//   "Success is the sum of small efforts repeated daily.",
//   "Don't break the chain! Keep your streak alive.",
// ];

// const StreakMap = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [streaks, setStreaks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState({
//     currentStreak: 8,
//     longestStreak: 15,
//     totalDays: 12,
//     monthlyCompletion: 40,
//   });
//   const [streakData, setStreakData] = useState({
//     currentStreak: 0,
//     longestStreak: 0,
//     streakFreezes: 1,
//     activeDates: [],
//     streakHistory: [],
//   });

//   const [currentQuote] = useState(
//     motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
//   );
//   const { user } = useSelector((state) => state.auth);
//   const fetchStreakData = async () => {
//     try {
//       const response = await axios.post(
//         `${backend_URL}/api/user/track-activity`,
//         { id: user._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setStreakData({
//         currentStreak: response.data.currentStreak || 0,
//         longestStreak: response.data.longestStreak || 0,
//         streakFreezes: 0,
//         activeDates: response.data.activeDates || [],
//         streakHistory: response.data.streakHistory || [],
//       });

//       // Calculate stats based on active dates
//       const activeDates = response.data.activeDates || [];
//       const totalDays = activeDates.length;
//       const currentStreak = response.data.currentStreak || 0;
//       const longestStreak = response.data.longestStreak || 0;

//       // Calculate monthly completion
//       const currentMonth = new Date().getMonth();
//       const currentYear = new Date().getFullYear();
//       const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//       const monthlyActiveDates = activeDates.filter((dateStr) => {
//         const date = new Date(dateStr);
//         return (
//           date.getMonth() === currentMonth && date.getFullYear() === currentYear
//         );
//       }).length;

//       setStats({
//         currentStreak,
//         longestStreak,
//         totalDays,
//         monthlyCompletion: Math.round((monthlyActiveDates / daysInMonth) * 100),
//       });
//     } catch (error) {
//       console.error("Error fetching streak data:", error);
//     }
//   };




//   const fetchLeaderboardUsers = async () => {
//     try {
//       const response = await axios.get(
//         `${backend_URL}/api/user/leaderboard-users`
//       );
//       setUsers(response.data);

//     } catch (error) {
//       console.log(error)
//     }
//   };

//   useEffect(() => {
//     fetchStreakData();
//     fetchLeaderboardUsers();
//   },[]);


  
// useEffect(() => {
//   const daysInMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   ).getDate();

//   // Always generate the calendar days for the current month
//   const currentMonthStreaks = Array.from({ length: daysInMonth }, (_, i) => {
//     const day = i + 1;
//     const date = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       day
//     );

//     // Check if this date is in activeDates (if they exist)
//     let isActive = false;
//     if (streakData.activeDates && streakData.activeDates.length > 0) {
//       const dateStr = date.toISOString().split("T")[0];
//       isActive = streakData.activeDates.some((activeDate) => {
//         const activeDateStr = new Date(activeDate).toISOString().split("T")[0];
//         return activeDateStr === dateStr;
//       });
//     }

//     return {
//       date,
//       active: isActive,
//     };
//   });

//   setStreaks(currentMonthStreaks);
// }, [currentDate, streakData.activeDates]);

//  const changeMonth = (offset) => {
//    setCurrentDate(
//      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
//    );
//  };

//  // Format date for display
//  const formatDate = (date) => {
//    return date.toLocaleDateString("en-US", {
//      weekday: "long",
//      month: "long",
//      day: "numeric",
//    });
//  };
//   const getDayName = (date) => {
//     return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
//   };

//   return (
//     <Layout>
//       <div className="bg-white dark:bg-black text-zinc-800 dark:text-zinc-200 p-4 sm:p-6">
//         {/* Hero Section with Big Flame and Current Streak */}
//         <div className="flex flex-col items-center mb-6 sm:mb-10 text-center">
//           <div className="relative">
//             <Lottie
//               animationData={fire}
//               loop
//               className="w-32 h-32 sm:w-48 sm:h-48 md:w-48 md:h-30 transition-all duration-300 group-hover:scale-110"
//             />
//             <span className="absolute  bg-orange-500 h-6 w-6 flex items-center justify-center rounded-full bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs sm:text-lg">
//               {streakData.currentStreak}
//             </span>
//           </div>

//           <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//             Current Streak
//           </h1>
//           <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
//             {currentQuote}
//           </p>
//         </div>

//         {/* Main Content - Flex column on mobile, row on larger screens */}
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Personal Stats Section - Full width on mobile, 2/3 on larger screens */}
//           <div className="w-full lg:w-2/3">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
//               <FireIcon size={20} />
//               <span>Streak Map</span>
//             </h2>
//             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4">
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
//                 <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
//                   <CalendarIcon />
//                   <span>
//                     {currentDate.toLocaleDateString("en-US", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </h1>
//                 <div className="flex gap-2 self-end sm:self-auto">
//                   <button
//                     onClick={() => changeMonth(-1)}
//                     className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
//                   >
//                     &lt;
//                   </button>
//                   <button
//                     onClick={() => changeMonth(1)}
//                     className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
//                   >
//                     &gt;
//                   </button>
//                 </div>
//               </div>

//               {/* Stats Overview - Grid layout responsive to screen size */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//                 <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg">
//                   <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
//                     Current Streak
//                   </div>
//                   <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
//                     <FireIcon
//                       active={stats.currentStreak > 0}
//                       size={18}
//                       className="text-orange-500"
//                     />
//                     {streakData.currentStreak} days
//                   </div>
//                 </div>
//                 <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg">
//                   <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
//                     Longest Streak
//                   </div>
//                   <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
//                     <FireIcon size={18} />
//                     {streakData.longestStreak} days
//                   </div>
//                 </div>
//                 <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg sm:block hidden">
//                   <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
//                     Total Days
//                   </div>
//                   <div className="text-xl sm:text-2xl font-bold">
//                     {streakData.activeDates.length}
//                   </div>
//                 </div>
//                 <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg sm:block hidden">
//                   <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
//                     Monthly Completion
//                   </div>
//                   <div className="text-xl sm:text-2xl font-bold">
//                     {stats.monthlyCompletion}%
//                   </div>
//                 </div>
//               </div>

//               {/* Streak Grid */}
//               <div className="mb-6 sm:mb-8">
//                 <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
//                   {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
//                     <div
//                       key={i}
//                       className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium"
//                     >
//                       {day}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-7 gap-1 sm:gap-2">
//                   {Array.from({
//                     length: new Date(
//                       currentDate.getFullYear(),
//                       currentDate.getMonth(),
//                       1
//                     ).getDay(),
//                   }).map((_, i) => (
//                     <div key={`empty-start-${i}`} className="h-6 sm:h-8"></div>
//                   ))}
//                   {streaks.map((streak, i) => {
//                     const today = new Date();
//                     const isToday =
//                       streak.date.getDate() === today.getDate() &&
//                       streak.date.getMonth() === today.getMonth() &&
//                       streak.date.getFullYear() === today.getFullYear();

//                     return (
//                       <div
//                         key={i}
//                         className={`h-6 sm:h-8 shadow rounded-md flex items-center justify-center relative group ${
//                           streak.active
//                             ? "bg-green-500 dark:bg-green-600 text-white"
//                             : isToday
//                             ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
//                             : "bg-white dark:bg-zinc-800 text-zinc-400"
//                         } ${
//                           isToday
//                             ? "ring-2 ring-blue-500 dark:ring-blue-400"
//                             : ""
//                         }`}
//                       >
//                         <span className="text-[10px] sm:text-xs">
//                           {streak.date.getDate()}
//                         </span>
//                         <div className="absolute bottom-full mb-1 sm:mb-2 hidden group-hover:block bg-zinc-800 dark:bg-zinc-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
//                           {formatDate(streak.date)}
//                           {streak.active && (
//                             <span className="block text-green-400">
//                               ✓ Activity recorded
//                             </span>
//                           )}
//                           {isToday && !streak.active && (
//                             <span className="block text-blue-300">Today</span>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Streak History */}
//               <div className="mt-8">
//                 <h3 className="text-lg font-semibold mb-3">Streak History</h3>
//                 <div className="space-y-2">
//                   {streakData.streakHistory.length > 0 ? (
//                     streakData.streakHistory.map((streak, index) => {
//                       const startDate = new Date(streak.startDate);
//                       const endDate = new Date(streak.endDate);
//                       return (
//                         <div
//                           key={index}
//                           className="bg-white shadow dark:bg-zinc-800 p-3 rounded-lg"
//                         >
//                           <div className="flex justify-between items-center">
//                             <div>
//                               <span className="font-medium">
//                                 {streak.length} days
//                               </span>
//                               <div className="text-xs text-zinc-500 dark:text-zinc-400">
//                                 {startDate.toLocaleDateString()} -{" "}
//                                 {endDate.toLocaleDateString()}
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <FireIcon size={16} active={true} />
//                               <span>{streak.length}</span>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <div className="text-center text-zinc-500 dark:text-zinc-400 py-4">
//                       No streak history yet
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Leaderboard Section - Full width on mobile, 1/3 on larger screens */}
//           {/* Leaderboard Section */}
//           {/* Leaderboard Section */}
//           <div className="w-full lg:w-1/3 mb-6 sm:mb-10">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
//               <FireIcon size={20} />
//               <span>Leaderboard</span>
//             </h2>
//             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[300px]">
//                   <thead>
//                     <tr className="border-b border-zinc-200 dark:border-zinc-700">
//                       <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-medium">
//                         Rank
//                       </th>
//                       <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-medium">
//                         User
//                       </th>
//                       <th className="p-3 sm:p-4 text-right text-xs sm:text-sm font-medium">
//                         Current Streak
//                       </th>
//                     </tr>
//                   </thead>
//                 </table>
//                 <div className="max-h-[600px] scrollbar-custom overflow-y-auto">
//                   {" "}
//                   {/* Scrollable body container */}
//                   <table className="w-full  min-w-[300px]">
//                     <tbody>
//                       {users.map((leaderboardUser, index) => {
//                         const isCurrentUser = leaderboardUser._id === user._id;
//                         return (
//                           <tr
//                             key={leaderboardUser._id}
//                             className={`
//                     ${
//                       isCurrentUser
//                         ? "bg-orange-100 dark:bg-orange-900/30 font-medium"
//                         : "border-b border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700"
//                     }
//                   `}
//                           >
//                             <td className="p-3 sm:p-4 text-xs sm:text-sm">
//                               {index < 3 ? (
//                                 <span className="text-amber-500 font-bold">
//                                   {index + 1}
//                                 </span>
//                               ) : (
//                                 index + 1
//                               )}
//                             </td>
//                             <td className="p-3 sm:p-4">
//                               <div className="flex items-center gap-2 sm:gap-3">
//                                 {leaderboardUser?.avatar ? (
//                                   <img
//                                     src={leaderboardUser?.avatar}
//                                     alt="Profile"
//                                     className="h-10 rounded-full  w-10 object-cover"
//                                   />
//                                 ) : (
//                                   <Avatar
//                                     name={leaderboardUser.username}
//                                     size={40}
//                                   />
//                                 )}
//                                 <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
//                                   {isCurrentUser
//                                     ? "You"
//                                     : leaderboardUser.username}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="p-3 sm:p-4">
//                               <div className="flex items-center justify-end gap-1 sm:gap-2">
//                                 <FireIcon
//                                   active={leaderboardUser.currentStreak > 0}
//                                   size={16}
//                                 />
//                                 <span className="text-xs sm:text-sm">
//                                   {leaderboardUser.currentStreak} days
//                                 </span>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Badges Section */}
//         <div className="mt-4 sm:mt-6">
//           <h2 className="text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
//             <Trophy className="w-5 h-5" />
//             <span>Your Achievements</span>
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
//             {[
//               { name: "5-Day Streak", earned: stats.longestStreak >= 5 },
//               { name: "Early Bird", earned: true },
//               { name: "Week Warrior", earned: stats.totalDays >= 7 },
//               {
//                 name: "Perfect Month",
//                 earned: stats.monthlyCompletion === 100,
//               },
//               { name: "Consistency", earned: stats.currentStreak >= 3 },
//             ].map((badge, i) => (
//               <div
//                 key={i}
//                 className={`p-2 sm:p-3 rounded-lg border flex flex-col items-center ${
//                   badge.earned
//                     ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
//                     : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mb-1 sm:mb-2 flex items-center justify-center text-sm sm:text-base ${
//                     badge.earned
//                       ? "bg-amber-500 text-white"
//                       : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
//                   }`}
//                 >
//                   {badge.earned ? "✓" : "?"}
//                 </div>
//                 <span
//                   className={`text-xs sm:text-sm text-center ${
//                     badge.earned ? "font-medium" : "text-zinc-400"
//                   }`}
//                 >
//                   {badge.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default StreakMap;


import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layouts/layout";
import { Trophy } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import fire from "../assets/Fire.json";

// SVG Icons
const FireIcon = ({ active, size = 20 }) => (
  <svg
    className="w-8 h-8 mb-2 text-primary-500"
    width={size}
    height={size + 1}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
      fill="#FD6050"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1953 20.5312C11.3507 20.5312 12.3535 20.3683 13.2227 20.0838C7.44141 18.4804 1.7897 8.05133 12.207 1.2148C12.1827 1.26694 12.23 1.16317 12.207 1.2148C5.31641 2.7148 3.33333 9.33981 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4765 3.32031 20.5312 10.1953 20.5312Z"
      fill="#BC3C85"
    ></path>
    <path
      d="M16.0156 6.41016C13.9062 9.125 9.78516 6.41016 12.207 1.21484C5.31641 2.71484 3.33333 9.33984 3.20312 12.4648C2.42188 12.4336 1.78385 11.5664 1.5625 11.1367C1.5625 14.4766 3.32031 20.5312 10.1953 20.5312C16.9727 20.5312 18.4961 14.9258 18.6328 12.0547C18.1797 12.6484 17.4414 13.1094 16.6016 13.2266C18.2812 10.6094 16.9531 7.64062 16.0156 6.41016Z"
      stroke="#07296F"
      strokeWidth="0.585938"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const backend_URL = import.meta.env.VITE_BACKEND_URL;

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
    <path
      d="M8 3V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 3V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const motivationalQuotes = [
  "The flame that burns Twice as bright burns half as long.",
  "Keep the fire alive! Consistency is key to mastery.",
  "Every great fire begins with a single spark. You're that spark!",
  "Your streak is proof of your dedication. Keep going!",
  "The longer the streak, the brighter the flame. Shine on!",
  "Success is the sum of small efforts repeated daily.",
  "Don't break the chain! Keep your streak alive.",
];

const StreakMap = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streaks, setStreaks] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    monthlyCompletion: 0,
  });
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    streakFreezes: 0,
    activeDates: [],
    streakHistory: [],
  });

  const [currentQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );
  const { user } = useSelector((state) => state.auth);

  const calculateCurrentStreak = (activeDates) => {
    if (!activeDates || activeDates.length === 0) return 0;

    // Sort dates in descending order
    const sortedDates = [...activeDates].sort(
      (a, b) => new Date(b) - new Date(a)
    );

    // Convert to YYYY-MM-DD format for comparison
    const formatDate = (date) => new Date(date).toISOString().split("T")[0];

    let streak = 1;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if today's activity exists
    const todayFormatted = formatDate(today);
    const lastDateFormatted = formatDate(sortedDates[0]);

    // If last activity wasn't today, streak is 0
    if (lastDateFormatted !== todayFormatted) return 0;

    // Check consecutive days backward
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const prevDate = new Date(sortedDates[i - 1]);

      currentDate.setHours(0, 0, 0, 0);
      prevDate.setHours(0, 0, 0, 0);

      const diffTime = prevDate - currentDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

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

      const activeDates = response.data.activeDates || [];
      const currentStreak = calculateCurrentStreak(activeDates);

      setStreakData({
        currentStreak,
        longestStreak: response.data.longestStreak || 0,
        streakFreezes: 0,
        activeDates,
        streakHistory: response.data.streakHistory || [],
      });

      // Calculate stats based on active dates
      const totalDays = activeDates.length;
      const longestStreak = response.data.longestStreak || 0;

      // Calculate monthly completion
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const monthlyActiveDates = activeDates.filter((dateStr) => {
        const date = new Date(dateStr);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      }).length;

      setStats({
        currentStreak,
        longestStreak,
        totalDays,
        monthlyCompletion: Math.round((monthlyActiveDates / daysInMonth) * 100),
      });
    } catch (error) {
      console.error("Error fetching streak data:", error);
    }
  };

  const fetchLeaderboardUsers = async () => {
    try {
      const response = await axios.get(
        `${backend_URL}/api/user/leaderboard-users`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStreakData();
    fetchLeaderboardUsers();
  }, []);

  useEffect(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const currentMonthStreaks = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      let isActive = false;
      if (streakData.activeDates && streakData.activeDates.length > 0) {
        isActive = streakData.activeDates.some((activeDate) => {
          const activeDateObj = new Date(activeDate);
          return (
            activeDateObj.getDate() === date.getDate() &&
            activeDateObj.getMonth() === date.getMonth() &&
            activeDateObj.getFullYear() === date.getFullYear()
          );
        });
      }

      return {
        date,
        active: isActive,
      };
    });

    setStreaks(currentMonthStreaks);
  }, [currentDate, streakData.activeDates]);

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getDayName = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
  };

  return (
    <Layout>
      <div className="bg-white dark:bg-black text-zinc-800 dark:text-zinc-200 p-4 sm:p-6">
        {/* Hero Section with Big Flame and Current Streak */}
        <div className="flex flex-col items-center mb-6 sm:mb-10 text-center">
          <div className="relative">
            <Lottie
              animationData={fire}
              loop
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-48 md:h-30 transition-all duration-300 group-hover:scale-110"
            />
            <span className="absolute bg-orange-500 h-6 w-6 flex items-center justify-center rounded-full bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs sm:text-lg">
              {streakData.currentStreak}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Current Streak
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
            {currentQuote}
          </p>
        </div>

        {/* Main Content - Flex column on mobile, row on larger screens */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Personal Stats Section - Full width on mobile, 2/3 on larger screens */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <FireIcon size={20} />
              <span>Streak Map</span>
            </h2>
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <CalendarIcon />
                  <span>
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </h1>
                <div className="flex gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              {/* Stats Overview - Grid layout responsive to screen size */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg">
                  <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Current Streak
                  </div>
                  <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                    <FireIcon
                      active={stats.currentStreak > 0}
                      size={18}
                      className="text-orange-500"
                    />
                    {streakData.currentStreak} days
                  </div>
                </div>
                <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg">
                  <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Longest Streak
                  </div>
                  <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                    <FireIcon size={18} />
                    {streakData.longestStreak} days
                  </div>
                </div>
                <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg sm:block hidden">
                  <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Total Days
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {streakData.activeDates.length}
                  </div>
                </div>
                <div className="bg-white shadow dark:bg-zinc-800 p-3 sm:p-4 rounded-lg sm:block hidden">
                  <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Monthly Completion
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {stats.monthlyCompletion}%
                  </div>
                </div>
              </div>

              {/* Streak Grid */}
              <div className="mb-6 sm:mb-8">
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div
                      key={i}
                      className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {Array.from({
                    length: new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      1
                    ).getDay(),
                  }).map((_, i) => (
                    <div key={`empty-start-${i}`} className="h-6 sm:h-8"></div>
                  ))}
                  {streaks.map((streak, i) => {
                    const today = new Date();
                    const isToday =
                      streak.date.getDate() === today.getDate() &&
                      streak.date.getMonth() === today.getMonth() &&
                      streak.date.getFullYear() === today.getFullYear();

                    return (
                      <div
                        key={i}
                        className={`h-6 sm:h-8 shadow rounded-md flex items-center justify-center relative group ${
                          streak.active
                            ? "bg-green-500 dark:bg-green-600 text-white"
                            : isToday
                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                            : "bg-white dark:bg-zinc-800 text-zinc-400"
                        } ${
                          isToday
                            ? "ring-2 ring-blue-500 dark:ring-blue-400"
                            : ""
                        }`}
                      >
                        <span className="text-[10px] sm:text-xs">
                          {streak.date.getDate()}
                        </span>
                        <div className="absolute bottom-full mb-1 sm:mb-2 hidden group-hover:block bg-zinc-800 dark:bg-zinc-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                          {formatDate(streak.date)}
                          {streak.active && (
                            <span className="block text-green-400">
                              ✓ Activity recorded
                            </span>
                          )}
                          {isToday && !streak.active && (
                            <span className="block text-blue-300">Today</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Streak History */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Streak History</h3>
                <div className="space-y-2">
                  {streakData.streakHistory.length > 0 ? (
                    streakData.streakHistory.map((streak, index) => {
                      const startDate = new Date(streak.startDate);
                      const endDate = new Date(streak.endDate);
                      return (
                        <div
                          key={index}
                          className="bg-white shadow dark:bg-zinc-800 p-3 rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">
                                {streak.length} days
                              </span>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {startDate.toLocaleDateString()} -{" "}
                                {endDate.toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <FireIcon size={16} active={true} />
                              <span>{streak.length}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-zinc-500 dark:text-zinc-400 py-4">
                      No streak history yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="w-full lg:w-1/3 mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <FireIcon size={20} />
              <span>Leaderboard</span>
            </h2>
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px]">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-medium">
                        Rank
                      </th>
                      <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-medium">
                        User
                      </th>
                      <th className="p-3 sm:p-4 text-right text-xs sm:text-sm font-medium">
                        Current Streak
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="max-h-[600px] scrollbar-custom overflow-y-auto">
                  <table className="w-full min-w-[300px]">
                    <tbody>
                      {users.map((leaderboardUser, index) => {
                        const isCurrentUser = leaderboardUser._id === user._id;
                        return (
                          <tr
                            key={leaderboardUser._id}
                            className={`
                              ${
                                isCurrentUser
                                  ? "bg-orange-100 dark:bg-orange-900/30 font-medium"
                                  : "border-b border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                              }
                            `}
                          >
                            <td className="p-3 sm:p-4 text-xs sm:text-sm">
                              {index < 3 ? (
                                <span className="text-amber-500 font-bold">
                                  {index + 1}
                                </span>
                              ) : (
                                index + 1
                              )}
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                {leaderboardUser?.avatar ? (
                                  <img
                                    src={leaderboardUser?.avatar}
                                    alt="Profile"
                                    className="h-10 rounded-full w-10 object-cover"
                                  />
                                ) : (
                                  <Avatar
                                    name={leaderboardUser.username}
                                    size={40}
                                  />
                                )}
                                <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
                                  {isCurrentUser
                                    ? "You"
                                    : leaderboardUser.username}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center justify-end gap-1 sm:gap-2">
                                <FireIcon
                                  active={leaderboardUser.currentStreak > 0}
                                  size={16}
                                />
                                <span className="text-xs sm:text-sm">
                                  {leaderboardUser.currentStreak} days
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mt-4 sm:mt-6">
          <h2 className="text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span>Your Achievements</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {[
              { name: "5-Day Streak", earned: streakData.longestStreak >= 5 },
              { name: "Early Bird", earned: true },
              {
                name: "Week Warrior",
                earned: streakData.activeDates.length >= 7,
              },
              {
                name: "Perfect Month",
                earned: stats.monthlyCompletion === 100,
              },
              { name: "Consistency", earned: streakData.currentStreak >= 3 },
            ].map((badge, i) => (
              <div
                key={i}
                className={`p-2 sm:p-3 rounded-lg border flex flex-col items-center ${
                  badge.earned
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mb-1 sm:mb-2 flex items-center justify-center text-sm sm:text-base ${
                    badge.earned
                      ? "bg-amber-500 text-white"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
                  }`}
                >
                  {badge.earned ? "✓" : "?"}
                </div>
                <span
                  className={`text-xs sm:text-sm text-center ${
                    badge.earned ? "font-medium" : "text-zinc-400"
                  }`}
                >
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreakMap;