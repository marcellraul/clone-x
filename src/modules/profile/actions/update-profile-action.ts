'use server';

import { supabaseClient } from "@/modules/core/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export const updateProfile = async (formData: FormData) => {
    try {
        const name = formData.get("name");
        const bio = formData.get("bio");
        const location = formData.get("location");
        const website_url = formData.get("website_url");
        const avatarFile = formData.get("avatar") as File | null;
        const bannerFile = formData.get("banner") as File | null;

        const supabase = await supabaseClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let avatar_url: string | undefined;
        let banner_url: string | undefined;

        if (avatarFile && avatarFile.size > 0) {
            const fileName = `${user.id}/avatar-${Date.now()}`;
            const { data: uploadData, error } = await supabase.storage.from("avatars").upload(fileName, avatarFile, { upsert: true });
            if (error) console.error("Avatar upload error:", error.message);
            if (uploadData) {
                const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
                avatar_url = data.publicUrl;
            }
        }

        if (bannerFile && bannerFile.size > 0) {
            const fileName = `${user.id}/banner-${Date.now()}`;
            const { data: uploadData, error } = await supabase.storage.from("banners").upload(fileName, bannerFile, { upsert: true });
            if (error) console.error("Banner upload error:", error.message);
            if (uploadData) {
                const { data } = supabase.storage.from("banners").getPublicUrl(fileName);
                banner_url = data.publicUrl;
            }
        }

        const { data: userProfile } = await supabase.from("users").select("user_name").eq("id", user.id).single();

        const { error } = await supabase.from("users").update({
            name,
            bio: bio || null,
            location: location || null,
            website_url: website_url || null,
            ...(avatar_url && { avatar_url }),
            ...(banner_url && { banner_url }),
        }).eq("id", user.id);

        if (error) console.log("profile error:", error);

        revalidatePath(`/${userProfile?.user_name}`);
    } catch (e) {
        console.error("error update:", e);
    }
};
