"use client";
import { addPost } from "../actions/add-post-actions";
import { Avatar, Button, Textarea } from "@heroui/react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" radius="full" isLoading={pending} color="default">
      {pending ? "" : "Post"}
    </Button>
  );
}

export function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {
  return (
    <form action={addPost} className="flex flex-row flex-col gap-y-2 p-2 border-b border-white/20">
      <Avatar isBordered className="rounded-full w-12 h-12 object-contain mr-3" src={userAvatarUrl} alt="User Avatar" />
      <div className="flex flex-1 flex-col gap-y-4">
        <Textarea isRequired className="w-full text-xl bg-bllack placeholder-gray-500" variant="underlined" isClearable name="content" placeholder="¿¿¿Que esta pasando???" />
        <div className="self-end">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
