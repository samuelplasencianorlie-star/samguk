import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { calculateAge } from "@/lib/age";
import { getSupabaseConfigOrThrow } from "@/lib/supabase/config";

export const runtime = "nodejs";

type RegistrationPayload = {
  fullName?: unknown;
  birthDate?: unknown;
  guardian?: unknown;
  address?: unknown;
  postalCode?: unknown;
  dniNie?: unknown;
  phone?: unknown;
  phone2?: unknown;
  email?: unknown;
  message?: unknown;
  proteccionDatosAceptada?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(value: unknown) {
  return text(value) || null;
}

function isValidPhone(value: string) {
  return /^\+?[0-9\s]{6,16}$/.test(value);
}

function isValidOptionalEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as RegistrationPayload;
  const fullName = text(payload.fullName);
  const phone = text(payload.phone);
  const email = text(payload.email).toLowerCase();
  const birthDate = text(payload.birthDate);
  const age = birthDate ? calculateAge(birthDate) : null;

  if (fullName.length < 2) {
    return NextResponse.json(
      { message: "Introduce el nombre y los apellidos." },
      { status: 400 }
    );
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { message: "Introduce un teléfono válido." },
      { status: 400 }
    );
  }

  if (!isValidOptionalEmail(email)) {
    return NextResponse.json(
      { message: "Introduce un email válido." },
      { status: 400 }
    );
  }

  if (payload.proteccionDatosAceptada !== true) {
    return NextResponse.json(
      { message: "Debes aceptar la política de privacidad." },
      { status: 400 }
    );
  }

  if (
    birthDate &&
    age === null
  ) {
    return NextResponse.json(
      { message: "La fecha de nacimiento indicada no es válida." },
      { status: 400 }
    );
  }

  try {
    const { anonKey, url } = getSupabaseConfigOrThrow();
    const supabase = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { error } = await supabase.from("registration_requests").insert({
      full_name: fullName,
      age,
      birth_date: birthDate || null,
      guardian: nullableText(payload.guardian),
      address: nullableText(payload.address),
      postal_code: nullableText(payload.postalCode),
      dni_nie: nullableText(payload.dniNie),
      phone,
      phone2: nullableText(payload.phone2),
      email: email || null,
      message: nullableText(payload.message),
      proteccion_datos_aceptada: true,
      fecha_aceptacion_legal: new Date().toISOString(),
      texto_legal_version: "contact-request-2026-07"
    });

    if (error) {
      console.error("No se pudo guardar la solicitud.", {
        code: error.code,
        message: error.message
      });
      return NextResponse.json(
        { message: "No se ha podido guardar la solicitud." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "El servicio de inscripción no está disponible." },
      { status: 503 }
    );
  }
}
