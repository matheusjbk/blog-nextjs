import { PostModel } from "@/models/post/postModel";
import { PostHeading } from "../PostHeading";
import { PostCoverImage } from "../PostImageCover";
import { formatDate, formatRelativeDate } from "@/utils/formatDate";

type PostProps = {
  post: PostModel;
  priority?: boolean;
  headingType: "h1" | "h2" | "h3";
};

export function Post({ post, priority = false, headingType }: PostProps) {
  const postLink = `/post/${post.slug}`;

  return (
    <>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1200,
          height: 720,
          priority: priority,
        }}
      />

      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          dateTime="2026-02-12"
          className="text-slate-600 text-sm/tight"
          title={formatRelativeDate(post.createdAt)}
        >
          {formatDate(post.createdAt)}
        </time>
        <PostHeading
          url={postLink}
          as={headingType}
        >
          {post.title}
        </PostHeading>
        <p>{post.excerpt}</p>
      </div>
    </>
  );
}
