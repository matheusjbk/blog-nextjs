import { findPostByIdFromApiAdmin } from "@/lib/queries/admin";
import { notFound } from "next/navigation";
import { ManagePostForm } from "../ManagePostForm";
import { PublicPostForApiSchema } from "@/lib/post/schemas";

export async function SearchPost({ idPromise }: { idPromise: Promise<{ id: string }> }) {
  const id = (await idPromise).id;
  const postResponse = await findPostByIdFromApiAdmin(id);

  if (!postResponse.success) {
    console.log(postResponse.errors);
    notFound();
  }

  const post = PublicPostForApiSchema.parse(postResponse.data);

  return (
    <ManagePostForm
      mode="update"
      postDto={post}
    />
  );
}
