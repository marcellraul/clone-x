import { supabaseClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { ComposePostButton } from "./compose-post-button";
//import { Button } from "@heroui/react";

export function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {
  const addPost = async (formData: FormData) => {
    "use server";
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
  };
  return (
    <form
      action={addPost}
      className="flex flex-row flex-col gap-y-2 p-2 border-b border-white/20"
    >
      <img
        className="rounded-full w-12 h-12 object-contain mr-3"
        src={userAvatarUrl}
        alt="User Avatar"
      />
      <div className="flex flex-1 flex-col gap-y-4">
        <textarea
          name="content"
          rows={4}
          className="w-full text-2xl bg-bllack placeholder-gray-500"
          placeholder="¿¿¿Que esta pasando???"
        ></textarea>
        <ComposePostButton />
        {/* <button color="primary" className="runded-full px-2 py-2 self-end">
          Postear
        </button> */}
      </div>
    </form>
  );
}
