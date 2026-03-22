"use server";

import { makePartialPostDto, makePostDto, PostDto } from "@/dto/post/postDto";
import { PostUpdateSchema } from "@/lib/validations";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { revalidateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PostDto;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  state: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  // TODO: verificar login do usuário

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

  revalidateTag("posts", "max");
  revalidateTag(`post-${post.slug}`, "max");

  return {
    formState: makePostDto(post),
    errors: [],
    success: true,
  };
}
