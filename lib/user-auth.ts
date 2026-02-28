import NextAuth from "next-auth";
import { prisma } from "@/lib/db";

// User authentication using JWT tokens
// Users authenticate via WhatsApp login flow, not credentials

export const { handlers: userAuthHandlers, auth: userAuth, signIn: userSignIn, signOut: userSignOut } = NextAuth({
  providers: [], // No providers needed for user auth - tokens are handled via API
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/user/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(`🎫 [USER-AUTH] Creating JWT token for user: ${user.id}`);
        (token as any).id = user.id;
        (token as any).phoneNumber = (user as any).phoneNumber;
        (token as any).role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log(`🎫 [USER-AUTH] Creating session for user: ${(token as any).id}`);
        (session.user as any).id = (token as any).id;
        (session.user as any).phoneNumber = (token as any).phoneNumber;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
});
