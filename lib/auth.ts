import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 [AUTH] Login attempt");
        if (!credentials?.email || !credentials?.password) {
          console.log("⚠️  [AUTH] Missing credentials");
          return null;
        }

        console.log(`🔍 [AUTH] Looking up admin: ${credentials.email}`);
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) {
          console.log("❌ [AUTH] Admin not found");
          return null;
        }

        console.log(`🔑 [AUTH] Verifying password for admin: ${admin.id}`);
        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          admin.passwordHash
        );

        if (!isPasswordValid) {
          console.log("❌ [AUTH] Invalid password");
          return null;
        }

        console.log(`✅ [AUTH] Login successful: ${admin.email}`);
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(`🎫 [AUTH] Creating JWT token for user: ${user.id}`);
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log(`🎫 [AUTH] Creating session for user: ${token.id}`);
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
