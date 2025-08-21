"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "../public/logo.png";
import Image from "next/image";
// Stable nav links outside component to avoid unnecessary re-renders & hook deps warnings
const navLinks = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Projects", href: "#portfolio", id: "portfolio" },
  { name: "Contact", href: "#contact", id: "contact" },
];
// NOTE: If you later add ScrollTrigger / other plugins, register them here.

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Refs for GSAP animations
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const contactBlockRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const hamburgerLineRefs = useRef<HTMLDivElement[]>([]);
  const linkRefs = useRef<HTMLButtonElement[]>([]);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  // navLinks defined outside component

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".hamburger-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Setup GSAP timeline for menu (runs once)
  useEffect(() => {
    if (!overlayRef.current) return;

    // Initial states
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(linkRefs.current, { y: 30, autoAlpha: 0 });
    gsap.set(contactBlockRef.current, { y: 30, autoAlpha: 0 });

    menuTlRef.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        linkRefs.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
        },
        "<+0.05"
      )
      .to(
        contactBlockRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "<+0.15"
      );

    // Logo subtle entrance
    if (logoRef.current) {
      gsap.set(logoRef.current, { autoAlpha: 0, y: -8, rotateX: 15 });
      gsap.to(logoRef.current, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, []);

  // Play / reverse timeline based on open state & manage body scroll
  useEffect(() => {
    const tl = menuTlRef.current;
    if (!tl) return;
    if (isMobileMenuOpen) {
      tl.play();
      document.body.style.overflow = "hidden";
      // Animate hamburger lines into X (enhanced vs pure CSS)
      if (hamburgerLineRefs.current[0] && hamburgerLineRefs.current[2]) {
        gsap.to(hamburgerLineRefs.current[0], {
          rotate: 45,
          y: 6,
          width: "1.5rem",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(hamburgerLineRefs.current[1], {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(hamburgerLineRefs.current[2], {
          rotate: -45,
          y: -6,
          width: "1.5rem",
          duration: 0.35,
          ease: "power2.out",
        });
      }
    } else {
      tl.reverse();
      document.body.style.overflow = "unset";
      if (hamburgerLineRefs.current[0] && hamburgerLineRefs.current[2]) {
        gsap.to(hamburgerLineRefs.current, {
          rotate: 0,
          y: 0,
          width: "1.5rem",
          autoAlpha: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0,
        });
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Clean linkRefs each render (avoid duplicates if React StrictMode double-invokes effects in dev)
  linkRefs.current = [];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-[#202020]/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Language Selector */}
            <div className="flex flex-row items-center ">
              <div className="relative w-12 h-12 lg:w-20 lg:h-20">
                <Image
                  src={logo}
                  alt="Botuns Constructs Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="text-white font-medium text-sm tracking-widest lg:text-lg">
                BOTUNS CONSTRUCTS
              </div>
            </div>

            {/* Centered Logo */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer group"
              onClick={() => scrollToSection("#home")}
            >
              {/* Geometric Cube Logo inspired by screenshot */}
            </div>

            {/* Menu Button */}
            <button
              className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300 group hamburger-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="text-sm font-medium tracking-widest">MENU</span>
              <div className="flex flex-col space-y-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) hamburgerLineRefs.current[i] = el;
                    }}
                    className="w-6 h-0.5 bg-current rounded will-change-transform"
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 opacity-0 invisible will-change-transform"
        // Visibility toggled by GSAP (autoAlpha)
        onClick={(e) => {
          // Close if clicking the background but not the inner content
          if (e.target === overlayRef.current) setIsMobileMenuOpen(false);
        }}
      >
        <div className="absolute inset-0 bg-[#202020]" />
        <div
          ref={menuContainerRef}
          className="relative h-full flex items-center justify-center px-4"
        >
          <div className="text-center space-y-8 select-none">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  ref={(el) => {
                    if (el) linkRefs.current.push(el);
                  }}
                  onClick={() => scrollToSection(link.href)}
                  className={`block text-4xl lg:text-6xl font-light tracking-wide text-white hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors duration-300 ${
                    activeSection === link.id ? "text-gray-400" : ""
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div
              ref={contactBlockRef}
              className="pt-16 space-y-4 text-gray-400"
            >
              <div className="text-sm font-medium tracking-widest">CONTACT</div>
              <div className="space-y-2 text-sm">
                <div>+234 803 470 6314</div>
                <div>botunsconstructlimited@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
