const express = require('express');
const userModel = require('../models/userModel');
const {
  getCurrentIndianDate,
  isConsecutiveDay,
  isSameDay,
} = require("../utils/dateUtils");


const getUserData = async (req, res) => {
    const { userId } = req.user;
    if (!userId) {
        return res.json({ success: false, message: "User Id not found" });
    }
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found !" });
        }
          
        res.json({
          success: true,
          userData: {
            email: user.email,
              isAccountVerified: user.isAccountVerified,
              avatar:user.avatar
          },
        });

        
    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

const getUserDetails = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.json({ success: false, message: "User Id not found" });
  }
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found !" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const allUserAccordingStreak = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("name username avatar currentStreak _id")
      .sort({ currentStreak: -1 }); // -1 for descending order
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const trackStreak = async (req, res) => {
  try {
    const { activity } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Get today's date in IST (normalized to midnight)
    const todayIST = getCurrentIndianDate();

    // Check if today's date is already logged
    const alreadyLogged = user.activeDates.some((activeDate) => {
      const activeDateIST = getCurrentIndianDate(new Date(activeDate));
      return activeDateIST.getTime() === todayIST.getTime();
    });

    // If already logged today, return current streak info
    if (alreadyLogged) {
      return res.json({
        success: true,
        message: "Already logged for today",
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        activeDates: user.activeDates,
        streakHistory: user.streakHistory,
      });
    }

    // If no activity flag from frontend, skip update
    if (!activity) {
      return res.json({
        success: true,
        updated:false,
        message: "No activity provided — streak not updated",
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        activeDates: user.activeDates,
        streakHistory: user.streakHistory,
      });
    }

    // ---- Explicit Activity ----
    user.activeDates.push(new Date()); // store as UTC

    const lastActivityIST = user.lastActivityDate
      ? getCurrentIndianDate(new Date(user.lastActivityDate))
      : null;

    // Streak update logic
    if (!lastActivityIST) {
      user.currentStreak = 1;
    } else if (isConsecutiveDay(lastActivityIST, todayIST)) {
      user.currentStreak++;
    } else {
      // Save previous streak to history if > 1
      if (user.currentStreak > 1) {
        const streakStart = new Date(
          new Date(lastActivityIST).setDate(
            lastActivityIST.getDate() - user.currentStreak + 1
          )
        );
        user.streakHistory.push({
          startDate: streakStart,
          endDate: lastActivityIST,
          length: user.currentStreak,
        });
      }
      user.currentStreak = 1; // reset streak
    }

    // Update longest streak if needed
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    user.lastActivityDate = new Date(); // save now in UTC
    await user.save();

    return res.json({
      success: true,
      message: "Streak updated successfully",
      updated:true,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      activeDates: user.activeDates,
      streakHistory: user.streakHistory,
    });
  } catch (error) {
    console.error("Track Streak Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//get users notifications
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID not found" });
    }

    const user = await userModel.findById(userId).select("notifications");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, notifications: user.notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//update user profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, username } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID not found" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { userId } = req.user;
    const { avatar } = req.body;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar" });
  }
};

//to push notification to user
const newNotification = async (req,res) => {
  try {
    const { notification } = req.body;
    const {userId} = req.user;
    const user = await userModel.findById(userId);
    if (!user) {    
      res.json("User not found for notification:", userId);
      return;
    }
    user.notifications.push(notification);
    await user.save();  
  } catch (error) {
    res.json("Error pushing notification:", error);
  }
};

//to update notification to read
const markAsRead = async (req, res) => {
  const { userId } = req.user;
  const { notificationId } = req.body;

  if (!userId || !notificationId) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    notification.read = true;
    await user.save();

    res.json({ success: true, user, message: "Notification marked as read" });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

//to delete notification
const deleteNotification = async (req, res) => {
  const { userId } = req.user;
  const { notificationId } = req.body;

  if (!userId || !notificationId) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    user.notifications.pull(notificationId);
    await user.save();

    res.json({ success: true, user, message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//to mark all as read
const markAllNotificationsAsRead = async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID not found" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.notifications.forEach(notification => {
      notification.read = true;
    });

    await user.save();

    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//to insert youtubeApiKey
const addYoutubeApiKey = async (req, res) => {
  try {
    const { userId } = req.user;
    const { youtubeApiKey } = req.body;

    if (!userId || !youtubeApiKey) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const user = await userModel.findById(userId);
     if (!user) {
       return res
         .status(404)
         .json({ success: false, message: "User not found" });
     }
    if (user.youtubeApiKey) {
       res.json("api key is already saved")
    }
    else {
          user.youtubeApiKey = youtubeApiKey;

    }
    user.save();
    res.json({
      success: true,
      message: "Api saved successfully",
      user
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getUserData,
  getUserDetails,
  getAllUsers,
  allUserAccordingStreak,
  trackStreak,
  getNotifications,
  updateUserProfile,
  updateAvatar,
  deleteNotification,
  markAsRead,
  newNotification,
  addYoutubeApiKey,
  markAllNotificationsAsRead
};