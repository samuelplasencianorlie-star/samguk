import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/public/legal-placeholder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de cookies"
};

export default function CookiesPage() {
  return (
    <LegalPlaceholder
      title="Política de cookies"
      description={siteConfig.legal.cookies}
    />
  );
}
