"use client";
import MainBars from "@/components/main-bars/MainBars";
import "./library.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RootState } from "@/lib/store/store";
import {
  removeFromLibrary,
  loadLibraryFromStorage,
  LibraryBook,
} from "@/lib/store/librarySlice";

export default function Library() {
  const dispatch = useDispatch();
  const books: LibraryBook[] = useSelector(
    (state: RootState) => state.library.books
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // mark client hydration
    dispatch(loadLibraryFromStorage()); // load saved books
  }, [dispatch]);

  if (!isClient) return null;

  const handleRemove = (id: string) => {
    dispatch(removeFromLibrary(id));
  };

  console.log("Library books in page:", books);

  return (
    <div>
      <MainBars />
      <div className="row">
        <div className="container">
          <div className="for-you__title">Saved Books</div>
          <div className="for-you__sub--title">{books.length} {books.length === 1 ? "Item" : "Items"}</div>
          <div className="saved__books">
            {books.length === 0 ? (
              <p>No books yet — add some from the book page.</p>
            ) : (
              <ul>
                {books.map((b) => (
                  <li key={b.id}>
                    <div className="for-you__recommended--books">
                      <Link href={`/player/${b.id}`}>
                        <figure className="book__image--wrapper">
                          <img
                            className="book__image"
                            src={b.imageLink || "/placeholder.png"}
                            alt={b.title}
                            width={64}
                          />
                        </figure>
                        <div className="recommended__book-title">{b.title}</div>
                        <div className="recommended__book-author">
                          {b.author}
                        </div>
                      </Link>
                    </div>

                    <div>
                      <button
                        className="remove__button"
                        onClick={() => handleRemove(b.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="for-you__title">Finished Books</div>
          <div className="for-you__sub--title"></div>
          <div className="for-you__recommended--books"></div>
        </div>
      </div>
    </div>
  );
}
