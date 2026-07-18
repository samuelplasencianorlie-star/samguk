import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 6;
const WINDOW_MS = 10 * 60 * 1000;

function getAttemptKey(request: NextRequest, email: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  const ip = forwardedFor || request.headers.get("x-real-ip") || "local";
  return `${ip}:${email.toLowerCase()}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  attempts.set(key, current);

  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: unknown;
    password?: unknown;
  };
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        message:
          "Supabase no está configurado. Revisa SUPABASE_URL y SUPABASE_ANON_KEY."
      },
      { status: 503 }
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { message: "Introduce usuario y contraseña." },
      { status: 400 }
    );
  }

  const attemptKey = getAttemptKey(request, email);

  if (isRateLimited(attemptKey)) {
    return NextResponse.json(
      { message: "Demasiados intentos. Espera unos minutos antes de probar." },
      { status: 429 }
    );
  }

  const response = NextResponse.json({ ok: true });
  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return NextResponse.json(
      { message: "Usuario o contraseña incorrectos." },
      { status: 401 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "No se ha podido iniciar sesión." },
      { status: 401 }
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (profileError) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { message: "No se ha podido verificar el acceso privado." },
      { status: 500 }
    );
  }

  if (!profile) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { message: "Este usuario no está autorizado para acceder al panel." },
      { status: 403 }
    );
  }

  attempts.delete(attemptKey);
  return response;
}
