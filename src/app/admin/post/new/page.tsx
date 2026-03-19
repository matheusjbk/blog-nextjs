import { ManagePostForm } from "@/components/admin/ManagePostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Post",
};

export default async function AdminNewPostPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Criar Post</h1>
      <ManagePostForm />
    </>
  );
}
