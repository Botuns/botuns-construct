// Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://www.example.com).
// On Vercel the production domain is used automatically when it is not set.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  name: "Botuns Construct Nigeria Limited",
  shortName: "Botuns Construct",
  title: "Botuns Construct | Construction Company in Ibadan, Nigeria",
  description:
    "Ibadan-based construction company delivering new builds, renovations, building materials supply and property development across Nigeria.",
  slogan: "Strong foundations. Lasting relationships.",
  email: "botunsconstructlimited@gmail.com",
  phones: ["+2348034706314", "+2349015903818"],
  address: {
    street: "KM 13, Lagos-Ibadan Expressway, Sonel Bonel",
    locality: "Ibadan",
    region: "Oyo State",
    country: "NG",
  },
  rcNumber: "8525611",
  foundingYear: "2025",
  services: [
    {
      name: "Construction & repairs",
      description:
        "New builds, renovations and structural repairs, from foundations to finishing touches.",
    },
    {
      name: "Purchasing & supply",
      description:
        "Procurement and delivery of construction materials and equipment.",
    },
    {
      name: "Property & investment",
      description: "Property development, sales and investment advisory.",
    },
    {
      name: "General merchandising",
      description: "Sourcing, trading and business supplies.",
    },
  ],
};

export const ceo = {
  name: "Taofeek Olajide Olatunji",
  role: "Founder & Chief Executive Officer",
};

// Pages that set `openGraph` replace the layout's object, so they spread this.
export const openGraphDefaults = {
  siteName: site.name,
  locale: "en_NG",
} as const;
