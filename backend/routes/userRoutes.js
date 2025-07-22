const express = require("express");
const userAuth = require("../middleware/userAuth");
const { getUserData, trackStreak, getAllUsers, allUserAccordingStreak, getNotifications, updateUserProfile } = require("../controllers/userController");

const userRouter = express.Router();


userRouter.get('/data', userAuth, getUserData);
userRouter.post('/track-activity', userAuth, trackStreak);
userRouter.post("/get-all-users", getAllUsers);
userRouter.get("/leaderboard-users", allUserAccordingStreak);
userRouter.get("/notifications", userAuth, getNotifications);
userRouter.put("/update-profile", userAuth, updateUserProfile);



module.exports = userRouter;