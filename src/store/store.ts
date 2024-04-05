import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userApi from "./ApiService/authService";
import { setupListeners } from "@reduxjs/toolkit/query";
import userDetailsApi from "./ApiService/userListing";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [userDetailsApi.reducerPath]: userDetailsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    authReducer.name,
    userApi.reducerPath,
    userDetailsApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat([userApi.middleware])
        .concat([userDetailsApi.middleware]),
  });
};

export const store = setupStore();
setupListeners(store.dispatch);
export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
