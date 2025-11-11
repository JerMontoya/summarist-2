import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";
import libraryReducer from "./librarySlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    library: libraryReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
