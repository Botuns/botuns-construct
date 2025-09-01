"use client"

// import HeroSection from "./sections/hero-section"
// import AboutSection from "./sections/about-section"
// import ServicesSection from "./sections/services-section"
// import WhyChooseUsSection from "./sections/why-choose-us-section"
// import PortfolioSection from "./sections/portfolio-section"
// import TestimonialsSection from "./sections/testimonials-section"
// import ContactCTASection from "./sections/contact-cta-section"
// import ContactFormSection from "../contact-form-section"
// import FooterSection from "./sections/footer-section"
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyChooseUsSection,
  PortfolioSection,
  TestimonialsSection,
  ContactCTASection,
  FooterSection,
  ContactFormSection,
} from "../components/sections"

export default function Page() {
  return (
    <main>
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="why-choose-us">
        <WhyChooseUsSection />
      </div>
      <div id="portfolio">
        <PortfolioSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="contact">
        <ContactCTASection />
        <ContactFormSection />
      </div>
      <FooterSection />
    </main>
  )
}
