import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';
import Errors from '@/config/errors';

import { exclude } from '@/lib/exclude-prisma';

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
    select: exclude('User', ['password']),
  });
  return user;
};

export const isEmailTaken = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return !!user;
};

export const authenticate = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || !user.password) throw Errors.invalidCredentials;
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) throw Errors.invalidCredentials;
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    image: user.imageUrl,
  };
};

export const authenticateOAuth = async (
  email: string,
  access_token: string,
  name?: string | null,
  imageUrl?: string | null,
  refresh_token?: string | null
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    await prisma.user.create({
      data: {
        email,
        name,
        imageUrl,
        providers: {
          create: {
            name: 'GITHUB',
            access_token,
            refresh_token,
          },
        },
      },
    });
  } else {
    if (user.password) throw Errors.emailTaken;
  }
  return true;
};
