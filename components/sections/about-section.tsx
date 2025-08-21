"use client";

import { useEffect, useRef } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Factory,
  TimerReset,
  PackageCheck,
  Users2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Design notes:
// - Matches dark aesthetic (#1C2526) from hero for visual continuity.
// - Replaces static imagery with expressive iconography for scalability + performance.
// - GSAP + ScrollTrigger orchestrate staggered entrances + micro-interactions.
// - Responsive: grid reflows at breakpoints, large typography scales with viewport.
// - Focus on clarity of core services & differentiators while keeping award-site polish.

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(
          headingRef.current.querySelectorAll('[data-animate="heading"]'),
          {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
          }
        );
      }

      if (cardsWrapperRef.current) {
        const cards = cardsWrapperRef.current.querySelectorAll("[data-card]");
        gsap.from(cards, {
          opacity: 0,
          y: 90,
          rotateX: 15,
          scale: 0.94,
          transformOrigin: "center top",
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: cardsWrapperRef.current, start: "top 78%" },
        });
        // subtle float on hover baseline (micro loop)
        cards.forEach((c, i) => {
          gsap.to(c, {
            y: "+=6",
            duration: 4 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Restored original copy & sequencing
  const metrics = [
    {
      value: "18+",
      label: ["years combined", "leadership experience"],
      icon: TimerReset,
      note: "Founders’ proven field expertise prior to incorporation",
      offset: "md:translate-y-8",
      image: "/assets/experience.jpg",
    },
    {
      value: "2025",
      label: ["incorporated", "RC 8525611"],
      icon: ShieldCheck,
      note: "CAC certified Nigerian construction & development company",
      offset: "md:translate-y-40",
      image: "/assets/incoporation.jpg",
    },
    {
      value: "30+",
      label: ["trusted vendor", "relationships"],
      icon: PackageCheck,
      note: "Curated supply chain enabling material integrity & speed",
      offset: "md:translate-y-16",
      image: "/assets/clients.jpg",
    },
    {
      value: "98%",
      label: ["on‑time", "delivery rate"],
      icon: TrendingUp,
      note: "Disciplined governance & schedule control frameworks",
      offset: "md:translate-y-56",
      image: "/assets/clients.jpg",
    },
    {
      value: "Site",
      label: ["project", "execution"],
      icon: Factory,
      note: "Capability to coordinate parallel builds across regions",
      offset: "md:translate-y-24",
      image: "/assets/clients.jpg",
    },
    {
      value: "CFX",
      label: ["Client-First Experience", "delivery", "philosophy"],
      icon: Users2,
      note: "Transparent reporting, expectation alignment, continuous feedback",
      offset: "md:translate-y-72",
      image: "/assets/clients.jpg",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "#343434" }}
    >
      {/* Background micro texture / grid */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>

      <div className="relative max-w-[1700px] mx-auto px-6 md:px-10 xl:px-16">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 md:mb-28">
          <div className="flex flex-wrap items-end gap-6">
            <h2
              data-animate="heading"
              className="font-helvetica-regular font-black text-[2.5rem] leading-none md:text-[4.2rem] lg:text-[5rem] tracking-tight text-white uppercase"
            >
              Built on Proven Foundations
            </h2>
            {/*  */}
          </div>
          <p
            data-animate="heading"
            className="mt-6 max-w-3xl text-sm md:text-base text-slate-300/80 leading-relaxed"
          >
            A concise snapshot of the traction, operational maturity and
            delivery discipline behind BOTUNS CONSTRUCT. Incorporated in 2025
            yet powered by over 18 years of cumulative founding experience
            driving precision execution and client value.
          </p>
        </div>

        {/* Metrics Cards - masonry style stagger (4 cols on xl) */}
        <div
          ref={cardsWrapperRef}
          className="relative grid gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-4"
        >
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.value + idx}
                data-card
                className={`group relative flex flex-col bg-white text-[#202020] rounded-none shadow-[0_8px_44px_-14px_rgba(0,0,0,0.45)] px-8 pt-10 pb-6 overflow-hidden ${m.offset}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-1">
                    <div className="text-6xl md:text-7xl text-[#202020] tracking-tight leading-none">
                      {m.value}
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-sm flex items-center justify-center bg-none text-[#202020] ring-1 ring-slate-900/10 shadow-inner">
                    <Icon className="h-12 w-12" />
                  </div>
                </div>
                <div className="text-lg font-medium leading-snug mb-6 tracking-tight">
                  {m.label.map((l) => (
                    <div key={l} className=" flex gap-4 mb-2 text-white">
                      <span className="bg-[#202020] rounded text-sm p-1">
                        {l}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs leading-relaxed tracking-wide text-slate-500 max-w-[260px] mb-6">
                  {m.note}
                </p>
                {/* Image area */}
                {m.image && (
                  <div className="relative mt-auto rounded-none overflow-hidden aspect-[4/3] border border-slate-200/70 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image}
                      alt={m.label.join(" ")}
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.22,1)] group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-blue-500/0 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-emerald-400/5" />
              </div>
            );
          })}
        </div>

        {/* Narrative Bottom (optional context) */}
        <div className="mt-32 max-w-5xl md:ml-[50%] ">
          <p className="text-slate-300/70 text-sm md:text-base leading-relaxed z-10 text-white">
            These figures reflect a framework built on governance, supply chain
            qualification, schedule realism and transparent client
            collaboration. Every engagement is executed with material integrity
            and sustainability alignment to compound long‑term asset value.
          </p>
        </div>
      </div>
    </section>
  );
}
