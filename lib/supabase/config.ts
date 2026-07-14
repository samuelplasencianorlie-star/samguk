export type SupabaseConfig = {
  anonKey: string;
  url: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { anonKey, url };
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
