"use client";
import { useEffect, useState } from "react";


interface Props {
  audioLink: string;
  storageKeyPrefix?: string; // optional override
}

export default function Duration({
  audioLink,
  storageKeyPrefix = "audioDuration:",
}: Props) {
  const storageKey = `${storageKeyPrefix}${encodeURIComponent(audioLink)}`;
  const [duration, setDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setDuration(null);

    // try to read from localStorage first
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const v = Number(saved);
        if (!isNaN(v) && mounted) {
          setDuration(v);
          setLoading(false);
          return; // no need to load audio
        }
      }
    } catch (e) {
      // ignore localStorage errors
    }

    // load metadata from audio
    const audio = new Audio(audioLink);
    const onLoaded = () => {
      const dur = audio.duration || 0;
      if (!mounted) return;
      setDuration(dur);
      setLoading(false);
      try {
        localStorage.setItem(storageKey, String(dur));
      } catch (e) {}
      // notify same-window listeners
      try {
        window.dispatchEvent(new CustomEvent("audioDurationAvailable", {
          detail: { audioKey: audioLink, duration: dur }
        }));
      } catch (e) {}
      // cleanup audio element to avoid memory leak
      audio.src = "";
    };
    const onError = () => {
      if (!mounted) return;
      setLoading(false);
      audio.src = "";
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);
    // start loading metadata
    audio.preload = "metadata";
    // setting src is done in constructor above; call load just to be sure
    try { audio.load(); } catch (e) {}

    // also listen for storage events or custom events to update if other tab/process sets duration
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce?.detail?.audioKey === audioLink) {
        const v = Number(ce.detail?.duration);
        if (!isNaN(v) && mounted) setDuration(v);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const v = Number(e.newValue);
        if (!isNaN(v) && mounted) setDuration(v);
      }
    };
    window.addEventListener("audioDurationAvailable", onCustom as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      mounted = false;
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
      window.removeEventListener("audioDurationAvailable", onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, [audioLink, storageKey]);

  if (loading) return <div>—</div>;
  if (!duration) return <div>—</div>;

  return <div>{formatTime(duration)}</div>;
}

function formatTime(sec: number) {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
