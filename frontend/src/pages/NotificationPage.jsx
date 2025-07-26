
import Layout from "../components/layouts/layout";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { userUpdate } from "../redux/authSlice";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [globalNotifications, setGlobalNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [expandedNotifications, setExpandedNotifications] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  

  const { user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);
    const dispatch = useDispatch();

  const fetchGlobalNotifications = async () => {
    try {
      const response = await axios.get(
        `${backend_URL}/api/notification/fetch-notifications`
      );
      setGlobalNotifications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching global notifications:", error);
      setGlobalNotifications([]);
    }
  };

  const userNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backend_URL}/api/user/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const receivedNotifications = response.data.notifications || [];
      setNotifications(receivedNotifications);
      
      if (receivedNotifications.length === 0 && user?.name) {
        addWelcomeNotification();
      } else {
        setUnreadCount(receivedNotifications.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching user notifications:", error);
      if (user?.name) {
        addWelcomeNotification();
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addWelcomeNotification = () => {
    const welcomeNotification = {
      id: 0,
      title: `🎉 Welcome, ${user.name} to Learnexa!`,
      message: "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you. Here are some things you can do:\n\n• Complete your profile to get personalized recommendations\n• Explore courses in your areas of interest\n• Join community discussions\n• Set up your learning goals",
      type: "welcome",
      time: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      read: false,
    };
    setNotifications([welcomeNotification]);
    setUnreadCount(1);
  };

  useEffect(() => {
    userNotifications();
    fetchGlobalNotifications();
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

 const markAsRead = async (id) => {
   try {
     const res = await axios.patch(
       `${backend_URL}/api/user/mark-as-read`,
       { notificationId: id },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "application/json",
         },
       }
     );

     dispatch(
            userUpdate(res.data.user)
          );
    userNotifications();
     setUnreadCount(updated.filter((n) => !n.read).length);
   
   } catch (error) {
     console.error("Error marking notification as read:", {
       message: error.message,
       response: error.response?.data,
       status: error.response?.status,
     });
   }
 };

const deleteNotification = async (id) => {
  try {
    const res =await axios.delete(`${backend_URL}/api/user/delete-notification`, {
      data: { notificationId: id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
   dispatch(
          userUpdate(res.data.user)
        );
    userNotifications();
    setUnreadCount(updated.filter((n) => !n.read).length);
  } catch (error) {
    console.error("Error deleting notification:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
  }
};

const markAllAsRead = async () => {
  try {
    await axios.post(
      `${backend_URL}/api/user/mark-all-notifications-as-read`,
      {}, // Empty body since we only need the userId from the token
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updated);
    setUnreadCount(0);
  } catch (error) {
    console.error("Error marking all notifications as read:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
  }
};



  const toggleExpandNotification = (id) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getIconForType = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "info":
        return <Info className={`${iconClass} text-blue-500`} />;
      case "success":
        return <CheckCircle className={`${iconClass} text-emerald-500`} />;
      case "error":
        return <XCircle className={`${iconClass} text-red-500`} />;
      case "welcome":
        return <Gift className={`${iconClass} text-purple-500`} />;
      case "warning":
        return <AlertTriangle className={`${iconClass} text-amber-500`} />;
      case "news":
        return <Globe className={`${iconClass} text-amber-500`} />;
      case "message":
        return <Mail className={`${iconClass} text-blue-500`} />;
      case "alert":
        return <AlertCircle className={`${iconClass} text-amber-500`} />;
      case "comment":
        return <MessageSquare className={`${iconClass} text-indigo-500`} />;
      default:
        return <Bell className={`${iconClass} text-blue-500`} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-50 dark:bg-blue-900/10";
      case "success":
        return "bg-emerald-50 dark:bg-emerald-900/10";
      case "error":
        return "bg-red-50 dark:bg-red-900/10";
      case "welcome":
        return "bg-purple-50 dark:bg-purple-900/10";
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/10";
      case "news":
        return "bg-amber-50 dark:bg-amber-900/10";
      case "message":
        return "bg-blue-50 dark:bg-blue-900/10";
      case "alert":
        return "bg-amber-50 dark:bg-amber-900/10";
      case "comment":
        return "bg-indigo-50 dark:bg-indigo-900/10";
      default:
        return "bg-blue-50 dark:bg-blue-900/10";
    }
  };

  const formatMessage = (message) => {
    if (!message) return null;
    
    return message.split('\n').map((paragraph, i) => (
      <p key={i} className="mb-2 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const currentNotifications = activeTab === "personal"
    ? Array.isArray(notifications) ? notifications : []
    : Array.isArray(globalNotifications) ? globalNotifications : [];

  const showEmptyState = currentNotifications.length === 0 && !isLoading;

  return (
    <Layout>
      <div className="min-h-screen max-w-4xl mx-auto text-zinc-900 dark:text-zinc-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl  flex items-center gap-2">
                <Bell className="w-6 h-6" />
                Notifications
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {activeTab === "personal"
                  ? "Your personal notifications and alerts"
                  : "Important announcements and updates"}
              </p>
            </div>
           
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-6">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-4 py-2 font-medium flex items-center ${
                activeTab === "personal"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
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
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
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
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-700/50 animate-pulse"
                >
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-600 rounded w-full mb-1"></div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-600 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : showEmptyState ? (
            <div className="p-8 text-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
              <BellOff className="w-12 h-12 mx-auto mb-4 text-zinc-400 dark:text-zinc-500" />
              <h3 className="text-lg font-medium text-zinc-600 dark:text-zinc-300 mb-1">
                No notifications yet
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                {activeTab === "personal"
                  ? "Your personal notifications will appear here when you have new messages, alerts, or updates."
                  : "Check back later for important announcements and updates."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentNotifications.slice().reverse().map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg overflow-hidden transition-all duration-200 ${
                    !notification.read && activeTab === "personal"
                      ? `ring-1 ring-blue-500/30 ${getNotificationColor(
                          notification.type
                        )}`
                      : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600">
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3
                            className={`font-medium truncate ${
                              !notification.read && activeTab === "personal"
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-zinc-900 dark:text-zinc-100"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap ml-2">
                            {notification.time}
                          </span>
                        </div>

                        <div
                          className={`text-sm text-zinc-600 dark:text-zinc-300 mt-1 ${
                            expandedNotifications[notification.id]
                              ? ""
                              : "line-clamp-3"
                          }`}
                          onClick={() =>
                            toggleExpandNotification(notification.id)
                          }
                        >
                          {formatMessage(notification.message)}
                        </div>

                        {notification.message &&
                          notification.message.split("\n").length > 2 && (
                            <button
                              onClick={() =>
                                toggleExpandNotification(notification.id)
                              }
                              className="text-xs mt-1 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                            >
                              {expandedNotifications[notification.id] ? (
                                <>
                                  <ChevronDown className="w-3 h-3 mr-1" /> Show
                                  less
                                </>
                              ) : (
                                <>
                                  <ChevronRight className="w-3 h-3 mr-1" /> Read
                                  more
                                </>
                              )}
                            </button>
                          )}

                        {activeTab === "personal" && (
                          <div className="mt-3 flex gap-2 flex-wrap">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                Mark as read
                              </button>
                            )}

                            {notification.type !== "welcome" && (
                              <button
                                onClick={() =>
                                  deleteNotification(notification._id)
                                }
                                className="text-xs px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 transition-colors flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Dismiss
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;