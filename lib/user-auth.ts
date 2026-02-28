import NextAuth, { DefaultSession } from "next-auth";

// User authentication using JWT tokens
// Users authenticate via WhatsApp login flow, not credentials

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phoneNumber: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    phoneNumber: string;
    role: string;
  }
}

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (token as any).id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (token as any).phoneNumber = (user as any).phoneNumber;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (token as any).role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log(`🎫 [USER-AUTH] Creating session for user: ${(token as any).id}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = (token as any).id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).phoneNumber = (token as any).phoneNumber;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
});
