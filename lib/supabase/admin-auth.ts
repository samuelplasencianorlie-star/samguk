import type { SupabaseClient } from "@supabase/supabase-js";

export async function checkAdminAccess(supabase: SupabaseClient) {
  const { data, error } = await supabase.rpc("is_samguk_admin");

  return {
    allowed: data === true,
    error
  };
}
