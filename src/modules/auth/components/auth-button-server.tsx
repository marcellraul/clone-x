import { supabaseBrowser } from "@/modules/core/lib/supabaseBrowser";
import { AuthButtons } from "./auth-buttons-client";
import { supabaseClient } from "@/modules/core/lib/supabaseClient";

export async function AuthButtonServer() {
  const supabase = await supabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return <AuthButtons session={session} />;
}
