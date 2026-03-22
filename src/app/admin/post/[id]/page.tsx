import { ManagePostForm } from "@/components/admin/ManagePostForm";
import { makePostDto } from "@/dto/post/postDto";
import { findPostByIdAdmin } from "@/lib/queries/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Post",
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;

  const post = await findPostByIdAdmin(id);

  const postDto = makePostDto(post);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Editar Post</h1>
      <ManagePostForm
        mode="update"
        postDto={postDto}
      />
    </>
  );
}
