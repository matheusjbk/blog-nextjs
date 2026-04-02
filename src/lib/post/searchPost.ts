import { makePostDto } from "@/dto/post/postDto";
import { findPostByIdAdmin } from "@/lib/queries/admin";

export async function searchPost(id: Promise<{ id: string }>) {
  const post = await findPostByIdAdmin((await id).id);
  const postDto = makePostDto(post);
  return postDto;
}
