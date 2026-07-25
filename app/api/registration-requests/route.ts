import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { calculateAge } from "@/lib/age";
import { LEGAL_CONSENT_VERSION } from "@/lib/legal-consent";
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
  condicionesAceptadas?: unknown;
  proteccionDatosAceptada?: unknown;
  tutorConfirmado?: unknown;
  responsabilidadAceptada?: unknown;
  derechosImagen?: unknown;
  textoLegalVersion?: unknown;
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
  const isMinor = age !== null && age < 18;

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
      { message: "Debes aceptar la protección de datos." },
      { status: 400 }
    );
  }

  if (payload.condicionesAceptadas !== true) {
    return NextResponse.json(
      { message: "Debes aceptar las condiciones del club." },
      { status: 400 }
    );
  }

  if (payload.responsabilidadAceptada !== true) {
    return NextResponse.json(
      { message: "Debes aceptar la responsabilidad deportiva." },
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

  if (!birthDate || age === null) {
    return NextResponse.json(
      { message: "Introduce una fecha de nacimiento válida." },
      { status: 400 }
    );
  }

  if (isMinor && text(payload.guardian).length < 2) {
    return NextResponse.json(
      { message: "Introduce el nombre del responsable legal." },
      { status: 400 }
    );
  }

  if (text(payload.address).length < 4) {
    return NextResponse.json(
      { message: "Introduce una dirección válida." },
      { status: 400 }
    );
  }

  if (!/^[0-9]{5}$/.test(text(payload.postalCode))) {
    return NextResponse.json(
      { message: "Introduce un código postal válido." },
      { status: 400 }
    );
  }

  if (text(payload.dniNie).length < 5) {
    return NextResponse.json(
      { message: "Introduce un DNI/NIE o pasaporte válido." },
      { status: 400 }
    );
  }

  if (typeof payload.derechosImagen !== "boolean") {
    return NextResponse.json(
      { message: "Indica si autorizas o no el derecho de imagen." },
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
      condiciones_aceptadas: true,
      proteccion_datos_aceptada: true,
      tutor_confirmado: isMinor ? payload.tutorConfirmado === true : true,
      responsabilidad_aceptada: true,
      derechos_imagen: payload.derechosImagen,
      fecha_aceptacion_legal: new Date().toISOString(),
      texto_legal_version: text(payload.textoLegalVersion) || LEGAL_CONSENT_VERSION
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
