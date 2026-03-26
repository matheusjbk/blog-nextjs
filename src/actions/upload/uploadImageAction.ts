"use server";

import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url: string; error: string }> {
  // TODO: verificar login do usuário

  const makeResult = ({ url = "", error = "" }) => ({ url, error });

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

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const imgUploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads";

  const uploadFullPath = resolve(process.cwd(), "public", imgUploadDir);

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const imgServerUrl =
    process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads";

  const url = `${imgServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}
