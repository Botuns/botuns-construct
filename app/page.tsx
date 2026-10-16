import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactCTASection from "@/components/sections/contact-cta-section";
import ContactFormSection from "@/components/sections/contact-form-section";
import FooterSection from "@/components/sections/footer-section";

export default function Page() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactCTASection />
        <ContactFormSection />
      </main>
      <FooterSection />
    </>
  );
}
