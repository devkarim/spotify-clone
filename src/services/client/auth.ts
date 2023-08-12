import { User } from '@prisma/client';

import { BaseResponse } from '@/types/api';

import client from './axios';

export type UserResponse = BaseResponse<Omit<User, 'password'>>;

export const createAccount = (email: string, password: string) =>
  client
    .post<UserResponse>('/signup', { email, password })
    .then((res) => res.data.data);
