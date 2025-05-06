import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt, { hash } from "bcryptjs";
import genToken from "../utils/userToken.js";
import { request } from "express";
import mongoose from "mongoose";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body; //destructure the data we want from body
  if (!username || !email || !password) {
    //no data is present show error
    throw new Error("All fields  are required!!");
  }
  const userExist = await User.findOne({ email }); //check for thw user is exist in the mail
  if (userExist) {
    //if user exist - show error
    res.status(400).json({
      request: "success",
      message: "User already exists",
      MESSAGE: "USER_EXIST_WITH_THE_EMAIL",
    });
    return;
  }

  //hash password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create user with passing the values we got from body and hashed password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const { username, password, _id, email, isAdmin } = await newUser.save(); // save the user data and  destructuring  for future use new user
    genToken(res, newUser._id); //generate  jwt token and send to user with response token as OBJ id
    res.status(201).json({
      request: "success",
      message: "OK",
      MESSAGE: "NEW_USER_CREATED",
      // //show data to response
      id: _id,
      username: username,
      email: email,
      password: password,
      isAdmin: isAdmin, 
    });
  } catch (error) {
    //errors
    res.status(400);
    throw new Error("invalid user data");
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //get the data from body
  const existsUser = await User.findOne({ email }); //check in the database for the user and get full data
  if (existsUser) {
    const isPasswordValid = await bcrypt.compare(password, existsUser.password); //verify the password with database existing password

    //if true
    if (isPasswordValid) {
      //  generate jwt token with the user OBJ id
      genToken(res, existsUser._id);
      const { _id, username, password, email, isAdmin } = existsUser; //destructuring  for future use existing user
      //show response
      res.status(200).json({
        request: "success",
        message: "OK",
        MESSAGE: "LOGIN_SUCCESS",

        id: _id,
        username: username,
        email: email,
        // password: password,
        isAdmin: isAdmin,
      });
      return; //exit the function after sending response
    } else {
      // show if the password is wrong
      res.status(404).json({
        request: "success",
        message: "password is wrong",
        MESSAGE: "WRONG_PASSWORD",
        code: 404,
      });
    }
  } else {
    res.status(404).json({
      request: "success",
      message: "user dose not exist",
      MESSAGE: "NO_USER",
      code: 404,
    });
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//log out controller [function to logout]
const logOutCurrentUser = asyncHandler(async (req, res) => {
  //change the jwt data to null
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ request: "success", message: "User Logged Out Successfully " });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//function to get all users data to the admin
const getAllUser = asyncHandler(async (req, res) => {
  //fetch all the users from DB
  const users = await User.find({});
  //print it to the console
  res.status(200).json({
    request: "success",
    message: "ALL USER DATA",
    length: users.length,
    data: users,
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//get current user details
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, username, email } = user;
    res.status(200).json({
      request: "success",
      message: "current user Data",
      data: {
        _id,
        username,
        email,
      },
    });
  } else {
    res.status(404).json({
      request: "success",
      message: "User Not Found",
    });
    throw new Error("User not found. (from handler");
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// /update current user
const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //check the  user is provided nad exist in db

  if (user) {
    //check for user
    user.username = req.body.username || user.username; //if new value found add to var else old value
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword; //if new value found add to var else old value
    }

    const updatedUser = await user.save(); //update the user and save
    const { _id, username, email, password, isAdmin } = updatedUser;

    res.status(201).json({
      request: "success",
      message: " Updated current User Data",
      data: {
        _id,
        username,
        email,
        password,
        isAdmin,
      },
    });
  } else {
    res.status(404).json({
      request: "success",
      message: "User not found to update",
    });
    throw new Error("User Not Found to Update");
  }
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//delete user by id from params

const deleteUserById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res
      .status(400)
      .json({ request: "success", message: "not a valid user id" });
  } else {
    // if id is valid
    const user = await User.findById(req.params.id);
    if (user) {
      const { _id: id, username } = user;
      //check is the id is admin or not
      if (user.isAdmin) {
        res
          .status(400)
          .json({ request: "success", message: "cannot delete admin user" });
        return;
      }

      //else
      await user.deleteOne({ _id: id });
      res.status(201).json({
        request: "success",
        message: `${username} removed successfully`,
      });
    } else {
      res.status(404).json({
        request: "success",
        message: ` user with  id :${req.params.id} is not found`,
      });
    }
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// get user by id

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      request: "success",
      message: "user data from admin",
      data: { user },
    });
  } else {
    res.status(404).json({
      request: "success",
      message: `User not found with id: ${req.params.id}`,
    });
  }
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//update user by id for admin

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    //assign data to vars
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    // user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;
    user.isAdmin = Boolean(req.body.isAdmin);
    // waiting to updated the user

    const updatedUser = await user.save();

    res.status(200).json({
      request: "success",
      message: "updated user data from admin side",
      data: updatedUser,
    });
  } else {
    res.status(404).json({
      request: "success",
      message: `User not found with id: ${req.params.id}`,
    });
  }
});
//export the functions to use in other files
export {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
};
