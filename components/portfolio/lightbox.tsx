"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { MediaItem } from "./media-card";

export default function Lightbox({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item?: MediaItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-12 right-0 text-white/80 hover:text-white text-sm tracking-widest"
          onClick={onClose}
        >
          CLOSE ✕
        </button>
        <div className="relative w-full aspect-video bg-black">
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-contain"
            />
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              className="absolute inset-0 w-full h-full"
              controls
              playsInline
            >
              <source src={item.src} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="mt-4 text-white/90">
          <div className="text-xs uppercase tracking-widest opacity-75">
            {item.category}
          </div>
          <h4 className="text-xl font-semibold mt-1">{item.title}</h4>
        </div>
      </div>
    </div>
  );
}
