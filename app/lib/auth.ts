import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession as originalGetServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any), // eslint-disable-line
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!token.email) throw new Error("Oauth認証が完了後にemailを取得することができませんでした。");
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      });
      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};

export const getServerSession = async () => {
  return originalGetServerSession(authOptions);
};
