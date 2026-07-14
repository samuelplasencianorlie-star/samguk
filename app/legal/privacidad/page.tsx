import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/public/legal-placeholder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad"
};

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Política de privacidad"
      description={siteConfig.legal.privacy}
    />
  );
}
