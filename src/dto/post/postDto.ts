import { PostModel } from "@/models/post/postModel";

export type PostDto = Omit<PostModel, "createdAt" | "updatedAt">;

export const makePostDto = (post: PostModel): PostDto => {
  return {
    id: post.id,
    slug: post.slug,
    author: post.author,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    published: post.published,
  };
};
