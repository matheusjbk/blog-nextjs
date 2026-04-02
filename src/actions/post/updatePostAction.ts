"use server";

import { makePartialPostDto, makePostDto, PostDto } from "@/dto/post/postDto";
import { verifiyLoginSession } from "@/lib/login/manageLogin";
import { PostUpdateSchema } from "@/lib/validations";
import { postRepository } from "@/repositories/post";
import { generateRandomString } from "@/utils/generateRandomString";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { revalidatePath, updateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PostDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  state: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifiyLoginSession();

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

  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!isAuthenticated)
    return {
      formState: state.formState,
      errors: ["Faça login novamente em outra aba antes de salvar um post"],
    };

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);

    return {
      formState: makePartialPostDto(formDataToObj),
      errors,
    };
  }

  const validPostData = zodParsedObj.data;

  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error)
      return {
        formState: makePartialPostDto(formDataToObj),
        errors: [e.message],
      };

    return {
      formState: makePartialPostDto(formDataToObj),
      errors: ["Erro desconhecido"],
    };
  }

  updateTag("posts");
  updateTag(`post-${post.slug}`);
  revalidatePath("/admin/post");

  return {
    formState: makePostDto(post),
    errors: [],
    success: generateRandomString(),
  };
}
