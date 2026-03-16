import { type Database } from "../../core/types/database";

type PostEntity = Database["public"]["Tables"]["posts"]["Row"]
type UserEntity = Database["public"]["Tables"]["users"]["Row"]

export type Post = PostEntity & {
    users: UserEntity;
};
