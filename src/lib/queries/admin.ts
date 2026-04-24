import { PostModelFromApi } from "@/models/post/postModel";
import { postRepository } from "@/repositories/post";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { cache } from "react";

export const findAllPostsAdmin = cache(
  async () => await postRepository.findAll(),
);

export const findAllPostsFromApiAdmin = cache(async () => {
  const response = await authenticatedApiRequest<PostModelFromApi[]>(
    "post/me",
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  return response;
});

export const findPostByIdAdmin = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const response = await authenticatedApiRequest<PostModelFromApi>(
    `post/me/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  return response;
});
