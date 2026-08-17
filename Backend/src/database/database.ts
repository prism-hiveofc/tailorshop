import mongoose from "mongoose";
import { ENV } from "../config/env";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed");

    process.exit(1);
  }
};