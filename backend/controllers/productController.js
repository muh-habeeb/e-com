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
    return res.status(500).json({
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

const fetchProduct = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    return res.status(200).json({
      code: 200,
      request: "success",
      message: `the products `,
      MESSAGE: "PRODUCTS",
      length: products.length,
      data: products,
      page: 1,
      pages: Math.ceil(count.pageSize),
      hasMore: false,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: error.message,
      MESSAGE: "CAN'T_GET_PRODUCTS",
    });
  }
});

//fetch by id
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({
        code: 200,
        request: "success",
        message: "the product",
        MESSAGE: "THE_PRODUCT",
        data: product,
      });
    } else {
      return res.status(404).json({
        request: "success",
        message: "Product not found",
        MESSAGE: "PRODUCT_NOT_FOUND",
      });
    }
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: error.message,
      MESSAGE: "internal server error",
    });
  }
});

// /fetch all product
const fetchAllProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      request: "success",
      message: "all products",
      MESSAGE: "ALL_PRODUCT",
      length: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: error.message,
      MESSAGE: "internal server error",
    });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    console.log('req',req.user);
    
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(200).json({
          code: 400,
          request: "success",
          message: "product already reviewed",
          MESSAGE: "ALREADY_REVIEWED",
          data: [],
        });
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating * acc, 0) /
        product.reviews.length;
      let p = await product.save();
      res.status(201).json({
        code: 201,
        request: "success",
        message: "review added",
        MESSAGE: "REVIEW_ADDED",
        data: p,
      });
    } else {
      return res.status(404).json({
        request: "success",
        message: "product not found",
        MESSAGE: "PRODUCT_NOT_FOUND",
      });
    }
  } catch (error) {
    return res.status(500).json({
      request: "success",
      message: error.message,
      MESSAGE: "internal server error",
    });
  }
});

export {
  addProduct,
  updateProductDetails,
  fetchProduct,
  removeProduct,
  fetchProductById,
  fetchAllProduct,
  addProductReview,
};
