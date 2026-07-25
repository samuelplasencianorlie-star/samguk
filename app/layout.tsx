import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.clubName}`
  },
  description: `${siteConfig.fullName}. ${siteConfig.tagline}`,
  icons: {
    icon: "/images/samguk-logo-transparent.png",
    apple: "/images/samguk-logo-transparent.png"
  },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
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
