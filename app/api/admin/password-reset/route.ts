import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { email } = (await request.json().catch(() => ({}))) as {
    email?: string;
  };

  if (!email?.trim()) {
    return NextResponse.json(
      { message: "Introduce el email asociado al acceso privado." },
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

  const origin = request.nextUrl.origin;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
      "/admin/reset-password?mode=update"
    )}`
  });

  if (error) {
    return NextResponse.json(
      { message: "No se ha podido enviar el email de recuperación." },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
