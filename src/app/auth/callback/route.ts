import { NextResponse } from "next/server";
import { supabaseClient } from "@/modules/core/lib/supabaseClient";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = await supabaseClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(origin);
        }
    }
    return NextResponse.redirect(origin);
}
