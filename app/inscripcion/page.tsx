import type { Metadata } from "next";
import { RegistrationPageContent } from "@/components/public/registration-page-content";

export const metadata: Metadata = {
  title: "Solicita tu inscripción",
  description:
    "Prepara una solicitud inicial de inscripción para Samguk Cabo Blanco."
};

export default function RegistrationPage() {
  return <RegistrationPageContent />;
}
