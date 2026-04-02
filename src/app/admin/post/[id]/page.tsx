import { ManagePostForm } from "@/components/admin/ManagePostForm";
import { SpinLoader } from "@/components/SpinLoader";
import { searchPost } from "@/lib/post/searchPost";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Editar Post",
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const id = params.then(p => ({ id: p.id }));

  const postDto = searchPost(id);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Editar Post</h1>
      <Suspense fallback={<SpinLoader className="mb-16" />}>
        <ManagePostForm
          mode="update"
          postDto={postDto}
        />
      </Suspense>
    </>
  );
}
