import { findPostBySlugCached } from "@/lib/queries";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  return <h1 className="text-7xl font-extrabold py-32">{post.content}</h1>;
}
