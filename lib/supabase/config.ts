export type SupabaseConfig = {
  anonKey: string;
  url: string;
};

function getProjectUrlFromAnonKey(anonKey: string) {
  const [, payload] = anonKey.split(".");

  if (!payload) {
    return null;
  }

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const decoded = JSON.parse(globalThis.atob(padded)) as { ref?: unknown };

    if (typeof decoded.ref === "string" && decoded.ref.trim()) {
      return `https://${decoded.ref.trim()}.supabase.co`;
    }
  } catch {
    return null;
  }

  return null;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  const urlFromKey = getProjectUrlFromAnonKey(anonKey);
  const resolvedUrl = urlFromKey ?? url;

  try {
    const parsedUrl = new URL(resolvedUrl);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return null;
    }
  } catch {
    return null;
  }

  return { anonKey, url: resolvedUrl };
}

export function getSupabaseConfigOrThrow(): SupabaseConfig {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error(
      "Supabase no está configurado. Define SUPABASE_URL y SUPABASE_ANON_KEY."
    );
  }

  return config;
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseConfig());
}
