
// Importing the base API slice and constants
import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

// Injecting category-related endpoints into the base API slice
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for creating a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`, // API endpoint to hit
        method: "POST", // HTTP method
        body: newCategory, // Data to send in request body
        headers: {
          "Content-Type": "application/json", // Specifying data format
        },
      }),
      invalidatesTags: ["Category"], // Invalidate cache to auto-refetch updated category list
    }),

    // Endpoint to get a single category by ID (if needed)
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`, // Endpoint with category ID
        method: "GET", // HTTP method
      }),
      providesTags: ["Category"], // Tag to enable automatic cache tracking
    }),

    // Endpoint to update a category
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`, // Endpoint with category ID
        method: "PUT", // HTTP method
        body: updatedCategory, // Updated category data
        headers: {
          "Content-Type": "application/json", // Specifying data format
        },
      }),
      invalidatesTags: ["Category"], // Invalidate to refetch latest category list
    }),

    // Endpoint to delete a category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`, // Endpoint with category ID
        method: "DELETE", // HTTP method
      }),
      invalidatesTags: ["Category"], // Invalidate cache to refresh list
    }),

    // Endpoint to get all categories
    fetchCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/categories`, // Endpoint for all categories
        method: "GET", // HTTP method
      }),
      providesTags: ["Category"], // Tag for caching and invalidation
    }),
  }),
});

// Exporting auto-generated hooks for each endpoint
export const {
  useCreateCategoryMutation, // Hook to create a category
  useGetCategoryQuery, // Hook to get a category by ID
  useUpdateCategoryMutation, // Hook to update a category
  useDeleteCategoryMutation, // Hook to delete a category
  useFetchCategoriesQuery, // Hook to fetch all categories
} = categoryApiSlice;




// | Line/Feature           | Purpose                                                               |
// | ---------------------- | --------------------------------------------------------------------- |
// | `invalidatesTags`      | Triggers automatic refetch of related queries to reflect fresh data   |
// | `providesTags`         | Tags queries for cache tracking, so invalidation knows what to update |
// | `.mutation`            | Used for POST, PUT, DELETE (i.e., data-changing operations)           |
// | `.query`               | Used for GET requests (i.e., fetching data)                           |
// | `useXYZMutation/Query` | Auto-generated hooks for easy usage in React components               |
