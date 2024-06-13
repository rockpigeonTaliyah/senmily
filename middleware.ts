// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from 'next/server';

export async function middleware(req:NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    secureCookie: process.env.NODE_ENV === "production",
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });
  // console.log(token);
  if (!token) {
  // Redirect to sign-in page if the token is not found
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname == "/login" || req.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  return NextResponse.next();
}
  


export const config = {
  matcher: [
    "/",
    "/creator", //use this to protect all child routes of '/protected'
    "/creator/:path*", //use this to protect all child routes of '/protected'
  ],
};