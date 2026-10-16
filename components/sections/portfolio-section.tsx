"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import MediaCard, { type MediaItem } from "@/components/portfolio/media-card";
import Lightbox from "@/components/portfolio/lightbox";

// Photos supplied by the owner from the completed bungalow album.
const items: MediaItem[] = [
  {
    id: 1,
    title: "Front exterior & courtyard",
    category: "Exterior",
    type: "image",
    src: "/assets/projects/completed-bungalow/exterior.webp",
  },
  {
    id: 2,
    title: "Entrance & porch finishes",
    category: "Exterior",
    type: "image",
    src: "/assets/projects/completed-bungalow/entrance.webp",
  },
  {
    id: 3,
    title: "Side elevation & detailing",
    category: "Exterior",
    type: "image",
    src: "/assets/projects/completed-bungalow/side-elevation.webp",
  },
  {
    id: 4,
    title: "Living room & ceiling details",
    category: "Interior",
    type: "image",
    src: "/assets/projects/completed-bungalow/living-room.webp",
  },
  {
    id: 5,
    title: "Fitted kitchen",
    category: "Interior",
    type: "image",
    src: "/assets/projects/completed-bungalow/kitchen.webp",
  },
  {
    id: 6,
    title: "Dining area & lighting",
    category: "Interior",
    type: "image",
    src: "/assets/projects/completed-bungalow/dining-room.webp",
  },
];
const filters = ["All images", "Exterior", "Interior"];
export default function PortfolioSection() {
  const [filter, setFilter] = useState("All images");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const filtered = items.filter(
    (item) => filter === "All images" || item.category === filter,
  );
  return (
    <section id="portfolio" className="section-pad portfolio-section">
      <div className="site-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / RECENTLY COMPLETED</p>
            <h2>
              A bungalow,
              <br />
              beautifully finished.
            </h2>
          </div>
          <div className="portfolio-intro">
            <p>
              A closer look at a recently completed bungalow.
              <br />
              From the exterior detailing to the spaces within.
            </p>
            <a href="#contact" className="text-link">
              Discuss your project <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="gallery-toolbar">
          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter gallery"
          >
            {filters.map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
              >
                {value}
              </button>
            ))}
          </div>
          <span aria-live="polite">
            {String(filtered.length).padStart(2, "0")} IMAGES
          </span>
        </div>
        <div className="project-grid">
          {filtered.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
        <p className="gallery-note">
          One completed bungalow. Six views of the exterior, interiors and
          finishing details.
        </p>
        <Lightbox
          open={selected !== null}
          item={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </section>
  );
}
