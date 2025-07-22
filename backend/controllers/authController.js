const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const transporter = require('../config/nodemailer')
const {EMAIL_VERIFY_TEMPLATE , PASSWORD_RESET_TEMPLATE} = require('../config/emailTemplates')


// const GoogleLogin = async (req, res) => {
//   const { sub, name, email, picture } = req.body;

//   try {
//     if (!sub || !name || !email) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing fields" });
//     }

//     let user = await userModel
//       .findOne({ email })
//       .populate("generatedQuizzes")
//       .populate("attemptedQuizzes");

//     const isNewUser = !user;

//     if (isNewUser) {
//       user = new userModel({
//         googleId: sub,
//         name,
//         email,
//         avatar: picture,
//         isAccountVerified: true,
//         notifications: [],
//       });
//       await user.save();
//     } else if (!user.googleId) {
//       user.googleId = sub;
//       user.name = name;
//       await user.save();
//     }

 
//     if (isNewUser) {
//       user.notifications.push({
//         type: "welcome",
//         title: `🎉Welcome ${name} to Learnexa!`,
//         message:
//           "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
//         createdAt: new Date(),
//         read: false,
//       });
//       await user.save();
//     }

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined in environment variables.");
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     const userObj = user.toObject();

//     delete userObj.password;
//     delete userObj.__v;
//     delete userObj.verifyOtp;
//     delete userObj.verifyOtpExpireAt;
//     delete userObj.resetPassOtp;
//     delete userObj.resetPassOtpExpireAt;
//     delete userObj.isAccountVerified;

//     res.json({
//       success: true,
//       message: "Login successful",
//       token: token,
//       user: userObj,
//     });
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// //User Register Function
// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.json({ success: false, message: "Missing Details" });
//   }
//   try {
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "Email already exists!" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new userModel({
//       email,
//       name,
//       password: hashedPassword,
//       isAccountVerified: false,
//       notifications: [],
//     });

//     // Push welcome notification
//     newUser.notifications.push({
//       type: "welcome",
//       title: `🎉Welcome ${name} to Learnexa!`,
//       message:
//         "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
//       createdAt: new Date(),
//       read: false,
//     });

//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     newUser.verifyOtp = otp;
//     newUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: newUser.email,
//       subject: "Account Verification OTP",
//       html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
//         "{{email}}",
//         newUser.email
//       ),
//     };

//     await transporter.sendMail(mailOptions);

//     const userObj = newUser.toObject();

//     delete userObj.password;
//     delete userObj.__v;
//     delete userObj.updatedAt;
//     delete userObj.createdAt;
//     delete userObj.verifyOtp;
//     delete userObj.verifyOtpExpireAt;
//     delete userObj.resetPassOtp;
//     delete userObj.resetPassOtpExpireAt;
//     delete userObj.isAccountVerified;

//     res.json({
//       success: true,
//       message: "Verification OTP Sent on Email.",
//       token: token,
//       user: userObj,
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// //Login Function
//  const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.json({ success: false, message: "Missing Details" });
//     }
//     try {
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             res.json({success:false, message:"User Not found!"})
//         }
//         const isPassMatch = await bcrypt.compare(password, user.password);

//         if (!isPassMatch) {
//             return res.json({ success: false, message: "Invalid Credentials"});
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//           expiresIn: "7d",
//         });
//         const userObj = user.toObject();

//         delete userObj.password;
//         delete userObj.__v;
//         delete userObj.updatedAt;
//         delete userObj.createdAt;
//         delete userObj.verifyOtp;
//         delete userObj.verifyOtpExpireAt;
//         delete userObj.resetPassOtp;
//         delete userObj.resetPassOtpExpireAt;
//         delete userObj.isAccountVerified;
        
//         return res.json({
//           success: true,
//           message: "Login Successfully!",
//           token: token,
//           user : userObj,
//         });
        

        
//     } catch (error) {
//         res.json({success:false, message:error.message})
        
//     }
// }

//Logout Function

// Fixed username generation functions with better error handling and debugging

const generateUniqueUsername = () => {
  const adjectives = [
    "Stainless", "Brilliant", "Swift", "Crimson", "Golden", "Silent", "Mighty", 
    "Gentle", "Fierce", "Wise", "Bold", "Calm", "Wild", "Noble", "Bright", 
    "Dark", "Ancient", "Modern", "Electric", "Mystic", "Crystal", "Shadow", 
    "Thunder", "Lightning", "Frozen", "Burning", "Shining", "Hidden", "Sacred", 
    "Eternal", "Infinite", "Cosmic", "Digital", "Quantum", "Stellar", "Lunar", 
    "Solar", "Magnetic", "Volcanic", "Arctic", "Tropical", "Urban", "Rural", 
    "Vintage", "Futuristic", "Elegant", "Rugged", "Smooth", "Sharp", "Blazing", 
    "Velvet", "Iron", "Silver", "Platinum", "Diamond", "Neon", "Marble", 
    "Granite", "Copper", "Bronze", "Steel"
  ];

  const qualities = [
    "Kindness", "Courage", "Wisdom", "Honor", "Grace", "Strength", "Peace", 
    "Joy", "Hope", "Faith", "Truth", "Justice", "Freedom", "Unity", "Harmony", 
    "Balance", "Focus", "Clarity", "Vision", "Spirit", "Energy", "Power", 
    "Force", "Light", "Fire", "Storm", "Wave", "Wind", "Earth", "Sky", "Star", 
    "Moon", "Sun", "Dawn", "Dream", "Quest", "Journey", "Adventure", "Discovery", 
    "Wonder", "Magic", "Mystery", "Legend", "Hero", "Champion", "Guardian", 
    "Warrior", "Scholar", "Artist", "Creator", "Builder", "Explorer", "Seeker", 
    "Keeper", "Rider", "Hunter", "Walker", "Runner"
  ];

  const colors = [
    "Azure", "Crimson", "Emerald", "Violet", "Amber", "Indigo", "Scarlet", 
    "Turquoise", "Magenta", "Coral", "Ivory", "Onyx", "Ruby", "Sapphire", 
    "Topaz", "Opal", "Jade", "Pearl", "Rose", "Mint", "Sage", "Lime", 
    "Plum", "Teal"
  ];

  const creatures = [
    "Phoenix", "Dragon", "Tiger", "Eagle", "Wolf", "Bear", "Lion", "Falcon", 
    "Raven", "Hawk", "Panther", "Leopard", "Jaguar", "Griffin", "Kraken", 
    "Sphinx", "Unicorn", "Pegasus", "Hydra", "Basilisk", "Chimera", "Wyvern", 
    "Leviathan", "Gargoyle", "Minotaur"
  ];

  const nature = [
    "Mountain", "Ocean", "Forest", "River", "Valley", "Canyon", "Glacier", 
    "Meadow", "Desert", "Tundra", "Prairie", "Reef", "Volcano", "Cascade", 
    "Grove", "Ridge", "Peak", "Shore", "Oasis", "Fjord", "Plateau", "Cavern", 
    "Lagoon", "Archipelago"
  ];

  const wordSets = [
    [adjectives, qualities],
    [colors, creatures],
    [adjectives, nature],
    [colors, qualities],
    [adjectives, creatures],
    [colors, nature],
  ];

  const selectedSet = wordSets[Math.floor(Math.random() * wordSets.length)];
  const firstWord = selectedSet[0][Math.floor(Math.random() * selectedSet[0].length)];
  const secondWord = selectedSet[1][Math.floor(Math.random() * selectedSet[1].length)];
  const number = Math.floor(Math.random() * 999) + 1;

  const variations = [
    `${firstWord}${secondWord}${number}`,
    `${firstWord}_${secondWord}${number}`,
    `${firstWord}${secondWord}_${number}`,
    `${secondWord}${firstWord}${number}`,
  ];

  return variations[Math.floor(Math.random() * variations.length)];
};

// Fixed function with better error handling and debugging
const generateAndCheckUniqueUsername = async () => {
  let username;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 20; // Increased max attempts

  console.log('Starting username generation...');

  while (!isUnique && attempts < maxAttempts) {
    try {
      username = generateUniqueUsername();
      console.log(`Attempt ${attempts + 1}: Generated username "${username}"`);

      // Check if username already exists in database
      const existingUser = await userModel.findOne({ username });
      console.log(`Database check result:`, existingUser ? 'Username exists' : 'Username available');

      if (!existingUser) {
        isUnique = true;
        console.log(`✓ Unique username found: "${username}" after ${attempts + 1} attempts`);
      } else {
        console.log(`✗ Username "${username}" already exists, trying again...`);
      }
    } catch (error) {
      console.error(`Error during username generation attempt ${attempts + 1}:`, error);
      // Continue to next attempt even if there's an error
    }
    
    attempts++;
  }

  // If still not unique after max attempts, add timestamp and random string
  if (!isUnique) {
    const timestamp = Date.now().toString().slice(-6); // Use more digits
    const randomSuffix = Math.random().toString(36).substring(2, 8); // Add random string
    username = `${generateUniqueUsername()}_${timestamp}_${randomSuffix}`;
    console.log(`⚠️ Max attempts reached. Using fallback username: "${username}"`);
  }

  return username;
};

// Fixed Google Login function
// const GoogleLogin = async (req, res) => {
//   const { sub, name, email, picture } = req.body;

//   try {
//     if (!sub || !name || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Missing required fields: sub, name, or email" 
//       });
//     }

//     console.log(`Google login attempt for email: ${email}`);

//     let user = await userModel
//       .findOne({ email })
//       .populate("generatedQuizzes")
//       .populate("attemptedQuizzes");

//     const isNewUser = !user;
//     console.log(`User status: ${isNewUser ? 'New user' : 'Existing user'}`);

//     if (isNewUser) {
//       console.log('Creating new user...');
//       const uniqueUsername = await generateAndCheckUniqueUsername();
      
//       if (!uniqueUsername) {
//         throw new Error('Failed to generate unique username');
//       }

//       user = new userModel({
//         googleId: sub,
//         name,
//         username: uniqueUsername,
//         email,
//         avatar: picture,
//         isAccountVerified: true,
//         notifications: [],
//       });
      
//       await user.save();
//       console.log(`✓ New user created with username: ${uniqueUsername}`);
      
//     } else {
//       // Handle existing user (regardless of whether they have googleId or not)
//       console.log('Updating existing user...');
      
//       // Update Google ID if not present
//       if (!user.googleId) {
//         user.googleId = sub;
//         console.log('Added Google ID to existing user');
//       }
      
//       // Update name if different
//       if (user.name !== name) {
//         user.name = name;
//         console.log('Updated user name');
//       }

//       // Generate username if missing (this is the key fix)
//       if (!user.username) {
//         console.log('Existing user missing username, generating...');
//         const uniqueUsername = await generateAndCheckUniqueUsername();
        
//         if (!uniqueUsername) {
//           throw new Error('Failed to generate unique username for existing user');
//         }
        
//         user.username = uniqueUsername;
//         console.log(`✓ Username generated for existing user: ${uniqueUsername}`);
//       }
      
//       await user.save();
//       console.log('✓ Existing user updated successfully');
//     }

//     // Add welcome notification for new users
//     if (isNewUser) {
//       user.notifications.push({
//         type: "welcome",
//         title: `🎉Welcome ${name} to Learnexa!`,
//         message: "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
//         createdAt: new Date(),
//         read: false,
//       });
//       await user.save();
//     }

//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined in environment variables.");
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     const userObj = user.toObject();
//     // Remove sensitive fields
//     delete userObj.password;
//     delete userObj.__v;
//     delete userObj.verifyOtp;
//     delete userObj.verifyOtpExpireAt;
//     delete userObj.resetPassOtp;
//     delete userObj.resetPassOtpExpireAt;
//     delete userObj.isAccountVerified;

//     console.log(`✓ Google login successful for user: ${user.username}`);

//     res.json({
//       success: true,
//       message: "Login successful",
//       token: token,
//       user: {
//         ...userObj,
//         avatar: picture,
//        },
//     });

//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || "Internal server error during Google login"
//     });
//   }
// };
const GoogleLogin = async (req, res) => {
  const { sub, name, email, picture } = req.body;

  try {
    if (!sub || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: sub, name, or email",
      });
    }

    console.log(`Google login attempt for email: ${email}`);

    let user = await userModel
      .findOne({ email })
      .populate("generatedQuizzes")
      .populate("attemptedQuizzes");

    const isNewUser = !user;
    console.log(`User status: ${isNewUser ? "New user" : "Existing user"}`);

    if (isNewUser) {
      console.log("Creating new user...");
      const uniqueUsername = await generateAndCheckUniqueUsername();

      if (!uniqueUsername) {
        throw new Error("Failed to generate unique username");
      }

      user = new userModel({
        googleId: sub,
        name,
        username: uniqueUsername,
        email,
        avatar: picture, // Set avatar for new user
        isAccountVerified: true,
        notifications: [],
      });

      await user.save();
      console.log(`✓ New user created with username: ${uniqueUsername}`);
    } else {
      console.log("Updating existing user...");

      // Update Google ID if not present
      if (!user.googleId) {
        user.googleId = sub;
        console.log("Added Google ID to existing user");
      }

      // Update name if different
      if (user.name !== name) {
        user.name = name;
        console.log("Updated user name");
      }

      // Always update avatar from Google (if provided)
      if (picture && user.avatar !== picture) {
        user.avatar = picture;
        console.log("Updated user avatar from Google");
      }

      // Generate username if missing
      if (!user.username) {
        console.log("Existing user missing username, generating...");
        const uniqueUsername = await generateAndCheckUniqueUsername();

        if (!uniqueUsername) {
          throw new Error(
            "Failed to generate unique username for existing user"
          );
        }

        user.username = uniqueUsername;
        console.log(
          `✓ Username generated for existing user: ${uniqueUsername}`
        );
      }

      await user.save();
      console.log("✓ Existing user updated successfully");
    }

    // Add welcome notification for new users
    if (isNewUser) {
      user.notifications.push({
        type: "welcome",
        title: `🎉Welcome ${name} to Learnexa!`,
        message:
          "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
        createdAt: new Date(),
        read: false,
      });
      await user.save();
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userObj = user.toObject();
    // Remove sensitive fields
    delete userObj.password;
    delete userObj.__v;
    delete userObj.verifyOtp;
    delete userObj.verifyOtpExpireAt;
    delete userObj.resetPassOtp;
    delete userObj.resetPassOtpExpireAt;
    delete userObj.isAccountVerified;

    console.log(`✓ Google login successful for user: ${user.username}`);

    res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: userObj, // Use the user object that includes the properly stored avatar
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error during Google login",
    });
  }
};
// Fixed register function
const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }
  
  try {
    console.log(`Registration attempt for email: ${email}`);
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueUsername = await generateAndCheckUniqueUsername();
    
    if (!uniqueUsername) {
      throw new Error('Failed to generate unique username during registration');
    }

    const newUser = new userModel({
      email,
      name,
      username: uniqueUsername,
      password: hashedPassword,
      isAccountVerified: false,
      notifications: [],
    });

    // Push welcome notification
    newUser.notifications.push({
      type: "welcome",
      title: `🎉Welcome ${name} to Learnexa!`,
      message: "We're thrilled to have you here! 🚀 Start exploring the amazing features we've built just for you.",
      createdAt: new Date(),
      read: false,
    });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    newUser.verifyOtp = otp;
    newUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await newUser.save();
    console.log(`✓ User registered successfully with username: ${uniqueUsername}`);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: newUser.email,
      subject: "Account Verification OTP",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", newUser.email),
    };

    await transporter.sendMail(mailOptions);

    const userObj = newUser.toObject();
    // Remove sensitive fields
    delete userObj.password;
    delete userObj.__v;
    delete userObj.updatedAt;
    delete userObj.createdAt;
    delete userObj.verifyOtp;
    delete userObj.verifyOtpExpireAt;
    delete userObj.resetPassOtp;
    delete userObj.resetPassOtpExpireAt;
    delete userObj.isAccountVerified;

    res.json({
      success: true,
      message: "Verification OTP Sent on Email.",
      token: token,
      user: userObj,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Fixed login function
const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }
  
  try {
    console.log(`Login attempt for email: ${email}`);
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not found!" });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    // Check if user needs a username
    if (!user.username) {
      console.log('User missing username, generating...');
      const uniqueUsername = await generateAndCheckUniqueUsername();
      
      if (!uniqueUsername) {
        throw new Error('Failed to generate unique username during login');
      }
      
      user.username = uniqueUsername;
      await user.save();
      console.log(`✓ Username generated for login user: ${uniqueUsername}`);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userObj = user.toObject();
    // Remove sensitive fields
    delete userObj.password;
    delete userObj.__v;
    delete userObj.updatedAt;
    delete userObj.createdAt;
    delete userObj.verifyOtp;
    delete userObj.verifyOtpExpireAt;
    delete userObj.resetPassOtp;
    delete userObj.resetPassOtpExpireAt;
    delete userObj.isAccountVerified;

    console.log(`✓ Login successful for user: ${user.username}`);

    return res.json({
      success: true,
      message: "Login Successfully!",
      token: token,
      user: {
        ...userObj,
        avatar: user.avatar, // Include avatar in response
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: error.message });
  }
};



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


const isAuthenticated = async (req, res) => {
    try {
        
        return res.json({sucess:true})

    } catch (error) {
        res.json({sucess:false, message:error.message})
    }
}

//Send Password Reset OTP
const sendPassResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({success:false, message:"Email is required"})
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Not Found!" });

        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetPassOtp = otp;
        user.resetPassOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Password Reset OTP",
          text: ` Your OTP for resetting you password is  ${otp}. Use this OTP to proceed with resseting your password.`,
          html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
            "{{email}}",
            user.email
          ),
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Reset OTP Sent to your Email." });

        
    } catch (error) {
        return res.json({ success: false, message: error.message});

    }

   
}

 // Reset User Password
 const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP and New password required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
              success: false,
              message: "User not found!",
            });

        }

        if (user.resetPassOtp === '' || user.resetPassOtp !== otp) {
            return res.json({
              success: false,
              message: "Invalid OTP",
            });

        }

        if (user.resetPassOtpExpireAt < Date.now()) {
            return res.json({
              success: false,
              message: "OTP Expired",
            });

        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPassOtp = '';
        user.resetPassOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: "Password has been reset succesfully." });


    } catch (error) {
        return res.json({ success: false, message: error.message});

    }
}


module.exports = {
  register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendPassResetOtp,
    resetPassword,
    GoogleLogin
};