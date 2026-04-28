"use server";

import { deleteLoginSession } from "@/lib/login/manageLogin";
import { getUserFromApi } from "@/lib/user/api/getUser";
import { PublicUserDto, UpdateUserSchema } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { redirect } from "next/navigation";

type UpdateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function updateUserAction(
  state: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const user = await getUserFromApi();

  if (!user) {
    await deleteLoginSession();

    return {
      user: state.user,
      errors: ["Você precisa fazer login novamente"],
      success: false,
    };
  }

  if (!(formData instanceof FormData))
    return {
      user: state.user,
      errors: ["Dados inválidos"],
      success: false,
    };

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdateUserSchema.safeParse(formObj);

  if (!parsedFormData.success)
    return {
      user: state.user,
      errors: getZodErrorMessages(parsedFormData.error),
      success: false,
    };

  const response = await authenticatedApiRequest<PublicUserDto>("user/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!response.success)
    return {
      user: state.user,
      errors: response.errors,
      success: false,
    };

  if (user.email !== parsedFormData.data.email) {
    await deleteLoginSession();
    redirect("/login?userChanged=1");
  }

  return {
    user: parsedFormData.data,
    errors: [],
    success: true,
  };
}
