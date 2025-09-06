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
    //register end point
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}`,
        method: "POST",
        body: data,
      }),
    }),

    //profile
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    //get users for admin user
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URI}`,
        method:"GET"
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    //delete users for admin user
    deleteUser: builder.mutation({
      query: (userId) => ({
        // eslint-disable-next-line no-undef
        url: `${USERS_URI}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URI}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    //update user by id for admin
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

//making login end point url
// http://localhost:9999/api/users/auth

//  use${Login}Mutation
//hooked
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = userApiSlice;
