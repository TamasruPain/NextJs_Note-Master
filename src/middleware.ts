import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/user-signIn" || path === "/user-signUp" || path === "/admin-login";
  const isAdminPath = path.startsWith("/Admin");

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (isPublicPath && token) {
    // If user is authenticated and tries to access login/register page
    // redirect to dashboard or home
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and tries to access protected route
    // redirect to login
    return NextResponse.redirect(new URL("/user-signIn", request.url));
  }

  // Admin route protection
  if (isAdminPath) {
    if (!token || token.role !== "admin") {
      // Not an admin, redirect to home or login
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/user-signIn", "/user-signUp", "/pages/profile", "/pages/notes", "/Admin/:path*", "/admin-login"],
};