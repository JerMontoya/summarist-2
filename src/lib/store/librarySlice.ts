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
  books: [], // start empty to avoid SSR mismatch
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

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface LibraryBook {
//   id: string;
//   title?: string;
//   author?: string;
//   imageLink?: string;
//   subscriptionRequired?: boolean;
// }

// interface LibraryState {
//   books: LibraryBook[];
// }

// // Load saved books from localStorage if available
// const savedBooks = typeof window !== "undefined"
//   ? JSON.parse(localStorage.getItem("libraryBooks") || "[]")
//   : [];

// const initialState: LibraryState = {
//   books: savedBooks,
// };

// const librarySlice = createSlice({
//   name: "library",
//   initialState,
//   reducers: {
//     addToLibrary: (state, action: PayloadAction<LibraryBook>) => {
//       const book = action.payload;
//       const exists = state.books.some((b) => b.id === book.id);
//       if (!exists) {
//         state.books.unshift(book); // add to front
//         localStorage.setItem("libraryBooks", JSON.stringify(state.books));
//       }
//     },
//     removeFromLibrary: (state, action: PayloadAction<string>) => {
//       state.books = state.books.filter((b) => b.id !== action.payload);
//       localStorage.setItem("libraryBooks", JSON.stringify(state.books));
//     },
//     clearLibrary: (state) => {
//       state.books = [];
//       localStorage.setItem("libraryBooks", JSON.stringify([]));
//     },
//   },
// });

// export const { addToLibrary, removeFromLibrary, clearLibrary } = librarySlice.actions;
// export default librarySlice.reducer;