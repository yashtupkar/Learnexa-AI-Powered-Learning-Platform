import React, { useState } from "react";
import { Search, Plus, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeTogler";
import { useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import Notifications from "./Notification";
import { DropdownMenu } from "./ProfileDropDown";


export default function DashboardNav({
  activeTab,
  toggleSidebar,
  notifications,
  markAllAsRead,
  searchQuery,
  setSearchQuery,
  pageTitle,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [showNotifications, setShowNotifications] = useState(false);

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

            {/* Notifications Component */}
            <Notifications
              notifications={notifications}
              showNotifications={showNotifications}
              onToggle={() => setShowNotifications(!showNotifications)}
              markAllAsRead={markAllAsRead}
            />

          

            {/* User Avatar */}
            <div className="mt-2">
           <DropdownMenu name={user?.name} email={user?.email} /> 
            </div>
            

          
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
