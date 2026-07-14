import type { Metadata } from "next";
import { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Seguimiento de alumnos",
  description: "Seguimiento interno de alumnos de Samguk Cabo Blanco."
};

export const dynamic = "force-dynamic";

export default function PrivateAdminLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
