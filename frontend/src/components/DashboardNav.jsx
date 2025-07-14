// // import React, { useState, useEffect } from "react";
// // import {
// //   Search,
// //   Plus,
// //   Menu,
// //   Bell,
// //   MessageSquare,
// //   HelpCircle,
// // } from "lucide-react";
// // import { ThemeToggle } from "./ThemeTogler";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Avatar from "boring-avatars";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../redux/authSlice";
// // import Notifications from "./Notification";
// // import { DropdownMenu } from "./ProfileDropDown";
// // import { useMediaQuery } from "react-responsive";

// // export default function DashboardNav({
// //   pageTitle,
// //   searchQuery,
// //   setSearchQuery,
// //   notifications = [],
// //   markAllAsRead,
// //   toggleMobileSidebar,
// // }) {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const location = useLocation();
// //   const { user } = useSelector((state) => state.auth);
// //   const isMobile = useMediaQuery({ maxWidth: 1024 });

// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showMobileSearch, setShowMobileSearch] = useState(false);
// //   const [unreadCount, setUnreadCount] = useState(0);

// //   // Calculate unread notifications count
// //   useEffect(() => {
// //     const count = notifications.filter((n) => !n.read).length;
// //     setUnreadCount(count);
// //   }, [notifications]);

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate("/login");
// //   };

// //   // Hide mobile search when route changes
// //   useEffect(() => {
// //     setShowMobileSearch(false);
// //   }, [location.pathname]);

// //   return (
// //     <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
// //       <div className="px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16">
// //           {/* Left Section - Mobile Menu & Title */}
// //           <div className="flex items-center space-x-4">
// //             {/* Mobile Menu Button */}
// //             {isMobile && (
// //               <button
// //                 onClick={toggleMobileSidebar}
// //                 className="p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
// //                 aria-label="Toggle sidebar"
// //               >
// //                 <Menu size={22} className="transition-transform duration-200" />
// //               </button>
// //             )}

// //             {/* Page Title */}
// //             <h1 className="text-lg  text-gray-800 dark:text-white truncate max-w-[160px] sm:max-w-none">
// //               {pageTitle}
// //             </h1>
// //           </div>

// //           {/* Center Section - Search (Desktop) */}
// //           <div className="hidden lg:flex flex-1 max-w-xl mx-8">
// //             <div className="relative w-full group">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Search
// //                   size={18}
// //                   className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
// //                 />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search topics, quizzes, or anything..."
// //                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 focus:bg-white dark:focus:bg-gray-800"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           {/* Right Section - Actions */}
// //           <div className="flex items-center space-x-3 sm:space-x-4">
// //             {/* Mobile Search Toggle */}
// //             {isMobile && (
// //               <button
// //                 onClick={toggleMobileSidebar} // This should now work
// //                 className="p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
// //                 aria-label="Toggle sidebar"
// //               >
// //                 <Menu size={22} className="transition-transform duration-200" />
// //               </button>
// //             )}

// //             {/* Create New Button (Desktop) */}
// //             <button
// //               onClick={() => navigate("/create")}
// //               className="hidden md:flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
// //             >
// //               <Plus size={16} />
// //               <span>Create</span>
// //             </button>

// //             {/* Help Center */}
// //             <button
// //               onClick={() => navigate("/help")}
// //               className="hidden sm:block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
// //               aria-label="Help"
// //             >
// //               <HelpCircle size={20} />
// //             </button>

// //             {/* Messages */}
// //             <button
// //               onClick={() => navigate("/messages")}
// //               className="hidden sm:block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 relative"
// //               aria-label="Messages"
// //             >
// //               <MessageSquare size={20} />
// //               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
// //             </button>

// //             {/* Theme Toggle */}
// //             <div className="">
// //               <ThemeToggle />
// //             </div>

// //             {/* Notifications */}
// //             {/* Notifications Panel */}
// //             <Notifications
// //               notifications={notifications}
// //               showNotifications={showNotifications}
// //               onToggle={() => setShowNotifications(!showNotifications)}
// //               markAllAsRead={markAllAsRead}
// //             />

// //             {/* User Avatar with Dropdown */}
// //             <div className="ml-2">
// //               <DropdownMenu
// //                 name={user?.name}
// //                 email={user?.email}
// //                 onLogout={handleLogout}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mobile Search Bar (Conditional) */}
// //         {showMobileSearch && (
// //           <div className="lg:hidden pb-3 transition-all duration-300">
// //             <div className="relative group">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Search
// //                   size={16}
// //                   className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
// //                 />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 className="w-full pl-10 pr-4 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 autoFocus
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </header>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Plus,
//   Menu,
//   Bell,
//   MessageSquare,
//   HelpCircle,
// } from "lucide-react";
// import { ThemeToggle } from "./ThemeTogler";
// import { useNavigate, useLocation } from "react-router-dom";
// import Avatar from "boring-avatars";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/authSlice";
// import Notifications from "./Notification";
// import { DropdownMenu } from "./ProfileDropDown";
// import { useMediaQuery } from "react-responsive";

// export default function DashboardNav({
//   pageTitle,
//   searchQuery,
//   setSearchQuery,
//   notifications = [],
//   markAllAsRead,
//   toggleMobileSidebar,
//   toggleDesktopSidebar, // Add this prop for desktop sidebar toggle
// }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { user } = useSelector((state) => state.auth);
//   const isMobile = useMediaQuery({ maxWidth: 1024 });

//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Calculate unread notifications count
//   useEffect(() => {
//     const count = notifications.filter((n) => !n.read).length;
//     setUnreadCount(count);
//   }, [notifications]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   // Hide mobile search when route changes
//   useEffect(() => {
//     setShowMobileSearch(false);
//   }, [location.pathname]);

//   // Handle sidebar toggle based on device type
//   const handleSidebarToggle = () => {
//     if (isMobile) {
//       toggleMobileSidebar();
//     } else {
//       toggleDesktopSidebar();
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Left Section - Menu Button & Title */}
//           <div className="flex items-center space-x-4">
//             {/* Menu Button - works for both mobile and desktop */}
//             <button
//               onClick={handleSidebarToggle}
//               className="p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
//               aria-label="Toggle sidebar"
//             >
//               <Menu size={22} className="transition-transform duration-200" />
//             </button>

//             {/* Page Title */}
//             <h1 className="text-lg  text-gray-800 dark:text-white truncate max-w-[160px] sm:max-w-none">
//               {pageTitle}
//             </h1>
//           </div>

//           {/* Center Section - Search (Desktop) */}
//           <div className="hidden lg:flex flex-1 max-w-xl mx-8">
//             <div className="relative w-full group">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search
//                   size={18}
//                   className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search topics, quizzes, or anything..."
//                 className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 focus:bg-white dark:focus:bg-gray-800"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Right Section - Actions */}
//           <div className="flex items-center space-x-3 sm:space-x-4">
//             {/* Mobile Search Toggle */}
//             {isMobile && (
//               <button
//                 onClick={() => setShowMobileSearch(!showMobileSearch)}
//                 className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
//                 aria-label="Toggle search"
//               >
//                 <Search size={20} />
//               </button>
//             )}

//             {/* Create New Button (Desktop) */}
//             <button
//               onClick={() => navigate("/create")}
//               className="hidden md:flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
//             >
//               <Plus size={16} />
//               <span>Create</span>
//             </button>

//             {/* Help Center */}
//             <button
//               onClick={() => navigate("/help")}
//               className="hidden sm:block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
//               aria-label="Help"
//             >
//               <HelpCircle size={20} />
//             </button>

//             {/* Messages */}
//             <button
//               onClick={() => navigate("/messages")}
//               className="hidden sm:block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 relative"
//               aria-label="Messages"
//             >
//               <MessageSquare size={20} />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* Theme Toggle */}
//             <div className="">
//               <ThemeToggle />
//             </div>

//             {/* Notifications */}
//             {/* Notifications Panel */}
//             <Notifications
//               notifications={notifications}
//               showNotifications={showNotifications}
//               onToggle={() => setShowNotifications(!showNotifications)}
//               markAllAsRead={markAllAsRead}
//             />

//             {/* User Avatar with Dropdown */}
//             <div className="ml-2">
//               <DropdownMenu
//                 name={user?.name}
//                 email={user?.email}
//                 onLogout={handleLogout}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search Bar (Conditional) */}
//         {showMobileSearch && (
//           <div className="lg:hidden pb-3 transition-all duration-300">
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search
//                   size={16}
//                   className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoFocus
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Menu,
  Bell,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeTogler";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import Notifications from "./Notification";
import { DropdownMenu } from "./ProfileDropDown";
import { useMediaQuery } from "react-responsive";

export default function DashboardNav({
  pageTitle,
  searchQuery,
  setSearchQuery,
  notifications = [],
  markAllAsRead,
  toggleMobileSidebar,
  toggleDesktopSidebar, // Add this prop for desktop sidebar toggle
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Calculate unread notifications count
  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Hide mobile search when route changes
  useEffect(() => {
    setShowMobileSearch(false);
  }, [location.pathname]);

  // Handle sidebar toggle based on device type
  const handleSidebarToggle = () => {
    if (isMobile) {
      toggleMobileSidebar();
    } else {
      toggleDesktopSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Menu Button & Title */}
          <div className="flex items-center space-x-4">
            {/* Menu Button - works for both mobile and desktop */}
            <button
              onClick={handleSidebarToggle}
              className="p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={22} className="transition-transform duration-200" />
            </button>

            {/* Page Title */}
            <h1 className="text-lg  text-gray-800 dark:text-white truncate max-w-[160px] sm:max-w-none">
              {pageTitle}
            </h1>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
                />
              </div>
              <input
                type="text"
                placeholder="Search topics, quizzes, or anything..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 focus:bg-white dark:focus:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile Search Toggle */}
            {isMobile && (
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
                aria-label="Toggle search"
              >
                <Search size={20} />
              </button>
            )}

            {/* Create New Button (Desktop) */}
            <button
              onClick={() => navigate("/create")}
              className="hidden md:flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Plus size={16} />
              <span>Create</span>
            </button>

            {/* Help Center */}
            <button
              onClick={() => navigate("/help")}
              className="hidden sm:block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>

            {/* Messages */}
            <button
              onClick={() => navigate("/messages")}
              className="hidden sm:block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 relative"
              aria-label="Messages"
            >
              <MessageSquare size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Theme Toggle */}
            <div className="">
              <ThemeToggle />
            </div>

            {/* Notifications */}
            {/* Notifications Panel */}
            <Notifications
              notifications={notifications}
              showNotifications={showNotifications}
              onToggle={() => setShowNotifications(!showNotifications)}
              markAllAsRead={markAllAsRead}
            />

            {/* User Avatar with Dropdown */}
            <div className="ml-2">
              <DropdownMenu
                name={user?.name}
                email={user?.email}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Conditional) */}
        {showMobileSearch && (
          <div className="lg:hidden pb-3 transition-all duration-300">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  size={16}
                  className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
                />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}