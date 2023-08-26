'use client';

import Link from 'next/link';

import Modal from '@/components/ui/modal';
import { currencyFormatter } from '@/lib/utils';
import useSubscriptionModal from '@/hooks/use-subscription-modal';
import SubscribeButton from '@/components/subscription/subscribe-button';
import { SUBSCRIPTION_PRICE_PER_MONTH } from '@/services/client/subscription';

interface SubscriptionaModalProps {}

const SubscriptionaModal: React.FC<SubscriptionaModalProps> = ({}) => {
  const subscriptionModal = useSubscriptionModal();

  return (
    <Modal
      title="Only for Spotify Premium users"
      subtitle="Listen & add unlimited songs to your playlists!"
      isOpen={subscriptionModal.isOpen}
      onClose={subscriptionModal.hide}
    >
      <p>
        Use stripe&apos;s{' '}
        <Link
          href="https://stripe.com/docs/testing#cards)"
          className="underline font-bold"
        >
          test cards
        </Link>{' '}
        or credit card <kbd className="kbd">4242424242424242</kbd> for short.
      </p>
      <SubscribeButton
        isSubscribed={false}
        title={`Subscribe for ${currencyFormatter.format(
          SUBSCRIPTION_PRICE_PER_MONTH
        )} per month`}
      />
    </Modal>
  );
};

export default SubscriptionaModal;
