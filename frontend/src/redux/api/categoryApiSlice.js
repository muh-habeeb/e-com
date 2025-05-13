// import { apiSlice } from "./apiSlice";

// import { CATEGORY_URL } from "../constants";
// import { Query } from "mongoose";

// export const categoryApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     //create
//     createCategory: builder.mutation({
//       query: (newCategory) => ({
//         url: `${CATEGORY_URL}`,
//         method: "POST",
//         data: newCategory,
//       }),
//     }),
//     //update
//     getCategory: builder.mutation({
//       query: (categoryId) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//         // method: "GET",
//       }),
//     }),
//     //update
//     updateCategory: builder.mutation({
//       query: ({ categoryId, updatedCategory }) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//         method: "PUT",
//         data: updatedCategory,
//       }),
//     }),
//     //delete
//     deleteCategory: builder.mutation({
//       query: (categoryId) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//         method: "DELETE",
//       }),
//     }),
//     //GET  ALL CATEGORY
//     gatAllCategories: builder.query({
//       query: () => ({
//         url: `${CATEGORY_URL}/categories`,
//         // method:"GET" is this here ?
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateCategoryMutation,
//   useGetCategoryMutation,
//   useUpdateCategoryMutation,
//   useDeleteCategoryMutation,
//   useGatAllCategoriesQuery,
// } = categoryApiSlice;
import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Get single category by ID (if needed)
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "GET",
      }),
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),

    // Get all categories
    gatAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGatAllCategoriesQuery,
} = categoryApiSlice;
