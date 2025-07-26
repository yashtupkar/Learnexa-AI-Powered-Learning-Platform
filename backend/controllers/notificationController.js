const express = require('express');
const Notification = require('../models/notificationModel');

const newNotification = async (req, res) => {
    try {
        const { title, message, isGlobal, targetUsers } = req.body;

        const notification = new Notification({
            title,
            message,
            isGlobal: isGlobal || false,
            targetUsers: targetUsers || [],
            createdAt: new Date()
        });

        await notification.save();

        res.status(201).json({
            success: true,
            notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating notification",
            error: error.message
        });
    }
}


// GET /api/notifications
const fetchNotification = async (req, res) => {
   
  
    const notifications = await Notification.find().sort({ createdAt: -1 });
  
    res.json(notifications);
};


  
module.exports = {
    fetchNotification,
    newNotification
}
  