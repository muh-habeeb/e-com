import mongoose from "mongoose";
const MONGO_URI=process.env.MONGO_URI;
if(!MONGO_URI){
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("               DATABASE URL MISSING ")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
      process.exit(1);
}
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

