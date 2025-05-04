import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully! ✅");
    })
    .catch((error) => {
      console.log(`MongoDB NOT connected 😭😭 ${error.message}`);
      process.exit(1);
    });
};

export default connectDB;