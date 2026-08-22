import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from './routes/adminRoute.js'
import vendorRoute from './routes/venderRoute.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";
// import { insertDummyData } from "./controllers/adminControllers/masterCollectionController.js";

const App = express();


App.use(express.json());
App.use(cookieParser())


dotenv.config({ path: "./backend/.env" });
const port = 3000;

console.log("Mongo URI:", process.env.mongo_uri);

mongoose
  .connect(process.env.mongo_uri)
  .then(async () => {
    console.log("Connected to MongoDB");

    // await insertDummyData();

    console.log("MasterData seeded successfully.");
  })
  .catch((error) => console.error(error));

App.listen(port, () => {
  console.log("server listening !");
});

const allowedOrigins = ['https://rent-a-ride-two.vercel.app', 'http://localhost:5173']; // Add allowed origins here

App.use(
  cors({
    origin: allowedOrigins,
    methods:['GET', 'PUT', 'POST' ,'PATCH','DELETE'],
    credentials: true, // Enables the Access-Control-Allow-Credentials header
  })
);


App.use('*', cloudinaryConfig);

// App.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));


App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin",adminRoute);
App.use("/api/vendor",vendorRoute)



App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});
