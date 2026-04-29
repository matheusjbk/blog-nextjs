"use server";

import { deleteLoginSession } from "@/lib/login/manageLogin";
import { getUserFromApi } from "@/lib/user/api/getUser";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { redirect } from "next/navigation";

type DeleteUserActionState = {
  errors: string[];
  success: boolean;
};

export async function deleteUserAction(): Promise<DeleteUserActionState> {
  const user = await getUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ["Você precisa fazer login novamente"],
      success: false,
    };
  }

  const response = await authenticatedApiRequest<DeleteUserActionState>(
    "user/me",
    {
      method: "DELETE",
    },
  );

  if (!response.success)
    return {
      errors: response.errors,
      success: false,
    };

  await deleteLoginSession();
  redirect("/");
}
