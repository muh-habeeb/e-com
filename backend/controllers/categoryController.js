import { request } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import genToken from "../utils/userToken.js";
import mongoose from "mongoose";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(403)
        .json({ request: "success",message:"invalid data provided",error:'Name is required', MESSAGE: "INVALID_DATA" });
    }

    const existingCategory = await Category.find({ name });
    if (existingCategory) {
      return res
        .status(403)
        .json({ request: "success",message:"category already exist", MESSAGE: "ALREADY_EXIST" });
    }
    const  category=await new Category({name}).save()
    res.status(201).json({ request: "success",message:'new category added', MESSAGE: "PRODUCT_ADDED",data:category });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

export { createCategory };
