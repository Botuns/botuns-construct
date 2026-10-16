"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "About us", id: "about", href: "/#about" },
  { name: "Our services", id: "services", href: "/#services" },
  { name: "Projects", id: "portfolio", href: "/#portfolio" },
  { name: "Meet the CEO", id: "ceo", href: "/meet-the-ceo" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
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
  }, [pathname]);
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
  function current(link: { id: string; href: string }) {
    if (!link.href.includes("#")) return pathname === link.href ? "page" : undefined;
    return pathname === "/" && active === link.id ? "location" : undefined;
  }
  return (
    <header className="site-header">
      <nav
        ref={nav}
        className="site-shell nav-inner"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="brand"
          aria-label="Botuns Construct home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/botuns-mark.png"
            width={379}
            height={263}
            alt=""
            priority
            className="brand-mark"
          />
          <span className="brand-text">
            <span className="brand-name">BOTUNS</span>
            <span className="brand-subtitle">CONSTRUCT NIGERIA LIMITED</span>
          </span>
        </Link>
        <div className="desktop-links">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={current(link)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link className="button button-dark nav-cta" href="/#contact">
          Let’s talk <ArrowUpRight size={16} />
        </Link>
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
            { name: "Home", id: "home", href: "/" },
            ...links,
            { name: "Contact", id: "contact", href: "/#contact" },
          ].map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={current(link)}
              onClick={() => setOpen(false)}
            >
              {link.name}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <a className="mobile-phone" href="tel:+2348034706314">
            +234 803 470 6314
          </a>
        </div>
      </nav>
    </header>
  );
}
