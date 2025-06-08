
import React from "react";
import { Search, Bell, Plus, Menu, Settings, User, HelpCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeTogler";
import { useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";


export default function DashboardNav({
  activeTab,
  toggleSidebar,
  notifications,
  showNotifications,
  setShowNotifications,
  markAllAsRead,
  searchQuery,
  setSearchQuery,
  pageTitle 
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Optional: redirect to login or home page after logout
  };

  const dummyNotifications = [
    {
      id: 1,
      text: "🎉 New quiz 'JavaScript Fundamentals' has been completed by 25 students!",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      text: "📊 Weekly performance report is now available for download",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      text: "👥 Sarah Johnson joined your 'React Advanced Concepts' quiz",
      time: "3 hours ago",
      read: false,
    },
    {
      id: 4,
      text: "⭐ Your quiz received a 5-star rating from Alex Thompson",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 5,
      text: "🔔 Reminder: 'Database Design' quiz ends in 2 hours",
      time: "Yesterday",
      read: true,
    },
    {
      id: 6,
      text: "🏆 Congratulations! You've reached 1000 total quiz completions",
      time: "2 days ago",
      read: true,
    },
    {
      id: 7,
      text: "💡 New feature: AI-powered question suggestions are now available",
      time: "3 days ago",
      read: true,
    },
  ];

  // Use dummy data if notifications is not provided
  const notificationsToShow = notifications || dummyNotifications;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <button
              className="md:hidden group p-2 -ml-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
              onClick={toggleSidebar}
            >
              <Menu
                size={22}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </button>

            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
                />
              </div>
              <input
                type="text"
                placeholder="Search topics, quizzes, or anything..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:border-gray-300/80 dark:hover:border-gray-600/80 focus:bg-white dark:focus:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="group relative p-2 rounded-lg cursor-pointer dark:bg-zinc-800 hover:bg-zinc-700 dark:hover:bg-gray-800/80 transition-all duration-200 "
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell
                  size={18}
                  className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
                />
                {notifications?.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/80 dark:border-gray-700/80 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                      Notifications
                    </h3>
                    <button
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200 hover:underline"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notificationsToShow.length > 0 ? (
                      notificationsToShow.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200 border-l-4 ${
                            !notification.read
                              ? "bg-indigo-50/30 dark:bg-indigo-900/10 border-l-indigo-500"
                              : "border-l-transparent"
                          }`}
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                            {notification.text}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-6 py-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Bell size={24} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          No notifications yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          We'll notify you when something happens
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-100/80 dark:border-gray-700/80 px-6 py-3 bg-gradient-to-r from-gray-50/30 to-gray-100/30 dark:from-gray-900/30 dark:to-gray-800/30">
                    <button className="text-sm text-center w-full text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200 py-1 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* New Quiz Button */}
            <button
              onClick={() => navigate("/create-quiz")}
              className="hidden md:flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.02] transform-gpu"
            >
              <Plus size={18} className="text-white" />
              <span>New Quiz</span>
            </button>

            {/* Mobile New Quiz Button */}
            <button
              onClick={() => navigate("/create-quiz")}
              className="md:hidden p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Plus size={18} className="text-white" />
            </button>

            {/* User Avatar */}
            <div className="relative group">
              <div className="ring-2 ring-transparent group-hover:ring-indigo-500/30 rounded-full transition-all duration-200 p-0.5">
                <Avatar name={user?.name} size={42} variant="bean" />
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => handleLogout()}
              className="group relative p-2.5 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 transform-gpu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="absolute -bottom-8 cursor-pointer left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={16}
              className="text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-colors duration-200"
            />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}