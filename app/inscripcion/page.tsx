import type { Metadata } from "next";
import { RegistrationPageContent } from "@/components/public/registration-page-content";

export const metadata: Metadata = {
  title: "Preinscripción",
  description:
    "Preinscripción formal para Samguk Cabo Blanco con datos del alumno y aceptación de condiciones."
};

export default function RegistrationPage() {
  return <RegistrationPageContent />;
}
