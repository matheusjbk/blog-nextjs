import { postRepository } from "@/repositories/post";
import { cache } from "react";

export const findAllPublishedPosts = cache(
  async () => await postRepository.findAll(),
);
