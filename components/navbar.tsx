"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { name: "About us", id: "about" },
  { name: "Our services", id: "services" },
  { name: "Projects", id: "portfolio" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    [
      "home",
      "about",
      "services",
      "why-choose-us",
      "portfolio",
      "testimonials",
      "contact",
    ].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <nav
        ref={nav}
        className="site-shell nav-inner"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="brand"
          aria-label="Botuns Construct home"
          onClick={() => setOpen(false)}
        >
          <Image src="/logo.png" width={48} height={48} alt="" priority />
          <span>
            BOTUNS
            <span className="brand-subtitle">CONSTRUCT NIGERIA LIMITED</span>
          </span>
        </a>
        <div className="desktop-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.name}
            </a>
          ))}
        </div>
        <a className="button button-dark nav-cta" href="#contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <div
          id="mobile-navigation"
          className="mobile-navigation"
          hidden={!open}
        >
          {[
            { name: "Home", id: "home" },
            ...links,
            { name: "Contact", id: "contact" },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
            >
              {link.name}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <a className="mobile-phone" href="tel:+2348034706314">
            +234 803 470 6314
          </a>
        </div>
      </nav>
    </header>
  );
}
