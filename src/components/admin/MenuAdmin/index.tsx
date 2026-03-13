"use client";

import {
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NavigationEventsAdmin } from "../NavigationEventsAdmin";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses =
    "[&>svg]:w-4 [&>svg]:w-4 px-4 cursor-pointer flex items-center gap-2 transition hover:bg-slate-800 h-10 shrink-0 rounded-lg";

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
      </nav>
    </>
  );
}
