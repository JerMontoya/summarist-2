"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToLibrary } from "@/lib/store/librarySlice";
import { RootState } from "@/lib/store/store";
import { Book } from "@/app/types";

interface Props {
  book: Book;
}

export default function AddToLibraryButton({ book }: Props) {
  const dispatch = useDispatch();
  const library = useSelector((state: RootState) => state.library.books);
  const isAdded = library.some((b) => b.id === book.id);
  console.log("Current library state:", library);

  const handleAdd = () => {
    if (isAdded) {
      return;
    }
    dispatch(
      addToLibrary({
        id: book.id,
        title: book.title,
        author: book.author,
        imageLink: book.imageLink,
        subscriptionRequired: book.subscriptionRequired,
      })
    );
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdded}
      className={`inner-book__bookmark--text cursor-pointer ${
        isAdded ? "added" : ""
      }`}
      aria-pressed={isAdded}
    >
      {isAdded ? "Added to Library" : "Add to My Library"}
    </button>
  );
}
