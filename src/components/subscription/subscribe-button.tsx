'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import log from '@/lib/log';
import Response from '@/types/server';
import { checkout, getUserPortal } from '@/services/client/subscription';

interface SubscribeButtonProps {
  isSubscribed: boolean;
  title?: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  isSubscribed,
  title,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    setLoading(true);
    try {
      let url: string;
      if (!isSubscribed) {
        url = await checkout();
      } else {
        url = await getUserPortal();
      }
      window.location.href = url;
    } catch (err) {
      log.exception(err, 'subscribe-button');
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary btn-lg text-black btn-rounded py-8 px-16"
      onClick={onSubscribe}
      disabled={loading}
    >
      {title ? title : isSubscribed ? 'Open Customer Portal' : 'Subscribe Now!'}
    </button>
  );
};

export default SubscribeButton;
