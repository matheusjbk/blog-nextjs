type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const apiUrl = process.env.API_URL || "http://localhost:5000";

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${apiUrl}/${path}`;

  try {
    const response = await fetch(url, options);
    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errors = Array.isArray(json?.message)
        ? json.message
        : [json?.message || "Erro inesperado"];

      return {
        errors,
        success: false,
        status: response.status,
      };
    }

    return {
      data: json,
      success: true,
      status: response.status,
    };
  } catch {
    return {
      errors: ["Falha ao conectar-se ao servidor"],
      success: false,
      status: 500,
    };
  }
}
