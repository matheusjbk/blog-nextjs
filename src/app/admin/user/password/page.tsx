import { SpinLoader } from "@/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Alterar senha",
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <h1>Update user password page</h1>
    </Suspense>
  );
}
