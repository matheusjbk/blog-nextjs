import PostsListAdmin from "@/components/admin/PostsListAdmin";
import { DismissToastOnMount } from "@/components/DismissToastOnMount";
import { SpinLoader } from "@/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin - Posts",
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <DismissToastOnMount />
      <PostsListAdmin />
    </Suspense>
  );
}
