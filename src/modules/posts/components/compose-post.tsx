"use client";
import { addPost } from "../actions/add-post-actions";
import { Avatar, Button, Textarea, addToast } from "@heroui/react";
import { useFormStatus } from "react-dom";
import { useRef, useState } from "react";
import { IconPhoto, IconX } from "@tabler/icons-react";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" radius="full" isLoading={pending} isDisabled={disabled || pending} color="default">
      {pending ? "" : "Post"}
    </Button>
  );
}

export function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clientAction = async (formData: FormData) => {
    try {
      await addPost(formData);
    } catch (error: any) {
      addToast({
        title: "Error al publicar",
        description: error,
        color: "danger",
      });
      console.log(error, "error");
    }
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form action={clientAction} className="flex flex-row gap-x-2 p-2 border-b border-white/20">
      <Avatar isBordered className="rounded-full w-12 h-12 object-contain shrink-0" src={userAvatarUrl} alt="User Avatar" />
      <div className="flex flex-1 flex-col gap-y-3">
        <Textarea isRequired className="w-full text-xl placeholder-gray-500" variant="underlined" isClearable name="content" placeholder="¿Qué está pasando?" onValueChange={setContent} />

        {preview && (
          <div className="relative w-fit">
            <img src={preview} alt="preview" className="max-h-64 rounded-xl object-cover" />
            <button type="button" onClick={removeImage} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 hover:bg-black/80">
              <IconX size={16} />
            </button>
          </div>
        )}

        <input ref={fileInputRef} type="file" name="image" accept="image/*" className="hidden" onChange={handleFileChange} />

        <div className="flex items-center justify-between">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[#1D9BF0] hover:text-[#1a8cd8] transition-colors cursor-pointer">
            <IconPhoto size={20} />
          </button>
          <SubmitButton disabled={!content} />
        </div>
      </div>
    </form>
  );
}
