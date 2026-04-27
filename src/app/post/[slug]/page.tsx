import { SinglePost } from "@/components/SinglePost";
import { SpinLoader } from "@/components/SpinLoader";
import { findPublishedPostBySlugFromApiCached } from "@/lib/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await findPublishedPostBySlugFromApiCached(slug);

  if (!response.success) return {};

  const post = response.data;

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const slug = params;

  return (
    <Suspense fallback={<SpinLoader className="min-h-80 mb-16" />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
