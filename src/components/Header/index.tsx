import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1 className="text-4xl font-extrabold py-8 md:text-6xl md:py-10 lg:text-7xl lg:py-12">
        <Link href="/">The Blog</Link>
      </h1>
    </header>
  );
}
