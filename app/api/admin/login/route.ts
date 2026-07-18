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

function maskEmail(email: string) {
  const [name, domain] = email.split("@");

  if (!name || !domain) {
    return "invalid-email";
  }

  return `${name.slice(0, 2)}***@${domain}`;
}

type SupabasePasswordResponse = {
  access_token?: string;
  refresh_token?: string;
  user?: {
    id?: string;
    email?: string;
  };
  error?: string;
  error_description?: string;
  msg?: string;
};

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

  const authUrl = new URL("/auth/v1/token", config.url);
  authUrl.searchParams.set("grant_type", "password");

  console.info("[samguk-login] route hit", {
    email: maskEmail(email),
    supabaseHost: authUrl.host
  });
  console.info("[samguk-login] calling supabase auth password endpoint");

  let authResponse: Response;

  try {
    authResponse = await fetch(authUrl.toString(), {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        authorization: `Bearer ${config.anonKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store"
    });
  } catch (error) {
    console.error("[samguk-login] supabase auth fetch failed", error);
    return NextResponse.json(
      { message: "No se ha podido conectar con Supabase Auth." },
      { status: 503 }
    );
  }

  const authBody = (await authResponse
    .json()
    .catch(() => ({}))) as SupabasePasswordResponse;

  console.info("[samguk-login] supabase auth response", {
    status: authResponse.status,
    hasAccessToken: Boolean(authBody.access_token),
    hasRefreshToken: Boolean(authBody.refresh_token),
    hasUser: Boolean(authBody.user?.id),
    error: authBody.error || authBody.msg || null
  });

  if (!authResponse.ok) {
    return NextResponse.json(
      { message: "Usuario o contraseña incorrectos." },
      { status: 401 }
    );
  }

  if (!authBody.access_token || !authBody.refresh_token || !authBody.user?.id) {
    return NextResponse.json(
      { message: "No se ha podido iniciar sesión." },
      { status: 401 }
    );
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.setSession({
      access_token: authBody.access_token,
      refresh_token: authBody.refresh_token
    });

  console.info("[samguk-login] session set", {
    hasSession: Boolean(sessionData.session),
    hasUser: Boolean(sessionData.user?.id),
    error: sessionError?.message || null
  });

  if (sessionError || !sessionData.user) {
    return NextResponse.json(
      { message: "No se ha podido guardar la sesión." },
      { status: 500 }
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .eq("active", true)
    .maybeSingle();

  console.info("[samguk-login] profile check", {
    hasProfile: Boolean(profile),
    error: profileError?.message || null
  });

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
