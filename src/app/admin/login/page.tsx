import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  return (
    <div className="max-w-sm flex items-center justify-center text-center mt-16 mb-32 mx-auto">
      <LoginForm />
    </div>
  );
}
