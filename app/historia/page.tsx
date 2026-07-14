import type { Metadata } from "next";
import { HistoryPageContent } from "@/components/public/history-page-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Historia del club",
  description: `Historia de ${siteConfig.fullName}.`
};

export default function HistoryPage() {
  return <HistoryPageContent />;
}
