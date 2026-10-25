
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import vendorRoute from "./routes/venderRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";

// Load environment variables
dotenv.config({ path: "./backend/.env" });

const App = express();
const port = Number(process.env.PORT) || 3001;

// Middleware
App.use(express.json());
App.use(cookieParser());

// Allowed frontend origins
const allowedOrigins = [
  "https://rent-a-ride-tan.vercel.app",
  "https://rent-a-ride-kgn1306eb-shubham-projects4.vercel.app",
  "http://localhost:5173",
];

// CORS configuration
App.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as server-to-server requests.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Cloudinary middleware
App.use("*", cloudinaryConfig);

// API routes
App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin", adminRoute);
App.use("/api/vendor", vendorRoute);

// Error-handling middleware
App.use((err, req, res, next) => {
  console.error("Backend error:", err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});

// Start server
const server = App.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Stop the other backend process or set a different PORT in backend/.env.`
    );
    process.exitCode = 1;
    return;
  }

  console.error("Failed to start the backend:", error);
  process.exitCode = 1;
});

// Connect to MongoDB
mongoose
  .connect(process.env.mongo_uri)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
