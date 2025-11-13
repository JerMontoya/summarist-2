"use client";
import { useState } from "react";

interface FontSizeSelectorProps {
  storageKey?: string;
}

export default function FontSizeSelector({ storageKey = "readingFontSize" }: FontSizeSelectorProps) {
  const sizes = [
    { label: "Aa", size: 16, className: "sidebar__font--size-icon-small" },
    { label: "Aa", size: 24, className: "sidebar__font--size-icon-medium" },
    { label: "Aa", size: 32, className: "sidebar__font--size-icon-large" },
    { label: "Aa", size: 40, className: "sidebar__font--size-icon-xlarge" },
  ];

  const initial = typeof window !== "undefined" ? Number(localStorage.getItem(storageKey)) || 32 : 32;
  const [selectedSize, setSelectedSize] = useState<number>(initial);

  const setSize = (size: number) => {
    setSelectedSize(size);
    try {
      localStorage.setItem(storageKey, String(size));
    } catch (e) {
    }
    window.dispatchEvent(new CustomEvent("readingFontSizeChange", { detail: { size } }));
  };

  return (
        <div className="sidebar__link--wrapper sidebar__font--size-wrapper" role="group" aria-label="Text size">
      {sizes.map((s) => (
        <button
          key={s.size}
          className={`sidebar__font--size-icon ${s.className} ${selectedSize === s.size ? "sidebar__font--size-icon--active" : ""}`}
          onClick={() => setSize(s.size)}
          aria-pressed={selectedSize === s.size}
          title={`Set text size ${s.size}px`}
          type="button"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
