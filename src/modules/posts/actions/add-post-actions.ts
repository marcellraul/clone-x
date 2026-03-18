'use server';

import { supabaseClient } from "@/modules/core/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export const addPost = async (formData: FormData) => {
    const content = formData.get("content");
    if (content === null) return;
    const supabase = await supabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user === null) return;
    await supabase
        .from("posts")
        .insert({ content: content.toString(), user_id: user.id });
    revalidatePath("/");
}