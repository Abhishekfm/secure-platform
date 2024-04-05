// apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from ".";
import { API_ENDPOINTS } from "../../helper/constant";
import { UserDetailsType, Response } from "../../types";

export const userDetailsApi = createApi({
  reducerPath: "userDetailsApi",
  baseQuery, // Replace 'YOUR_API_BASE_URL' with your actual API base URL
  endpoints: (builder) => ({
    getUserListing: builder.mutation<
      Response<UserDetailsType[]>,
      { page: number }
    >({
      query: ({ page }) => ({
        url: `${API_ENDPOINTS.users}?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetUserListingMutation } = userDetailsApi;
export default userDetailsApi;
