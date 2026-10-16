"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {item && (
        <div className="lightbox-inner">
          <div className="lightbox-heading">
            <div>
              <p className="eyebrow">{item.category}</p>
              <h2 id="lightbox-title">{item.title}</h2>
            </div>
            <button
              autoFocus
              className="lightbox-close"
              onClick={onClose}
              aria-label="Close image"
            >
              <X />
            </button>
          </div>
          <div className="lightbox-media">
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            ) : (
              <video src={item.src} controls playsInline preload="metadata" />
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
