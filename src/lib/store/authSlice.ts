import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  uid?: string | null;
  isLoading: boolean;
  subscription: "basic" | "premium" | null; 
}

const initialState: AuthState = {
  uid: null,
  isLoading: true,
  subscription: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; subscription?: "basic" | "premium" }>
    ) => {
      state.uid = action.payload.uid;
      state.subscription = action.payload.subscription || null;
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
      state.subscription = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setSubscription, logout } = authSlice.actions;
export default authSlice.reducer;
//   reducers: {
//     setUser: (state, action: PayloadAction<string | null>) => {
//       state.uid = action.payload;
//       state.isLoading = false;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//   },
// });

// export const { setUser, setLoading } = authSlice.actions;
// export default authSlice.reducer;
