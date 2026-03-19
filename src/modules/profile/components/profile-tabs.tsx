"use client";

import { useEffect, useState } from "react";
import { type Post } from "@/modules/posts/types/posts";
import { Tab, Tabs } from "@heroui/react";
import { getProfilePosts } from "../actions/get-profile-posts-action";
import PostListTab from "./profile-tab/posts-list-tab";
import RepliesListTab from "./profile-tab/replies-list-tab";

const TABS = ["Replies", "Highlights", "Articles", "Media", "Likes"];

export function ProfileTabs({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getProfilePosts(userId).then(setPosts);
  }, [userId]);

  return (
    <div className="mt-4">
      <Tabs aria-label="Tabs variants" variant={"underlined"}>
        <Tab key="posts" title="Posts">
          {posts?.map((post: Post) => {
            const { id, users, content, created_at: createdAt, image_url: imageUrl } = post;
            const { user_name: userName, name: userFullName, avatar_url: avatarUrl } = users;
            return <PostListTab key={id} userName={userName} userFullName={userFullName} avatarUrl={avatarUrl} content={content} createdAt={createdAt} imageUrl={imageUrl} />;
          })}
        </Tab>
        <Tab key="replies" title="Replies">
          {posts?.map((post: Post) => {
            const { id, users, content, created_at: createdAt, image_url: imageUrl } = post;
            const { user_name: userName, name: userFullName, avatar_url: avatarUrl } = users;
            return <RepliesListTab key={id} userName={userName} userFullName={userFullName} avatarUrl={avatarUrl} content={content} createdAt={createdAt} imageUrl={imageUrl} />;
          })}
        </Tab>
        {TABS.map((tab) => (
          <Tab key={tab} title={tab} />
        ))}
      </Tabs>
    </div>
  );
}
