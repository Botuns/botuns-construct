"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WhyCard {
  id: string;
  eyebrow?: string;
  title: string;
  tagline: string;
  body: string;
  bullets?: string[];
  bg: string; // individual solid background color (desktop) – kept inline for design control
}

// Distinct solid colors that complement the existing emerald/cyan/gold theme
// Each color is carefully chosen to maintain hierarchy and visual distinction
const CARDS: WhyCard[] = [
  {
    id: "registration",
    eyebrow: "CREDIBILITY",
    title: "Regulatory Integrity",
    tagline: "Duly registered (RC 8525611) & governance obsessed",
    body: "We operate with documented processes, audited compliance and transparent contracting frameworks that protect your capital. Proper corporate governance is not overhead – it is risk insurance for your project lifecycle.",
    bullets: [
      "Structured corporate compliance cadence",
      "Clear escalation & sign‑off hierarchy",
      "Document traceability for every cost line",
    ],
    bg: "#0E2A5A", // Solid royal navy
  },
  {
    id: "multidisciplinary",
    eyebrow: "ENGINEERING DEPTH",
    title: "Multi‑Disciplinary Capability",
    tagline:
      "Construction, procurement, property & merchandising under one roof",
    body: "Cross‑functional teams reduce interface risk. Our integrated model compresses lead times, eliminates scope gaps and keeps accountability singular – you always know who owns the outcome.",
    bullets: [
      "End‑to‑end project orchestration",
      "Coordinated design‑to‑procure handoffs",
      "Central cost & schedule intelligence",
    ],
    bg: "#2E0F4F", // Solid royal purple
  },
  {
    id: "transparency",
    eyebrow: "FINANCIAL CLARITY",
    title: "Radical Cost Transparency",
    tagline: "You see the numbers we see – in real time",
    body: "We publish structured cost, exposure and variance dashboards so decisions are informed and corrective actions are early. No surprises – only managed risk and validated value creation.",
    bullets: [
      "Live budget vs. committed vs. forecast view",
      "Change control discipline",
      "Open book selected procurement",
    ],
    bg: "#0B4A3A", // Solid deep emerald
  },
  {
    id: "schedule",
    eyebrow: "DELIVERY RELIABILITY",
    title: "Schedule Discipline",
    tagline: "Proactive risk registers & scenario planning",
    body: "We model critical path exposure, build mitigation buffers and continuously stress‑test sequencing. Momentum is engineered – not left to chance.",
    bullets: [
      "Formal risk & opportunity log",
      "Look‑ahead planning cadence",
      "Early warning variance triggers",
    ],
    bg: "#3a2a1f", // Deep brown
  },
  {
    id: "network",
    eyebrow: "NATIONAL REACH",
    title: "Supply Network Advantage",
    tagline: "Curated vendor bench across regions scales confidence",
    body: "Decades of relationship capital with vetted manufacturers, logistics partners and specialty subcontractors compress lead times and stabilize quality across Nigeria's variable infrastructure landscape.",
    bullets: [
      "Multi‑region fulfillment optionality",
      "Negotiated pricing leverage",
      "Quality and compliance scorecards",
    ],
    bg: "#1f2f3a", // Deep teal
  },
  {
    id: "partnership",
    eyebrow: "CLIENT VALUE",
    title: "Lifecycle Partnership",
    tagline: "We stay accountable after handover",
    body: "Performance reviews, post‑occupancy insights and strategic advisory loops ensure your asset continues compounding value. Our success metric is your retained confidence and repeat engagement.",
    bullets: [
      "Structured post‑delivery audits",
      "Operational optimization support",
      "Continuous improvement feedback",
    ],
    bg: "#3a1f2f", // Deep maroon
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Enhanced stacked deck reveal effect (scroll to bring next card forward)
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // graceful skip

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length || !stackRef.current) return;

      const STACK_GAP = 36; // vertical offset between card tops (px)
      const SCALE_STEP = 0.04; // scale reduction per depth level
      const DIRECTION: "up" | "down" = "up";

      // Base positioning to create layered tabs behind active card
      cards.forEach((card, i) => {
        const yOffset = DIRECTION === "up" ? -i * STACK_GAP : i * STACK_GAP;
        gsap.set(card, {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          y: yOffset,
          scale: 1 - i * SCALE_STEP,
          zIndex: cards.length - i,
          opacity: 1,
          willChange: "transform",
        });
      });

      // Total scroll distance: one viewport per transition (tweak multiplier for faster/slower)
      const transitionHeight = window.innerHeight * 0.9;
      const totalHeight = transitionHeight * (cards.length - 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 20%", // start when the section's top hits 70% of viewport height
          end: "+=" + totalHeight,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // For each step, move earlier cards upward (compress) & advance next card to front
      for (let i = 1; i < cards.length; i++) {
        const current = cards[i];
        const previousCards = cards.slice(0, i);
        // Label for clarity (optional)
        tl.addLabel("step-" + i);

        // Bring current forward
        tl.to(
          current,
          {
            y: 0,
            scale: 1,
            zIndex: cards.length, // ensure on top during its reveal
            duration: 1,
          },
          ">" // sequence
        );

        // Push all previous upward a bit more & shrink/fade slightly for depth
        tl.to(
          previousCards,
          {
            y: (index) => {
              // base layer offset
              const base =
                DIRECTION === "up" ? -index * STACK_GAP : index * STACK_GAP;
              // additional upward compression for each deeper step
              const compress = (i - index) * (STACK_GAP * 0.55);
              // always move further upward visually
              return DIRECTION === "up" ? base - compress : base - compress;
            },
            scale: (index) => 1 - (i - index) * (SCALE_STEP + 0.01),
            opacity: (index) =>
              gsap.utils.clamp(0.15, 1, 1 - (i - index) * 0.18),
            duration: 1,
            stagger: 0,
          },
          "<" // sync with current card animation
        )
          // After completion, reset zIndexes to preserve order & avoid huge values
          .add(() => {
            previousCards.forEach((cardEl, pi) => {
              gsap.set(cardEl, { zIndex: cards.length - (i - pi) - 1 });
            });
            gsap.set(current, { zIndex: cards.length });
          });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative w-full bg-[#0d0f11] text-white overflow-hidden"
    >
      {/* Accent bar behind stack */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[92%] h-16 md:h-20 rounded-b-[48px] bg-[linear-gradient(90deg,#d4af37,#f0d488,#d4af37)] opacity-[0.85] z-50 bg-none" />

      {/* Header section */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-5xl">
          <p className="text-xs md:text-sm tracking-[0.35em] font-semibold text-emerald-300/80 mb-6">
            WHY PARTNERS SELECT US
          </p>
          <h2 className="text-[2.75rem] md:text-[3.9rem] leading-[1.03] font-black tracking-tight">
            Engineered Trust. Compounding Value.
          </h2>
          <p className="mt-6 text-base md:text-lg text-slate-300/80 max-w-2xl leading-relaxed">
            A vertically integrated delivery partner translating disciplined
            governance, multi‑disciplinary capability and transparent economics
            into durable asset performance.
          </p>
        </div>
      </div>

      {/* Cards stack (pinned & animated) */}
      <div ref={stackRef} className="relative h-[100vh]">
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="flex items-center justify-center will-change-transform"
          >
            <article
              className="relative origin-center flex flex-col border border-white/8 border-none shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] rounded-none md:rounded-none overflow-hidden w-full max-w-4xl mx-6 md:mx-12 lg:mx-24 "
              style={{ backgroundColor: card.bg }}
            >
              {/* Subtle overlay for depth */}
              <div className="pointer-events-none absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
              {/* Content */}
              <div className="relative flex-1 flex flex-col justify-center px-8 md:px-16 py-12 md:py-16 min-h-[500px] md:min-h-[600px]">
                {card.eyebrow && (
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.3em] text-cyan-300/80 mb-4 md:mb-6">
                    {card.eyebrow}
                  </span>
                )}
                <h3 className="text-2xl md:text-[2.5rem] lg:text-[3rem] font-black tracking-tight leading-[1.05] mb-4 md:mb-6">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base font-semibold text-emerald-300/90 tracking-wide mb-6 md:mb-8">
                  {card.tagline}
                </p>
                <p className="text-sm md:text-base text-slate-200/90 leading-relaxed max-w-3xl mb-8 md:mb-10">
                  {card.body}
                </p>
                {card.bullets && (
                  <ul className="space-y-3 mb-8 md:mb-12 text-sm text-slate-300/85">
                    {card.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Card footer */}
                <div className="mt-auto flex items-center gap-6 text-xs font-semibold tracking-widest text-slate-500/70">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    VERIFIED
                  </span>
                  <span className="hidden sm:inline-block h-3 w-px bg-white/10" />
                  <span className="hidden sm:inline-block">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(CARDS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
              {/* See more link */}
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/70 hover:text-white transition-colors cursor-pointer group">
                  <span>See more</span>
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="relative z-40 mt-20 md:mt-32 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-32 md:pb-48">
        <div className="bg-[#181b20] border border-white/8 px-8 md:px-16 lg:px-24 py-16 md:py-24 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.55)] rounded-none relative overflow-hidden">
          {/* Grid pattern overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative">
            <h4 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-4xl mb-6">
              Ready to align your project with a delivery partner who engineers
              certainty & protects value?
            </h4>

            <p className="text-slate-300/85 max-w-3xl text-sm md:text-base leading-relaxed mb-10">
              Let&apos;s map your objectives, surface hidden risk and design a
              transparent execution strategy – zero obligation discovery.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button className="live-border group font-semibold tracking-wide uppercase text-sm md:text-base">
                <span className="live-border__inner px-8 py-4 gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  Schedule A Strategy Call
                </span>
              </button>

              <span className="text-xs tracking-widest text-slate-500/70 font-medium">
                RESPONSE WITHIN 24H
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
