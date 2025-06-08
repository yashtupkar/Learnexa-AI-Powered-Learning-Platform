import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Book,
  BookOpen,
  BarChart2,
  Calendar,
  Users,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Brain,
  BookmarkPlus,
  Zap,
  User,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { ThemeToggle } from "./ThemeTogler";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";

export function SidebarItem({
  icon,
  label,
  to,
  collapsed,
  badge,
  isNew,
}) {
  const [showContent, setShowContent] = useState(false);


  useEffect(() => {
    if (!collapsed) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200); 
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [collapsed]);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `w-full flex items-center space-x-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-400 text-indigo-600 dark:text-indigo-100 shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
        } ${collapsed ? "justify-center" : ""}`
      }
    >
      <div className="relative">
        {React.cloneElement(icon, {
          className: "transition-colors duration-200",
          size: 20,
          strokeWidth: 1.5,
        })}
        {badge && !collapsed && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            {badge}
          </span>
        )}
      </div>
      {showContent && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="text-sm font-medium transition-all duration-200">
            {label}
          </span>
          {isNew && (
            <span className="bg-green-500/20 dark:bg-green-600/30 text-green-600 dark:text-green-500 text-xs px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}

export function RecentTopicItem({ label, count, icon }) {
  return (
    <button className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-all duration-200 group">
      <div className="flex items-center space-x-2 overflow-hidden">
        {icon ? (
          React.cloneElement(icon, {
            className:
              "text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400",
            size: 14,
          })
        ) : (
          <Book
            size={14}
            className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200"
          />
        )}
        <span className="truncate">{label}</span>
      </div>
      <span className="text-xs bg-gray-100 dark:bg-gray-700/40 text-gray-500 dark:text-gray-300 rounded-full px-2 py-0.5 min-w-[20px] text-center transition-colors duration-200 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
        {count}
      </span>
    </button>
  );
}

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isCollapsed]);

  return (
    <div className="bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-gray-700/50">
      <div
        className={`${
          isCollapsed ? "w-[70px]" : "w-64"
        }  flex h-[100vh] flex-col bg-transparent z-20 transition-all duration-300 ease-in-out shadow-sm`}
      >
        {/* Header */}
        <div
          className={`p-4 ${
            isCollapsed ? "flex-col gap-2" : "flex-row"
          } border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center`}
        >
          {!isCollapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
                <Brain className="text-white" size={20} />
              </div>
              <h1 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                QuizGenius
              </h1>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow mx-auto">
              <Brain className="text-white" size={20} />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1.5">
            <SidebarItem
              icon={<Home />}
              label="Dashboard"
              to="/dashboard"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Zap />}
              label="Create Quiz"
              to="/create-quiz"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<BookOpen />}
              label="My Quizzes"
              to="/my-quizzes"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<BarChart2 />}
              label="Analytics"
              to="/analytics"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Calendar />}
              label="Study Plan"
              to="/study-plan"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Lightbulb />}
              label="AI Insights"
              to="/ai-insights"
              collapsed={isCollapsed}
              isNew={true}
            />
          </div>

          {/* Recent Topics & Templates */}
          {showContent && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Recent Topics
                </h3>
                <button className="text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
                  Clear
                </button>
              </div>
              <div className="mt-2 space-y-1.5">
                <RecentTopicItem label="JavaScript Basics" count={4} />
                <RecentTopicItem label="React Hooks" count={2} />
                <RecentTopicItem label="Data Structures" count={5} />
              </div>

              <div className="flex items-center justify-between mt-6 mb-3">
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Saved Templates
                </h3>
                <button className="text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
                  View All
                </button>
              </div>
              <div className="mt-2 space-y-1.5">
                <RecentTopicItem
                  label="Coding Interview"
                  count={10}
                  icon={<BookmarkPlus />}
                />
                <RecentTopicItem
                  label="Weekly Review"
                  count={15}
                  icon={<BookmarkPlus />}
                />
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div
          className={`p-4 border-t border-gray-100 dark:border-gray-700/50 ${
            isCollapsed ? "flex justify-center" : ""
          }`}
        >
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <Avatar name={user?.name} size={40} variant="bean" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                  Pro Plan
                </p>
              </div>
              <ThemeToggle />
            </div>
          ) : (
            <Avatar name={user?.name} size={40} variant="bean" />
          )}
        </div>
      </div>
    </div>
  );
}