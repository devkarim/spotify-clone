import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import log from '@/lib/log';
import prisma from '@/lib/prisma';
import { isPremium } from '@/lib/db-utils';
import { authenticate, authenticateOAuth } from '@/services/server/user';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    newUser: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          throw new Error('Invalid email or password.');
        return authenticate(credentials.email, credentials.password);
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { subscription: true },
      });
      if (!user) return session;
      session.user = {
        ...session.user,
        id: user.id,
        isAuthenticated: true,
        isPremium: isPremium(user.subscription?.status),
      };
      return session;
    },
    async signIn({ user: profile, account, credentials }) {
      if (credentials) return true;
      if (!profile || !profile.email || !account || !account.access_token)
        return false;
      try {
        return authenticateOAuth(
          profile.email,
          account.access_token,
          profile.name,
          profile.image,
          account?.refresh_token
        );
      } catch (error) {
        log.exception(error, 'oauth');
        return false;
      }
    },
  },
};

export default authOptions;
