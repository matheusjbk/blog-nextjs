import { JsonPostRepository } from "./jsonPostRepository";
import { PostRepository } from "./postRepository";

export const jsonPostRepository: PostRepository = new JsonPostRepository();
