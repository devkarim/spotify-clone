import { BaseResponse } from '@/types/api';
import client from './axios';

type SessionResponse = BaseResponse<string>;

export const SUBSCRIPTION_PRICE_PER_MONTH = 4.99;

export const checkout = async () =>
  client.post<SessionResponse>('/checkout').then((res) => res.data.data);

export const getUserPortal = async () =>
  client.post<SessionResponse>('/portal').then((res) => res.data.data);
