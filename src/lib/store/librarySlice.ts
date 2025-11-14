import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LibraryBook {
  id: string;
  title?: string;
  author?: string;
  imageLink?: string;
  subscriptionRequired?: boolean;
}

interface LibraryState {
  books: LibraryBook[];
}

const initialState: LibraryState = {
  books: [], 
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToLibrary: (state, action: PayloadAction<LibraryBook>) => {
      const exists = state.books.some((b) => b.id === action.payload.id);
      if (!exists) state.books.unshift(action.payload);
      if (typeof window !== "undefined")
        localStorage.setItem("libraryBooks", JSON.stringify(state.books));
    },
    removeFromLibrary: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((b) => b.id !== action.payload);
      if (typeof window !== "undefined")
        localStorage.setItem("libraryBooks", JSON.stringify(state.books));
    },
    clearLibrary: (state) => {
      state.books = [];
      if (typeof window !== "undefined")
        localStorage.setItem("libraryBooks", JSON.stringify([]));
    },
    loadLibraryFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("libraryBooks");
        if (saved) state.books = JSON.parse(saved);
      }
    },
  },
});

export const { addToLibrary, removeFromLibrary, clearLibrary, loadLibraryFromStorage } =
  librarySlice.actions;
export default librarySlice.reducer;

