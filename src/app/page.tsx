import { Container } from "@/components/Container";
import { PostsList } from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Container>
      <header className="text-6xl font-bold py-4 text-center">HEADER</header>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer className="text-6xl font-bold py-4 text-center">FOOTER</footer>
    </Container>
  );
}
