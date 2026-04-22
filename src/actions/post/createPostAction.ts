"use server";

import { makePartialPostDto, PostDto } from "@/dto/post/postDto";
import { verifiyLoginSession } from "@/lib/login/manageLogin";
import { PostCreateSchema } from "@/lib/validations";
import { PostModel } from "@/models/post/postModel";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { makeSlugFromText } from "@/utils/makeSlugFromText";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type CreatePostActionState = {
  formState: PostDto;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  state: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await verifiyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: state.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!isAuthenticated)
    return {
      formState: state.formState,
      errors: ["Faça login novamente em outra aba antes de criar um post"],
    };

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

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error)
      return {
        formState: newPost,
        errors: [e.message],
      };

    return {
      formState: newPost,
      errors: ["Erro desconhecido"],
    };
  }

  updateTag("posts");
  revalidatePath("/admin/post");
  redirect("/admin/post?postCreated=1");
}
