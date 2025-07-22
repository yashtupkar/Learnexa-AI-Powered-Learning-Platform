import React, { useContext, useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);

  const userNotifications = async () => {
    try {
      const response = await axios.get(
        `${backend_URL}/api/user/notifications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
  
  }, []);
  

  return (
    <div className="relative">
      <button
        className="group relative p-2 rounded-lg cursor-pointer dark:bg-zinc-800 bg-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 z-50 "
        onClick={(e) => {
         navigate("/notifications");
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
    </div>
  );
}
