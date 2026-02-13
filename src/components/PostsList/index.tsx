import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostImageCover";
import { PostHeading } from "../PostHeading";

export async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <div
          className="group flex flex-col gap-4"
          key={post.id}
        >
          <PostCoverImage
            linkProps={{
              href: `/post/${post.slug}`,
            }}
            imageProps={{
              src: post.coverImageUrl,
              alt: post.title,
              width: 1200,
              height: 720,
            }}
          />
          <div className="flex flex-col gap-4 sm:justify-center">
            <time
              dateTime={post.createdAt}
              className="text-slate-600 text-sm/tight"
            >
              {post.createdAt}
            </time>
            <PostHeading
              url="#"
              as="h3"
            >
              {post.title}
            </PostHeading>
            <p>{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
