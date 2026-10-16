import { ceo, site, siteUrl } from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const ceoUrl = `${siteUrl}/meet-the-ceo`;
const personId = `${ceoUrl}#person`;

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.shortName,
        alternateName: [site.name, "Botuns"],
        inLanguage: "en-NG",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "GeneralContractor",
        "@id": organizationId,
        name: site.name,
        alternateName: site.shortName,
        legalName: site.name,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icons/icon-512.png`,
          width: 512,
          height: 512,
        },
        image: [
          `${siteUrl}/opengraph-image.jpg`,
          `${siteUrl}/assets/projects/completed-bungalow/exterior.webp`,
        ],
        description: site.description,
        slogan: site.slogan,
        email: site.email,
        telephone: site.phones[0],
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: { "@type": "Country", name: "Nigeria" },
        foundingDate: site.foundingYear,
        founder: { "@id": personId },
        identifier: {
          "@type": "PropertyValue",
          propertyID: "CAC RC Number",
          value: site.rcNumber,
        },
        contactPoint: site.phones.map((telephone) => ({
          "@type": "ContactPoint",
          telephone,
          email: site.email,
          contactType: "customer service",
          areaServed: "NG",
          availableLanguage: "English",
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "16:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: site.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              provider: { "@id": organizationId },
            },
          })),
        },
      },
    ],
  };
}

export function ceoProfileSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${ceoUrl}#webpage`,
    url: ceoUrl,
    name: `Meet the CEO | ${site.shortName}`,
    description,
    inLanguage: "en-NG",
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: ceo.name,
      jobTitle: ceo.role,
      url: ceoUrl,
      image: `${siteUrl}/assets/team/ceo-portrait.webp`,
      description,
      worksFor: { "@id": organizationId },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Ekiti State University",
        alternateName: "University of Ado-Ekiti",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "B.Sc. Business Administration, First Class Honours",
        credentialCategory: "degree",
      },
      knowsAbout: [
        "Building construction",
        "Construction project management",
        "Sand and stone supply",
        "Quarrying",
        "Property development",
      ],
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
