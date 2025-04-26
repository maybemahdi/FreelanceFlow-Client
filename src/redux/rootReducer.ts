import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";

// Combine all reducers
export const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;