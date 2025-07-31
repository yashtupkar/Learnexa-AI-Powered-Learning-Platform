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
const indiabixRouter = require("./routes/indiaBixRoute");
const notificationRouter = require("./routes/notificationRoute");
require("./cornJobs/newsCorn");
require("./cornJobs/resetStreakCron");
const upload = require("./multer/upload"); 


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
app.use('/api/indiabix', indiabixRouter);
app.use('/api/notification', notificationRouter)

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
