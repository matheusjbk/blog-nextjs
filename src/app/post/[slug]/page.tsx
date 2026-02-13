import { findPostBySlugCached } from "@/lib/queries";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug);

  return <h1 className="text-7xl font-extrabold py-32">{post.content}</h1>;
}
