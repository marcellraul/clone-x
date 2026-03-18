import { notFound } from "next/navigation";
import { supabaseClient } from "@/modules/core/lib/supabaseClient";
import { ProfileView } from "@/modules/profile/views/profile-view";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await supabaseClient();
  const { data: user } = await supabase.from("users").select("*").eq("user_name", username).single();

  if (!user) notFound();

  const [{ count: postsCount }, { count: followersCount }, { count: followingCount }] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", user.id),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", user.id),
  ]);

  return (
    <ProfileView
      profile={{
        ...user,
        postsCount: postsCount ?? 0,
        followersCount: followersCount ?? 0,
        followingCount: followingCount ?? 0,
      }}
    />
  );
}
