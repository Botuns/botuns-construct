"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Preserve the existing CTA entrance, scoped to this section and respecting
  // reduced motion. Never kill other sections' ScrollTriggers on cleanup.
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          "[data-cta-reveal]",
          { y: 18 },
          {
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      },
      sectionRef,
    );
    return () => media.revert();
  }, []);
  return (
    <section ref={sectionRef} id="contact" className="contact-cta">
      <div className="site-shell cta-inner">
        <div data-cta-reveal>
          <p className="eyebrow">06 / BUILD WITH BOTUNS</p>
          <h2>
            You bring the vision.
            <br />
            We’ll bring the expertise.
          </h2>
        </div>
        <div data-cta-reveal className="cta-action">
          <a href="#contact-form" className="button button-light">
            Tell us about your project <ArrowUpRight size={20} />
          </a>
          <a href="tel:+2348034706314">Or call +234 803 470 6314</a>
        </div>
      </div>
    </section>
  );
}
