import mongoose from "mongoose";

//database schema structure
const userSchema = mongoose.Schema(
  {
    username: {
      type: String, 
      required: true,
    },
    email: {
      type: String,
      requires: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, //set to false can be change from DB
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); //crete the model
export default User; //export as default so we can use any name anywhere
