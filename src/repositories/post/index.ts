import { DrizzlePostRepository } from "./drizzlePostRepository";
import { PostRepository } from "./postRepository";

export const postRepository: PostRepository = new DrizzlePostRepository();
