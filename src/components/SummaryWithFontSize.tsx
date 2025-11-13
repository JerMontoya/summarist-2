"use client";
import { useEffect, useState } from "react";
import "./font-size/FontSize.css"

interface Props {
  title?: string;
  summary: string;
  storageKey?: string;
  defaultSize?: number;
}

export default function SummaryWithFontSize({ title, summary, storageKey = "readingFontSize", defaultSize = 32 }: Props) {
  const [fontSize, setFontSize] = useState<number>(defaultSize);

  useEffect(() => {
    try {
      const fromStorage = Number(localStorage.getItem(storageKey));
      if (fromStorage && !isNaN(fromStorage)) setFontSize(fromStorage);
    } catch (e) {
    }

    const onCustom = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce?.detail?.size) setFontSize(Number(ce.detail.size));
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        const v = Number(e.newValue);
        if (!isNaN(v)) setFontSize(v);
      }
    };

    window.addEventListener("readingFontSizeChange", onCustom as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("readingFontSizeChange", onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, [storageKey]);

  return (
    <div className="audio__book--summary">
      {title && <div className="audio__book--summary-title">{title}</div>}
      <div className="audio__book--summary-text" style={{ fontSize: `${fontSize}px` }}>
        {summary}
      </div>
    </div>
  );
}
