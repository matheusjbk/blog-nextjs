import { CreateUserForm } from "@/components/CreateUserForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar conta",
};

export default async function NewUserPage() {
  return (
    <div className="max-w-sm flex items-center justify-center text-center mt-16 mb-32 mx-auto">
      <CreateUserForm />
    </div>
  );
}
