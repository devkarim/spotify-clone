'use client';

import { cn } from '@/lib/utils';
import useLoginModal from '@/hooks/use-login-modal';

interface RegisterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  title,
  className,
  ...props
}) => {
  const showLoginModal = useLoginModal((state) => state.show);

  return (
    <button
      className={cn('font-bold opacity-60 hover:opacity-100', className)}
      onClick={() => showLoginModal('register')}
      {...props}
    >
      {title ?? 'Sign up'}
    </button>
  );
};

export default RegisterButton;
