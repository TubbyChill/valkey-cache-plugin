import { type NextAuthOptions, type Session, type DefaultSession, type Account } from 'next-auth'
import { type JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'

interface ExtendedSession extends Session {
  user: {
    id?: string
    role?: string
  } & DefaultSession['user']
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }): Promise<ExtendedSession> {
      const extendedSession = session as ExtendedSession
      if (extendedSession?.user) {
        extendedSession.user.id = token.sub
        extendedSession.user.role = token.role as string
      }
      return extendedSession
    },
    async jwt({ token, account, user }: { token: JWT; account: Account | null; user?: any }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
} 