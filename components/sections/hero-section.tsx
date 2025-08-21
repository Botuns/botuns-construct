"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#202020" }}
    >
      {/* Main Background Image Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-full max-w-6xl mx-auto"
          style={{ height: "70vh" }}
        >
          {/* Hero Background Image */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <Image
              src="/assets/houses/hero-house.jpg"
              alt="Construction site showcasing modern building development"
              fill
              className={`object-cover transition-all duration-1000 ease-in-out ${
                imageLoaded ? "blur-0 scale-100" : "blur-md scale-105"
              }`}
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Progressive loading overlay */}
            <div
              className={`absolute inset-0 bg-gray-200 transition-opacity duration-1000 ${
                imageLoaded ? "opacity-0" : "opacity-30"
              }`}
            />
            {/* Optional overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Hero Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1
                className={`text-4xl md:text-6xl lg:text-8xl xl:text-7xl font-black text-white leading-none tracking-wide mb-4 transition-all duration-1000 font-helvetica-regular ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: "200ms",
                  // textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                WE ARE BUILDING
              </h1>
              <h2
                className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-wide transition-all duration-1000 font-helvetica-regular ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: "400ms",
                  // textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                THE FUTURE OF
              </h2>
              <h3
                className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-wide mt-2 transition-all duration-1000 font-helvetica-regular ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: "600ms",
                  // textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                CONSTRUCTION
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - Bottom Center */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="flex flex-col items-center text-white group cursor-pointer">
          <span className="text-xs font-medium tracking-widest mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            SCROLL DOWN
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>

      {/* Location Indicator - Bottom Right */}
      <div
        className={`absolute bottom-8 right-6 lg:right-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <div className="flex items-center space-x-2 text-white text-xs font-medium tracking-widest">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>OYO STATE, NIGERIA</span>
        </div>
      </div>
    </section>
  );
}
