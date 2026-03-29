import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { sharedAuthConfig } from "@/lib/auth/shared-config";
import { loginSchema } from "@/lib/validators/auth";

export const authConfig: NextAuthConfig = {
  ...sharedAuthConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: parsed.data.email }
          });

          if (user) {
            const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);

            if (isValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              };
            }
          }
        } catch (error) {
          console.error("Database auth lookup failed, falling back to env admin credentials.", error);
        }

        const envAdminEmail = process.env.ADMIN_EMAIL;
        const envAdminPassword = process.env.ADMIN_PASSWORD;

        if (
          envAdminEmail &&
          envAdminPassword &&
          parsed.data.email === envAdminEmail &&
          parsed.data.password === envAdminPassword
        ) {
          return {
            id: "env-admin",
            email: envAdminEmail,
            name: "Admin",
            role: "ADMIN"
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    ...sharedAuthConfig.callbacks,
    session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.sub === "string" ? token.sub : "";
        session.user.role = typeof token.role === "string" ? token.role : null;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }

      return token;
    }
  }
};
