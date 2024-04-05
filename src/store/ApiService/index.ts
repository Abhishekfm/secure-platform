import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Error } from "../../types/error";
import { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://reqres.in",
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).authReducer.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("cache", "no-store");
    headers.set("Cache-control", "no-store, max-age=0");

    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, Error>;
