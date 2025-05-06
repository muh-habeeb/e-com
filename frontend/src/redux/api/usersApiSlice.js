import { apiSlice } from "./apiSlice";

import { USERS_URI } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  //user api endpoints 
  endpoints: (builder) => ({
    //login end point
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    //logout end point
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/logout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

//making login end point url
// http://localhost:9999/api/users/auth

//  use${Login}Mutation
export const { useLoginMutation,useLogoutMutation } = userApiSlice;
