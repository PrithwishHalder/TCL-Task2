const mongoose = require("mongoose");
const URL = process.env.MONGO_URI;

// MongoDB Connection with Database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(`MongoDB running at ${conn.connection.host}:${conn.connection.port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
