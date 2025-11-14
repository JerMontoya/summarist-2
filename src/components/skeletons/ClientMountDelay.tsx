"use client";
import { useEffect, useState } from "react";

interface Props {
  ms?: number; 
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export default function ClientMountDelay({ ms = 300, fallback, children }: Props) {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowFallback(false), ms);
    return () => clearTimeout(t);
  }, [ms]);

  return <>{showFallback ? fallback : children}</>;
}
