import { NextRequest, NextResponse } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    !pathname.startsWith("/admin") ||
    pathname === "/admin/login" ||
    pathname === "/admin/reset-password"
  ) {
    const result = await updateSupabaseSession(request);
    return result.response;
  }

  const result = await updateSupabaseSession(request);
  const response = result.response;
  const user = result.user;

  if (user) {
    return response;
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"]
};
