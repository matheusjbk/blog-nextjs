"use client";

import {
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { NavigationEventsAdmin } from "../NavigationEventsAdmin";
import { logoutAction } from "@/actions/login/logoutAction";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const linkClasses =
    "[&>svg]:w-4 [&>svg]:w-4 px-4 cursor-pointer flex items-center gap-2 transition hover:bg-slate-800 h-10 shrink-0 rounded-lg";

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <>
      <NavigationEventsAdmin onClose={() => setIsOpen(false)} />
      <nav
        className={`bg-slate-900 text-slate-100 rounded-lg flex flex-col mb-8 sm:flex-row sm:flex-wrap ${!isOpen && "h-10"} ${!isOpen && "overflow-hidden"} sm:overflow-visible sm:h-auto`}
      >
        <button
          className={`${linkClasses} text-blue-200 italic sm:hidden`}
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          {!isOpen && (
            <>
              <MenuIcon />
              Menu
            </>
          )}

          {isOpen && (
            <>
              <XIcon />
              Fechar
            </>
          )}
        </button>

        <a
          href="/"
          target="_blank"
          className={linkClasses}
        >
          <HouseIcon />
          Home
        </a>

        <Link
          href="/admin/post"
          className={linkClasses}
        >
          <FileTextIcon />
          Posts
        </Link>

        <Link
          href="/admin/post/new"
          className={linkClasses}
        >
          <PlusIcon />
          Criar Post
        </Link>

        <a
          href="#"
          className={linkClasses}
          onClick={handleLogout}
        >
          {isPending && (
            <>
              <HourglassIcon />
              Aguarde...
            </>
          )}

          {!isPending && (
            <>
              <LogOutIcon />
              Sair
            </>
          )}
        </a>
      </nav>
    </>
  );
}
