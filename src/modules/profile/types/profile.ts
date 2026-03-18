import { type Database } from "../../core/types/database";

type UserEntity = Database["public"]["Tables"]["users"]["Row"];

export type Profile = UserEntity & {
  postsCount: number;
  followersCount: number;
  followingCount: number;
};
