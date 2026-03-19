import { Avatar } from "@heroui/react";

export function ProfileAvatar({ avatarUrl, name }: { avatarUrl: string; name: string }) {
  return (
    <div className="px-4 -mt-16">
      <Avatar src={avatarUrl} name={name} className="w-32 h-32 text-2xl border-4 border-black" isBordered radius="full" />
    </div>
  );
}
