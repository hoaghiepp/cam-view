import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect the "(protected)" segment
  const isProtected = pathname.startsWith("/dashboard"); // adjust if needed

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("session")?.value;
  if (!token || !verifySession(token)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect everything under /dashboard
};
