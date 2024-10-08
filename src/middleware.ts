"user server";
import { type NextRequest, NextResponse } from "next/server";
import { validateRequest } from "./app/_auth/validate-request";


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const homeURL = req.nextUrl.clone();
  homeURL.pathname = "/start/log-in";
  const chatURL = req.nextUrl.clone();
  chatURL.pathname = "/chat";
  const protectedRoutes = ["/api/clear-history", "/chat"];
  // temporary fix for the issue of the user being redirected to the home page when they are already logged in
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(homeURL);
  }
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const { user} = await validateRequest();
    if (!user) {
      return NextResponse.redirect(homeURL);
    }
  }

  return res;
}
