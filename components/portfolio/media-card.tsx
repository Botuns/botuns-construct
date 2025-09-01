"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type MediaType = "image" | "video";

export interface MediaItem {
  id: number;
  title: string;
  category: string;
  type: MediaType;
  src: string;
  poster?: string;
  /** aspect classes like aspect-[4/3] or aspect-video */
  aspect?: string;
  /** grid size hint: small | medium | large | tall */
  size?: "small" | "medium" | "large" | "tall";
}

export function MediaCard({
  item,
  onClick,
  className = "",
}: {
  item: MediaItem;
  onClick?: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Pause when off-screen to conserve resources
    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className={`group relative overflow-hidden rounded-none shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)] cursor-pointer bg-slate-900 ${className}`}
    >
      <div className={`relative w-full ${item.aspect ?? "aspect-[4/3]"}`}>
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover will-change-transform transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.22,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
            poster={item.poster}
            onMouseEnter={(e) => {
              if (!prefersReduced) {
                const v = e.currentTarget as HTMLVideoElement;
                v.currentTime = 0;
                v.play().catch(() => {});
              }
            }}
            onMouseLeave={(e) => {
              const v = e.currentTarget as HTMLVideoElement;
              v.pause();
            }}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        )}
        {/* Top gradient sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* Meta */}
      <div className="absolute inset-0 flex items-end p-5">
        <div className="text-white">
          <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-white/10 backdrop-blur-sm text-[10px] uppercase tracking-widest border border-white/10">
            {item.category}
          </span>
          <h4 className="mt-2 text-base md:text-lg font-semibold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            {item.title}
          </h4>
        </div>
      </div>

      {/* Hover chroma accent */}
      <span className="pointer-events-none absolute inset-0 svc-card-gradient" />

      {/* Border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-none border border-white/5 group-hover:border-cyan-300/40 transition-colors duration-500" />
    </div>
  );
}

export default MediaCard;
