import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginExpiresSeconds =
  Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const cookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export async function createLoginSessionFromApi(jwt: string) {
  const expiresAt = new Date(Date.now() + loginExpiresSeconds * 1000);
  const cookieStore = await cookies();

  cookieStore.set(cookieName, jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getLoginSessionForApi() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(cookieName)?.value;

  if (!jwt) return false;

  return jwt;
}

export async function requireLoginSessionForApiOrRedirect() {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) redirect("/login");
}
