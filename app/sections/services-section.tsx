"use client";

import { useEffect, useRef } from "react";
import { Hammer, Package, Home, ShoppingCart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesCarousel, { ServiceItem } from "@/components/services-carousel";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  // Re‑designed section inspired by reference: expansive light canvas, oversized heading, horizontal kinetic gallery.
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const timelinesRef = useRef<gsap.core.Tween[]>([]);

  const services: ServiceItem[] = [
    {
      icon: Hammer,
      title: "Building Construction & Repairs",
      description:
        "Complete construction services from foundation to finishing, including renovations and structural repairs with quality craftsmanship.",
      img: "/assets/houses/hero-house.jpg",
      imgAlt: "Building construction site",
    },
    {
      icon: Package,
      title: "Purchasing & Supply",
      description:
        "Reliable procurement and supply chain solutions for construction materials, equipment, and industrial supplies across Nigeria.",
      img: "/assets/experience.jpg",
      imgAlt: "Supply chain logistics",
    },
    {
      icon: Home,
      title: "Property Sales & Investment",
      description:
        "Expert property development, sales, and investment advisory services to help you make informed real estate decisions.",
      img: "/assets/incoporation.jpg",
      imgAlt: "Modern property exterior",
    },
    {
      icon: ShoppingCart,
      title: "General Merchandising",
      description:
        "Comprehensive trading and merchandising services covering diverse product categories to meet various business needs.",
      img: "/assets/clients.jpg",
      imgAlt: "Merchandise assortment",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.from(
          headingRef.current.querySelectorAll('[data-svc="heading-line"]'),
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
          }
        );
      }

      // CTA reveal & border flow accent using GSAP-driven CSS variable
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 60,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        });
        const borderTl = gsap.to(ctaRef.current.querySelector(".live-border"), {
          "--angle": 360,
          duration: 6,
          ease: "none",
          repeat: -1,
        });
        timelinesRef.current.push(borderTl);
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden py-32 md:py-40"
      style={{
        backgroundColor: "#ededed" /* sampled light neutral from reference */,
      }}
    >
      {/* Background quality layers */}
      <div className="quality-grid-layer" aria-hidden="true" />
      <div className="quality-noise-layer" aria-hidden="true" />
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 xl:px-16">
        {/* Oversized Heading */}
        <div
          ref={headingRef}
          className="mb-24 md:mb-32 leading-[0.9] font-helvetica-regular"
        >
          <h2
            data-svc="heading-line"
            className="text-[2.6rem] md:text-[4.2rem] lg:text-[5.2rem] font-black tracking-tight text-[#111] uppercase"
          >
            Our Services Engine
          </h2>
          <h3
            data-svc="heading-line"
            className="mt-4 text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem] font-black tracking-tight text-[#111] max-w-5xl"
          >
            Integrated delivery across construction, supply, property &
            merchandising.
          </h3>
        </div>

        {/* Marquee Row (replaced by interactive carousel) */}
        <div className="relative w-full">
          <ServicesCarousel items={services} />
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-40 md:mt-52">
          <div className="relative bg-[#111] text-white px-8 md:px-16 py-16 md:py-24 overflow-hidden  ">
            {/* Embedded quality grid + noise for continuity */}
            <div
              className="quality-grid-layer opacity-[0.25]"
              aria-hidden="true"
            />
            <div
              className="quality-noise-layer opacity-[0.25]"
              aria-hidden="true"
            />
            {/* Radial vignette focus */}
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_65%)]" />
            <div className="relative max-w-6xl">
              <h3 className="text-[2rem] md:text-[3.2rem] font-black leading-[1.05] tracking-tight uppercase">
                Engage A Delivery Partner Obsessed With Precision & Client Value
              </h3>
              <p className="mt-6 max-w-2xl text-sm md:text-base text-slate-300/85 leading-relaxed">
                Let&apos;s architect a build, supply motion or property
                transaction that compounds long‑term asset value. Insight,
                transparency & disciplined execution from day zero.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[11px] md:text-xs tracking-wide text-slate-400/70">
                <li className="flex items-center gap-2 before:content-[''] before:block before:h-1 before:w-1 before:rounded-full before:bg-cyan-400/80">
                  Transparent Costing
                </li>
                <li className="flex items-center gap-2 before:content-[''] before:block before:h-1 before:w-1 before:rounded-full before:bg-cyan-400/80">
                  Structured Reporting
                </li>
                <li className="flex items-center gap-2 before:content-[''] before:block before:h-1 before:w-1 before:rounded-full before:bg-cyan-400/80">
                  Regulatory Compliance
                </li>
                <li className="flex items-center gap-2 before:content-[''] before:block before:h-1 before:w-1 before:rounded-full before:bg-cyan-400/80">
                  Lifecycle Support
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button className="live-border group font-semibold tracking-wide uppercase text-sm md:text-base">
                  <span className="live-border__inner px-10 py-5 gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                    Start A Conversation
                  </span>
                </button>
                <span className="text-xs md:text-sm tracking-widest text-slate-400">
                  RESPONSE WITHIN 24H
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
