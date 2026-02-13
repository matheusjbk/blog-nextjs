import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { PostHeading } from "@/components/PostHeading";
import { PostCoverImage } from "@/components/PostImageCover";
import { PostsList } from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Container>
      <Header />
      <section className="mb-8 group grid grid-cols-1 gap-8 sm:grid-cols-2">
        <PostCoverImage
          linkProps={{
            href: "#",
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
            url="#"
            as="h2"
          >
            Título do post
          </PostHeading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            eveniet, deserunt beatae inventore dignissimos reiciendis. Facere
            sint ipsum minima labore, velit tempora vel laboriosam. Maiores,
            nam! Illum ex voluptatem cupiditate!
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer className="text-6xl font-bold py-4 text-center">FOOTER</footer>
    </Container>
  );
}
