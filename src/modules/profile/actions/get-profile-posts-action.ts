'use server';

import { supabaseClient } from "@/modules/core/lib/supabaseClient";

export const getProfilePosts = async (userId: string) => {
    try {
        const supabase = await supabaseClient();
        const { data: posts } = await supabase.from("posts").select("*, users(*)").eq("user_id", userId).order("created_at", { ascending: false });
        return posts;
    } catch (e) {
        console.error("getProfilePosts error:", e);
        return null;
    }
}
