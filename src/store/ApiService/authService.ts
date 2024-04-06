// apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from ".";
import { API_ENDPOINTS } from "../../helper/constant";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResp {
  // Define the structure of user profile data
  token: string;
  error?: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery, // Replace 'YOUR_API_BASE_URL' with your actual API base URL
  endpoints: (builder) => ({
    login: builder.mutation<LoginResp, LoginCredentials>({
      query: ({ email, password }) => ({
        url: API_ENDPOINTS.login,
        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    signUp: builder.mutation<LoginResp, LoginCredentials>({
      query: ({ email, password }) => ({
        url: API_ENDPOINTS.signUp,
        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = userApi;
export default userApi;
