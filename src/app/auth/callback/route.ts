import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");

    if (code) {
        const supabase = await supabaseClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        // Si todo va bien → vuelve a la home
        if (!error) {
            return NextResponse.redirect(origin);
        }
    }

    // Incluso si hay error → vuelve a la home
    return NextResponse.redirect(origin);
}
