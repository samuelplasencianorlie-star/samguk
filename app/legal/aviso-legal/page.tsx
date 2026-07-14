import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/public/legal-placeholder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aviso legal"
};

export default function LegalNoticePage() {
  return (
    <LegalPlaceholder
      title="Aviso legal"
      description={siteConfig.legal.legalNotice}
    />
  );
}
