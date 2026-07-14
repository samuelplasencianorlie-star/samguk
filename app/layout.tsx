import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.clubName}`
  },
  description: `${siteConfig.fullName}. ${siteConfig.tagline}`,
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.tagline,
    siteName: siteConfig.fullName,
    type: "website",
    locale: "es_ES"
  },
  twitter: {
    card: "summary",
    title: siteConfig.fullName,
    description: siteConfig.tagline
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
