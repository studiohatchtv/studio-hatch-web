import { createClient } from "@supabase/supabase-js";

// Same Supabase project as the mobile web app. Anon/publishable key is safe to
// embed client-side; RLS policies (see supabase/schema.sql in studio-hatch)
// restrict writes to admins while content is publicly readable.
const SUPABASE_URL = "https://qchvgklnydqizjoosfpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_Et4lHFmkn_bMUylPFAagXA_UtAmFVoo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});
