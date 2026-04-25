"use server";

import { getLoginSessionForApi } from "@/lib/login/manageLogin";
import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
  UpdatePostForApiSchema,
} from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { generateRandomString } from "@/utils/generateRandomString";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { revalidatePath, updateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  state: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: state.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id")?.toString() || "";

  if (!id || typeof id !== "string") {
    return {
      formState: state.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  const zodParsedObj = UpdatePostForApiSchema.safeParse(formDataToObj);

  if (!isAuthenticated)
    return {
      formState: state.formState,
      errors: ["Faça login novamente em outra aba antes de salvar um post"],
    };

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);

    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors,
    };
  }

  const newPost = zodParsedObj.data;

  const response = await authenticatedApiRequest<PublicPostForApiDto>(
    `post/me/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!response.success)
    return {
      formState: PublicPostForApiSchema.parse(zodParsedObj),
      errors: response.errors,
    };

  const post = PublicPostForApiSchema.parse(formDataToObj);

  updateTag("posts");
  updateTag(`post-${post.slug}`);
  revalidatePath("/admin/post");

  return {
    formState: PublicPostForApiSchema.parse(post),
    errors: [],
    success: generateRandomString(),
  };
}
