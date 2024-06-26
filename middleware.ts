import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    secureCookie: process.env.NODE_ENV === "production",
    salt: process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });

  const isAuthenticated = !!token;

  console.log("Request Path:", req.nextUrl.pathname);
  console.log("isAuthenticated:", isAuthenticated);

  // Handle authenticated users
  if (isAuthenticated) {
    // Redirect authenticated users from the login page to the home page
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  } else {
    // Redirect unauthenticated users from protected routes to the login page
    if (req.nextUrl.pathname.startsWith("/creator") || req.nextUrl.pathname.startsWith("/home")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Add the root path (login form)
    "/login", // Add login path
    "/creator", // Protect the /creator path
    "/creator/:path*", // Protect all subpaths of /creator
    "/home", // Protect the home page if required
  ],
};