import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Admin routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAdminLoginPage = nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isAdminLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  if (isAdminLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
  }

  // User routes
  const isUserRoute = nextUrl.pathname.startsWith("/user");
  const isUserLoginPage = nextUrl.pathname === "/user/login";
  const isUserVerifyRoute = nextUrl.pathname.startsWith("/api/auth/user/verify");

  // Check user session via cookie existence only (verification happens in API routes)
  let isUserLoggedIn = false;
  if (isUserRoute && !isUserLoginPage) {
    const sessionToken = req.cookies.get("next-auth.session-token")?.value;
    isUserLoggedIn = !!sessionToken;
    console.log(`🔍 [MIDDLEWARE] Checking user session for ${nextUrl.pathname}`);
    console.log(`🍪 [MIDDLEWARE] Session token exists: ${isUserLoggedIn}`);
  }

  // Protect user routes (except login and verify)
  if (isUserRoute && !isUserLoginPage && !isUserVerifyRoute && !isUserLoggedIn) {
    console.log(`🚫 [MIDDLEWARE] Redirecting to login (not authenticated)`);
    return NextResponse.redirect(new URL("/user/login", nextUrl));
  }

  // Redirect logged-in users from login page to settings
  if (isUserLoginPage && isUserLoggedIn) {
    console.log(`✅ [MIDDLEWARE] Redirecting to settings (already logged in)`);
    return NextResponse.redirect(new URL("/user/settings", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
