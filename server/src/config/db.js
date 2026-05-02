import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("Trying MongoDB connection...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("MongoDB FAILED:", error.message);
    process.exit(1);
  }
};

export default connectDb;