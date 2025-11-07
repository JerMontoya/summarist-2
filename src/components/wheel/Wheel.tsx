"use client";

import { Book } from "@/app/types";
import "@/app/for-you/for-you.css";
import { useRef } from "react";

type WheelProps = {
  books: Book[];
};

export default function Wheel({ books }: WheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (wheelRef.current) {
      wheelRef.current.scrollLeft += event.deltaY * 1.5;
    }
  };

  return (
    <div className="for-you__recommended--books" ref={wheelRef} onWheel={handleWheel}>
      {books.map((book) => (
        <div
          key={book.id}
          className="for-you__recommended--books-link"
        >
          <figure className="book__image--wrapper">
            <img
              className="book__image"
              src={book.imageLink ?? "/placeholder.png"}
              alt={book.title}
            />
          </figure>
          <div className="recommended__book-title">{book.title}</div>
          <div className="recommended__book-author">{book.author}</div>
          <div className="recommended__book--sub-title">{book.subTitle}</div>
          <div className="recommended__book--details-wrapper"></div>
        </div>
      ))}
    </div>
  );
}
