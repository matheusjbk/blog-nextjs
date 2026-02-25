import { findPostBySlugCached } from "@/lib/queries";
import Image from "next/image";
import { PostDate } from "../PostDate";
import { PostHeading } from "../PostHeading";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  return (
    <article className="mb-16">
      <header className="flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
        />

        <PostHeading
          url={post.slug}
          as="h2"
        >
          {post.title}
        </PostHeading>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className="text-lg italic mb-8">{post.excerpt}</p>

      <div>{post.content}</div>
    </article>
  );
}
