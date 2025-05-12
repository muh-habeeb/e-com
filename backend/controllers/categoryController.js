import { request } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        request: "success",
        message: "invalid data provided",
        error: "Name is required",
        MESSAGE: "INVALID_DATA",
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(403).json({
        request: "success",
        message: "category already exist",
        MESSAGE: "ALREADY_EXIST",
      });
    }

    const category = await new Category({ name }).save();

    return res.status(201).json({
      code: 201,
      request: "success",
      message: "new category added",
      MESSAGE: "CATEGORY_ADDED",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
    });
  }
});
//   update category by id

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body; //get name from body
    const { categoryId } = req.params; //get id from url

    const category = await Category.findOne({ _id: categoryId }); ///check for the id
    //if no category found in the id
    if (!category) {
      return res.status(404).json({
        request: "success",
        message: "category not found",
        MESSAGE: "NOT_FOUND",
        code: 404,
      });
    }
    //found then update and save
    category.name = name;
    const updatedCategoryName = await category.save();
    return res.status(201).json({
      code: 201,
      request: "success",
      message: " category updated",
      MESSAGE: "CATEGORY_UPDATED",
      data: updatedCategoryName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
    });
  }
});

//  delete category by id

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    // check the product is presented by teh id

    const isPresent = await Category.findById(categoryId);
    if (!isPresent) {
      return res.status(404).json({
        code: 404,
        request: "success",
        message: "category not found to delete",
        MESSAGE: "NOT_FOUND",
      });
    }

    //store the removed data in a variable
    const removedCategory = await Category.findByIdAndDelete(categoryId);
    //send the success response
    return res.status(200).json({
      code: 200,
      request: "success",
      message: "category deleted successfully",
      MESSAGE: "DELETED",
      data: removedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
    });
  }
});

// list all category

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    return res.status(200).json({
      length: all.length,
      code: 200,
      request: "success",
      message: "all categories",
      MESSAGE: "ALL_CATEGORY",
      data: all,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
    });
  }
});

// /get category detail's by id
const readCategory = asyncHandler(async (req, res) => {
  try {
    const isPresent = await Category.findById(req.params.categoryId);
    if (!isPresent) {
      return res.status(404).json({
        code: 404,
        request: "success",
        message: "category not found",
        MESSAGE: "NOT_FOUND",
      });
    }
    const category = await Category.findOne({ _id: req.params.categoryId });
    // const category = await Category.find({});
    console.log(category);

    return res.status(200).json({
      code: 200,
      request: "success",
      message: "category details",
      MESSAGE: "CATEGORY",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      request: "success",
      message: "Internal server error",
    });
  }
});

export {
  createCategory,
  listCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
