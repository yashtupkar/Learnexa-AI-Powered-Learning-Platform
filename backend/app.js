const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const  authRouter  = require("./routes/authRoutes");

const app = express();


connectDB();


const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Add origin for frontend

// Routes
app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello from Backend");
});

app.use("/api/auth", authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
