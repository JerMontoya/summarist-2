"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPauseCircle } from "react-icons/fa";
import { FaCirclePlay, FaRotateLeft, FaRotateRight } from "react-icons/fa6";

interface Props {
  audioLink: string;
  title?: string;
  author?: string;
  imageLink?: string;
}

export default function AudioPlayer({ audioLink, title, author, imageLink }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrent(audio.currentTime || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioLink]);

  useEffect(() => {
    // when audioLink changes, reset state
    setIsPlaying(false);
    setDuration(0);
    setCurrent(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [audioLink]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const rewind = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, (audioRef.current.currentTime || 0) - 10);
  };

  const forward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min((duration || 0), (audioRef.current.currentTime || 0) + 10);
  };

  const onSeekStart = () => setSeeking(true);
  const onSeekEnd = (value: number) => {
    if (audioRef.current) audioRef.current.currentTime = value;
    setCurrent(value);
    setSeeking(false);
  };

  return (
    <div className="audio__wrapper">
      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <figure className="book__image--wrapper">
            <img className="book__image" src={imageLink} alt={title} />
          </figure>
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{title}</div>
          <div className="audio__track--author">{author}</div>
        </div>
      </div>

      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={rewind} aria-label="rewind 10s">
            <FaRotateLeft />
          </button>

          <button className="audio__controls--btn audio__controls--btn-play" onClick={togglePlay} aria-label="play/pause">
            {isPlaying ? <FaPauseCircle /> : <FaCirclePlay />}
          </button>

          <button className="audio__controls--btn" onClick={forward} aria-label="forward 10s">
            <FaRotateRight />
          </button>
        </div>
      </div>

      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(current)}</div>

        <input
          type="range"
          className="audio__progress--bar"
          min={0}
          max={duration || 0}
          value={seeking ? current : current}
          step={0.1}
          onMouseDown={onSeekStart}
          onTouchStart={onSeekStart}
          onChange={(e) => setCurrent(Number(e.target.value))}
          onMouseUp={(e) => onSeekEnd(Number((e.target as HTMLInputElement).value))}
          onTouchEnd={(e) => onSeekEnd(Number((e.target as HTMLInputElement).value))}
        />

        <div className="audio__time">{formatTime(duration)}</div>
      </div>

      <audio ref={audioRef} preload="metadata" src={audioLink} />
    </div>
  );
}

// small helper
function formatTime(sec: number) {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
