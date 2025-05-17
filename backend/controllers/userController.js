const express = require('express');
const userModel = require('../models/userModel');

const getUserData = async (req, res) => {
    const { userId } = req.body;
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

module.exports = {
    getUserData
};