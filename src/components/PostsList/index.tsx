import { Post } from "../Post";
import { findAllPublishedPostsFromApiCached } from "@/lib/queries/public";

export async function PostsList() {
  const response = await findAllPublishedPostsFromApiCached();

  if (!response.success) return null;

  const posts = response.data;

  if (posts.length <= 1) return null;

  return (
    <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(1).map(post => {
        return (
          <div
            className="group flex flex-col gap-4"
            key={post.id}
          >
            <Post
              slug={post.slug}
              coverImageUrl={post.coverImageUrl}
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              headingType="h3"
            />
          </div>
        );
      })}
    </div>
  );
}
