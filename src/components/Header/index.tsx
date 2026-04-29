import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { getUserFromApi } from "@/lib/user/api/getUser";

export async function Header() {
  const user = await getUserFromApi();

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-4xl font-extrabold py-8 md:text-6xl md:py-10 lg:text-7xl lg:py-12">
        <Link href="/">The Blog</Link>
      </h1>

      {!user && (
        <Link
          href="/login"
          className="[&>svg]:w-4 [&>svg]:h-4 px-4 cursor-pointer flex items-center gap-2 transition hover:bg-slate-200 h-10 shrink-0 rounded-lg"
        >
          <LogInIcon />
          Entrar
        </Link>
      )}
    </header>
  );
}
