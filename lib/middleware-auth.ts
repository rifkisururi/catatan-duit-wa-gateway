import NextAuth from "next-auth";

// Lightweight auth configuration for middleware
// This only includes JWT verification, no database or heavy dependencies
export const { auth } = NextAuth({
  providers: [], // No providers needed for middleware
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});
