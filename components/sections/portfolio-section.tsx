"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Filter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import MediaCard, { MediaItem } from "@/components/portfolio/media-card";
import Lightbox from "@/components/portfolio/lightbox";

gsap.registerPlugin(ScrollTrigger, Flip);

const FILTERS = ["All", "Construction", "Properties", "Supplies"] as const;
type FilterType = (typeof FILTERS)[number];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  // Dummy media showcasing images and videos
  const items = useMemo<MediaItem[]>(
    () => [
      {
        id: 1,
        title: "Modern Residential Complex – Lagos",
        category: "Construction",
        type: "image",
        src: "/assets/houses/hero-house.jpg",
        aspect: "aspect-[4/3]",
        size: "large",
      },
      {
        id: 2,
        title: "Commercial Warehouse Facility",
        category: "Supplies",
        type: "video",
        src: "/video.mp4",
        poster: "/assets/clients.jpg",
        aspect: "aspect-video",
        size: "medium",
      },
      {
        id: 3,
        title: "Luxury Villa Development – Ibadan",
        category: "Properties",
        type: "image",
        src: "/assets/incoporation.jpg",
        aspect: "aspect-[3/4]",
        size: "tall",
      },
      {
        id: 4,
        title: "Office Building Renovation",
        category: "Construction",
        type: "image",
        src: "/assets/experience.jpg",
        aspect: "aspect-[4/3]",
        size: "medium",
      },
      {
        id: 5,
        title: "Industrial Supply Chain Hub",
        category: "Supplies",
        type: "image",
        src: "/assets/clients.jpg",
        aspect: "aspect-[4/3]",
        size: "large",
      },
      {
        id: 6,
        title: "Residential Estate – Oyo",
        category: "Properties",
        type: "image",
        src: "/assets/clients.jpg",
        aspect: "aspect-[4/3]",
        size: "medium",
      },
      {
        id: 7,
        title: "Shopping Mall Construction",
        category: "Construction",
        type: "video",
        src: "/video.mp4",
        poster: "/assets/experience.jpg",
        aspect: "aspect-video",
        size: "tall",
      },
      {
        id: 8,
        title: "Equipment Storage Facility",
        category: "Supplies",
        type: "image",
        src: "/assets/incoporation.jpg",
        aspect: "aspect-[4/3]",
        size: "medium",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    return activeFilter === "All"
      ? items
      : items.filter((i) => i.category === activeFilter);
  }, [activeFilter, items]);

  // Heading + grid entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: 80,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll("[data-card]"), {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate filter changes using Flip
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const state = Flip.getState(Array.from(grid.children));
    // Force layout change by toggling dataset attribute
    Array.from(grid.children).forEach((el) => {
      const show =
        (el as HTMLElement).dataset.category === activeFilter ||
        activeFilter === "All";
      (el as HTMLElement).style.display = show ? "block" : "none";
    });
    Flip.from(state, {
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.03,
      absolute: true,
      scale: true,
    });
  }, [activeFilter]);

  const sizeClass = (s?: MediaItem["size"]) => {
    switch (s) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "tall":
        return "md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-28 md:py-40"
      style={{ backgroundColor: "#ededed" }}
    >
      {/* Background layers for cohesion with Services */}
      <div className="quality-grid-layer" aria-hidden="true" />
      <div className="quality-noise-layer" aria-hidden="true" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-10 xl:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <h2 className="font-helvetica-regular font-black text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] tracking-tight text-[#111] uppercase">
            Our Portfolio
          </h2>
          <p className="mt-4 text-slate-700/80 text-sm md:text-base max-w-2xl mx-auto">
            A curated mix of builds, properties and supply motions. Images and
            videos below are placeholders.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
          <div className="flex items-center gap-2 text-[#111]/80 mr-1">
            <Filter className="h-4 w-4" />
            <span className="text-xs tracking-widest uppercase">Filter</span>
          </div>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`live-border group text-[#fafafa] ${
                activeFilter === f
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <span className="live-border__inner bg-[#111] px-5 py-2.5 text-xs md:text-sm tracking-widest uppercase">
                {f}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]"
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-card
              data-category={item.category}
              className={sizeClass(item.size)}
              style={{
                display:
                  activeFilter === "All" || activeFilter === item.category
                    ? "block"
                    : "none",
              }}
            >
              <MediaCard item={item} onClick={() => setLightboxItem(item)} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-32 text-center">
          <div className="relative inline-block">
            <button className="live-border">
              <span className="live-border__inner px-8 md:px-10 py-4 md:py-5 text-sm md:text-base text-white tracking-widest uppercase">
                Start Your Project
              </span>
            </button>
          </div>
          <p className="mt-5 text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
            Share a brief about your build, supply or property vision and we’ll
            respond within 24h.
          </p>
        </div>
      </div>

      <Lightbox
        open={!!lightboxItem}
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </section>
  );
}
