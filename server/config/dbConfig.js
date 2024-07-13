require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.CONN_STR;
  try {
    const conn = await mongoose.connect(uri);
    if (process.env.NODE_ENV === "development") {
      console.log(`MongoDb connected:  ${conn.connection.host}`);
    }
  } catch (error) {
    console.log(`Error: ${error?.message || error}`);
    // exit with an error
    process.exit(1);
  }
};

module.exports = connectDB
