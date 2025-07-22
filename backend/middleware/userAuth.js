const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {


  const authHeader = req.headers.authorization;
 

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid auth header found");
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload?.id) {
      console.log("Token missing required 'id' field");
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // console.log("Authentication successful for user ID:", payload.id);
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
