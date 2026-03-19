"use server";

import { PostDto } from "@/dto/post/postDto";

type CreatePostActionState = {
  formState: PostDto;
  errors: string[];
};

export async function createPostAction(
  state: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar login do usuário

  if (!(formData instanceof FormData)) {
    return {
      formState: state.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  console.log(formDataToObj);
  console.log(formData.get("published"));

  return {
    formState: state.formState,
    errors: [],
  };
}
