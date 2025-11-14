"use client";

import { Book } from "@/app/types";
import "@/app/for-you/for-you.css";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Duration from "../Duration";
import { FaRegClock, FaRegStar } from "react-icons/fa";

type WheelProps = {
  books: Book[];
};

export default function Wheel({ books }: WheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = wheelRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let acc = 0;
    let ticking = false;

    const normalizeDelta = (raw: number, mode: number) => {
      if (mode === 1) return raw * 16;
      if (mode === 2) return raw * container.clientHeight;
      return raw;
    };

    const applyScroll = () => {
      rafId = null;
      ticking = false;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const next = Math.max(
        0,
        Math.min(maxScrollLeft, container.scrollLeft + acc)
      );
      container.scrollLeft = next;
      acc = 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      let delta = absX > absY ? e.deltaX : e.deltaY;

      delta = normalizeDelta(delta, e.deltaMode);

      const JITTER_THRESHOLD = 0.05;
      if (Math.abs(delta) < JITTER_THRESHOLD) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const atStart = container.scrollLeft <= 0;
      const atEnd = container.scrollLeft >= maxScrollLeft - 1;

      const wantsLeft = delta < 0;
      const wantsRight = delta > 0;

      if ((atStart && wantsLeft) || (atEnd && wantsRight)) {
        return;
      }

      e.preventDefault();

      const MULTIPLIER = 4.0;
      let step = delta * MULTIPLIER;
      const MIN_STEP = 2;
      if (Math.abs(step) < MIN_STEP) step = Math.sign(step) * MIN_STEP;

      acc += step;

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(applyScroll);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="for-you__recommended--books" ref={wheelRef}>
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/books/${book.id}`}
          className="for-you__recommended--books-link"
        >
          {book.subscriptionRequired && (
            <div className="book__pill book__pill--subscription-required">
              Premium
            </div>
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
          <div className="recommended__book--details-wrapper">
            <div className="recommended__book--details">
              <div className="recommended__book--details-icon">
                <FaRegClock className="recommended__book--details-icon svg" />
              </div>
              <div>
                <Duration audioLink={book.audioLink} />
              </div>
            </div>
            <div className="recommended__book--details">
              <div className="recommended__book--details-icon">
                <FaRegStar className="recommended__book--details-icon svg" />
              </div>
              <div>{book.averageRating}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
