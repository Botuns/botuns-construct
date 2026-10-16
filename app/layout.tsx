import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "BOTUNS CONSTRUCT NIGERIA LIMITED - Building Nigeria's Future",
  description:
    "Expert construction, property development, and supply services across Nigeria. CAC registered company delivering quality projects on time and within budget.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
