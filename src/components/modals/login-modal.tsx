'use client';

import useLoginModal from '@/hooks/use-login-modal';
import Modal from '../ui/modal';

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const { isOpen, onClose, toggleStatus, status } = useLoginModal();

  return <Modal isOpen={isOpen} onClose={onClose}></Modal>;
};

export default LoginModal;
