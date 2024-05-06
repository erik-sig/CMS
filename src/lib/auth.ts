import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./prisma";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import prisma from "./prisma";
import { register } from "module";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
      };
      return session;
    },
    async signIn({ user }) {
      const admins = await prisma.admins.findMany();
      const registeredAdmin = admins.filter(
        (admin) => admin.email === user.email
      );
      if (registeredAdmin.length !== 0) return true;
      else return false;
    },
  },
};
