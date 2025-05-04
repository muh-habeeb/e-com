import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt, { hash } from "bcryptjs";
import genToken from "../utils/userToken.js";
import { request } from "express";
import mongoose from "mongoose";

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

// get user by id

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res
      .status(200)
      .json({ request: "success", message: "user data", data: { user } });
  } else {
    res.status(404).json({
      request: "success",
      message: `User not found with id: ${req.params.id}`,
    });
  }
});
//delete user by id from params

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
// export {getAllUser,getUserById,deleteUserById,updateUserById}
