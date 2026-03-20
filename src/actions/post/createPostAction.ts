"use server";

import { makePartialPostDto, PostDto } from "@/dto/post/postDto";
import { PostCreateSchema } from "@/lib/validations";
import { PostModel } from "@/models/post/postModel";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { makeSlugFromText } from "@/utils/makeSlugFromText";
import { v4 as uuidV4 } from "uuid";

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

  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);

    return {
      formState: makePartialPostDto(formDataToObj),
      errors,
    };
  }

  const validPostData = zodParsedObj.data;
  const postCreationDate = new Date().toISOString();

  const newPost: PostModel = {
    ...validPostData,
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
    createdAt: postCreationDate,
    updatedAt: postCreationDate,
  };

  return {
    formState: newPost,
    errors: [],
  };
}
