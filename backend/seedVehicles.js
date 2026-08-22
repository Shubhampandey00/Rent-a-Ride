import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "./models/vehicleModel.js";
import { dummyVehicles } from "./data/dummyVehicles.js";

dotenv.config({ path: "./.env" });
console.log("Mongo URI:", process.env.mongo_uri);

async function seedVehicles() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.mongo_uri);
    console.log("Connected to MongoDB");

    await Vehicle.deleteMany({});
    await Vehicle.insertMany(dummyVehicles);

    console.log(`Inserted ${dummyVehicles.length} dummy vehicles.`);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seedVehicles();
