import { UpdateUser } from "@/components/admin/UpdateUser";
import { SpinLoader } from "@/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Perfil",
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <div className="max-w-sm flex items-center justify-center text-center mt-16 mb-32 mx-auto">
        <UpdateUser />
      </div>
    </Suspense>
  );
}
