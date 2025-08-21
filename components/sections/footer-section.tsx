"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from "lucide-react"

export default function FooterSection() {
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

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-500" },
  ]

  return (
    <footer ref={sectionRef} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: About Company */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Company Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-white font-bold text-xl">BC</span>
              </div>
              <div>
                <div className="font-bold text-xl leading-tight">BOTUNS</div>
                <div className="text-sm text-blue-300 font-medium">CONSTRUCT NIGERIA LIMITED</div>
              </div>
            </div>

            {/* Company Description */}
            <p className="text-slate-300 leading-relaxed mb-6">
              A CAC-certified construction, merchandising, and property company based in Ibadan. We combine expertise
              with integrity to deliver exceptional results across Nigeria, building the future one project at a time.
            </p>

            {/* CAC Registration */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-300">
                CAC Registered Company - RC: <span className="text-green-400 font-bold">8525611</span>
              </span>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="h-1.5 w-1.5 bg-blue-400 rounded-full" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="h-1.5 w-1.5 bg-amber-400 rounded-full" />
                <span>Nationwide Operations</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-all duration-300 group"
                >
                  <div className="h-1 w-1 bg-slate-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>

            {/* Services List */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
              <div className="space-y-2 text-sm">
                <div className="text-slate-400">• Building Construction & Repairs</div>
                <div className="text-slate-400">• Property Sales & Investment</div>
                <div className="text-slate-400">• Purchasing & Supply</div>
                <div className="text-slate-400">• General Merchandising</div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Details */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Get in Touch</h3>

            {/* Contact Information */}
            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Office Address</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    KM 13, Lagos-Ibadan Express Way
                    <br />
                    Sonel Bonel, Ibadan, Oyo State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone Numbers</h4>
                  <div className="space-y-1">
                    <a
                      href="tel:+2348034706314"
                      className="block text-slate-300 text-sm hover:text-green-400 transition-colors duration-300"
                    >
                      +234 803 470 6314
                    </a>
                    <a
                      href="tel:+2349015903818"
                      className="block text-slate-300 text-sm hover:text-green-400 transition-colors duration-300"
                    >
                      +234 901 590 3818
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email Address</h4>
                  <a
                    href="mailto:botunsconstructlimited@gmail.com"
                    className="text-slate-300 text-sm hover:text-amber-400 transition-colors duration-300 break-all"
                  >
                    botunsconstructlimited@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`h-10 w-10 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-600`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-slate-700" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {/* Copyright */}
          <div className="text-slate-400 text-sm text-center md:text-left">
            <p>
              © {new Date().getFullYear()} BOTUNS CONSTRUCT NIGERIA LIMITED. All rights reserved.
              <span className="mx-2">|</span>
              <span className="text-green-400">RC: 8525611</span>
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#sitemap" className="hover:text-white transition-colors duration-300">
              Sitemap
            </a>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div
          className={`mt-6 pt-6 border-t border-slate-800 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="text-slate-500 text-xs">
            BOTUNS CONSTRUCT NIGERIA LIMITED is a registered company with the Corporate Affairs Commission (CAC) of
            Nigeria.
            <br />
            We are committed to delivering quality construction, property, and supply services across Nigeria.
          </p>
        </div>
      </div>
    </footer>
  )
}
