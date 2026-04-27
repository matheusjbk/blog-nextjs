"use server";

import { createLoginSessionFromApi } from "@/lib/login/manageLogin";
import { LoginSchema } from "@/lib/login/schemas";
import { apiRequest } from "@/utils/apiRequest";
import { getZodErrorMessages } from "@/utils/getZodErrorMessages";
import { verifyHoneypotInput } from "@/utils/verifyHoneypotInput";
import { redirect } from "next/navigation";

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin)
    return {
      email: "",
      errors: ["Login não autorizado"],
    };

  const isBot = await verifyHoneypotInput(formData);

  if (isBot)
    return {
      email: "",
      errors: ["Bot detectado"],
    };

  if (!(formData instanceof FormData))
    return {
      email: "",
      errors: ["Dados inválidos"],
    };

  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || "";
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success)
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };

  const response = await apiRequest<{ accessToken: string }>("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!response.success)
    return {
      email: formEmail,
      errors: response.errors,
    };

  await createLoginSessionFromApi(response.data.accessToken);
  redirect("/admin/post");
}
