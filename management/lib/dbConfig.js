"use server";

import mongoose from "mongoose";

console.log("connection");
let isConnected = false;
export const connectToDB = async () => {
  // set strict query mode for mongoose to prevent unknown field queries
  mongoose.set("strictQuery", true);

  if (!process.env.NEXT_PUBLIC_CONN_STR)
    return console.log("Missing Mongodb URL");
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_CONN_STR);
    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};
