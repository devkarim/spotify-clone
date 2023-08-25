'use client';

import Modal from '@/components/ui/modal';
import useSubscriptionModal from '@/hooks/use-subscription-modal';
import SubscribeButton from '@/components/subscription/subscribe-button';
import { SUBSCRIPTION_PRICE_PER_MONTH } from '@/services/client/subscription';
import { currencyFormatter } from '@/lib/utils';

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
