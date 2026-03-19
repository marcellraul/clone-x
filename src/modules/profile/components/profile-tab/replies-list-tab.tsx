import Link from "next/link";
import { Card, Avatar } from "@heroui/react";
import { IconMessageCircle, IconRepeat, IconHeartCode, IconChartBar, IconShare2 } from "@tabler/icons-react";
import moment from "moment";

export default function RepliesListTab({ userName, userFullName, avatarUrl, content, createdAt, imageUrl }: { userName: string; userFullName: string; avatarUrl: string; content: string; createdAt: string; imageUrl?: string | null }) {
  return (
    <>
      <span className="mt-2 ml-4 flex">
        <IconRepeat size={20} color="#71717A" />
        <p className="text-xs font-semibold  text-default-400 ml-1 kj">You reposted</p>
      </span>
      <Card className="shadow-none bg-transparent min-w-[440px] transition-colors duration-200 border-b rounded-none border-white/20 cursor-pointer">
        <div className="flex flex-row gap-3 p-3">
          <Link href={`/${userName}`} className="shrink-0">
            <Avatar isBordered radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className="flex flex-col flex-1 ">
            <Link href={`/${userName}`} className="flex items-center gap-2">
              <h4 className="text-lg font-semibold  text-default-600">{userFullName}</h4>
              <h5 className="text-lg text-default-400">@{userName}</h5>
              <span className="text-xs text-default-400">· {moment(createdAt).fromNow()}</span>
            </Link>
            <p className="text-default-500 ">{content}</p>
            {imageUrl && <img src={imageUrl} alt="post image" className="mt-2 rounded-xl max-h-96 object-cover w-full" />}
            <div className="flex justify-between mt-2">
              <span className="text-[#2b2e31] hover:text-[#1D9BF0] transition-colors duration-200 cursor-pointer">
                <IconMessageCircle />
              </span>
              <span className="text-[#2b2e31] hover:text-[rgb(0,186,124)] transition-colors duration-200 cursor-pointer">
                <IconRepeat />
              </span>
              <span className="text-[#2b2e31] hover:text-[rgb(249,24,128)] transition-colors duration-200 cursor-pointer">
                <IconHeartCode />
              </span>
              <span className="text-[#2b2e31] hover:text-[rgb(154,119,233)] transition-colors duration-200 cursor-pointer">
                <IconChartBar />
              </span>
              <span className="text-[#2b2e31] hover:text-[rgb(241,213,127)] transition-colors duration-200 cursor-pointer">
                <IconShare2 />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
