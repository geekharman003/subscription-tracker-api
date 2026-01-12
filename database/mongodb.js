import mongoose from "mongoose";

if (!process.env.DB_URI) {
  throw new Error("please define DB_URI as a environment variable");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
