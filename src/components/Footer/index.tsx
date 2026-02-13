import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center py-8">
      <span>Copyright &copy; {new Date().getFullYear()} - </span>
      <Link href="/">The Blog</Link>
    </footer>
  );
}
