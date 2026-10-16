"use client";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
export type MediaType = "image" | "video";
export interface MediaItem {
  id: number;
  title: string;
  category: string;
  type: MediaType;
  src: string;
  poster?: string;
  aspect?: string;
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
  return (
    <button
      type="button"
      onClick={onClick}
      className={`project-card ${className}`}
      aria-label={`View ${item.title}`}
    >
      <div className="project-image">
        <Image
          src={
            item.type === "image"
              ? item.src
              : item.poster ||
                "/assets/projects/completed-bungalow/exterior.webp"
          }
          alt={item.title}
          fill
          sizes="(max-width: 700px) 100vw, 46vw"
          className="object-cover"
        />
        {item.type === "video" && <Play className="project-play" />}
        <span className="project-open">
          <ArrowUpRight size={21} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <span>{item.category}</span>
          <h3>{item.title}</h3>
        </div>
        <span className="project-number">0{item.id}</span>
      </div>
    </button>
  );
}
export default MediaCard;
