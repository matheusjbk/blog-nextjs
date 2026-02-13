import { PostHeading } from "../PostHeading";
import { PostCoverImage } from "../PostImageCover";
import { formatDate, formatRelativeDate } from "@/utils/formatDate";

type PostProps = {
  slug: string;
  coverImageUrl: string;
  title: string;
  createdAt: string;
  excerpt: string;
  priority?: boolean;
  headingType: "h1" | "h2" | "h3";
};

export function Post({
  slug,
  coverImageUrl,
  title,
  createdAt,
  excerpt,
  priority = false,
  headingType,
}: PostProps) {
  const postLink = `/post/${slug}`;

  return (
    <>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: coverImageUrl,
          alt: title,
          width: 1200,
          height: 720,
          priority: priority,
        }}
      />

      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          dateTime={createdAt}
          className="text-slate-600 text-sm/tight dark:text-stone-500"
          title={formatRelativeDate(createdAt)}
        >
          {formatDate(createdAt)}
        </time>
        <PostHeading
          url={postLink}
          as={headingType}
        >
          {title}
        </PostHeading>
        <p>{excerpt}</p>
      </div>
    </>
  );
}
