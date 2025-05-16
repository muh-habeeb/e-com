import express from "express";
import Product from "../models/productModel.js";

import asyncHandler from "../middlewares/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    if (!name) {
      return res.status(400).json({
        request: "success",
        message: "invalid data provided",
        error: "form data is required ",
        MESSAGE: "INVALID_DATA",
      });
    }

    // const existingCategory = await Category.findOne({ name });
    // if (existingCategory) {
    //   return res.status(403).json({
    //     request: "success",
    //     message: "category already exist",
    //     MESSAGE: "ALREADY_EXIST",
    //   });
    // }

    // // const category = await new Category({ name }).save();

    // return res.status(201).json({
    //   code: 201,
    //   request: "success",
    //   message: "new category added",
    //   MESSAGE: "CATEGORY_ADDED",
    //   data: category,
    // });
    res.send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
    });
  }
});

export { addProduct };
