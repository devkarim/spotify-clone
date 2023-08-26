'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';

import log from '@/lib/log';
import Response from '@/types/server';
import useUser from '@/hooks/use-user';
import Modal from '@/components/ui/modal';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const user = useUser();

  if (!user) return null;

  const onSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
      onClose();
    } catch (err) {
      log.exception(err);
      toast.error(Response.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Welcome, ${user.name || 'Guest'}`}
      subtitle="Manage your account here."
      isOpen={isOpen}
      onClose={onClose}
      disabled={loading}
    >
      <button
        className="btn btn-secondary btn-rounded"
        onClick={onSignOut}
        disabled={loading}
      >
        Log out
      </button>
    </Modal>
  );
};

export default AccountModal;
