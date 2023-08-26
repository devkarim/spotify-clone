import { APP_NAME } from '@/config/constants';
import Container from '@/components/ui/container';
import { getUser } from '@/services/server/session';
import SubscribeButton from '@/components/subscription/subscribe-button';

interface PremiumPageProps {}

const PremiumPage: React.FC<PremiumPageProps> = async ({}) => {
  const user = await getUser();

  if (!user)
    return (
      <Container className="space-y-8">
        <h2 className="font-bold text-5xl">{APP_NAME} Premium</h2>
        <p className="opacity-60">
          To subscribe to our premium plan, please log in or create a new
          account.
        </p>
      </Container>
    );

  const isSubscribed = user.isPremium;

  return (
    <Container className="space-y-8">
      <h2 className="font-bold text-5xl">{APP_NAME} Premium</h2>
      {isSubscribed ? (
        <p>
          You are currently subscribed to{' '}
          <span className="font-bold">{APP_NAME} Premium Plan</span> plan.
        </p>
      ) : (
        <p>
          You are not subscribed to any <span className="font-bold">plan</span>.
        </p>
      )}
      <SubscribeButton isSubscribed={isSubscribed} openModal />
    </Container>
  );
};

export default PremiumPage;
