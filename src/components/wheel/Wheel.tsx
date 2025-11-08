"use client";

import { Book } from "@/app/types";
import "@/app/for-you/for-you.css";
import { useEffect, useRef } from "react";
import Link from "next/link";

type WheelProps = {
  books: Book[];
};

export default function Wheel({ books }: WheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = wheelRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY * 1.5;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="for-you__recommended--books" ref={wheelRef} >
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/books/${book.id}`}
          className="for-you__recommended--books-link"
        >
          {book.subscriptionRequired && (
            <div className="book__pill book__pill--subscription-required">Premium</div>
          )}
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
        </Link>
      ))}
    </div>
  );
}
