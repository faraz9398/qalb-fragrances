import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

function createSupabaseClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return null;
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}

export const supabase = createSupabaseClient();
