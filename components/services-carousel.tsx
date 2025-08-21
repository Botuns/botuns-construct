"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface ServiceItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  img: string;
  imgAlt: string;
}

interface ServicesCarouselProps {
  items: ServiceItem[];
  /** linear pixels per second for continuous drift (Apple‑like subtle motion) */
  autoSpeedPxPerSec?: number;
  /** duration (ms) for manual arrow / dot navigation animation */
  manualDurationMs?: number;
}

// Individual card component
function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  return (
    <div
      data-svc="card"
      className="group relative flex-none w-[280px] md:w-[360px] xl:w-[400px] rounded-none bg-white text-[#181818] shadow-[0_8px_40px_-16px_rgba(0,0,0,0.35)] border border-black/5 overflow-hidden cursor-pointer select-none transition-transform duration-500 will-change-transform shadow-none"
    >
      <div className="flex flex-col h-full">
        <div className="relative h-[170px] md:h-[210px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.img}
            alt={item.imgAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.22,1)] group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-black/0 to-white/0 pointer-events-none" />
          <div className="absolute top-3 right-3 h-10 w-10 bg-black/70 backdrop-blur-sm flex items-center justify-center text-white rounded-sm">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <h4 className="text-lg md:text-xl font-bold mb-3 leading-snug tracking-tight group-hover:text-black/80 transition-colors">
            {item.title}
          </h4>
          <p className="text-[11px] md:text-[12px] leading-relaxed text-slate-600/90 font-medium tracking-wide mb-4">
            {item.description}
          </p>
          <div className="mt-auto flex items-center gap-2 text-[11px] font-semibold tracking-widest text-[#111] opacity-0 group-hover:opacity-100 transition-opacity">
            <span>DETAILS</span>
            <span className="inline-block w-5 h-px bg-[#111]" />
          </div>
        </div>
        <span className="svc-card-gradient" />
      </div>
    </div>
  );
}

export function ServicesCarousel({
  items,
  autoSpeedPxPerSec = 35, // subtle ambient drift
  manualDurationMs = 750,
}: ServicesCarouselProps) {
  const realCount = items.length;
  const gapPx = 40; // matches gap-10
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  // Measurement (card width + gap)
  const [unitWidth, setUnitWidth] = useState(360 + gapPx); // fallback
  useEffect(() => {
    if (!measureRef.current) return;
    const el = measureRef.current.querySelector<HTMLElement>("[data-measure]");
    if (el) {
      const width = el.getBoundingClientRect().width;
      setUnitWidth(Math.round(width + gapPx));
    }
  }, [realCount]);

  // State for continuous loop
  const [startIndex, setStartIndex] = useState(0); // index of first fully visible real item
  const [offsetPx, setOffsetPx] = useState(0); // 0..unitWidth
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 = offset / unitWidth

  // Manual animation state
  const manualAnimRef = useRef<{
    active: boolean;
    direction: 1 | -1;
    startOffset: number;
    targetOffset: number;
    startTime: number;
  }>({
    active: false,
    direction: 1,
    startOffset: 0,
    targetOffset: 0,
    startTime: 0,
  });

  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const schedule = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  };

  const loop = (ts: number) => {
    if (lastTsRef.current == null) lastTsRef.current = ts;
    const deltaMs = ts - lastTsRef.current;
    lastTsRef.current = ts;

    const manual = manualAnimRef.current;
    if (manual.active) {
      const t = Math.min(1, (ts - manual.startTime) / manualDurationMs);
      // easeOutQuint
      const eased = 1 - Math.pow(1 - t, 5);
      const newOffset =
        manual.startOffset + (manual.targetOffset - manual.startOffset) * eased;
      setOffsetPx(newOffset);
      setProgress(newOffset / unitWidth);
      if (t >= 1) {
        manual.active = false;
        if (manual.direction === 1) {
          // completed forward slide -> wrap to next base state
          setOffsetPx(0);
          setStartIndex((i) => (i + 1) % realCount);
          setProgress(0);
        } else {
          // completed backward slide (already had offset starting at unitWidth -> now 0)
          // nothing extra; startIndex already updated
        }
      }
    } else if (!paused) {
      const deltaPx = (autoSpeedPxPerSec * deltaMs) / 1000;
      setOffsetPx((prev) => {
        let nextOffset = prev + deltaPx;
        if (nextOffset >= unitWidth) {
          nextOffset -= unitWidth;
          setStartIndex((i) => (i + 1) % realCount);
        }
        setProgress(nextOffset / unitWidth);
        return nextOffset;
      });
    }

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    schedule();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // schedule uses stable refs only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pause handling
  const pauseAuto = useCallback(() => setPaused(true), []);
  const resumeAuto = useCallback(() => setPaused(false), []);
  const togglePlay = () => setPaused((p) => !p);

  function triggerManual(direction: 1 | -1) {
    // Avoid overlapping manual animations
    if (manualAnimRef.current.active) return;
    manualAnimRef.current.active = true;
    manualAnimRef.current.direction = direction;
    manualAnimRef.current.startTime = performance.now();
    if (direction === 1) {
      // forward: animate offset from current to unitWidth then normalize in loop end
      manualAnimRef.current.startOffset = offsetPx;
      manualAnimRef.current.targetOffset = unitWidth;
    } else {
      // backward: shift index backward immediately and start at unitWidth then animate to 0
      setStartIndex((i) => (i - 1 + realCount) % realCount);
      manualAnimRef.current.startOffset = unitWidth;
      manualAnimRef.current.targetOffset = 0;
      setOffsetPx(unitWidth);
    }
    setPaused(true); // pause continuous drift during manual nav
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), 6000);
  }

  const goToDot = (targetIdx: number) => {
    if (targetIdx === startIndex) return;
    // Decide shortest direction (for small sets just compute difference)
    const forwardSteps = (targetIdx - startIndex + realCount) % realCount;
    const backwardSteps = (startIndex - targetIdx + realCount) % realCount;
    if (forwardSteps === 0) return;
    if (forwardSteps <= backwardSteps) {
      // queue multiple forward manual transitions sequentially
      const run = (remaining: number) => {
        triggerManual(1);
        if (remaining > 1)
          setTimeout(() => run(remaining - 1), manualDurationMs + 30);
      };
      run(forwardSteps);
    } else {
      const run = (remaining: number) => {
        triggerManual(-1);
        if (remaining > 1)
          setTimeout(() => run(remaining - 1), manualDurationMs + 30);
      };
      run(backwardSteps);
    }
  };

  useEffect(
    () => () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    },
    []
  );

  // Build a window of cards: show at least realCount + 2 to safely cover wrap; we only render minimal slice for performance
  const windowSize = Math.min(realCount + 2, realCount * 2);
  const visible: ServiceItem[] = [];
  for (let n = 0; n < windowSize; n++) {
    visible.push(items[(startIndex + n) % realCount]);
  }

  // Translate track by -offsetPx
  const trackStyle: React.CSSProperties = {
    transform: `translate3d(${-offsetPx}px,0,0)`,
  };

  return (
    <div className="relative" aria-roledescription="carousel">
      {/* Measurement element (hidden) */}
      <div className="absolute -z-50 invisible" ref={measureRef} aria-hidden>
        <div data-measure className="w-[280px] md:w-[360px] xl:w-[400px]" />
      </div>
      <div
        className="overflow-hidden"
        onMouseEnter={pauseAuto}
        onMouseLeave={resumeAuto}
        onFocus={pauseAuto}
        onBlur={resumeAuto}
      >
        <div
          ref={containerRef}
          className="flex gap-10 will-change-transform py-8"
          style={trackStyle}
        >
          {visible.map((item, i) => (
            <div key={item.title + i} style={{ flex: "0 0 auto" }}>
              <ServiceCard item={item} />
            </div>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div className="mt-10 flex items-center gap-4">
        <div className="relative flex items-center gap-4 rounded-full bg-[#262626] py-2 pl-6 pr-5 select-none">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 h-2 rounded-full bg-white/25 w-28 overflow-hidden">
            <span
              className="block h-full bg-white/80 rounded-full"
              style={{
                width: `${(progress * 100).toFixed(1)}%`,
                transition: manualAnimRef.current.active
                  ? "none"
                  : "width .15s linear",
              }}
            />
          </span>
          <div className="flex items-center gap-3 ml-32">
            {items.map((_, i) => {
              const current = i === startIndex;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    current ? "bg-white" : "bg-white/35 hover:bg-white/60"
                  }`}
                  onClick={() => goToDot(i)}
                />
              );
            })}
          </div>
        </div>
        <button
          onClick={togglePlay}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
          className="h-12 w-12 flex items-center justify-center rounded-full bg-[#323232] text-white hover:bg-[#3a3a3a] transition-colors"
        >
          {paused ? (
            <Play className="h-5 w-5" />
          ) : (
            <Pause className="h-5 w-5" />
          )}
        </button>
        <div className="ml-auto flex items-center gap-3">
          <button
            aria-label="Previous"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-[#262626] text-white hover:bg-[#333] transition-colors"
            onClick={() => triggerManual(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-[#262626] text-white hover:bg-[#333] transition-colors"
            onClick={() => triggerManual(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesCarousel;
