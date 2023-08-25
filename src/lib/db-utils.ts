import { SubscriptionStatus } from '@prisma/client';

export const isPremium = (status?: SubscriptionStatus) => {
  return (
    status === SubscriptionStatus.TRIALING ||
    status === SubscriptionStatus.ACTIVE
  );
};
