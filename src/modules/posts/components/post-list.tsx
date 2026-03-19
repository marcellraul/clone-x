import PostCard from "./post-card";
import { type Post } from "../types/posts";

export function PostList({ posts }: { posts: Post[] | null }) {
  return (
    <>
      {posts?.map((post: Post) => {
        const { id, users, content, created_at: createdAt, image_url: imageUrl } = post;
        const { user_name: userName, name: userFullName, avatar_url: avatarUrl } = users;
        return <PostCard key={id} userName={userName} userFullName={userFullName} avatarUrl={avatarUrl} content={content} createdAt={createdAt} imageUrl={imageUrl} />;
      })}
    </>
  );
}
