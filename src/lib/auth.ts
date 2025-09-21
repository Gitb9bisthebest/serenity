import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "@/lib/encrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          // Check if user exist and if the password matches
          if (user && user.password) {
            const isMatch = await compare(
              credentials.password as string,
              user.password
            );

            // If password matches, return user
            if (isMatch) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }

          // If user does not exist or password does not match, return null
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token.name = session.user?.name;
        token.email = session.user?.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
