"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, User, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
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

  const testimonials = [
    {
      id: 1,
      quote:
        "BOTUNS Construct helped us complete our dream home on time and within budget. Their attention to detail and professional approach exceeded our expectations.",
      name: "Adewale M.",
      location: "Ibadan, Oyo State",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      project: "Residential Construction",
    },
    {
      id: 2,
      quote:
        "Outstanding supply chain management! They delivered all our construction materials promptly and maintained excellent quality throughout our commercial project.",
      name: "Fatima A.",
      location: "Lagos State",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      project: "Supply & Logistics",
    },
    {
      id: 3,
      quote:
        "The property investment advice we received was invaluable. BOTUNS helped us identify and acquire prime real estate that has already appreciated significantly.",
      name: "Chinedu O.",
      location: "Abuja, FCT",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      project: "Property Investment",
    },
    {
      id: 4,
      quote:
        "Professional, reliable, and transparent. Their renovation work on our office building was completed ahead of schedule with exceptional craftsmanship.",
      name: "Blessing I.",
      location: "Port Harcourt, Rivers State",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      project: "Building Renovation",
    },
    {
      id: 5,
      quote:
        "From initial consultation to project completion, BOTUNS demonstrated expertise and integrity. We couldn't be happier with our new warehouse facility.",
      name: "Ibrahim K.",
      location: "Kano State",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
      project: "Commercial Construction",
    },
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-blue-50 to-slate-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(245,158,11,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from satisfied clients across Nigeria
            </p>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="h-16 w-16 text-blue-600" />
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 p-12 lg:p-16">
                    <div className="text-center max-w-4xl mx-auto">
                      {/* Client Photo */}
                      <div className="mb-8">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-10 w-10 text-blue-600" />
                          </div>
                          {/* Online indicator */}
                          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full" />
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className="text-2xl lg:text-3xl font-medium text-slate-700 leading-relaxed mb-8 italic">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Client Info */}
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-slate-900">{testimonial.name}</h4>
                        <p className="text-slate-600 font-medium">{testimonial.location}</p>
                        <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                          {testimonial.project}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 w-8"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Project Completion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">4.9★</div>
              <div className="text-slate-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
