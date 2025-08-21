"use client"

import { useState, useEffect, useRef } from "react"
import { Filter } from "lucide-react"
import Image from "next/image"

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
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

  const filters = ["All", "Construction", "Properties", "Supplies"]

  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex - Lagos",
      category: "Construction",
      image: "/placeholder.svg?height=400&width=600",
      size: "large",
    },
    {
      id: 2,
      title: "Commercial Warehouse Facility",
      category: "Supplies",
      image: "/placeholder.svg?height=300&width=400",
      size: "medium",
    },
    {
      id: 3,
      title: "Luxury Villa Development - Ibadan",
      category: "Properties",
      image: "/placeholder.svg?height=500&width=400",
      size: "tall",
    },
    {
      id: 4,
      title: "Office Building Renovation",
      category: "Construction",
      image: "/placeholder.svg?height=300&width=400",
      size: "medium",
    },
    {
      id: 5,
      title: "Industrial Supply Chain Hub",
      category: "Supplies",
      image: "/placeholder.svg?height=400&width=600",
      size: "large",
    },
    {
      id: 6,
      title: "Residential Estate - Oyo",
      category: "Properties",
      image: "/placeholder.svg?height=350&width=400",
      size: "medium",
    },
    {
      id: 7,
      title: "Shopping Mall Construction",
      category: "Construction",
      image: "/placeholder.svg?height=450&width=400",
      size: "tall",
    },
    {
      id: 8,
      title: "Equipment Storage Facility",
      category: "Supplies",
      image: "/placeholder.svg?height=300&width=400",
      size: "medium",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"
      case "tall":
        return "md:row-span-2"
      case "medium":
      default:
        return ""
    }
  }

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore our completed projects across construction, property development, and supply chain solutions
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center gap-2 text-slate-600 mr-4">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter by:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer ${getSizeClasses(project.size)} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Project Image */}
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Blur Background for Text */}
              <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Project Info Overlay */}
              <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="text-white">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 rounded-2xl transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <button className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-50 hover:to-blue-100 text-slate-700 hover:text-blue-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
            Load More Projects
          </button>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Your Next Project?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can bring your construction, property, or supply vision to life with the same quality
              and attention to detail.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
