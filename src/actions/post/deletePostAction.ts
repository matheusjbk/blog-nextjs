"use server";

import { verifiyLoginSession } from "@/lib/login/manageLogin";
import { postRepository } from "@/repositories/post";
import { revalidatePath, updateTag } from "next/cache";

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifiyLoginSession();

  if (!isAuthenticated)
    return {
      error: "Faça login novamente em outra aba antes de excluir um post",
    };

  if (!id || typeof id !== "string") return { error: "Dados inválidos" };

  let post;

  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) return { error: e.message };

    return { error: "Erro desconhecido" };
  }

  updateTag("posts");
  updateTag(`post-${post.slug}`);
  revalidatePath("/admin/post");

  return { error: "" };
}
