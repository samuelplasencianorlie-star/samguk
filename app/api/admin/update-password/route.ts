import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!password || password.length < 8) {
    return NextResponse.json(
      { message: "La nueva contraseña debe tener al menos 8 caracteres." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        message:
          "Supabase no está configurado. Revisa SUPABASE_URL y SUPABASE_ANON_KEY."
      },
      { status: 503 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.json(
      {
        message:
          "No se ha podido actualizar la contraseña. Abre el enlace de recuperación de nuevo."
      },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
