import { PostModelFromApi } from "@/models/post/postModel";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { cache } from "react";

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
