"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactCTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_50%)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-400/20 to-transparent rounded-full translate-x-48 translate-y-48" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
        {/* Main Headline */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              Build with Us?
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Let's make your next project stress-free and successful
          </p>
        </div>

        {/* Main CTA Button */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            Request a Quote Now
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Contact Information */}
        <div
          className={`grid md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {/* Email */}
          <div className="flex flex-col items-center group">
            <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <Mail className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
            <a
              href="mailto:botunsconstructlimited@gmail.com"
              className="text-blue-200 hover:text-amber-300 transition-colors duration-300 text-center break-all"
            >
              botunsconstructlimited@gmail.com
            </a>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center group">
            <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <MapPin className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
            <p className="text-blue-200 text-center leading-relaxed">
              KM 13, Lagos-Ibadan Express Way
              <br />
              Sonel Bonel, Ibadan, Oyo State
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center group">
            <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
              <Phone className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
            <div className="text-blue-200 text-center space-y-1">
              <a href="tel:+2348034706314" className="block hover:text-amber-300 transition-colors duration-300">
                +234 803 470 6314
              </a>
              <a href="tel:+2349015903818" className="block hover:text-amber-300 transition-colors duration-300">
                +234 901 590 3818
              </a>
            </div>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div
          className={`mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-200 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">CAC Registered - RC: 8525611</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-amber-400 rounded-full animate-pulse" />
            <span className="font-medium">Licensed & Insured</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-blue-400 rounded-full animate-pulse" />
            <span className="font-medium">24/7 Support Available</span>
          </div>
        </div>

        {/* Response Time Indicator */}
        <div
          className={`mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white font-medium text-sm">We typically respond within 2 hours</span>
        </div>
      </div>
    </section>
  )
}
