import { supabaseClient } from "@/lib/supabaseClient";
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";
import { PostList } from "./components/post-list";

import { type Database } from "./types/database";
import { ComposePost } from "./components/compose-post";
type Posts = Database["public"]["Tables"]["posts"]["Row"];
export default async function Home() {
  const supabase = await supabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(*)")
    .order("created_at", { ascending: false });
  if (session === null) {
    redirect("/login");
  }

  return (
    <div className="">
      <main className=" flex-col items-center justify-between  bg-white dark:bg-black sm:items-start">
        <h1>Hola Clone-X</h1>
        <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen flex flex-col gap-y-2  py-2">
          <ComposePost userAvatarUrl={session.user.user_metadata.avatar_url} />
          <PostList posts={posts} />
        </section>
        <AuthButtonServer />

        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      </main>
    </div>
  );
}
