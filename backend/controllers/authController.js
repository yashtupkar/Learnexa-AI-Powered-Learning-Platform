const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const transporter = require('../config/nodemailer')



//User Register Function
 const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({success:false, message:"Email already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            email, 
            password: hashedPassword
        })

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, }, process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Quiz platform",
            text:`Welcome to quiz app. Your Account been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);

        res.json({success:true, message:"User Registration successfully"})

        
    } catch (error) {
      res.json({success:false, message:error.message})
    }
}


//Login Function
 const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({success:false, message:"User Not found!"})
        }
        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.json({ success: false, message: "Invalid Credentials"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        return res.json({ success: true, message: "Login Successfully!" });

        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}

//Logout Function
 const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        res.json({success:true, message:"Logout Successfully!"})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
    
} 


//send verification otp
const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.json({
                success: false,
                message:"Account Already Verified"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();
        
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Account Verification OTP",
          text: `Your OTP is ${otp}. Verify your account using the OTP.`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Verification OTP Sent on Email." });

        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}


//Verify otp
const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User Not Found!" });

        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });

        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });

        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return  res.json({ success: true, message: "Email Verified succesfully" });


        
    } catch (error) {
        return res.json({ success: false, message: error.message});

    }
}
