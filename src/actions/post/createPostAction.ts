"use server";

import { getLoginSessionForApi } from "@/lib/login/manageLogin";
import {
  CreatePostForApiSchema,
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

type CreatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  state: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: state.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  const zodParsedObj = CreatePostForApiSchema.safeParse(formDataToObj);

  if (!isAuthenticated)
    return {
      formState: state.formState,
      errors: ["Faça login novamente em outra aba antes de criar um post"],
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
    "post/me",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!response.success)
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: response.errors,
    };

  updateTag("posts");
  revalidatePath("/admin/post");
  redirect("/admin/post?postCreated=1");
}
