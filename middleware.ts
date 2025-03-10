import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard"], // Restrict middleware to only these paths
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { getUser, getPermission } = getKindeServerSession();

  const user = await getUser();

  // Get permissions for admin
  const admin_permission = await getPermission("ADMIN_USER");

  const adminUser = admin_permission?.isGranted === true;

  // Handle /admin path
  if (pathname === "/dashboard") {
    // If user is not logged in, redirect to login with post_login_redirect URL
    if (!user) {
      const loginRedirectUrl = new URL(
        `/api/auth/login?post_login_redirect_url=/api/auth/creation?babatunde_redirectTo=${encodeURIComponent("/dashboard")}`,
        request.url,
      );
      return NextResponse.redirect(loginRedirectUrl, { status: 303 });
    }

    // Check permissions and redirect if not granted
    if (!adminUser) {
      const unauthorizedUrl = new URL(`/`, request.url);
      return NextResponse.redirect(unauthorizedUrl, { status: 303 });
    }
  }
  // Allow the request to continue for other cases
  return NextResponse.next();
}
