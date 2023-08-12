import { getServerSession } from 'next-auth';

import authOptions from '@/config/auth';

export default async function getSession() {
  return getServerSession(authOptions);
}

export const isAuthenticated = async () => {
  const session = await getSession();
  return session?.user.isAuthenticated;
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};
