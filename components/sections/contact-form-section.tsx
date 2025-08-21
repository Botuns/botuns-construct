"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactFormSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      })
    }, 3000)
  }

  const projectTypes = [
    "Building Construction",
    "Property Development",
    "Supply & Procurement",
    "General Merchandising",
    "Renovation & Repairs",
    "Consultation",
    "Other",
  ]

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your project? Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50 focus:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Project Type Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50 focus:bg-white"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50 focus:bg-white"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-slate-50 focus:bg-white resize-none"
                    placeholder="Tell us about your project requirements, timeline, and any specific details..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isSubmitted
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </div>
                    ) : isSubmitted ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="h-5 w-5" />
                        Message Sent Successfully!
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send className="h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Let's Start Building Together</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our team is ready to discuss your project and provide expert guidance. Reach out through any of the
                  channels below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Address */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Our Office</h4>
                      <p className="text-slate-600 leading-relaxed">
                        KM 13, Lagos-Ibadan Express Way
                        <br />
                        Sonel Bonel, Ibadan, Oyo State, Nigeria
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Call Us</h4>
                      <div className="space-y-1">
                        <a
                          href="tel:+2348034706314"
                          className="block text-slate-600 hover:text-blue-600 transition-colors duration-300"
                        >
                          +234 803 470 6314
                        </a>
                        <a
                          href="tel:+2349015903818"
                          className="block text-slate-600 hover:text-blue-600 transition-colors duration-300"
                        >
                          +234 901 590 3818
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Email Us</h4>
                      <a
                        href="mailto:botunsconstructlimited@gmail.com"
                        className="text-slate-600 hover:text-blue-600 transition-colors duration-300 break-all"
                      >
                        botunsconstructlimited@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Business Hours</h4>
                      <div className="text-slate-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Emergency calls only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-bold text-slate-900">CAC Registered Company</span>
                </div>
                <p className="text-sm text-slate-600">RC: 8525611 - Licensed and insured for your peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
