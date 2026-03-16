"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
} from "@heroui/react";
import {
  IconChartBar,
  IconHeartCode,
  IconMessageCircle,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";
export default function PostCard({
  userName,
  userFullName,
  avatarUrl,
  content,
}: {
  userName: string;
  userFullName: string;
  avatarUrl: string;
  content: string;
}) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="shadow-none bg-transparent min-w-[440px] hover:bg-slate-800 transition-colors duration-200 border-b rounded-none border-white/20 cursor-pointer">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Link href={`/${userFullName}`} className="flex items-center gap-3">
            <Avatar isBordered radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userName}
            </h4>
            <h5 className="text tracking-tight text-default-400">
              @{userFullName}
            </h5>
          </div>
        </div>
        {/* <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button> */}
      </CardHeader>
      <CardBody className="px-3 py-0 text text-white-400">
        <p>{content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <IconMessageCircle />
        <IconRepeat></IconRepeat>
        <IconHeartCode></IconHeartCode>
        <IconChartBar></IconChartBar>

        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
