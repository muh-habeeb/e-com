import mongoose from "mongoose";

//database schema structure
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 32,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// const Category = mongoose.model("Category", categorySchema); //crete the model
export default mongoose.model("Category", categorySchema); //crete the model; //export as default so we can use any name anywhere
