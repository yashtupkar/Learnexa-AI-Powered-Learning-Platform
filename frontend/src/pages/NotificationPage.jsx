import Layout from "../components/layouts/layout";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import {
  Bell,
  BellOff,
  Check,
  X,
  Mail,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Info,
  CheckCircle,
  XCircle,
  PartyPopper,
  AlertTriangle,
  Gift,
  Globe,
} from "lucide-react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [globalNotifications, setGlobalNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("personal"); // 'personal' or 'global'

  const { user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);

  const fetchGlobalNotifications = async () => {
    try {
      const response = await axios.get(
        `${backend_URL}/api/notification/fetch-notifications`
      );
      // Ensure response.data is an array
      setGlobalNotifications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setGlobalNotifications([]); // Set empty array on error
    }
  };

const userNotifications = async () => {
  try {
    const response = await axios.get(`${backend_URL}/api/user/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Access the notifications array from response.data
    const receivedNotifications = response.data.notifications || [];
    console.log(receivedNotifications);
    setNotifications(receivedNotifications);
    if (receivedNotifications.length === 0) {
      if (user?.name) {
        const welcomeNotification = {
          id: 0,
          title: `🎉 Welcome, ${user.name} to Learnexa!`,
          message:
            "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
          type: "welcome",
          time: `21 Jul 2025`,
          read: false,
        };
        setNotifications([welcomeNotification]);
        setUnreadCount(1);
      }
    }
    setUnreadCount(receivedNotifications.filter((n) => !n.read).length);
  } catch (error) {
    console.log(error);
    // Set welcome notification even if API fails
    if (user?.name) {
      const welcomeNotification = {
        id: 0,
        title: `🎉 Welcome, ${user.name} to Learnexa!`,
        message:
          "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
        type: "welcome",
        time: `21 Jul 2025`,
        read: false,
      };
      setNotifications([welcomeNotification]);
      setUnreadCount(1);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }
};

useEffect(() => {
  userNotifications();
  fetchGlobalNotifications();
}, []);

// Add another useEffect to handle unread count when notifications change
useEffect(() => {
  setUnreadCount(notifications.filter((n) => !n.read).length);
}, [notifications]);

  const markAsRead = (id) => {
    const updated = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updated);
    setUnreadCount(updated.filter((n) => !n.read).length);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updated);
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updated);
    setUnreadCount(updated.filter((n) => !n.read).length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getIconForType = (type) => {
    switch (type) {
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "welcome":
        return <Gift className="w-5 h-5 text-purple-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "news":
        return <Globe className="w-5 h-5 text-amber-500" />;
      case "message":
        return <Mail className="w-5 h-5 text-blue-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "comment":
        return <MessageSquare className="w-5 h-5 text-indigo-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  // Ensure currentNotifications is always an array
  const currentNotifications =
    activeTab === "personal"
      ? Array.isArray(notifications)
        ? notifications
        : []
      : Array.isArray(globalNotifications)
      ? globalNotifications
      : [];

  const showEmptyState = currentNotifications.length === 0;

  return (
    <Layout>
      <div className="min-h-screen max-w-4xl mx-auto bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Notifications
              {unreadCount > 0 && activeTab === "personal" && (
                <span className="bg-blue-500 text-white text-sm rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </h1>
            <button
              onClick={toggleMute}
              className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              aria-label={
                isMuted ? "Unmute notifications" : "Mute notifications"
              }
            >
              {isMuted ? (
                <BellOff className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-6">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-4 py-2 font-medium ${
                activeTab === "personal"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Personal
              {unreadCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("global")}
              className={`px-4 py-2 font-medium ${
                activeTab === "global"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Global
            </button>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {activeTab === "personal"
                ? "Your Notifications"
                : "Global Announcements"}
            </h2>
            {activeTab === "personal" && notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="rounded-lg overflow-hidden shadow-sm bg-white dark:bg-zinc-800">
            {showEmptyState ? (
              <div className="p-8 text-center">
                <BellOff className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
                <p className="text-zinc-500 dark:text-zinc-400">
                  No {activeTab === "personal" ? "personal" : "global"}{" "}
                  notifications yet
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {currentNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 ${
                      !notification.read && activeTab === "personal"
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "bg-white dark:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-700">
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3
                            className={`font-medium ${
                              !notification.read && activeTab === "personal"
                                ? "text-blue-600 dark:text-blue-400"
                                : ""
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                          {notification.message}
                        </p>
                        {activeTab === "personal" && (
                          <div className="mt-3 flex gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                              >
                                <Check className="w-3 h-3 inline mr-1" /> Mark
                                as read
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-xs px-3 py-1 rounded-full bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                            >
                              <X className="w-3 h-3 inline mr-1" /> Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;