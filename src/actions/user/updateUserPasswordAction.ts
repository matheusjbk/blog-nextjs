"use server";

import { deleteLoginSession } from "@/lib/login/manageLogin";
import { getUserFromApi } from "@/lib/user/api/getUser";
import { UpdatePasswordSchema } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { redirect } from "next/navigation";

type UpdateUserPasswordActionState = {
  errors: string[];
  success: boolean;
};

export async function updateUserPasswordAction(
  state: UpdateUserPasswordActionState,
  formData: FormData,
): Promise<UpdateUserPasswordActionState> {
  const user = await getUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      errors: ["Você precisa fazer login novamente"],
      success: false,
    };
  }

  if (!(formData instanceof FormData))
    return {
      errors: ["Dados inválidos"],
      success: false,
    };

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdatePasswordSchema.safeParse(formObj);

  if (!parsedFormData.success)
    return {
      errors: getZodErrorMessages(parsedFormData.error),
      success: false,
    };

  const response = await authenticatedApiRequest("user/me/password", {
    method: "PATCH",
    body: JSON.stringify(parsedFormData.data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.success)
    return {
      errors: response.errors,
      success: false,
    };

  await deleteLoginSession();
  redirect("/login?userChanged=1");
}
