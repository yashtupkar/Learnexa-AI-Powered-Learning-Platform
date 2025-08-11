const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const  authRouter  = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/quizRoutes");
const newsRouter = require("./routes/newsRoute");
const interviewRouter = require("./routes/interviewRoute");
const notificationRouter = require("./routes/notificationRoute");
require("./cornJobs/newsCorn");
require("./cornJobs/resetStreakCron");
const upload = require("./multer/upload"); 
const questionRouter = require("./routes/questionRoutes");
const  transporter  = require("./config/nodemailer");


const app = express();


connectDB();


const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://learnexa.vercel.app",
  "https://www.learnexa.xyz",
  "https://learnexa.xyz",
];
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

// Routes
app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello from Backend");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/news', newsRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/questions', questionRouter);

//for uploading images to claudinary
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("File Uploaded:", req.file); // Debugging

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Return Cloudinary URL instead of local file path
  res.json({
    url: req.file.path, // Cloudinary URL
    public_id: req.file.filename, // Cloudinary public ID
  });
});

//for report issue
// app.post("/api/send-report", upload.single("attachment"), async (req, res) => {
//   try {
//     const { email, issue, issueType } = req.body;
//     const attachment = req.file;

//     const mailOptions = {
//       from: `"User:" <${email}>`,
//       to: process.env.SENDER_EMAIL,
//       subject: `New ${issueType} Report from ${email}`,
//       text: `Email: ${email}\nIssue Type: ${issueType}\n\n${issue}`,
//       html: `
//         <h1>New ${issueType} Report</h1>
//         <p><strong>From:</strong> ${email}</p>
//         <p><strong>Type:</strong> ${issueType}</p>
//         <h3>Description:</h3>
//         <p>${issue.replace(/\n/g, "<br>")}</p>
//       `,
//       attachments: attachment
//         ? [
//             {
//               filename: attachment.originalname,
//               content: attachment.buffer,
//             },
//           ]
//         : [],
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Report submitted successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Failed to send report" });
//   }
// });
app.post("/api/send-report", upload.single("attachment"), async (req, res) => {
  try {
    console.log("=== EMAIL DEBUG START ===");
    console.log("Request body:", req.body);
    console.log(
      "Request file:",
      req.file ? "File uploaded to Cloudinary" : "No file"
    );

    const { email, issue, issueType } = req.body;
    const attachment = req.file;

    // Validate required fields
    if (!email || !issue || !issueType) {
      console.log("Missing required fields:", {
        email: !!email,
        issue: !!issue,
        issueType: !!issueType,
      });
      return res.status(400).json({
        message: "Missing required fields",
        missing: {
          email: !email,
          issue: !issue,
          issueType: !issueType,
        },
      });
    }

    // Check transporter configuration
    console.log("Transporter config check:");
    console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL ? "Set" : "Not set");
    console.log(
      "Email service config:",
      transporter.options ? "Configured" : "Not configured"
    );

    // Log Cloudinary file info if present
    if (attachment) {
      console.log("Cloudinary file info:", {
        filename: attachment.originalname,
        cloudinaryUrl: attachment.path,
        size: attachment.size,
        format: attachment.format,
      });
    }

    const mailOptions = {
      from: `"Website Report System" <${process.env.SENDER_EMAIL}>`, // Your email (site owner)
      replyTo: email, // User's email - so you can reply directly to them
      to: process.env.SENDER_EMAIL,
      subject: `New ${issueType} Report from ${email}`,
      text: `Email: ${email}\nIssue Type: ${issueType}\n\n${issue}${
        attachment ? `\n\nAttachment: ${attachment.path}` : ""
      }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">New ${issueType} Report</h1>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Type:</strong> ${issueType}</p>
          </div>
          <h3 style="color: #333;">Description:</h3>
          <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
            <p>${issue.replace(/\n/g, "<br>")}</p>
          </div>
          ${
            attachment
              ? `
            <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Attachment:</h3>
              <p><strong>File:</strong> ${attachment.originalname}</p>
              <p><strong>Size:</strong> ${(attachment.size / 1024).toFixed(
                2
              )} KB</p>
              <p><strong>View/Download:</strong> <a href="${
                attachment.path
              }" target="_blank" style="color: #007bff; text-decoration: none;">${
                  attachment.originalname
                }</a></p>
              ${
                attachment.mimetype && attachment.mimetype.startsWith("image/")
                  ? `<br><img src="${attachment.path}" alt="${attachment.originalname}" style="max-width: 300px; height: auto; border: 1px solid #ddd; border-radius: 4px;">`
                  : ""
              }
            </div>
          `
              : ""
          }
        </div>
      `,
      // For Cloudinary files, we include the link in the email instead of attaching the file
      // This is more reliable and doesn't increase email size
    };

    console.log("Mail options prepared:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      hasAttachment: !!attachment,
      attachmentUrl: attachment ? attachment.path : null,
    });

    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("=== EMAIL DEBUG END ===");

    res.status(200).json({
      message: "Report submitted successfully!",
      messageId: info.messageId,
      attachmentUrl: attachment ? attachment.path : null,
    });
  } catch (error) {
    console.error("=== EMAIL ERROR ===");
    console.error("Error type:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    console.error("=== EMAIL ERROR END ===");

    // Send more specific error messages
    let errorMessage = "Failed to send report";
    if (error.code === "EAUTH") {
      errorMessage =
        "Email authentication failed. Check your email credentials.";
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Cannot connect to email server. Check your internet connection.";
    } else if (error.responseCode === 550) {
      errorMessage = "Invalid sender email address.";
    }

    res.status(500).json({
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Test route to verify transporter configuration
app.get("/api/test-email-config", async (req, res) => {
  try {
    console.log("Testing email configuration...");

    // Verify transporter
    await transporter.verify();
    console.log("SMTP connection verified successfully!");

    res.status(200).json({
      message: "Email configuration is working!",
      config: {
        host: transporter.options.host,
        port: transporter.options.port,
        secure: transporter.options.secure,
        senderEmail: process.env.SENDER_EMAIL ? "Set" : "Not set",
      },
    });
  } catch (error) {
    console.error("SMTP verification failed:", error);
    res.status(500).json({
      message: "Email configuration failed",
      error: error.message,
    });
  }
});


//cron job for backend render awake
app.get('/ping', (req, res) => {
  res.send('pong');
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
