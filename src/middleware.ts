import NextAuth from "next-auth";
import { sharedAuthConfig } from "@/lib/auth/shared-config";

export default NextAuth(sharedAuthConfig).auth;

export const config = {
  matcher: ["/admin/:path*"]
};
