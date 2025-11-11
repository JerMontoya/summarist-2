import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  uid: string | null;
  isLoading: boolean;
  subscription: "basic" | "premium" 
}

const initialState: AuthState = {
  uid: null,
  isLoading: true,
  subscription: "basic",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; subscription?: "basic" | "premium" } | null>
    ) => {
      if (action.payload) {
        state.uid = action.payload.uid;
        state.subscription = action.payload.subscription || "basic";
      } else {
        state.uid = null;
        state.subscription = "basic";
      }
      state.isLoading = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setSubscription: (state, action: PayloadAction<"basic" | "premium">) => {
      state.subscription = action.payload;
    },

    logout: (state) => {
      state.uid = null;
      state.subscription = "basic";
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setSubscription, logout } = authSlice.actions;
export default authSlice.reducer;

