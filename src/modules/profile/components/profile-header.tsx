import Link from "next/link";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";

export function ProfileHeader({ name, postsCount }: { name: string; postsCount: number }) {
  return (
    <div className="flex items-center gap-6 px-4 py-2 sticky top-0 z-10 bg-black/80 backdrop-blur">
      <Link href="/">
        <IconArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight">{name}</span>
        <span className="text-lg text-gray-500">{postsCount} posts</span>
      </div>
      <div className="ml-auto">
        <IconSearch className="w-6 h-6" />
      </div>
    </div>
  );
}
