import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';
import { authenticate, authenticateOAuth } from '@/services/user';
import log from '@/lib/log';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
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
      // profile(profile) {
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name ?? profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //   };
      // },
    }),
  ],
  callbacks: {
    async session({ session }) {
      log.info(session.user, 'session');
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) return session;
      session.user = {
        ...session.user,
        id: user.id,
        isAuthenticated: true,
      };
      return session;
    },
    async signIn({ user: profile }) {
      log.info(profile, 'sign-in');
      if (!profile || !profile.email) return false;
      try {
        return authenticateOAuth(profile.email, profile.name, profile.image);
      } catch (error) {
        log.exception(error, 'oauth');
        return false;
      }
    },
  },
};

export default authOptions;
