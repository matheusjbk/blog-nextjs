import { JsonPostRepository } from "./jsonPostRepository";
import { PostRepository } from "./postRepository";

export const postRepository: PostRepository = new JsonPostRepository();
