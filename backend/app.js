const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const  authRouter  = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/quizRoutes");

const app = express();


connectDB();


const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];
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
    methods: "GET, POST, PUT, DELETE, OPTIONS",
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
