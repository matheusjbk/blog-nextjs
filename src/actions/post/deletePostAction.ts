"use server";

import { getLoginSessionForApi } from "@/lib/login/manageLogin";
import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { revalidatePath, updateTag } from "next/cache";

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated)
    return {
      errors: ["Faça login novamente em outra aba antes de excluir um post"],
    };

  if (!id || typeof id !== "string") return { errors: ["Dados inválidos"] };

  const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `post/me/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const post = postResponse.success
    ? postResponse.data
    : PublicPostForApiSchema.parse({});

  const response = await authenticatedApiRequest<PublicPostForApiDto>(
    `post/me/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.success)
    return {
      errors: response.errors,
    };

  updateTag("posts");
  updateTag(`post-${post.slug}`);
  revalidatePath("/admin/post");

  return { errors: [] };
}
