import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationStoreType {
  token: string;
  loading: boolean;
}

const initialState: ApplicationStoreType = {
  token: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.token = "";
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setToken, deleteToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
