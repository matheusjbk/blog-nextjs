import { MenuAdmin } from "@/components/admin/MenuAdmin";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function AdminPostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<SpinLoader className="mb-16" />}>
        <MenuAdmin />
      </Suspense>
      {children}
    </>
  );
}
