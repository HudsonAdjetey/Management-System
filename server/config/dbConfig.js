require("dotenv").config();
const mongoose = require("mongoose");

console.log("connecting");
const connectDB = async () => {
  let connectionStr = "";

  const uri = process.env.CONN_STR;
  try {
    const conn = await mongoose.connect(uri);
    if (process.env.NODE_ENV === "development") {
      console.log(`MongoDb connected:  ${conn.connection.host}`);
      connectionStr = "Connected";
    }

    console.log(connectionStr);
  } catch (error) {
    console.log(`Error: ${error?.message || error}`);
    console.log("connection failed");
    // exit with an error
    process.exit(1);
  }
};

module.exports = connectDB;
