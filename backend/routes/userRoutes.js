const express = require("express");
const userAuth = require("../middleware/userAuth");
const { getUserData, trackStreak, getAllUsers, allUserAccordingStreak, getNotifications, updateUserProfile, getUserDetails, updateAvatar, deleteNotification, markAllNotificationsAsRead, markAsRead, newNotification } = require("../controllers/userController");

const userRouter = express.Router();


userRouter.get('/data', userAuth, getUserData);
userRouter.get("/user-details", userAuth, getUserDetails);
userRouter.post('/track-activity', userAuth, trackStreak);
userRouter.post("/get-all-users", getAllUsers);
userRouter.get("/leaderboard-users", allUserAccordingStreak);
userRouter.get("/notifications", userAuth, getNotifications);
userRouter.put("/update-profile", userAuth, updateUserProfile);
userRouter.patch("/update-avatar", userAuth, updateAvatar);
userRouter.patch("/mark-as-read", userAuth, markAsRead);
userRouter.post("/new-notification", userAuth, newNotification);
userRouter.delete("/delete-notification", userAuth, deleteNotification);
userRouter.post("/mark-all-notifications-as-read", userAuth, markAllNotificationsAsRead);



module.exports = userRouter;