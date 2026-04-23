import "server-only";
import { apiRequest, ApiRequest } from "./apiRequest";
import { getLoginSessionForApi } from "@/lib/login/manageLogin";

export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const jwt = await getLoginSessionForApi();

  if (!jwt)
    return {
      success: false,
      errors: ["Usuário não autenticado"],
      status: 401,
    };

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwt}`,
  };

  return apiRequest(path, {
    ...options,
    headers,
  });
}
