"use server";

import { logColor } from "@/utils/logColor";

export async function deletePostAction(id: string) {
  logColor(`${id}`);

  return id;
}
