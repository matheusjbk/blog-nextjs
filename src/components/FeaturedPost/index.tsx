import { Post } from "../Post";
import { findAllPublishedPosts } from "@/lib/queries";

export async function FeaturedPost() {
  const posts = await findAllPublishedPosts();
  const post = posts[0];

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
