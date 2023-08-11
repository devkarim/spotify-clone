'use client';

import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useLoginModal from '@/hooks/use-login-modal';
import Modal from '../ui/modal';
import Input from '../ui/input';
import { LoginSchema, loginSchema } from '@/schemas/loginSchema';

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const { isOpen, onClose, toggleStatus, status } = useLoginModal();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onBlur',
  });

  const onSubmit = (formData: LoginSchema) => {
    console.log('Login:', formData);
  };

  useEffect(() => {
    if (isOpen) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={status == 'login' ? 'Sign In' : 'Sign Up'}
      subtitle={
        status == 'login'
          ? 'Log into your account to continue'
          : 'Create an account to continue'
      }
      className="max-w-lg"
    >
      <button className="btn bg-black/20 btn-block gap-3 rounded-md h-12">
        <FaGithub className="text-xl" /> Sign in with GitHub
      </button>
      <div className="divider">OR</div>
      <div className="space-y-12">
        <form className="space-y-8">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Email address"
            error={errors.email?.message}
            full
            {...register('email')}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
            full
            {...register('password')}
          />
        </form>
        <div className="space-y-4">
          <button
            className="btn btn-block rounded-md btn-primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {status == 'login' ? 'Sign In' : 'Create an account'}
          </button>
          <p
            className="text-sm underline cursor-pointer text-center opacity-60"
            onClick={toggleStatus}
          >
            {status == 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}{' '}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
