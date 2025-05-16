import express from "express";
import Product from "../models/productModel.js";

import asyncHandler from "../middlewares/asyncHandler.js";
//add product
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "name is required",
          MESSAGE: "INVALID_DATA",
        });
      case !description:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "description is required",
          MESSAGE: "INVALID_DATA",
        });
      case !price:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "price is required",
          MESSAGE: "INVALID_DATA",
        });
      case !category:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "category is required",
          MESSAGE: "INVALID_DATA",
        });
      case !quantity:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "quantity is required",
          MESSAGE: "INVALID_DATA",
        });
      case !brand:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "brand is required",
          MESSAGE: "INVALID_DATA",
        });
    }
    const product = new Product({ ...req.fields });
    //saving
    await product.save();

    return res.status(201).json({
      code: 201,
      request: "success",
      message: "new product added",
      MESSAGE: "PRODUCT_ADDED",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      request: "success",
      message: error.message,
    });
  }
});
//update product
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "name is required",
          MESSAGE: "INVALID_DATA",
        });
      case !description:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "description is required",
          MESSAGE: "INVALID_DATA",
        });
      case !price:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "price is required",
          MESSAGE: "INVALID_DATA",
        });
      case !category:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "category is required",
          MESSAGE: "INVALID_DATA",
        });
      case !quantity:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "quantity is required",
          MESSAGE: "INVALID_DATA",
        });
      case !brand:
        return res.status(400).json({
          request: "success",
          message: "invalid data provided",
          error: "brand is required",
          MESSAGE: "INVALID_DATA",
        });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    // save

    await product.save();
    return res.status(201).json({
      code: 201,
      request: "success",
      message: "product data updated",
      MESSAGE: "PRODUCT_UPDATED",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      request: "success",
      message: error.message,
    });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      code: 200,
      request: "success",
      message: `${product.name} removed `,
      MESSAGE: "PRODUCT_DELETED",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: error.message,
      MESSAGE: "CAN'T_DELETE_THE_PRODUCT",
    });
  }
});

export { addProduct, updateProductDetails, removeProduct };
