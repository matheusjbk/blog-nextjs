import { PostModelFromApi } from "@/models/post/postModel";
import { apiRequest } from "@/utils/apiRequest";
import { cache } from "react";

export const findAllPublishedPostsFromApiCached = cache(async () => {
  const response = await apiRequest<PostModelFromApi[]>("post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["posts"],
      revalidate: 86400,
    },
  });

  return response;
});

export const findPublishedPostBySlugFromApiCached = cache(
  async (slug: string) => {
    const response = await apiRequest<PostModelFromApi>(`post/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: [`post-${slug}`],
        revalidate: 86400,
      },
    });

    return response;
  },
);
