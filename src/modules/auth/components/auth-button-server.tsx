import { AuthButtons } from "./auth-buttons-client";
import { supabaseClient } from "@/modules/core/lib/supabaseClient";

export async function AuthButtonServer() {
  const supabase = await supabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <AuthButtons user={user} />;
}
