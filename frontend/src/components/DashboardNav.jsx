
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
import StudyTimerModal from "./modal/StudytimerModal";

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
          <div className="flex items-center sm:space-x-4">
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

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Toggle */}

            {/* Create New Button (Desktop) */}
            <button
              onClick={() => navigate("/create")}
              className="hidden md:flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-br from-indigo-600 to-indigo-400 cursor-pointer text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Plus size={16} />
              <span>Create</span>
            </button>

            {/* Help Center */}
            <button
              onClick={() => navigate("/help-center")}
              className="hidden sm:block p-1 rounded-lg cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>

            {/* Messages */}

            {/* Theme Toggle */}
            <div className="">
              <ThemeToggle />
            </div>

            {/* Notifications */}
            {/* Notifications Panel */}
            <Notifications />

            {/* User Avatar with Dropdown */}
            <div className="sm:ml-2">
              <DropdownMenu
                name={user?.name}
                email={user?.email}
                avatar={user.avatar}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}