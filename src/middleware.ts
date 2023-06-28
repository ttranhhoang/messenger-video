import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });

    const isLoginPage = pathname.startsWith("/login");

    const sensitiveRoutes = ["/users"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/users", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/users", req.url));
    }
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/users/:path*", "/conversations/:path*"],
};
