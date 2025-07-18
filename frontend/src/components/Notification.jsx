import React from "react";
import { Bell } from "lucide-react";

export default function Notifications({
  notifications,
  showNotifications,
  onToggle,
  markAllAsRead,
}) {
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
    <div className="relative">
      <button
        className="group relative p-2 rounded-lg cursor-pointer dark:bg-zinc-800 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 z-50 "
        onClick={(e) => {
          e.stopPropagation();
          onToggle(); // Use the passed onToggle function
        }}
      >
        <Bell
          sm:size={18}
          size={16}
          className="text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
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
  );
}
