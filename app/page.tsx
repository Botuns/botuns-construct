import type { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactCTASection from "@/components/sections/contact-cta-section";
import ContactFormSection from "@/components/sections/contact-form-section";
import FooterSection from "@/components/sections/footer-section";
import JsonLd from "@/components/seo/json-ld";
import { openGraphDefaults, site } from "@/lib/site";
import { homeSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraphDefaults,
    type: "website",
    url: "/",
    title: site.title,
    description: site.description,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={homeSchema()} />
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
