import { PostModelFromApi } from "@/models/post/postModel";
import { postRepository } from "@/repositories/post";
import { apiRequest } from "@/utils/apiRequest";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublishedPostsCached = cache(async () => {
  "use cache";
  cacheTag("posts");

  return await postRepository.findAllPublic();
});

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

export const findPublishedPostBySlugCached = cache(async (slug: string) => {
  "use cache";
  cacheTag(`post-${slug}`);

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post) notFound();

  return post;
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
