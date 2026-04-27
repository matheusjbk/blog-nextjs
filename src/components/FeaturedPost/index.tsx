import { ErrorMessage } from "../ErrorMessage";
import { Post } from "../Post";
import { findAllPublishedPostsFromApiCached } from "@/lib/queries/public";

export async function FeaturedPost() {
  const response = await findAllPublishedPostsFromApiCached();

  const noPostsFound = (
    <ErrorMessage
      contentTitle="Ops!"
      content="Ainda não criamos nenhum post."
    />
  );

  if (!response.success) return noPostsFound;

  const posts = response.data;

  if (posts.length === 0) return noPostsFound;

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
