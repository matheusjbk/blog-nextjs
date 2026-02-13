import { PostModel } from "@/models/post/postModel";
import { Post } from "../Post";

export function FeaturedPost() {
  const post: PostModel = {
    id: "123",
    title: "Título do post",
    slug: "titulo-do-post",
    excerpt: "Post muito lindo artificial",
    content: "Post muito lindo artificial",
    coverImageUrl: "/images/bryen_0.png",
    published: true,
    createdAt: "2025-04-08T00:24:38.616Z",
    updatedAt: "2025-04-08T00:33:56.907Z",
    author: "Matheus Keher",
  };

  return (
    <section className="mb-8 group grid grid-cols-1 gap-8 sm:grid-cols-2">
      <Post
        slug={post.slug}
        coverImageUrl={post.coverImageUrl}
        title={post.title}
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        priority
        headingType="h2"
      />
    </section>
  );
}
