const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  console.log("\n=== New Request ===");
  console.log("Endpoint:", req.originalUrl);
  console.log("Method:", req.method);

  const authHeader = req.headers.authorization;
  console.log("Raw Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid auth header found");
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET ? "exists" : "missing");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Payload:", payload);

    if (!payload?.id) {
      console.log("Token missing required 'id' field");
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    console.log("Authentication successful for user ID:", payload.id);
    req.user = { userId: payload.id };
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);

    let message = "Authentication failed";
    if (error instanceof jwt.TokenExpiredError) {
      message = "Token expired";
      console.log("Token expired at:", error.expiredAt);
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Invalid token";
    }

    return res.status(401).json({
      success: false,
      message: message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = userAuth;
