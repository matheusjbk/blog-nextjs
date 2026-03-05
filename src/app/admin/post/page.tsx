import { findAllPostsAdmin } from "@/lib/queries/admin";

export default async function AdminPostPage() {
  const posts = await findAllPostsAdmin();

  return (
    <div>
      <h1 className="py-16 text-6xl">AdminPostPage</h1>
      {posts.map(post => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
