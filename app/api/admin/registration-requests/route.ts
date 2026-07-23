import { NextRequest, NextResponse } from "next/server";
import type { RequestStatus } from "@/lib/admin-types";
import { checkAdminAccess } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const allowedStatuses: RequestStatus[] = [
  "Pendiente",
  "Revisada",
  "Aceptada",
  "Rechazada"
];

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PATCH(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    id?: unknown;
    status?: unknown;
  };
  const id = text(payload.id);
  const status = text(payload.status) as RequestStatus;

  if (!id || !allowedStatuses.includes(status)) {
    return NextResponse.json(
      { message: "No se ha podido identificar la solicitud o su estado." },
      { status: 400 }
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "No autorizado." }, { status: 401 });
    }

    const access = await checkAdminAccess(supabase);

    if (!access.allowed) {
      return NextResponse.json({ message: "No autorizado." }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("registration_requests")
      .update({ status })
      .eq("id", id)
      .select("id,status")
      .single();

    if (error || !data) {
      console.error("No se pudo actualizar la solicitud.", {
        code: error?.code,
        message: error?.message
      });
      return NextResponse.json(
        { message: "No se ha podido guardar el estado de la solicitud." },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id, status: data.status });
  } catch {
    return NextResponse.json(
      { message: "No se ha podido conectar con Supabase." },
      { status: 503 }
    );
  }
}
