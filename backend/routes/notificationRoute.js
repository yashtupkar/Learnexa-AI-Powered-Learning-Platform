const express = require("express");
const { fetchNotification, newNotification } = require("../controllers/notificationController");
const notificationRouter = express.Router();

notificationRouter.get("/fetch-notifications", fetchNotification);
notificationRouter.post("/new-notification", newNotification);

module.exports = notificationRouter;
