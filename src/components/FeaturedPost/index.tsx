import { PostHeading } from "../PostHeading";
import { PostCoverImage } from "../PostImageCover";

export function FeaturedPost() {
  const slug = "";
  const postLink = `/post/${slug}`;

  return (
    <section className="mb-8 group grid grid-cols-1 gap-8 sm:grid-cols-2">
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: "/images/bryen_6.png",
          alt: "Título do post",
          width: 1200,
          height: 720,
          priority: true,
        }}
      />

      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          dateTime="2026-02-12"
          className="text-slate-600 text-sm/tight"
        >
          12/02/2026 12:00
        </time>
        <PostHeading
          url={postLink}
          as="h2"
        >
          Título do post
        </PostHeading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          eveniet, deserunt beatae inventore dignissimos reiciendis. Facere sint
          ipsum minima labore, velit tempora vel laboriosam. Maiores, nam! Illum
          ex voluptatem cupiditate!
        </p>
      </div>
    </section>
  );
}
