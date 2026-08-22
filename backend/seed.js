import mongoose from "mongoose";
import dotenv from "dotenv";
import { insertDummyData } from "./controllers/adminControllers/masterCollectionController.js";

dotenv.config({ path: "./.env" });
console.log("Mongo URI:", process.env.mongo_uri);
async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.mongo_uri);

    console.log("Connected to MongoDB");

    await insertDummyData();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
  }
}

seedDatabase();