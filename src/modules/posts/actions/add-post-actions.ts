'use server';

import { supabaseClient } from "@/modules/core/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export const addPost = async (formData: FormData) => {
    let image_url: string | null = null;
    const content = formData.get("content");
    const image = formData.get("image") as File | null;

    if (content === null) return;
    const supabase = await supabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user === null) return;
    if (image && image.size > 0) {
        const fileName = `${user.id}/${Date.now()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("post-images").upload(fileName, image);
        if (uploadData) {
            const { data } = supabase.storage.from("post-images").getPublicUrl(fileName);
            image_url = data.publicUrl;
        }
    }
    const { error: insertError } = await supabase.from("posts").insert({ content: content.toString(), user_id: user.id, image_url });
    if (insertError) {
        console.error("Insert post error:", insertError.message);
        return;
    }
    revalidatePath("/");

}