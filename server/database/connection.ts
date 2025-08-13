import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const ENABLE_MONGODB = process.env.ENABLE_MONGODB !== "false";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return true;
  }

  if (!ENABLE_MONGODB) {
    console.log("MongoDB disabled - running in localStorage mode");
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.warn(
      "MongoDB connection failed - falling back to localStorage mode:",
      error.message,
    );
    return false;
  }
};

export const disconnectDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
  }
};

export const isMongoDBAvailable = () => {
  if (!ENABLE_MONGODB) {
    return false;
  }
  return isConnected && mongoose.connection.readyState === 1;
};

// Handle process termination
process.on("SIGINT", disconnectDB);
process.on("SIGTERM", disconnectDB);
