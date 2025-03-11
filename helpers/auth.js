import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get JWT secret from environment variables or use a default (only for development)
const JWT_SECRET = process.env.JWT_SECRET || "pricesmart_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "20m";

export const generateToken = (user) => {
  // Create payload with essential user info (avoid including sensitive data like password)
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  // Sign the token with the secret key and set expiration
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null;
  }
};

export const authenticateJWT = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. No token provided.",
    });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  // Attach the user info to the request object
  req.user = decoded;
  next();
};

export default {
  generateToken,
  authenticateJWT,
};
