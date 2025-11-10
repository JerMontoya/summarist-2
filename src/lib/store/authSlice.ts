// lib/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  uid?: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  uid: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
