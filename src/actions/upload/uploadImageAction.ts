"use server";

import { getLoginSessionForApi } from "@/lib/login/manageLogin";
import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url: string; error: string }> {
  const makeResult = ({ url = "", error = "" }) => ({
    url,
    error,
  });

  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated)
    return makeResult({
      error: "Faça login novamente em outra aba antes de enviar uma imagem",
    });

  if (!(formData instanceof FormData))
    return makeResult({ error: "Dados inválidos." });

  const file = formData.get("image");

  if (!(file instanceof File))
    return makeResult({ error: "Arquivo inválido." });

  const imgMaxSizeBytes =
    Number(process.env.NEXT_PUBLIC_IMAGE_MAX_SIZE_IN_BYTES) || 921600;

  if (file.size > imgMaxSizeBytes)
    return makeResult({ error: "Arquivo muito grande." });

  if (!file.type.startsWith("image/"))
    return makeResult({ error: "Tipo de arquivo inválido." });

  const response = await authenticatedApiRequest<{ url: string }>("upload", {
    method: "POST",
    body: formData,
  });

  if (!response.success) return makeResult({ error: response.errors[0] });

  const url = `${process.env.IMAGE_SERVER_URL}${response.data.url}`;

  return makeResult({ url });
}
