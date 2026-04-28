import { ErrorMessage } from "@/components/ErrorMessage";
import { getUserFromApi } from "@/lib/user/api/getUser";
import { UpdateUserForm } from "../UpdateUserForm";

export async function UpdateUser() {
  const user = await getUserFromApi();

  if (!user)
    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Você precisa fazer login novamente"
      />
    );

  return <UpdateUserForm user={user} />;
}
