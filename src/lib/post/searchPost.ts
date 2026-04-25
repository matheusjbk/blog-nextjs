import { findPostByIdFromApiAdmin } from "@/lib/queries/admin";
import { PublicPostForApiSchema } from "./schemas";
import { notFound } from "next/navigation";

export async function searchPost(id: Promise<{ id: string }>) {
  const postResponse = await findPostByIdFromApiAdmin((await id).id);

  if (!postResponse.success) {
    console.log(postResponse.errors);
    notFound();
  }

  const post = postResponse.data;
  return PublicPostForApiSchema.parse(post);
}
