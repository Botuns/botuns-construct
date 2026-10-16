import type React from "react";
import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./globals.css";
import Navbar from "../components/navbar";
import { openGraphDefaults, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "construction",
  openGraph: {
    ...openGraphDefaults,
    type: "website",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The two weights used above the fold; the rest load on demand.
  for (const weight of ["Medium", "Bold"])
    preload(`/fonts/HelveticaNeue${weight}.woff2`, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  return (
    <html lang="en-NG">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
