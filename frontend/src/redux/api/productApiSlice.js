import { apiSlice } from "./apiSlice";
import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { Query } from "mongoose";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get product
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    //by id
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        {
          type: "Product",
          id: productId,
        },
      ],
    }),
    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allproducts`,
    }),
    // by id
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    crateProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // upload image
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    //createReview
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data?.productId}/reviews`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5,
    }),

    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        body: { checked, radio },
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAllProductsQuery, //all
  useCrateProductMutation, //create
  useGetProductsQuery, //get product 6
  useGetProductByIdQuery, //get by id
  useGetProductDetailsQuery, //get product details
  useUpdateProductMutation, //update
  useDeleteProductMutation, //delete
  useCreateReviewMutation, //review
  useGetTopProductsQuery, //top
  useGetNewProductsQuery, //new
  useUploadProductImageMutation, //image upload

  useGetFilteredProductsQuery,
} = productApiSlice;
