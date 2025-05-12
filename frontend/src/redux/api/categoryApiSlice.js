import { apiSlice } from "./apiSlice";

import { CATEGORY_URL } from "../constants";
import { Query } from "mongoose";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //create
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        data: newCategory,
      }),
    }),
    //update
    getCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        // method: "GET",
      }),
    }),
    //update
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        data: updatedCategory,
      }),
    }),
    //delete
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    //GET  ALL CATEGORY
    gatAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`,
        // method:"GET" is this here ?
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGatAllCategoriesQuery,
} = categoryApiSlice;
