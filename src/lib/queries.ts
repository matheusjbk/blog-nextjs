import { postRepository } from "@/repositories/post";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublishedPostsCached = cache(async () => {
  "use cache";
  cacheTag("posts");

  return await postRepository.findAllPublic();
});

export const findPostBySlugCached = cache(async (slug: string) => {
  "use cache";
  cacheTag(`post-${slug}`);

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post) notFound();

  return post;
});

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);
