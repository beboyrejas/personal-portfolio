import type { NextAuthConfig } from "next-auth";

export const sharedAuthConfig = {
  pages: {
    signIn: "/admin/login"
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isAdminArea = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isAdminArea && !isLoginPage) {
        return isLoggedIn;
      }

      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", request.nextUrl));
      }

      return true;
    }
  }
} satisfies Pick<NextAuthConfig, "pages" | "callbacks">;
