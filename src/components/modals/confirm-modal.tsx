'use client';

import Modal from '@/components/ui/modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subtitle?: string;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subtitle,
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure?`}
      subtitle={subtitle}
      className="max-w-lg"
    >
      <div className="flex justify-end">
        <button
          className="btn btn-secondary"
          onClick={onConfirm}
          disabled={loading}
        >
          Confirm
        </button>
        <button className="btn" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
