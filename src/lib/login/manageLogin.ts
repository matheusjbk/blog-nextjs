import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpiresSeconds =
  Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpiresStr = process.env.LOGIN_EXPIRATION_STRING || "1d";
const cookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(loginExpiresStr)
    .sign(jwtEncodedKey);
}

export async function verifyjwt(jwt: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return false;
  }
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpiresSeconds * 1000);
  const jwt = await signJwt({ username, expiresAt });
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

export async function getLoginSession() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(cookieName)?.value;

  if (!jwt) return false;

  return verifyjwt(jwt);
}

export async function verifiyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload?.username === process.env.LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await verifiyLoginSession();

  if (!isAuthenticated) redirect("/admin/login");
}
