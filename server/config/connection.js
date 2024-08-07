const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskit"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectDB;
