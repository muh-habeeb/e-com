import { apiSlice } from "./apiSlice";
import { ORDERS_URL, RAZORPAY_URL, RAZORPAY_VERIFY_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    createRazorpayOrder: builder.mutation({
      query: (data) => ({
        url: RAZORPAY_URL, // or use RAZORPAY_URL
        method: "POST",
        body: data,
      }),
    }),
    verifyRazorpayOrder: builder.mutation({
      query: (paymentData) => ({
        url: RAZORPAY_VERIFY_URL, // backend verify route
        method: "POST",
        body: paymentData,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
  }),
});

export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useVerifyRazorpayOrderMutation,
  useGetMyOrdersQuery,
  useCreateRazorpayOrderMutation,
  useDeliverOrderMutation,
  useGetOrdersQuery,
} = orderApiSlice;
