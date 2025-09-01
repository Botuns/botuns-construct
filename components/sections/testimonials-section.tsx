"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCard, {
  Testimonial,
} from "@/components/testimonials/testimonial-card";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        id: 1,
        number: "01",
        quote:
          "We implement the most technically complex design and architectural solutions.",
        name: "BOTUNS Client",
        role: "Residential Build",
        location: "Lagos",
        project: "Construction",
        media: { src: "/assets/experience.jpg", alt: "Material study" },
      },
      {
        id: 2,
        number: "02",
        quote: "We use the best building materials available on the market.",
        name: "Procurement Lead",
        role: "Supply Chain",
        location: "Abuja",
        project: "Supplies",
        media: { src: "/assets/incoporation.jpg", alt: "Premium materials" },
      },
      {
        id: 3,
        number: "03",
        quote:
          "Jewelry precision of work, due to the professionalism and experience of our employees.",
        name: "Commercial Partner",
        role: "Fit‑out",
        location: "Port Harcourt",
        project: "Renovation",
        media: { src: "/assets/clients.jpg", alt: "Precision details" },
      },
      {
        id: 4,
        number: "04",
        quote:
          "Transparent scheduling and budget control from start to handover.",
        name: "Project Owner",
        role: "Development",
        location: "Lekki",
        project: "Multi‑unit Build",
        media: { src: "/assets/experience.jpg", alt: "Planning dashboard" },
      },
      {
        id: 5,
        number: "05",
        quote: "Safety‑first mindset on every site, every day.",
        name: "HSE Auditor",
        role: "Compliance",
        location: "Ikeja",
        project: "Site Operations",
        media: { src: "/assets/incoporation.jpg", alt: "Site safety" },
      },
      {
        id: 6,
        number: "06",
        quote: "Responsive communication and clear milestones kept us aligned.",
        name: "Facility Manager",
        role: "Operations",
        location: "Abuja",
        project: "Refurbishment",
        media: { src: "/assets/clients.jpg", alt: "Milestone tracking" },
      },
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    if (!section || !pinWrap || !track) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Parallax media inside each card
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>('[data-ts="card"]')
      );
      cards.forEach((card) => {
        const media = card.querySelector<HTMLElement>('[data-ts="media"]');
        if (media) {
          gsap.to(media, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () =>
                `+=${Math.max(1, track.scrollWidth - pinWrap.clientWidth)}`,
              scrub: true,
            },
          });
        }
      });

      mm.add("(min-width: 768px)", () => {
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - pinWrap.clientWidth),
          ease: "none",
          paused: true,
        });

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.max(1, track.scrollWidth - pinWrap.clientWidth)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => tween.progress(self.progress),
          invalidateOnRefresh: true,
        });

        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(pinWrap);
        ro.observe(track);

        return () => {
          ro.disconnect();
          st.kill();
          tween.kill();
        };
      });

      // Intro reveal
      gsap.from(track.children, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: "top 85%" },
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad, { once: true });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#0b0c0d" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.5]">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_10%,rgba(255,255,255,0.06),transparent),radial-gradient(900px_500px_at_110%_90%,rgba(255,255,255,0.04),transparent)]" />
      </div>

      <div
        ref={pinWrapRef}
        className="relative max-w-[1800px] mx-auto px-6 md:px-10 xl:px-16"
      >
        <header className="mb-10 md:mb-16">
          <h2 className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase">
            Testimonials
          </h2>
        </header>

        <div className="relative w-full">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 md:gap-10 md:will-change-transform md:w-max"
          >
            {testimonials.map((t, i) => {
              const staggerClass =
                i % 3 === 0
                  ? "md:-translate-y-12 lg:-translate-y-16"
                  : i % 3 === 1
                  ? "md:translate-y-12 lg:translate-y-16"
                  : "md:-translate-y-4 lg:-translate-y-8";
              return (
                <div
                  key={t.id}
                  className={`will-change-transform ${staggerClass}`}
                >
                  <TestimonialCard item={t} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
