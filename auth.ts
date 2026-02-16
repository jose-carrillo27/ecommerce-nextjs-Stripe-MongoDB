import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Crear o actualizar usuario en la base de datos
      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            role: 'admin', // Por defecto es usuario normal
          },
        });
        return true;
      } catch (error) {
        console.error('Error creating user:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Obtener el rol del usuario desde la base de datos
        const user = await prisma.user.findUnique({
          where: { email: session.user.email! },
          select: { role: true, id: true },
        });

        if (user) {
          session.user.role = user.role;
          session.user.id = user.id;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});