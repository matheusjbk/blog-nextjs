import { NextRequest, NextResponse } from "next/server";
import { getLoginSessionForApi } from "./lib/login/manageLogin";

export default async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.includes("login");
  const isAdminPage = request.nextUrl.pathname.includes("/admin");
  const isGetRequest = request.method === "GET";

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) return NextResponse.next();

  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
