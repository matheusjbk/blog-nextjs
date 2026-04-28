import { authenticatedApiRequest } from "@/utils/authenticatedApiRequest";
import { PublicUserDto, PublicUserSchema } from "../schemas";

export async function getUserFromApi() {
  const response = await authenticatedApiRequest<PublicUserDto>("user/me", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.success) return undefined;

  return PublicUserSchema.parse(response.data);
}
