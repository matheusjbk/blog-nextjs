import Link from "next/link";

export async function Footer() {
  "use cache";

  return (
    <footer className="text-center pb-16">
      <span>Copyright &copy; {new Date().getFullYear()} - </span>
      <Link href="/">The Blog</Link>
    </footer>
  );
}
