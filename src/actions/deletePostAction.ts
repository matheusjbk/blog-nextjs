"use server";

import { postRepository } from "@/repositories/post";
import { logColor } from "@/utils/logColor";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  // TODO: verificar login do usuário

  logColor(`${id}`);

  if (!id || typeof id !== "string") return { error: "Dados inválidos" };

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) return { error: "Post não encontrado" };

  const result = await postRepository.delete(post);

  if (result.success) {
    revalidateTag("posts", "max");
    revalidateTag(`post-${post.slug}`, "max");
    revalidatePath(`/admin/posts`);
  }

  return { error: "" };
}
