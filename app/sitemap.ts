import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const photo = (name: string) =>
    `${siteUrl}/assets/projects/completed-bungalow/${name}.webp`;
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        photo("exterior"),
        photo("entrance"),
        photo("side-elevation"),
        photo("living-room"),
        photo("kitchen"),
        photo("dining-room"),
      ],
    },
    {
      url: `${siteUrl}/meet-the-ceo`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
      images: [`${siteUrl}/assets/team/ceo-portrait.webp`],
    },
  ];
}
