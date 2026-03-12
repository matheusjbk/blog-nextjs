"use client";

import { deletePostAction } from "@/actions/deletePostAction";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`Botão clicado ${result}`);
    });
  }

  return (
    <button
      className="text-red-500 cursor-pointer [&_svg]:w-6 [&_svg]:h-6 transition hover:scale-120 hover:text-red-700 disabled:text-slate-600 disabled:cursor-not-allowed disabled:hover:scale-100"
      aria-label={`Apagar o post: ${title}`}
      title={`Apagar o post: ${title}`}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon />
    </button>
  );
}
