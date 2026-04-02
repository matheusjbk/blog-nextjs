import { NextRequest, NextResponse } from "next/server";
import { verifyjwt } from "./lib/login/manageLogin";

export default async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.includes("login");
  const isAdminPage = request.nextUrl.pathname.includes("/admin");
  const isGetRequest = request.method === "GET";

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) return NextResponse.next();

  const jwt = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || "loginSession",
  )?.value;

  const isAuthenticated = await verifyjwt(jwt);

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
